import type { Translations } from "../types";

export const fr: Translations = {
  // Header
  appTitle: "File to Context",
  appDescription:
    "Convertissez le contenu des fichiers en contexte texte et copiez-les",

  // DropZone
  dropzoneText: "Glissez-déposez des fichiers ou dossiers",
  selectButton: "Sélectionner fichiers / dossiers",
  selectFilesButton: "Sélectionner des fichiers",
  selectFolderButton: "Sélectionner un dossier",
  processing: "Traitement des fichiers...",

  // FileList
  loadedFiles: "Fichiers chargés",
  selectedFiles: "Fichiers sélectionnés",
  textFiles: "fichiers texte",
  totalTokens: "Total des tokens",
  clear: "Effacer",
  clearAll: "Tout effacer",
  files: "fichiers",
  filesCount: "fichiers",
  preview: "Aperçu",
  root: "(Racine)",

  // ContextOutput
  generatedContext: "Contexte généré",
  contextTokens: "Tokens du contexte",
  estimatedCost: "Coût estimé",
  copyToClipboard: "Copier dans le presse-papiers",
  copied: "Copié !",

  // ExcludePatternSettings
  excludePatterns: "Motifs d'exclusion",
  resetToDefault: "Réinitialiser",
  glob: "Glob",
  regex: "Regex",
  add: "Ajouter",
  patternPlaceholderGlob: "*.log, temp*",
  patternPlaceholderRegex: "^test.*\\.js$",
  globHelp: "Glob : * correspond à toute chaîne, ? à tout caractère",
  regexHelp: "Regex : Utilise la syntaxe des expressions régulières JavaScript",
  patternRequired: "Veuillez entrer un motif",
  invalidRegex: "Expression régulière invalide",
  regexTooComplex: "Regex trop complexe (protection ReDoS)",
  patternExists: "Ce motif existe déjà",

  // Empty state
  emptyStateTitle:
    "Déposez ou sélectionnez des fichiers/dossiers pour générer du contexte texte.",
  emptyStateFormats:
    "Formats pris en charge : .txt, .md, .json, .js, .ts, .tsx, .py, .html, .css, .pdf, etc.",
  emptyStateNote: "※ Personnalisez les motifs d'exclusion dans la barre latérale",

  // Privacy
  privacyMessage:
    "Les données ne sont pas téléchargées et sont traitées uniquement dans le navigateur",

  // Paste text area
  pasteTextTitle: "Coller du texte pour ajouter",
  pasteTextDescription:
    "Le contenu collé peut être inclus dans le contexte comme les fichiers.",
  pasteTextPlaceholderName: "Nom du contexte (optionnel) ex: Message d'erreur",
  pasteTextPlaceholder: "Collez le texte ici...",
  pasteTextShortcut: "Raccourci : Ctrl/⌘+Entrée",
  pasteTextAdd: "Ajouter",

  // Footer
  footerText:
    "Les fichiers sont traités uniquement dans le navigateur et ne sont pas téléchargés sur un serveur.",
};
