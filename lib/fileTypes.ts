// テキストファイル判定用の拡張子
export const TEXT_EXTENSIONS = [
  ".txt",
  ".md",
  ".json",
  ".js",
  ".ts",
  ".tsx",
  ".jsx",
  ".html",
  ".css",
  ".scss",
  ".less",
  ".xml",
  ".yaml",
  ".yml",
  ".py",
  ".rb",
  ".java",
  ".c",
  ".cpp",
  ".h",
  ".hpp",
  ".cs",
  ".go",
  ".rs",
  ".php",
  ".swift",
  ".kt",
  ".scala",
  ".sh",
  ".bash",
  ".zsh",
  ".fish",
  ".ps1",
  ".bat",
  ".cmd",
  ".sql",
  ".graphql",
  ".prisma",
  ".env",
  ".gitignore",
  ".dockerfile",
  ".toml",
  ".ini",
  ".cfg",
  ".conf",
  ".vue",
  ".svelte",
  ".astro",
  ".mdx",
  ".rst",
  ".tex",
  ".lock",
  ".mjs",
  ".cjs",
  ".mts",
  ".cts",
] as const;

// テキストファイル判定用のMIMEタイプ
export const TEXT_MIME_TYPES = [
  "text/",
  "application/json",
  "application/javascript",
  "application/typescript",
  "application/xml",
] as const;

// PDF判定用
export const PDF_EXTENSIONS = [".pdf"] as const;
export const PDF_MIME_TYPES = ["application/pdf"] as const;

/**
 * ファイルがテキストベースかどうかを判定
 */
export function isTextFile(fileName: string, mimeType: string): boolean {
  const ext = "." + fileName.split(".").pop()?.toLowerCase();
  if ((TEXT_EXTENSIONS as readonly string[]).includes(ext)) return true;
  return TEXT_MIME_TYPES.some((mime) => mimeType.startsWith(mime));
}

/**
 * ファイルがPDFかどうかを判定
 */
export function isPdfFile(fileName: string, mimeType: string): boolean {
  const ext = "." + fileName.split(".").pop()?.toLowerCase();
  if ((PDF_EXTENSIONS as readonly string[]).includes(ext)) return true;
  return (PDF_MIME_TYPES as readonly string[]).includes(mimeType);
}
