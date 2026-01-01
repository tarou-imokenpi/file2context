import { encode } from "gpt-tokenizer";

/**
 * 正確なトークンカウント（gpt-tokenizer使用）
 * エンコード失敗時は軽量推定にフォールバック
 */
export function calculateTokenCount(content: string): number {
  try {
    return encode(content).length;
  } catch {
    return estimateTokenCount(content);
  }
}

/**
 * トークンカウントを推定（encode()を使わない軽量版）
 * 注意: これは概算です。正確なカウントはcalculateTokenCountを使用
 */
export function estimateTokenCount(content: string): number {
  const length = content.length;
  if (length === 0) return 0;

  // 日本語文字をカウント
  const japaneseChars = (content.match(/[\u3000-\u9fff]/g) || []).length;
  const japaneseRatio = japaneseChars / length;

  // 記号・句読点をカウント（コードやJSONで多い）
  const punctuation = (
    content.match(/[{}\[\](),:;"'`<>=/\\|@#$%^&*+\-_.!?]/g) || []
  ).length;
  const punctuationRatio = punctuation / length;

  // ベースの文字/トークン比率
  // 英語テキスト: 約4.5文字/token, 日本語: 約1.5文字/token
  let charsPerToken = 4.5 - japaneseRatio * 3.0;

  // 記号が多い（コード/JSON）場合は調整
  // 記号は個別にトークン化されやすいので比率を下げる
  if (punctuationRatio > 0.05) {
    charsPerToken = charsPerToken * (1 - punctuationRatio * 0.5);
  }

  return Math.round(length / Math.max(charsPerToken, 1.2));
}
