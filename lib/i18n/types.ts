export type Locale = "ja" | "en" | "es" | "it" | "fr" | "de" | "ko";

export interface Translations {
  // Header
  appTitle: string;
  appDescription: string;

  // DropZone
  dropzoneText: string;
  selectButton: string;
  selectFilesButton: string;
  selectFolderButton: string;
  processing: string;

  // FileList
  loadedFiles: string;
  selectedFiles: string;
  textFiles: string;
  totalTokens: string;
  clear: string;
  clearAll: string;
  files: string;
  filesCount: string;
  preview: string;
  root: string;

  // ContextOutput
  generatedContext: string;
  contextTokens: string;
  estimatedCost: string;
  copyToClipboard: string;
  copied: string;

  // ExcludePatternSettings
  excludePatterns: string;
  resetToDefault: string;
  glob: string;
  regex: string;
  add: string;
  patternPlaceholderGlob: string;
  patternPlaceholderRegex: string;
  globHelp: string;
  regexHelp: string;
  patternRequired: string;
  invalidRegex: string;
  regexTooComplex: string;
  patternExists: string;

  // Empty state
  emptyStateTitle: string;
  emptyStateFormats: string;
  emptyStateNote: string;

  // Privacy
  privacyMessage: string;

  // Paste text area
  pasteTextTitle: string;
  pasteTextDescription: string;
  pasteTextPlaceholderName: string;
  pasteTextPlaceholder: string;
  pasteTextShortcut: string;
  pasteTextAdd: string;

  // Footer
  footerText: string;
}

export type TranslationKey = keyof Translations;
