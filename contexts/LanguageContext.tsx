'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Translation } from '@/lib/i18n';
import type { Locale } from '@/types';

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translation;
}

const LanguageContext = createContext<Ctx>({
  locale: 'ru',
  setLocale: () => {},
  t: translations.ru,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ru');
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
