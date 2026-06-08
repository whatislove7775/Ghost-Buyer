'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RequestPage() {
  const { t } = useLanguage();
  const r = t.request;
  const [mode, setMode] = useState<'link' | 'name'>('link');
  const [form, setForm] = useState({ link: '', nameQuery: '', name: '', email: '', phone: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function update(key: keyof typeof form, val: string) {
    setForm(f => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: mode === 'link' ? 'link' : 'search',
          itemUrl: mode === 'link' ? form.link : undefined,
          searchQuery: mode === 'name' ? { description: form.nameQuery } : undefined,
          name: form.name, email: form.email, phone: form.phone, comment: form.comment,
        }),
      });
      if (!res.ok) throw new Error('failed');
      setSuccess(true);
    } catch {
      setError(r.error);
    } finally {
      setLoading(false);
    }
  }

  const inputCls = 'w-full bg-ghost-surface border border-ghost-border text-ghost-text px-4 py-3 text-sm focus:outline-none focus:border-ghost-muted placeholder:text-ghost-muted';

  if (success) return (
    <main className="min-h-screen bg-ghost-bg"><Header />
      <div className="max-w-xl mx-auto px-6 pt-40 text-center">
        <div className="text-6xl font-bold text-ghost-accent mb-6">✓</div>
        <p className="text-xl">{r.success}</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-ghost-bg">
      <Header />
      <div className="max-w-xl mx-auto px-6 pt-32 pb-24">
        <span className="text-xs uppercase tracking-widest text-ghost-dim block mb-4">request</span>
        <h1 className="text-4xl font-bold tracking-tight mb-3">{r.title}</h1>
        <p className="text-ghost-dim mb-10">{r.subtitle}</p>

        <div className="flex border border-ghost-border mb-8">
          {(['link', 'name'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-3 text-xs uppercase tracking-wider transition-colors ${
                mode === m ? 'bg-ghost-accent text-ghost-bg' : 'text-ghost-dim hover:text-ghost-text'
              }`}>
              {m === 'link' ? r.tabLink : r.tabName}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'link' ? (
            <div>
              <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{r.linkLabel}</label>
              <input type="url" value={form.link} onChange={e => update('link', e.target.value)}
                placeholder={r.linkPlaceholder} required className={inputCls} />
            </div>
          ) : (
            <div>
              <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{r.nameQueryLabel}</label>
              <textarea value={form.nameQuery} onChange={e => update('nameQuery', e.target.value)}
                placeholder={r.nameQueryPlaceholder} rows={3} required className={`${inputCls} resize-none`} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{r.nameLabel}</label>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{r.emailLabel}</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{r.phoneLabel}</label>
            <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ghost-dim mb-3">{r.commentLabel}</label>
            <textarea value={form.comment} onChange={e => update('comment', e.target.value)}
              placeholder={r.commentPlaceholder} rows={3} className={`${inputCls} resize-none`} />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-ghost-accent text-ghost-bg font-semibold text-sm uppercase tracking-wider hover:bg-ghost-accent-dim transition-colors disabled:opacity-50">
            {loading ? t.common.loading : r.submit}
          </button>
        </form>
      </div>
    </main>
  );
}
