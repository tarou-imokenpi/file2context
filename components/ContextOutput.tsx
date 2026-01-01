"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import TokenCounter from "./TokenCounter";
import { useI18n } from "./I18nProvider";

type ContextOutputProps = {
  context: string;
};

export default function ContextOutput({ context }: ContextOutputProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  const copyToClipboard = useCallback(async () => {
    if (!context) return;

    try {
      await navigator.clipboard.writeText(context);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }, [context]);

  if (!context) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{t("generatedContext")}</h2>
          <TokenCounter label={t("contextTokens")} content={context} showCost />
        </div>
        <button
          onClick={copyToClipboard}
          className={`px-4 py-2 rounded-lg font-medium transition-all inline-flex items-center gap-2 ${
            copied
              ? "bg-green-500 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              {t("copied")}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              {t("copyToClipboard")}
            </>
          )}
        </button>
      </div>
      <div className="relative">
        <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm overflow-x-auto max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700">
          {context}
        </pre>
      </div>
    </div>
  );
}
