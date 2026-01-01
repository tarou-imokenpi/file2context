"use client";

import { useRef, DragEvent, type ChangeEvent, type ReactNode } from "react";
import { FolderOpen, Upload, Loader2, type LucideIcon } from "lucide-react";
import { useI18n } from "./I18nProvider";

// webkitdirectory属性用の型拡張
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface InputHTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
}

// ========== 型定義 ==========
type DropZoneProps = {
  isDragging: boolean;
  isProcessing: boolean;
  processingProgress?: ProcessingProgress;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
};

type ProcessingProgress = {
  current: number;
  total: number;
};

type ActionButtonProps = {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  variant?: "primary" | "secondary";
};

// ========== サブコンポーネント ==========

/** 処理中のプログレス表示 */
function ProcessingIndicator({
  message,
  progress,
}: {
  message: string;
  progress?: ProcessingProgress;
}) {
  const percent = progress && progress.total > 0
    ? Math.round((progress.current / progress.total) * 100)
    : 0;

  return (
    <div className="text-gray-500">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
      <p>{message}</p>
      {progress && progress.total > 0 && (
        <ProgressBar current={progress.current} total={progress.total} percent={percent} />
      )}
    </div>
  );
}

/** プログレスバー */
function ProgressBar({ current, total, percent }: { current: number; total: number; percent: number }) {
  return (
    <div className="mt-3 max-w-xs mx-auto">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{current} / {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/** アクションボタン */
function ActionButton({ onClick, icon: Icon, label, variant = "primary" }: ActionButtonProps) {
  const baseStyles = "px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2";
  const variantStyles = variant === "primary"
    ? "bg-blue-500 hover:bg-blue-600"
    : "bg-gray-500 hover:bg-gray-600";

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

/** 非表示のファイルinput */
function HiddenFileInput({
  inputRef,
  onFileSelect,
  isFolder = false,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  isFolder?: boolean;
}) {
  return (
    <input
      ref={inputRef}
      type="file"
      multiple
      onChange={onFileSelect}
      className="hidden"
      {...(isFolder && { webkitdirectory: "", directory: "" })}
    />
  );
}

// ========== メインコンポーネント ==========
export default function DropZone({
  isDragging,
  isProcessing,
  processingProgress,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const containerClassName = [
    "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
    isDragging
      ? "border-blue-500 bg-blue-500/10"
      : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-500/5",
  ].join(" ");

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={containerClassName}
    >
      {isProcessing ? (
        <ProcessingIndicator
          message={t("processing")}
          progress={processingProgress}
        />
      ) : (
        <>
          <FolderOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t("dropzoneText")}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <ActionButton
              onClick={() => fileInputRef.current?.click()}
              icon={Upload}
              label={t("selectFilesButton") || "ファイルを選択"}
              variant="primary"
            />
            <ActionButton
              onClick={() => folderInputRef.current?.click()}
              icon={FolderOpen}
              label={t("selectFolderButton") || "フォルダを選択"}
              variant="secondary"
            />
          </div>
          <HiddenFileInput inputRef={fileInputRef} onFileSelect={onFileSelect} />
          <HiddenFileInput inputRef={folderInputRef} onFileSelect={onFileSelect} isFolder />
        </>
      )}
    </div>
  );
}
