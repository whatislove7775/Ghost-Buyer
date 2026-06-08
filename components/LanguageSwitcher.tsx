'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return (
    <button
      onClick={() => setLocale(locale === 'ru' ? 'en' : 'ru')}
      className="text-xs uppercase tracking-wider text-ghost-dim hover:text-ghost-accent border border-ghost-border px-2 py-1 transition-colors"
    >
      {locale === 'ru' ? 'EN' : 'RU'}
    </button>
  );
}
