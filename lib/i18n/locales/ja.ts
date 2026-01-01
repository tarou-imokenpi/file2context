import type { Translations } from "../types";

export const ja: Translations = {
  // Header
  appTitle: "File to Context",
  appDescription: "ファイルの内容をテキストコンテキストに変換してコピーできます",

  // DropZone
  dropzoneText: "ファイルやフォルダをドラッグ＆ドロップ",
  selectButton: "ファイル / フォルダを選択",
  selectFilesButton: "ファイルを選択",
  selectFolderButton: "フォルダを選択",
  processing: "ファイルを処理中...",

  // FileList
  loadedFiles: "読み込まれたファイル",
  selectedFiles: "選択されたファイル",
  textFiles: "テキストファイル",
  totalTokens: "合計トークン数",
  clear: "クリア",
  clearAll: "すべてクリア",
  files: "ファイル",
  filesCount: "件",
  preview: "プレビュー",
  root: "(ルート)",

  // ContextOutput
  generatedContext: "生成されたコンテキスト",
  contextTokens: "コンテキストトークン数",
  estimatedCost: "推定コスト",
  copyToClipboard: "クリップボードにコピー",
  copied: "コピーしました！",

  // ExcludePatternSettings
  excludePatterns: "除外パターン",
  resetToDefault: "デフォルトに戻す",
  glob: "Glob",
  regex: "正規表現",
  add: "追加",
  patternPlaceholderGlob: "*.log, temp*",
  patternPlaceholderRegex: "^test.*\\.js$",
  globHelp: "Glob: * は任意の文字列、? は任意の1文字にマッチ",
  regexHelp: "正規表現: JavaScript の正規表現構文を使用",
  patternRequired: "パターンを入力してください",
  invalidRegex: "無効な正規表現です",
  regexTooComplex: "正規表現が複雑すぎます（ReDoS対策）",
  patternExists: "このパターンは既に登録されています",

  // Empty state
  emptyStateTitle:
    "ファイルやフォルダをドロップまたは選択すると、テキストコンテキストとして出力されます。",
  emptyStateFormats:
    "対応形式: .txt, .md, .json, .js, .ts, .tsx, .py, .html, .css, .pdf など",
  emptyStateNote: "※ サイドバーで除外パターンをカスタマイズできます",

  // Privacy
  privacyMessage:
    "データは外部にアップロードされず、ブラウザ内でのみ処理されます",

  // Paste text area
  pasteTextTitle: "テキストを貼り付けて追加",
  pasteTextDescription:
    "ここに貼り付けた内容も、ファイルと同様にコンテキストへ取り込めます。",
  pasteTextPlaceholderName: "コンテキスト名（任意）例: エラーメッセージ",
  pasteTextPlaceholder: "ここにテキストを貼り付け…",
  pasteTextShortcut: "ショートカット: Ctrl/⌘+Enter",
  pasteTextAdd: "追加",

  // Footer
  footerText:
    "ファイルはブラウザ内でのみ処理され、サーバーにはアップロードされません。",
};
