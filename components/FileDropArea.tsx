"use client";

import { useState, useMemo } from "react";
import { File as FileIcon } from "lucide-react";

import DropZone from "./DropZone";
import FileList from "./FileList";
import ContextOutput from "./ContextOutput";
import ExcludePatternSettings, {
  DEFAULT_EXCLUDE_PATTERNS,
  ExcludePattern,
} from "./ExcludePatternSettings";
import SlowProcessingBanner from "./SlowProcessingBanner";
import PasteTextArea from "./PasteTextArea";
import { useI18n } from "./I18nProvider";
import { useFileProcessor } from "@/hooks/useFileProcessor";
import { usePastedText } from "@/hooks/usePastedText";
import { generateContext } from "@/lib/contextGenerator";

export default function FileDropArea() {
  const { t } = useI18n();

  // Exclude patterns
  const [excludePatterns, setExcludePatterns] = useState<ExcludePattern[]>(
    DEFAULT_EXCLUDE_PATTERNS.map((p) => ({ pattern: p, type: "glob" as const }))
  );

  // File processing
  const {
    processedFiles,
    isDragging,
    isProcessing,
    processingProgress,
    slowProcessingPrompt,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    clearFiles,
    processFiles,
    switchToLightweight,
    keepAccurate,
  } = useFileProcessor(excludePatterns);

  // Pasted text
  const {
    pastedText,
    setPastedText,
    pastedFileName,
    setPastedFileName,
    handleAddPastedText,
    handleKeyDown,
    canAdd,
  } = usePastedText(processFiles, isProcessing);

  // Context generation (memoized)
  const context = useMemo(
    () => generateContext(processedFiles),
    [processedFiles]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 左カラム: 入力系 (1/4) */}
      <div className="lg:col-span-1 space-y-6">
        {/* Drop zone */}
        <DropZone
          isDragging={isDragging}
          isProcessing={isProcessing}
          processingProgress={processingProgress}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFileSelect={handleFileSelect}
        />

        {/* Paste text area */}
        <PasteTextArea
          pastedText={pastedText}
          pastedFileName={pastedFileName}
          isProcessing={isProcessing}
          canAdd={canAdd}
          onTextChange={setPastedText}
          onFileNameChange={setPastedFileName}
          onKeyDown={handleKeyDown}
          onAdd={handleAddPastedText}
        />

        {/* Slow processing banner */}
        <SlowProcessingBanner
          prompt={slowProcessingPrompt}
          isProcessing={isProcessing}
          onSwitchToLightweight={switchToLightweight}
          onKeepAccurate={keepAccurate}
        />

        {/* Exclude patterns */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <ExcludePatternSettings
            patterns={excludePatterns}
            onPatternsChange={setExcludePatterns}
          />
        </div>
      </div>

      {/* 右カラム: 出力系 (3/4) */}
      <div className="lg:col-span-3 space-y-6">
        {processedFiles.length === 0 ? (
          /* Placeholder when no context - also accepts drops */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`h-full min-h-[400px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              isDragging
                ? "border-blue-500 bg-blue-500/10 text-blue-500"
                : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-gray-50/50 dark:bg-gray-800/30 hover:border-blue-400 hover:bg-blue-500/5"
            }`}
          >
            <FileIcon className={`w-16 h-16 mb-4 ${isDragging ? "opacity-100" : "opacity-50"}`} />
            <p className="text-lg font-medium mb-2">{t("emptyStateTitle")}</p>
            <p className="text-sm">{t("emptyStateFormats")}</p>
          </div>
        ) : (
          <>
            {/* File list */}
            <FileList files={processedFiles} onClear={clearFiles} />

            {/* Context output */}
            <ContextOutput context={context} />
          </>
        )}
      </div>
    </div>
  );
}
