"use client";

import { useState, useCallback, useRef, DragEvent, useMemo } from "react";
import type { ProcessedFile } from "@/components/FileList";
import type {
  FileWithPath,
  FileSystemEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "@/types/fileSystem";
import {
  ExcludePattern,
  matchesPattern,
} from "@/components/ExcludePatternSettings";
import { isTextFile, isPdfFile } from "@/lib/fileTypes";
import { calculateTokenCount, estimateTokenCount } from "@/lib/tokenCount";
import { readFileContent, readPdfContent, yieldToMain } from "@/lib/fileReader";

// Batch processing settings
const BATCH_SIZE = 5;
const SLOW_PROCESSING_THRESHOLD = 15000; // 15 seconds

export type ProcessingProgress = {
  current: number;
  total: number;
};

export type SlowProcessingPrompt = {
  elapsedSeconds: number;
} | null;

export type TokenCountMode = "accurate" | "lightweight" | null;

// Helper: Get File from FileSystemFileEntry
function getFileFromEntry(entry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => {
    entry.file(resolve, reject);
  });
}

// Helper: Read directory recursively (pure function, no hooks)
async function readDirectoryRecursive(
  dirEntry: FileSystemDirectoryEntry,
  basePath: string,
  excludePatterns: ExcludePattern[]
): Promise<FileWithPath[]> {
  const reader = dirEntry.createReader();
  const files: FileWithPath[] = [];

  const readEntries = (): Promise<FileSystemEntry[]> => {
    return new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
  };

  let entries: FileSystemEntry[] = [];
  let batch: FileSystemEntry[];
  do {
    batch = await readEntries();
    entries = entries.concat(batch);
  } while (batch.length > 0);

  for (const entry of entries) {
    if (matchesPattern(entry.name, excludePatterns)) continue;

    const currentPath = basePath ? `${basePath}/${entry.name}` : entry.name;

    if (entry.isFile) {
      try {
        const file = await getFileFromEntry(entry as FileSystemFileEntry);
        files.push({ file, path: currentPath });
      } catch (error) {
        console.error(`Failed to read file: ${currentPath}`, error);
      }
    } else if (entry.isDirectory) {
      const subFiles = await readDirectoryRecursive(
        entry as FileSystemDirectoryEntry,
        currentPath,
        excludePatterns
      );
      files.push(...subFiles);
    }
  }

  return files;
}

export function useFileProcessor(excludePatterns: ExcludePattern[]) {
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] =
    useState<ProcessingProgress>({
      current: 0,
      total: 0,
    });
  const [slowProcessingPrompt, setSlowProcessingPrompt] =
    useState<SlowProcessingPrompt>(null);

  const tokenCountModeRef = useRef<TokenCountMode>(null);
  const hasShownSlowPromptRef = useRef(false);

  // Memoize excludePatterns for stable reference
  const patternsRef = useMemo(() => excludePatterns, [excludePatterns]);

  // Check if path should be excluded
  const shouldExcludePath = useCallback(
    (path: string): boolean => {
      const parts = path.split("/");
      return parts.some((part) => matchesPattern(part, patternsRef));
    },
    [patternsRef]
  );

  // Process DataTransferItems (drag & drop)
  const processDataTransferItems = useCallback(
    async (items: DataTransferItemList): Promise<FileWithPath[]> => {
      const files: FileWithPath[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const entry = item.webkitGetAsEntry?.();

        if (entry) {
          if (matchesPattern(entry.name, patternsRef)) continue;

          if (entry.isFile) {
            const file = await getFileFromEntry(
              entry as unknown as FileSystemFileEntry
            );
            files.push({ file, path: file.name });
          } else if (entry.isDirectory) {
            const dirFiles = await readDirectoryRecursive(
              entry as unknown as FileSystemDirectoryEntry,
              entry.name,
              patternsRef
            );
            files.push(...dirFiles);
          }
        } else if (item.kind === "file") {
          const file = item.getAsFile();
          if (file && !matchesPattern(file.name, patternsRef)) {
            files.push({ file, path: file.name });
          }
        }
      }

      return files;
    },
    [patternsRef]
  );

  // ファイルを処理してStateに追加（バッチ処理で最適化）
  const processFiles = useCallback(
    async (fileList: FileWithPath[], useLightweightMode = false) => {
      const filteredFiles = fileList.filter(
        ({ path }) => !shouldExcludePath(path)
      );

      if (filteredFiles.length === 0) return;

      setIsProcessing(true);
      setProcessingProgress({ current: 0, total: filteredFiles.length });
      setSlowProcessingPrompt(null);
      hasShownSlowPromptRef.current = false;
      tokenCountModeRef.current = useLightweightMode ? "lightweight" : null;

      const startTime = Date.now();

      for (let i = 0; i < filteredFiles.length; i += BATCH_SIZE) {
        const elapsedTime = Date.now() - startTime;
        if (
          !hasShownSlowPromptRef.current &&
          tokenCountModeRef.current === null &&
          elapsedTime > SLOW_PROCESSING_THRESHOLD
        ) {
          hasShownSlowPromptRef.current = true;
          setSlowProcessingPrompt({
            elapsedSeconds: Math.round(elapsedTime / 1000),
          });
        }

        const useLightweight = tokenCountModeRef.current === "lightweight";
        const batch = filteredFiles.slice(i, i + BATCH_SIZE);
        const batchProcessed: ProcessedFile[] = [];

        for (const { file, path } of batch) {
          const pdf = isPdfFile(file.name, file.type);
          const isText = pdf || isTextFile(file.name, file.type);

          let content = "";
          let tokenCount = 0;

          if (isText) {
            try {
              content = pdf
                ? await readPdfContent(file)
                : await readFileContent(file);
              tokenCount = useLightweight
                ? estimateTokenCount(content)
                : calculateTokenCount(content);
            } catch {
              content = "[ファイルの読み込みに失敗しました]";
            }
          } else {
            content = "[バイナリファイルのため表示できません]";
          }

          batchProcessed.push({
            id: `${path}-${Date.now()}-${Math.random()}`,
            path,
            name: file.name,
            type: file.type || "unknown",
            originalSize: file.size,
            content,
            isText,
            tokenCount,
          });
        }

        setProcessedFiles((prev) => {
          const newFiles = [...prev, ...batchProcessed];
          newFiles.sort((a, b) => a.path.localeCompare(b.path));
          return newFiles;
        });

        setProcessingProgress({
          current: Math.min(i + BATCH_SIZE, filteredFiles.length),
          total: filteredFiles.length,
        });

        if (i + BATCH_SIZE < filteredFiles.length) {
          await yieldToMain();
        }
      }

      setIsProcessing(false);
      setProcessingProgress({ current: 0, total: 0 });
      setSlowProcessingPrompt(null);
      tokenCountModeRef.current = null;
    },
    [shouldExcludePath]
  );

  // 軽量モードに切り替え
  const switchToLightweight = useCallback(() => {
    tokenCountModeRef.current = "lightweight";
    setSlowProcessingPrompt(null);
  }, []);

  // 正確なカウントを継続
  const keepAccurate = useCallback(() => {
    tokenCountModeRef.current = "accurate";
    setSlowProcessingPrompt(null);
  }, []);

  // ドラッグイベントハンドラ
  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.items) {
        const files = await processDataTransferItems(e.dataTransfer.items);
        await processFiles(files);
      }
    },
    [processDataTransferItems, processFiles]
  );

  // ファイル選択ハンドラ
  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList) return;

      const files: FileWithPath[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const path =
          (file as File & { webkitRelativePath?: string }).webkitRelativePath ||
          file.name;

        if (shouldExcludePath(path)) continue;
        files.push({ file, path });
      }

      await processFiles(files);
      e.target.value = "";
    },
    [processFiles, shouldExcludePath]
  );

  // ファイルをクリア
  const clearFiles = useCallback(() => {
    setProcessedFiles([]);
  }, []);

  return {
    // State
    processedFiles,
    isDragging,
    isProcessing,
    processingProgress,
    slowProcessingPrompt,

    // Handlers
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    clearFiles,
    processFiles,

    // Mode switching
    switchToLightweight,
    keepAccurate,
  };
}
