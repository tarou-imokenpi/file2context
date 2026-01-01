"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import CheckboxTree from "react-checkbox-tree";
import {
  Plus,
  RotateCcw,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  CheckSquare,
  Square,
  MinusSquare,
  Folder,
  FolderOpen,
  FileText,
} from "lucide-react";
import { useI18n } from "../I18nProvider";
import {
  type ExcludePattern,
  type PatternType,
  validatePattern,
  createDefaultPatterns,
} from "@/lib/excludePatterns";
import { collectExpandableValues } from "./patternTree";
import { buildGlobNodes, buildRegexNodes } from "./patternTreeBuilder";

type ExcludePatternSettingsProps = {
  patterns: ExcludePattern[];
  onPatternsChange: (patterns: ExcludePattern[]) => void;
};

// ツリーアイコン定義
function useTreeIcons() {
  return useMemo(
    () => ({
      check: <CheckSquare className="rct-icon rct-icon-check" />,
      uncheck: <Square className="rct-icon rct-icon-uncheck" />,
      halfCheck: <MinusSquare className="rct-icon rct-icon-half-check" />,
      expandClose: <ChevronRight className="rct-icon rct-icon-expand-close" />,
      expandOpen: <ChevronDown className="rct-icon rct-icon-expand-open" />,
      expandAll: <Plus className="rct-icon rct-icon-expand-all" />,
      collapseAll: <MinusSquare className="rct-icon rct-icon-collapse-all" />,
      parentClose: <Folder className="rct-icon rct-icon-parent-close" />,
      parentOpen: <FolderOpen className="rct-icon rct-icon-parent-open" />,
      leaf: <FileText className="rct-icon rct-icon-leaf" />,
    }),
    []
  );
}

// パターン入力フォーム
function PatternInputForm({
  onAddPattern,
}: {
  onAddPattern: (pattern: string, type: PatternType) => { success: boolean; error?: string };
}) {
  const [newPattern, setNewPattern] = useState("");
  const [patternType, setPatternType] = useState<PatternType>("glob");
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  const handleAdd = useCallback(() => {
    const result = onAddPattern(newPattern, patternType);
    if (result.success) {
      setNewPattern("");
      setError(null);
    } else {
      setError(result.error || null);
    }
  }, [newPattern, patternType, onAddPattern]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <select
          value={patternType}
          onChange={(e) => setPatternType(e.target.value as PatternType)}
          className="px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
        >
          <option value="glob">{t("glob")}</option>
          <option value="regex">{t("regex")}</option>
        </select>
        <input
          type="text"
          value={newPattern}
          onChange={(e) => {
            setNewPattern(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={
            patternType === "glob" ? t("patternPlaceholderGlob") : t("patternPlaceholderRegex")
          }
          className="flex-1 min-w-0 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm inline-flex items-center gap-1 transition-colors flex-shrink-0 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          {t("add")}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}

      <div className="text-xs text-gray-400 space-y-1">
        <p>{t("globHelp")}</p>
        <p>{t("regexHelp")}</p>
      </div>
    </div>
  );
}

// パターンツリー表示
function PatternTree({
  title,
  nodes,
  expanded,
  onExpand,
  icons,
}: {
  title: string;
  nodes: ReturnType<typeof buildGlobNodes>;
  expanded: string[];
  onExpand: (expanded: string[]) => void;
  icons: ReturnType<typeof useTreeIcons>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">{title}</div>
      {mounted && nodes.length > 0 && (
        <div className="min-w-0 overflow-hidden compact-tree">
          <CheckboxTree
            nodes={nodes}
            checked={[]}
            expanded={expanded}
            onCheck={() => {
              /* showCheckbox=false のため未使用 */
            }}
            onExpand={onExpand}
            icons={icons}
            showExpandAll={false}
            showNodeIcon={false}
          />
        </div>
      )}
    </div>
  );
}

export default function ExcludePatternSettings({
  patterns,
  onPatternsChange,
}: ExcludePatternSettingsProps) {
  const { t } = useI18n();
  const treeIcons = useTreeIcons();

  const [expandedGlob, setExpandedGlob] = useState<string[]>([]);
  const [expandedRegex, setExpandedRegex] = useState<string[]>([]);

  const globPatterns = useMemo(() => patterns.filter((p) => p.type === "glob"), [patterns]);
  const regexPatterns = useMemo(() => patterns.filter((p) => p.type === "regex"), [patterns]);

  const removePatternByValue = useCallback(
    (pattern: ExcludePattern) => {
      onPatternsChange(
        patterns.filter((p) => !(p.type === pattern.type && p.pattern === pattern.pattern))
      );
    },
    [patterns, onPatternsChange]
  );

  const globNodes = useMemo(
    () => buildGlobNodes(globPatterns, removePatternByValue),
    [globPatterns, removePatternByValue]
  );
  const regexNodes = useMemo(
    () => buildRegexNodes(regexPatterns, removePatternByValue),
    [regexPatterns, removePatternByValue]
  );

  useEffect(() => {
    if (expandedGlob.length === 0 && globNodes.length > 0) {
      setExpandedGlob(collectExpandableValues(globNodes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globNodes]);

  useEffect(() => {
    if (expandedRegex.length === 0 && regexNodes.length > 0) {
      setExpandedRegex(collectExpandableValues(regexNodes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regexNodes]);

  const handleAddPattern = useCallback(
    (pattern: string, type: PatternType) => {
      const validation = validatePattern(pattern, type);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.errorKey ? t(validation.errorKey) : t("patternRequired"),
        };
      }

      // 重複チェック
      const exists = patterns.some((p) => p.pattern === pattern.trim() && p.type === type);
      if (exists) {
        return { success: false, error: t("patternExists") };
      }

      onPatternsChange([...patterns, { pattern: pattern.trim(), type }]);
      return { success: true };
    },
    [patterns, onPatternsChange, t]
  );

  const resetToDefault = useCallback(() => {
    onPatternsChange(createDefaultPatterns());
  }, [onPatternsChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">{t("excludePatterns")}</h3>
        <button
          onClick={resetToDefault}
          className="text-xs text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          {t("resetToDefault")}
        </button>
      </div>

      {/* パターン一覧（階層表示） */}
      <div className="space-y-3">
        <PatternTree
          title={t("glob")}
          nodes={globNodes}
          expanded={expandedGlob}
          onExpand={setExpandedGlob}
          icons={treeIcons}
        />
        <PatternTree
          title={t("regex")}
          nodes={regexNodes}
          expanded={expandedRegex}
          onExpand={setExpandedRegex}
          icons={treeIcons}
        />
      </div>

      {/* 新規パターン追加 */}
      <PatternInputForm onAddPattern={handleAddPattern} />
    </div>
  );
}

// 後方互換性のため型とユーティリティをre-export
export {
  type ExcludePattern,
  type PatternType,
  DEFAULT_EXCLUDE_PATTERNS,
  validatePattern,
  patternToRegex,
  matchesPattern,
} from "@/lib/excludePatterns";
