import type { Translations } from "../types";

export const es: Translations = {
  // Header
  appTitle: "File to Context",
  appDescription:
    "Convierte el contenido de archivos a contexto de texto y cópialos",

  // DropZone
  dropzoneText: "Arrastra y suelta archivos o carpetas",
  selectButton: "Seleccionar archivos / carpetas",
  selectFilesButton: "Seleccionar archivos",
  selectFolderButton: "Seleccionar carpeta",
  processing: "Procesando archivos...",

  // FileList
  loadedFiles: "Archivos cargados",
  selectedFiles: "Archivos seleccionados",
  textFiles: "archivos de texto",
  totalTokens: "Total de tokens",
  clear: "Limpiar",
  clearAll: "Limpiar todo",
  files: "archivos",
  filesCount: "archivos",
  preview: "Vista previa",
  root: "(Raíz)",

  // ContextOutput
  generatedContext: "Contexto generado",
  contextTokens: "Tokens del contexto",
  estimatedCost: "Costo estimado",
  copyToClipboard: "Copiar al portapapeles",
  copied: "¡Copiado!",

  // ExcludePatternSettings
  excludePatterns: "Patrones de exclusión",
  resetToDefault: "Restablecer valores",
  glob: "Glob",
  regex: "Regex",
  add: "Añadir",
  patternPlaceholderGlob: "*.log, temp*",
  patternPlaceholderRegex: "^test.*\\.js$",
  globHelp:
    "Glob: * coincide con cualquier cadena, ? coincide con cualquier carácter",
  regexHelp: "Regex: Usa la sintaxis de expresiones regulares de JavaScript",
  patternRequired: "Por favor ingresa un patrón",
  invalidRegex: "Expresión regular inválida",
  regexTooComplex: "Regex demasiado compleja (protección ReDoS)",
  patternExists: "Este patrón ya existe",

  // Empty state
  emptyStateTitle:
    "Suelta o selecciona archivos/carpetas para generar contexto de texto.",
  emptyStateFormats:
    "Formatos compatibles: .txt, .md, .json, .js, .ts, .tsx, .py, .html, .css, .pdf, etc.",
  emptyStateNote: "※ Personaliza los patrones de exclusión en la barra lateral",

  // Privacy
  privacyMessage:
    "Los datos no se suben externamente y se procesan solo en el navegador",

  // Paste text area
  pasteTextTitle: "Pegar texto para añadir",
  pasteTextDescription:
    "El contenido pegado también se puede incluir en el contexto como los archivos.",
  pasteTextPlaceholderName: "Nombre del contexto (opcional) ej: Mensaje de error",
  pasteTextPlaceholder: "Pegar texto aquí...",
  pasteTextShortcut: "Atajo: Ctrl/⌘+Enter",
  pasteTextAdd: "Añadir",

  // Footer
  footerText:
    "Los archivos se procesan solo en el navegador y no se suben a ningún servidor.",
};
