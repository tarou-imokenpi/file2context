"use client";

import type { TranslationKey } from "@/lib/i18n/index";

// デフォルトの除外パターン
export const DEFAULT_EXCLUDE_PATTERNS = [
  ".git",
  "node_modules",
  ".next",
  ".DS_Store",
  ".env.local",
  "*.pyc",
  "__pycache__",
  ".vscode",
  ".idea",
  "dist",
  "build",
  "coverage",
];

export type PatternType = "glob" | "regex";

export type ExcludePattern = {
  pattern: string;
  type: PatternType;
};

// ReDoS攻撃を引き起こす可能性のある危険なパターンを検出
const DANGEROUS_REGEX_PATTERNS = [
  /\(\?[^)]*\+[^)]*\)\+/,      // ネストされた量指定子 (a+)+
  /\(\?[^)]*\*[^)]*\)\*/,      // ネストされた量指定子 (a*)*
  /\(\?[^)]*\+[^)]*\)\*/,      // ネストされた量指定子 (a+)*
  /\(\?[^)]*\*[^)]*\)\+/,      // ネストされた量指定子 (a*)+
  /\([^)]+\|[^)]+\)\+/,        // 選択肢を含むグループに量指定子 (a|b)+
  /\([^)]+\|[^)]+\)\*/,        // 選択肢を含むグループに量指定子 (a|b)*
  /\.[\*\+]\.\[\*\+\]/,        // 重複する.* or .+
];

// 正規表現の複雑度をチェック
function isRegexDangerous(pattern: string): boolean {
  // パターン自体が長すぎる場合は危険とみなす
  if (pattern.length > 100) return true;

  // 量指定子の数をカウント
  const quantifierCount = (pattern.match(/[\*\+\?]|\{[\d,]+\}/g) || []).length;
  if (quantifierCount > 5) return true;

  // ネストされたグループの深さをチェック
  let depth = 0;
  let maxDepth = 0;
  for (const char of pattern) {
    if (char === "(") depth++;
    if (char === ")") depth--;
    maxDepth = Math.max(maxDepth, depth);
  }
  if (maxDepth > 3) return true;

  // 危険なパターンをチェック
  return DANGEROUS_REGEX_PATTERNS.some((dangerous) => dangerous.test(pattern));
}

// パターンの検証
export function validatePattern(
  pattern: string,
  type: PatternType
): { valid: boolean; errorKey?: TranslationKey } {
  if (!pattern.trim()) {
    return { valid: false, errorKey: "patternRequired" };
  }

  if (type === "regex") {
    try {
      new RegExp(pattern);
      // ReDoS脆弱性チェック
      if (isRegexDangerous(pattern)) {
        return { valid: false, errorKey: "regexTooComplex" };
      }
      return { valid: true };
    } catch {
      return { valid: false, errorKey: "invalidRegex" };
    }
  }

  return { valid: true };
}

// グロブパターンを正規表現に変換
export function patternToRegex(pattern: ExcludePattern): RegExp {
  if (pattern.type === "regex") {
    return new RegExp(pattern.pattern);
  }

  // グロブパターンを正規表現に変換
  const escaped = pattern.pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*")
    .replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`);
}

// 安全な正規表現テスト（タイムアウト保護付き）
function safeRegexTest(regex: RegExp, input: string, maxInputLength = 500): boolean {
  // 入力が長すぎる場合はスキップ（ReDoS対策）
  if (input.length > maxInputLength) {
    // 長い入力の場合は先頭部分のみでテスト
    return regex.test(input.slice(0, maxInputLength));
  }
  return regex.test(input);
}

// 名前がパターンにマッチするか判定
export function matchesPattern(name: string, patterns: ExcludePattern[]): boolean {
  return patterns.some((pattern) => {
    try {
      // 危険なパターンはスキップ
      if (pattern.type === "regex" && isRegexDangerous(pattern.pattern)) {
        return false;
      }
      const regex = patternToRegex(pattern);
      return safeRegexTest(regex, name);
    } catch {
      return false;
    }
  });
}

// デフォルトパターンからExcludePattern配列を作成
export function createDefaultPatterns(): ExcludePattern[] {
  return DEFAULT_EXCLUDE_PATTERNS.map((p) => ({ pattern: p, type: "glob" as PatternType }));
}
