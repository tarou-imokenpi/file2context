import type { ReactNode } from "react";
import type { ExcludePattern } from "@/lib/excludePatterns";

export type CheckboxTreeNode = {
  label: ReactNode;
  value: string;
  children?: CheckboxTreeNode[];
  showCheckbox?: boolean;
  title?: string;
};

export type TrieNode = {
  children: Map<string, TrieNode>;
  terminals: string[];
};

export function buildGlobTrie(patterns: ExcludePattern[]): TrieNode {
  const root: TrieNode = { children: new Map(), terminals: [] };

  for (const p of patterns) {
    const raw = p.pattern;
    const segments = raw.split("/").filter(Boolean);
    const normalized = segments.length > 0 ? segments.join("/") : raw;

    let current = root;
    for (const seg of segments.length > 0 ? segments : [raw]) {
      const existing = current.children.get(seg);
      if (existing) {
        current = existing;
        continue;
      }
      const next: TrieNode = { children: new Map(), terminals: [] };
      current.children.set(seg, next);
      current = next;
    }
    current.terminals.push(normalized);
  }

  return root;
}

export function collectExpandableValues(nodes: CheckboxTreeNode[]): string[] {
  const values: string[] = [];
  const walk = (n: CheckboxTreeNode) => {
    if (n.children && n.children.length > 0) {
      values.push(n.value);
      for (const c of n.children) walk(c);
    }
  };
  for (const n of nodes) walk(n);
  return values;
}
