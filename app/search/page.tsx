'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Era } from '@/types';

const ERAS: Era[] = ['Any', '70s', '80s', '90s', 'Y2K', '2010s', 'Vintage'];

export default function SearchPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ description: '', budgetMin: '', budgetMax: '', era: 'Any' as Era, size: '', vibe: '' });

  function update<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const p = new URLSearchParams();
    if (form.description) p.set('q', form.description);
    if (form.budgetMin)   p.set('min', form.budgetMin);
    if (form.budgetMax)   p.set('max', form.budgetMax);
    if (form.era !== 'Any') p.set('era', form.era);
    if (form.size)  p.set('size', form.size);
    if (form.vibe)  p.set('vibe', form.vibe);
    router.push(`/results?${p.toString()}`);
  }

  const s = t.search;
  const inputCls = 'w-full bg-ghost-surface border border-ghost-border text-ghost-text px-4 py-3 text-sm focus:outline-none focus:border-ghost-muted placeholder:text-ghost-muted';

  return (
    <main className="min-h-screen bg-ghost-bg">
      <Header />
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <span className="text-xs uppercase tracking-widest text-ghost-dim block mb-4">search</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{s.title}</h1>
        <p className="text-ghost-dim mb-10">{s.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{s.descLabel}</label>
            <textarea
              value={form.description}
              onChange={e => update('description', e.target.value)}
              placeholder={s.descPlaceholder}
              rows={3}
              required
              className={`${inputCls} resize-none`}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{s.budgetLabel}</label>
            <div className="flex gap-4">
              <input type="number" value={form.budgetMin} onChange={e => update('budgetMin', e.target.value)} placeholder={s.budgetFrom} className={inputCls} />
              <input type="number" value={form.budgetMax} onChange={e => update('budgetMax', e.target.value)} placeholder={s.budgetTo}   className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{s.eraLabel}</label>
            <div className="flex flex-wrap gap-2">
              {ERAS.map(era => (
                <button
                  key={era}
                  type="button"
                  onClick={() => update('era', era)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                    form.era === era ? 'border-ghost-accent text-ghost-accent' : 'border-ghost-border text-ghost-dim hover:border-ghost-muted'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{s.sizeLabel}</label>
              <input type="text" value={form.size} onChange={e => update('size', e.target.value)} placeholder={s.sizePlaceholder} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{s.vibeLabel}</label>
              <input type="text" value={form.vibe} onChange={e => update('vibe', e.target.value)} placeholder={s.vibePlaceholder} className={inputCls} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !form.description}
            className="w-full py-4 bg-ghost-accent text-ghost-bg font-semibold text-sm uppercase tracking-wider hover:bg-ghost-accent-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? s.searching : s.submit}
          </button>
        </form>
      </div>
    </main>
  );
}
