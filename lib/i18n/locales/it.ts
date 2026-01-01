import type { Translations } from "../types";

export const it: Translations = {
  // Header
  appTitle: "File to Context",
  appDescription:
    "Converti il contenuto dei file in contesto testuale e copiali",

  // DropZone
  dropzoneText: "Trascina e rilascia file o cartelle",
  selectButton: "Seleziona file / cartelle",
  selectFilesButton: "Seleziona file",
  selectFolderButton: "Seleziona cartella",
  processing: "Elaborazione file...",

  // FileList
  loadedFiles: "File caricati",
  selectedFiles: "File selezionati",
  textFiles: "file di testo",
  totalTokens: "Token totali",
  clear: "Cancella",
  clearAll: "Cancella tutto",
  files: "file",
  filesCount: "file",
  preview: "Anteprima",
  root: "(Root)",

  // ContextOutput
  generatedContext: "Contesto generato",
  contextTokens: "Token del contesto",
  estimatedCost: "Costo stimato",
  copyToClipboard: "Copia negli appunti",
  copied: "Copiato!",

  // ExcludePatternSettings
  excludePatterns: "Pattern di esclusione",
  resetToDefault: "Ripristina predefiniti",
  glob: "Glob",
  regex: "Regex",
  add: "Aggiungi",
  patternPlaceholderGlob: "*.log, temp*",
  patternPlaceholderRegex: "^test.*\\.js$",
  globHelp: "Glob: * corrisponde a qualsiasi stringa, ? a qualsiasi carattere",
  regexHelp: "Regex: Usa la sintassi delle espressioni regolari JavaScript",
  patternRequired: "Inserisci un pattern",
  invalidRegex: "Espressione regolare non valida",
  regexTooComplex: "Regex troppo complessa (protezione ReDoS)",
  patternExists: "Questo pattern esiste già",

  // Empty state
  emptyStateTitle:
    "Rilascia o seleziona file/cartelle per generare contesto testuale.",
  emptyStateFormats:
    "Formati supportati: .txt, .md, .json, .js, .ts, .tsx, .py, .html, .css, .pdf, ecc.",
  emptyStateNote: "※ Personalizza i pattern di esclusione nella barra laterale",

  // Privacy
  privacyMessage:
    "I dati non vengono caricati esternamente e vengono elaborati solo nel browser",

  // Paste text area
  pasteTextTitle: "Incolla testo per aggiungere",
  pasteTextDescription:
    "Il contenuto incollato può essere incluso nel contesto come i file.",
  pasteTextPlaceholderName: "Nome contesto (opzionale) es: Messaggio di errore",
  pasteTextPlaceholder: "Incolla il testo qui...",
  pasteTextShortcut: "Scorciatoia: Ctrl/⌘+Enter",
  pasteTextAdd: "Aggiungi",

  // Footer
  footerText:
    "I file vengono elaborati solo nel browser e non vengono caricati su alcun server.",
};
