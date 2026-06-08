'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useLanguage();
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-ghost-bg/90 backdrop-blur-sm border-b border-ghost-border">
      <Link href="/" className="text-sm font-bold tracking-widest uppercase">
        Ghost Buyer
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/search" className="text-xs uppercase tracking-wider text-ghost-dim hover:text-ghost-text transition-colors hidden sm:block">
          {t.nav.search}
        </Link>
        <Link href="/request" className="text-xs uppercase tracking-wider text-ghost-dim hover:text-ghost-text transition-colors hidden sm:block">
          {t.nav.request}
        </Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
