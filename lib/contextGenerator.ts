import type { ProcessedFile } from "@/components/FileList";

/**
 * XMLの特殊文字をエスケープ
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * 処理済みファイルからXMLコンテキストを生成
 */
export function generateContext(processedFiles: ProcessedFile[]): string {
  if (processedFiles.length === 0) return "";

  const textFiles = processedFiles.filter((file) => file.isText);
  if (textFiles.length === 0) return "";

  const contextParts = textFiles.map((file) => {
    const path = escapeXml(file.path);
    const content = escapeXml(file.content);

    // 貼り付けテキスト由来の場合は source 属性を付与
    const sourceAttr = file.path.startsWith("pasted/") ? ' source="paste"' : "";
    return `  <context filePath="${path}"${sourceAttr}>\n${content}\n  </context>`;
  });

  return `<contexts>\n${contextParts.join("\n")}\n</contexts>`;
}
