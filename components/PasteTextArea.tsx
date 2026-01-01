"use client";

import { ClipboardPaste } from "lucide-react";
import { useI18n } from "./I18nProvider";

type Props = {
  pastedText: string;
  pastedFileName: string;
  isProcessing: boolean;
  canAdd: boolean;
  onTextChange: (text: string) => void;
  onFileNameChange: (name: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onAdd: () => void;
};

export default function PasteTextArea({
  pastedText,
  pastedFileName,
  isProcessing,
  canAdd,
  onTextChange,
  onFileNameChange,
  onKeyDown,
  onAdd,
}: Props) {
  const { t } = useI18n();

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <ClipboardPaste className="w-4 h-4 text-gray-500" />
        <span>{t("pasteTextTitle")}</span>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        {t("pasteTextDescription")}
      </p>

      <div className="mt-3 space-y-2">
        <input
          type="text"
          value={pastedFileName}
          onChange={(e) => onFileNameChange(e.target.value)}
          placeholder={t("pasteTextPlaceholderName")}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isProcessing}
        />
        <textarea
          value={pastedText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={t("pasteTextPlaceholder")}
          className="w-full min-h-[120px] px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isProcessing}
          onKeyDown={onKeyDown}
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-gray-400">
            {t("pasteTextShortcut")}
          </span>
          <button
            type="button"
            onClick={onAdd}
            disabled={!canAdd}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t("pasteTextAdd")}
          </button>
        </div>
      </div>
    </div>
  );
}
