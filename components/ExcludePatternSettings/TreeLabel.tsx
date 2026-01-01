"use client";

import type { ReactNode } from "react";

type TreeLabelProps = {
  prefix: string;
  children: ReactNode;
};

export function TreeLabel({ prefix, children }: TreeLabelProps) {
  return (
    <div className="flex items-center min-w-0 gap-0.5">
      <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500 whitespace-pre leading-none">
        {prefix}
      </span>
      {children}
    </div>
  );
}

export function makeTreePrefix(ancestorLast: boolean[], isLast: boolean): string {
  const parts: string[] = ancestorLast.map((last) => (last ? "   " : "│  "));
  parts.push(isLast ? "└─ " : "├─ ");
  return parts.join("");
}
