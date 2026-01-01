import type { Translations } from "../types";

export const en: Translations = {
  // Header
  appTitle: "File to Context",
  appDescription: "Convert file contents to text context and copy them",

  // DropZone
  dropzoneText: "Drag & drop files or folders",
  selectButton: "Select Files / Folders",
  selectFilesButton: "Select Files",
  selectFolderButton: "Select Folder",
  processing: "Processing files...",

  // FileList
  loadedFiles: "Loaded Files",
  selectedFiles: "Selected Files",
  textFiles: "text files",
  totalTokens: "Total tokens",
  clear: "Clear",
  clearAll: "Clear All",
  files: "files",
  filesCount: "files",
  preview: "Preview",
  root: "(Root)",

  // ContextOutput
  generatedContext: "Generated Context",
  contextTokens: "Context tokens",
  estimatedCost: "Estimated cost",
  copyToClipboard: "Copy to Clipboard",
  copied: "Copied!",

  // ExcludePatternSettings
  excludePatterns: "Exclude Patterns",
  resetToDefault: "Reset to default",
  glob: "Glob",
  regex: "Regex",
  add: "Add",
  patternPlaceholderGlob: "*.log, temp*",
  patternPlaceholderRegex: "^test.*\\.js$",
  globHelp: "Glob: * matches any string, ? matches any single character",
  regexHelp: "Regex: Uses JavaScript regular expression syntax",
  patternRequired: "Please enter a pattern",
  invalidRegex: "Invalid regular expression",
  regexTooComplex: "Regex is too complex (ReDoS protection)",
  patternExists: "This pattern already exists",

  // Empty state
  emptyStateTitle: "Drop or select files/folders to output as text context.",
  emptyStateFormats:
    "Supported formats: .txt, .md, .json, .js, .ts, .tsx, .py, .html, .css, .pdf, etc.",
  emptyStateNote: "※ Customize exclude patterns in the sidebar",

  // Privacy
  privacyMessage:
    "Data is not uploaded externally and is processed only in the browser",

  // Paste text area
  pasteTextTitle: "Paste text to add",
  pasteTextDescription:
    "Pasted content can be included in the context just like files.",
  pasteTextPlaceholderName: "Context name (optional) e.g.: Error message",
  pasteTextPlaceholder: "Paste text here...",
  pasteTextShortcut: "Shortcut: Ctrl/⌘+Enter",
  pasteTextAdd: "Add",

  // Footer
  footerText:
    "Files are processed only in the browser and are not uploaded to any server.",
};
