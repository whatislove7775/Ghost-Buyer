'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const l = t.landing;

  return (
    <main className="min-h-screen bg-ghost-bg">
      <Header />

      {/* Hero */}
      <section className="px-6 pt-36 pb-28 max-w-5xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-ghost-dim block mb-6">{l.badge}</span>
        <h1 className="text-7xl md:text-9xl font-bold tracking-tight leading-none whitespace-pre-line mb-8">
          {l.hero}
        </h1>
        <p className="text-lg text-ghost-dim max-w-md mb-12">{l.heroSub}</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/search" className="px-8 py-4 bg-ghost-accent text-ghost-bg font-semibold text-sm uppercase tracking-wider hover:bg-ghost-accent-dim transition-colors">
            {l.cta}
          </Link>
          <Link href="/request" className="px-8 py-4 border border-ghost-border text-ghost-text text-sm uppercase tracking-wider hover:border-ghost-muted transition-colors">
            {l.ctaRequest}
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-ghost-border px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-ghost-dim mb-16">{l.howTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {([
              [l.step1Title, l.step1],
              [l.step2Title, l.step2],
              [l.step3Title, l.step3],
            ] as [string, string][]).map(([title, text], i) => (
              <div key={i}>
                <div className="text-5xl font-bold text-ghost-accent mb-4">0{i + 1}</div>
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-ghost-dim text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="border-t border-ghost-border px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-ghost-dim mb-16">{l.scenariosTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              [l.s1Title, l.s1],
              [l.s2Title, l.s2],
              [l.s3Title, l.s3],
            ] as [string, string][]).map(([title, text], i) => (
              <div key={i} className="ghost-card p-8">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <p className="text-ghost-dim text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-ghost-border px-6 py-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="text-ghost-dim text-sm">© 2024 Ghost Buyer</span>
          <span className="text-ghost-dim text-xs">{l.footerTag}</span>
        </div>
      </footer>
    </main>
  );
}
