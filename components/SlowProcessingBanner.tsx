"use client";

import { AlertTriangle } from "lucide-react";
import type { SlowProcessingPrompt } from "@/hooks/useFileProcessor";
import { useI18n } from "./I18nProvider";

type Props = {
  prompt: SlowProcessingPrompt;
  isProcessing: boolean;
  onSwitchToLightweight: () => void;
  onKeepAccurate: () => void;
};

export default function SlowProcessingBanner({
  prompt,
  isProcessing,
  onSwitchToLightweight,
  onKeepAccurate,
}: Props) {
  const { t } = useI18n();

  if (!isProcessing || !prompt) return null;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-yellow-300/60 bg-yellow-50 p-4 text-sm text-yellow-900 dark:border-yellow-700/60 dark:bg-yellow-900/20 dark:text-yellow-100">
      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="font-medium">
          {t("processing")}{" "}
          <span className="text-yellow-700 dark:text-yellow-200">
            （{prompt.elapsedSeconds}秒以上）
          </span>
        </div>
        <p className="mt-1 text-yellow-800/90 dark:text-yellow-100/90">
          トークン数を「軽量推定」に切り替えると処理が速くなります（精度は下がります）。
          選択されるまでは正確なカウントを継続します。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSwitchToLightweight}
            disabled={!isProcessing}
            className="px-3 py-1.5 rounded-lg bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white text-xs font-medium transition-colors"
          >
            軽量推定に切り替える
          </button>
          <button
            type="button"
            onClick={onKeepAccurate}
            disabled={!isProcessing}
            className="px-3 py-1.5 rounded-lg bg-transparent border border-yellow-400/70 hover:bg-yellow-100 disabled:opacity-50 text-yellow-900 text-xs font-medium transition-colors dark:border-yellow-700/70 dark:hover:bg-yellow-900/30 dark:text-yellow-100"
          >
            正確なカウントのまま続行
          </button>
        </div>
      </div>
    </div>
  );
}
