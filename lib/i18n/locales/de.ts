import type { Translations } from "../types";

export const de: Translations = {
  // Header
  appTitle: "File to Context",
  appDescription:
    "Konvertieren Sie Dateiinhalte in Textkontext und kopieren Sie diese",

  // DropZone
  dropzoneText: "Dateien oder Ordner hierher ziehen",
  selectButton: "Dateien / Ordner auswählen",
  selectFilesButton: "Dateien auswählen",
  selectFolderButton: "Ordner auswählen",
  processing: "Dateien werden verarbeitet...",

  // FileList
  loadedFiles: "Geladene Dateien",
  selectedFiles: "Ausgewählte Dateien",
  textFiles: "Textdateien",
  totalTokens: "Tokens gesamt",
  clear: "Löschen",
  clearAll: "Alles löschen",
  files: "Dateien",
  filesCount: "Dateien",
  preview: "Vorschau",
  root: "(Stammverzeichnis)",

  // ContextOutput
  generatedContext: "Generierter Kontext",
  contextTokens: "Kontext-Tokens",
  estimatedCost: "Geschätzte Kosten",
  copyToClipboard: "In Zwischenablage kopieren",
  copied: "Kopiert!",

  // ExcludePatternSettings
  excludePatterns: "Ausschlussmuster",
  resetToDefault: "Zurücksetzen",
  glob: "Glob",
  regex: "Regex",
  add: "Hinzufügen",
  patternPlaceholderGlob: "*.log, temp*",
  patternPlaceholderRegex: "^test.*\\.js$",
  globHelp:
    "Glob: * entspricht jeder Zeichenkette, ? jedem einzelnen Zeichen",
  regexHelp: "Regex: Verwendet JavaScript-Regex-Syntax",
  patternRequired: "Bitte geben Sie ein Muster ein",
  invalidRegex: "Ungültiger regulärer Ausdruck",
  regexTooComplex: "Regex ist zu komplex (ReDoS-Schutz)",
  patternExists: "Dieses Muster existiert bereits",

  // Empty state
  emptyStateTitle:
    "Dateien/Ordner ablegen oder auswählen, um Textkontext zu generieren.",
  emptyStateFormats:
    "Unterstützte Formate: .txt, .md, .json, .js, .ts, .tsx, .py, .html, .css, .pdf usw.",
  emptyStateNote: "※ Ausschlussmuster in der Seitenleiste anpassen",

  // Privacy
  privacyMessage:
    "Daten werden nicht extern hochgeladen und nur im Browser verarbeitet",

  // Paste text area
  pasteTextTitle: "Text zum Hinzufügen einfügen",
  pasteTextDescription:
    "Eingefügter Inhalt kann wie Dateien in den Kontext aufgenommen werden.",
  pasteTextPlaceholderName: "Kontextname (optional) z.B.: Fehlermeldung",
  pasteTextPlaceholder: "Text hier einfügen...",
  pasteTextShortcut: "Kurzbefehl: Strg/⌘+Enter",
  pasteTextAdd: "Hinzufügen",

  // Footer
  footerText:
    "Dateien werden nur im Browser verarbeitet und nicht auf einen Server hochgeladen.",
};
