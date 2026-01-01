"use client";

import { useState } from "react";
import { File, Folder, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { useI18n } from "./I18nProvider";

// 処理済みファイルの型定義
export type ProcessedFile = {
  id: string;
  path: string;
  name: string;
  type: string;
  originalSize: number;
  content: string;
  isText: boolean;
  tokenCount: number;
};

type FileListProps = {
  files: ProcessedFile[];
  onClear: () => void;
};

// ファイルサイズをフォーマット
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// パスからディレクトリを取得
function getDirectory(path: string): string {
  const parts = path.split("/");
  if (parts.length <= 1) return "";
  return parts.slice(0, -1).join("/");
}

// 個別ファイルアイテム（展開可能）
function FileItem({ file }: { file: ProcessedFile }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors text-left"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
        <File className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatSize(file.originalSize)} •{" "}
            {file.tokenCount.toLocaleString()} tokens
            {!file.isText && " • binary"}
          </p>
        </div>
      </button>
      {expanded && (
        <div className="px-3 pb-3">
          <pre className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 whitespace-pre-wrap break-words">
            {file.content}
          </pre>
        </div>
      )}
    </li>
  );
}

export default function FileList({ files, onClear }: FileListProps) {
  const { t } = useI18n();

  if (files.length === 0) return null;

  // ディレクトリでグループ化
  const groupedFiles = files.reduce<Record<string, ProcessedFile[]>>(
    (acc, file) => {
      const dir = getDirectory(file.path) || "(root)";
      if (!acc[dir]) acc[dir] = [];
      acc[dir].push(file);
      return acc;
    },
    {}
  );

  const totalTokens = files.reduce((sum, f) => sum + f.tokenCount, 0);
  const totalSize = files.reduce((sum, f) => sum + f.originalSize, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {t("selectedFiles")}
          </h2>
          <p className="text-sm text-gray-500">
            {files.length} {t("filesCount")} • {formatSize(totalSize)} •{" "}
            {totalTokens.toLocaleString()} tokens
          </p>
        </div>
        <button
          onClick={onClear}
          className="px-3 py-1.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors inline-flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          {t("clearAll")}
        </button>
      </div>

      {/* File list */}
      <div className="space-y-3 max-h-[32rem] overflow-y-auto">
        {Object.entries(groupedFiles)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([dir, dirFiles]) => (
            <div
              key={dir}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Directory header */}
              <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                <Folder className="w-4 h-4" />
                {dir}
              </div>

              {/* Files */}
              <ul>
                {dirFiles.map((file) => (
                  <FileItem key={file.id} file={file} />
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
