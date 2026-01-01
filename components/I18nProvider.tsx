"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useSyncExternalStore,
} from "react";
import { Locale, translations, detectLocale, TranslationKey } from "@/lib/i18n/index";

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

function subscribeToLocaleChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handler = () => onStoreChange();
  window.addEventListener("languagechange", handler);
  return () => window.removeEventListener("languagechange", handler);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const detectedLocale = useSyncExternalStore<Locale>(
    subscribeToLocaleChanges,
    detectLocale,
    () => "en" as Locale
  );

  const [overrideLocale, setOverrideLocale] = useState<Locale | null>(null);
  const locale = overrideLocale ?? detectedLocale;
  const setLocale = useCallback((nextLocale: Locale) => {
    setOverrideLocale(nextLocale);
  }, []);

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

// 言語選択コンポーネント
export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "ja", label: "日本語", flag: "🇯🇵" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "ko", label: "한국어", flag: "🇰🇷" },
  ];

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="px-2 py-1 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.label}
        </option>
      ))}
    </select>
  );
}
