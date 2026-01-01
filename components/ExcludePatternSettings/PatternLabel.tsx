"use client";

import { X } from "lucide-react";
import type { PatternType } from "@/lib/excludePatterns";

type PatternLabelProps = {
  type: PatternType;
  label: string;
  onRemove: () => void;
};

export function PatternLabel({ type, label, onRemove }: PatternLabelProps) {
  return (
    <div
      className={`flex items-center gap-1 px-1 py-0 rounded text-[11px] leading-none max-w-full min-w-0 overflow-hidden ${
        type === "regex"
          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
      }`}
      title={label}
    >
      <span className="font-mono text-xs truncate min-w-0">{label}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        }}
        className="text-gray-500 hover:text-red-500 transition-colors ml-1 flex-shrink-0"
        aria-label="Remove"
        type="button"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
