"use client";

import { Shield } from "lucide-react";
import { LanguageSelector, useI18n } from "./I18nProvider";

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-lg shadow-sm" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            File to Context
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
            <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span>{t("privacyMessage")}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
