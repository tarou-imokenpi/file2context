import type {
  TextItem,
  TextMarkedContent,
} from "pdfjs-dist/types/src/display/api";

// PDFライブラリのキャッシュ（モジュールレベルでシングルトン）
let pdfjsModule: typeof import("pdfjs-dist") | null = null;

/**
 * テキストファイルの内容を読み込む
 */
export function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      resolve(content);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/**
 * PDFファイルの内容をテキストとして読み込む
 */
export async function readPdfContent(file: File): Promise<string> {
  const data = await file.arrayBuffer();

  // PDFライブラリを遅延ロード＆キャッシュ
  if (!pdfjsModule) {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    pdfjsModule = pdfjs;
  }

  const loadingTask = pdfjsModule.getDocument({ data });
  const pdf = await loadingTask.promise;

  let out = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    const items = (textContent.items ?? []) as Array<
      TextItem | TextMarkedContent
    >;
    const strings = items
      .map((it) => ("str" in it ? it.str : ""))
      .filter(Boolean);

    out += strings.join(" ") + "\n\n";

    // ページ処理を解放
    page.cleanup();
  }

  // PDFリソースを解放
  pdf.destroy();

  return out.trim();
}

/**
 * UIスレッドに制御を戻すためのユーティリティ
 */
export function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 10);
  });
}
