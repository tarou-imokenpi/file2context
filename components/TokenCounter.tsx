"use client";

import { useMemo, useState } from "react";
import { encode } from "gpt-tokenizer";
import { Hash, Coins, ChevronDown } from "lucide-react";
import { useI18n } from "./I18nProvider";

// モデルの入力コスト定義（per 1M tokens）
type ModelCost = {
  name: string;
  inputCostPer1M: number;
  cachedCostPer1M?: number;
  category: string;
};

const MODEL_COSTS: ModelCost[] = [
  // Budget tier
  {
    name: "GPT-4o Mini",
    inputCostPer1M: 0.15,
    cachedCostPer1M: 0.075,
    category: "Budget",
  },
  { name: "Gemini 2.0 Flash", inputCostPer1M: 0.1, category: "Budget" },
  {
    name: "Gemini 2.5 Flash-Lite",
    inputCostPer1M: 0.1,
    cachedCostPer1M: 0.01,
    category: "Budget",
  },
  { name: "Claude 3.5 Haiku", inputCostPer1M: 0.8, category: "Budget" },
  { name: "Claude 4.5 Haiku", inputCostPer1M: 1.0, category: "Budget" },
  { name: "DeepSeek Chat", inputCostPer1M: 0.27, category: "Budget" },
  {
    name: "Grok 3 Mini",
    inputCostPer1M: 0.3,
    cachedCostPer1M: 0.075,
    category: "Budget",
  },

  // Mid tier
  {
    name: "GPT-4.1 Mini",
    inputCostPer1M: 0.4,
    cachedCostPer1M: 0.1,
    category: "Mid",
  },
  {
    name: "Gemini 2.5 Flash",
    inputCostPer1M: 0.3,
    cachedCostPer1M: 0.03,
    category: "Mid",
  },
  {
    name: "o1-mini",
    inputCostPer1M: 1.1,
    cachedCostPer1M: 0.55,
    category: "Mid",
  },
  {
    name: "o3-mini",
    inputCostPer1M: 1.1,
    cachedCostPer1M: 0.55,
    category: "Mid",
  },
  {
    name: "o4-mini",
    inputCostPer1M: 1.1,
    cachedCostPer1M: 0.275,
    category: "Mid",
  },
  { name: "DeepSeek Reasoner", inputCostPer1M: 0.55, category: "Mid" },

  // Pro tier
  {
    name: "GPT-4o",
    inputCostPer1M: 2.5,
    cachedCostPer1M: 1.25,
    category: "Pro",
  },
  {
    name: "GPT-4.1",
    inputCostPer1M: 2.0,
    cachedCostPer1M: 0.5,
    category: "Pro",
  },
  {
    name: "GPT-5",
    inputCostPer1M: 1.25,
    cachedCostPer1M: 0.125,
    category: "Pro",
  },
  {
    name: "GPT-5.1",
    inputCostPer1M: 1.25,
    cachedCostPer1M: 0.125,
    category: "Pro",
  },
  {
    name: "GPT-5.2",
    inputCostPer1M: 1.75,
    cachedCostPer1M: 0.175,
    category: "Pro",
  },
  {
    name: "Gemini 2.5 Pro ≤200k",
    inputCostPer1M: 1.25,
    cachedCostPer1M: 0.125,
    category: "Pro",
  },
  { name: "Claude 3.7 Sonnet", inputCostPer1M: 3.0, category: "Pro" },
  { name: "Claude Sonnet 4/4.5 ≤200k", inputCostPer1M: 3.0, category: "Pro" },
  {
    name: "Grok 3",
    inputCostPer1M: 3.0,
    cachedCostPer1M: 0.75,
    category: "Pro",
  },
  {
    name: "Grok 4 ≤128k",
    inputCostPer1M: 3.0,
    cachedCostPer1M: 0.75,
    category: "Pro",
  },

  // Premium tier
  { name: "Claude Opus 4.5", inputCostPer1M: 5.0, category: "Premium" },
  { name: "Claude Opus 4/4.1", inputCostPer1M: 15.0, category: "Premium" },
  {
    name: "o3",
    inputCostPer1M: 10.0,
    cachedCostPer1M: 0.5,
    category: "Premium",
  },
  {
    name: "GPT-4.5",
    inputCostPer1M: 75.0,
    cachedCostPer1M: 37.5,
    category: "Premium",
  },
  { name: "o1 Pro", inputCostPer1M: 150.0, category: "Premium" },
];

type TokenCounterProps = {
  label: string;
  content: string;
  showCost?: boolean;
};

export default function TokenCounter({
  label,
  content,
  showCost = false,
}: TokenCounterProps) {
  const { t } = useI18n();
  const [selectedModel, setSelectedModel] = useState<string>("GPT-5.2");
  const [useCached, setUseCached] = useState(false);

  const tokenCount = useMemo(() => {
    if (!content) return 0;
    try {
      return encode(content).length;
    } catch {
      return 0;
    }
  }, [content]);

  const selectedModelData = useMemo(() => {
    return MODEL_COSTS.find((m) => m.name === selectedModel) || MODEL_COSTS[0];
  }, [selectedModel]);

  const estimatedCost = useMemo(() => {
    const costPer1M =
      useCached && selectedModelData.cachedCostPer1M
        ? selectedModelData.cachedCostPer1M
        : selectedModelData.inputCostPer1M;
    return (tokenCount / 1_000_000) * costPer1M;
  }, [tokenCount, selectedModelData, useCached]);

  const groupedModels = useMemo(() => {
    const groups: Record<string, ModelCost[]> = {};
    for (const model of MODEL_COSTS) {
      if (!groups[model.category]) groups[model.category] = [];
      groups[model.category].push(model);
    }
    return groups;
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
      <span className="flex items-center gap-1">
        <Hash className="w-3.5 h-3.5" />
        {label}:{" "}
        <span className="font-medium text-blue-600">
          {tokenCount.toLocaleString()}
        </span>
      </span>
      {showCost && tokenCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Coins className="w-3.5 h-3.5" />
          <span>{t("estimatedCost")}:</span>
          <div className="relative inline-block">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="appearance-none bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5 pr-6 text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {Object.entries(groupedModels).map(([category, models]) => (
                <optgroup key={category} label={category}>
                  {models.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name} (${model.inputCostPer1M}/1M)
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          {selectedModelData.cachedCostPer1M && (
            <label className="flex items-center gap-1 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={useCached}
                onChange={(e) => setUseCached(e.target.checked)}
                className="w-3 h-3 rounded"
              />
              <span className="text-gray-400">Cached</span>
            </label>
          )}
          <span className="font-medium text-green-600">
            {estimatedCost < 0.0001
              ? "< $0.0001"
              : `$${estimatedCost.toFixed(4)}`}
          </span>
        </div>
      )}
    </div>
  );
}

// ファイルごとのトークン数を表示するコンポーネント
export function FileTokenCount({ tokenCount }: { tokenCount: number }) {
  return (
    <span className="flex items-center gap-1 text-sm text-gray-500">
      <Hash className="w-3 h-3" />
      {tokenCount.toLocaleString()}
    </span>
  );
}

// 合計トークン数を計算するユーティリティ
export function useTokenCount(content: string): number {
  return useMemo(() => {
    if (!content) return 0;
    try {
      return encode(content).length;
    } catch {
      return 0;
    }
  }, [content]);
}
