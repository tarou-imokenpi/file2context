"use client";

import type { ExcludePattern } from "@/lib/excludePatterns";
import { PatternLabel } from "./PatternLabel";
import { TreeLabel, makeTreePrefix } from "./TreeLabel";
import { buildGlobTrie, type CheckboxTreeNode, type TrieNode } from "./patternTree";

export function buildGlobNodes(
  patterns: ExcludePattern[],
  onRemoveByPattern: (pattern: ExcludePattern) => void
): CheckboxTreeNode[] {
  const trie = buildGlobTrie(patterns);

  const buildNodes = (
    node: TrieNode,
    path: string[],
    ancestorLast: boolean[]
  ): CheckboxTreeNode[] => {
    const sortedTerminals = [...node.terminals].sort((a, b) => a.localeCompare(b));
    const childKeys = Array.from(node.children.keys()).sort((a, b) => a.localeCompare(b));

    const entries: Array<
      | { kind: "terminal"; value: string }
      | { kind: "folder"; key: string; node: TrieNode }
    > = [
      ...sortedTerminals.map((value) => ({ kind: "terminal" as const, value })),
      ...childKeys.map((key) => ({
        kind: "folder" as const,
        key,
        node: node.children.get(key)!,
      })),
    ];

    return entries.map((entry, index) => {
      const isLast = index === entries.length - 1;
      const prefix = makeTreePrefix(ancestorLast, isLast);

      if (entry.kind === "terminal") {
        const pattern: ExcludePattern = { pattern: entry.value, type: "glob" };
        return {
          value: `g:leaf:${entry.value}`,
          showCheckbox: false,
          title: entry.value,
          label: (
            <TreeLabel prefix={prefix}>
              <PatternLabel
                type="glob"
                label={entry.value}
                onRemove={() => onRemoveByPattern(pattern)}
              />
            </TreeLabel>
          ),
        } satisfies CheckboxTreeNode;
      }

      const childPath = [...path, entry.key];
      const fullPath = childPath.join("/");
      const hasChildren = entry.node.children.size > 0;
      const isSimpleLeaf =
        !hasChildren &&
        entry.node.terminals.length === 1 &&
        entry.node.terminals[0] === fullPath;

      if (isSimpleLeaf) {
        const pattern: ExcludePattern = { pattern: fullPath, type: "glob" };
        return {
          value: `g:leaf:${fullPath}`,
          showCheckbox: false,
          title: fullPath,
          label: (
            <TreeLabel prefix={prefix}>
              <PatternLabel
                type="glob"
                label={fullPath}
                onRemove={() => onRemoveByPattern(pattern)}
              />
            </TreeLabel>
          ),
        } satisfies CheckboxTreeNode;
      }

      const children = buildNodes(entry.node, childPath, [...ancestorLast, isLast]);
      return {
        value: `g:folder:${fullPath}`,
        showCheckbox: false,
        title: fullPath,
        label: (
          <TreeLabel prefix={prefix}>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate min-w-0">
              {entry.key}
            </div>
          </TreeLabel>
        ),
        children: children.length > 0 ? children : undefined,
      } satisfies CheckboxTreeNode;
    });
  };

  return buildNodes(trie, [], []);
}

export function buildRegexNodes(
  patterns: ExcludePattern[],
  onRemoveByPattern: (pattern: ExcludePattern) => void
): CheckboxTreeNode[] {
  const sorted = [...patterns].sort((a, b) => a.pattern.localeCompare(b.pattern));
  return sorted.map((p, index) => {
    const label = `/${p.pattern}/`;
    const prefix = makeTreePrefix([], index === sorted.length - 1);
    return {
      value: `r:leaf:${p.pattern}`,
      showCheckbox: false,
      title: label,
      label: (
        <TreeLabel prefix={prefix}>
          <PatternLabel type="regex" label={label} onRemove={() => onRemoveByPattern(p)} />
        </TreeLabel>
      ),
    } satisfies CheckboxTreeNode;
  });
}
