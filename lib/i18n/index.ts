import { de, en, es, fr, it, ja, ko } from "./locales";
import type { Locale, Translations, TranslationKey } from "./types";

// Re-export types
export type { Locale, Translations, TranslationKey };

// 全翻訳データ
export const translations: Record<Locale, Translations> = {
  de,
  en,
  es,
  fr,
  it,
  ja,
  ko,
};

// サポートされているロケール一覧
const SUPPORTED_LOCALES: Locale[] = ["ja", "es", "it", "fr", "de", "ko"];

/**
 * ブラウザの言語設定から最適なロケールを取得
 */
export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";

  const browserLang = navigator.language.toLowerCase();

  // サポートされているロケールをチェック
  const matched = SUPPORTED_LOCALES.find((locale) =>
    browserLang.startsWith(locale)
  );

  return matched ?? "en";
}

/**
 * 指定されたロケールの翻訳データを取得
 */
export function getTranslation(locale: Locale): Translations {
  return translations[locale];
}
