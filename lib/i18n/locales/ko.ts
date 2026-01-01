import type { Translations } from "../types";

export const ko: Translations = {
  // Header
  appTitle: "File to Context",
  appDescription: "파일 내용을 텍스트 컨텍스트로 변환하여 복사하세요",

  // DropZone
  dropzoneText: "파일이나 폴더를 드래그 앤 드롭",
  selectButton: "파일 / 폴더 선택",
  selectFilesButton: "파일 선택",
  selectFolderButton: "폴더 선택",
  processing: "파일 처리 중...",

  // FileList
  loadedFiles: "로드된 파일",
  selectedFiles: "선택된 파일",
  textFiles: "텍스트 파일",
  totalTokens: "총 토큰 수",
  clear: "지우기",
  clearAll: "모두 지우기",
  files: "개 파일",
  filesCount: "개",
  preview: "미리보기",
  root: "(루트)",

  // ContextOutput
  generatedContext: "생성된 컨텍스트",
  contextTokens: "컨텍스트 토큰 수",
  estimatedCost: "예상 비용",
  copyToClipboard: "클립보드에 복사",
  copied: "복사됨!",

  // ExcludePatternSettings
  excludePatterns: "제외 패턴",
  resetToDefault: "기본값으로 재설정",
  glob: "글로브",
  regex: "정규식",
  add: "추가",
  patternPlaceholderGlob: "*.log, temp*",
  patternPlaceholderRegex: "^test.*\\.js$",
  globHelp: "글로브: *는 모든 문자열, ?는 단일 문자와 일치",
  regexHelp: "정규식: JavaScript 정규식 구문 사용",
  patternRequired: "패턴을 입력하세요",
  invalidRegex: "유효하지 않은 정규식입니다",
  regexTooComplex: "정규식이 너무 복잡합니다 (ReDoS 보호)",
  patternExists: "이 패턴은 이미 존재합니다",

  // Empty state
  emptyStateTitle:
    "파일/폴더를 드롭하거나 선택하여 텍스트 컨텍스트를 생성하세요.",
  emptyStateFormats:
    "지원 형식: .txt, .md, .json, .js, .ts, .tsx, .py, .html, .css, .pdf 등",
  emptyStateNote: "※ 사이드바에서 제외 패턴을 사용자 지정할 수 있습니다",

  // Privacy
  privacyMessage:
    "데이터는 외부로 업로드되지 않으며 브라우저에서만 처리됩니다",

  // Paste text area
  pasteTextTitle: "텍스트를 붙여넣어 추가",
  pasteTextDescription:
    "붙여넣은 내용도 파일과 마찬가지로 컨텍스트에 포함할 수 있습니다.",
  pasteTextPlaceholderName: "컨텍스트 이름 (선택) 예: 오류 메시지",
  pasteTextPlaceholder: "여기에 텍스트를 붙여넣기...",
  pasteTextShortcut: "단축키: Ctrl/⌘+Enter",
  pasteTextAdd: "추가",

  // Footer
  footerText: "파일은 브라우저에서만 처리되며 서버에 업로드되지 않습니다.",
};
