'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Item } from '@/types';

export default function ItemPage() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [wanted, setWanted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then(r => r.json())
      .then(d => setItem(d.item ?? null))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleWant() {
    if (!item) return;
    setSubmitting(true);
    try {
      await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'item', itemId: item.id, itemTitle: item.title, itemUrl: item.marketplaceUrl }),
      });
      setWanted(true);
    } catch (e) { console.error(e); }
    finally { setSubmitting(false); }
  }

  if (loading) return (
    <main className="min-h-screen bg-ghost-bg"><Header />
      <div className="max-w-5xl mx-auto px-6 pt-32 grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
        <div className="aspect-[3/4] bg-ghost-surface" />
        <div className="space-y-4"><div className="h-8 bg-ghost-surface w-3/4" /><div className="h-6 bg-ghost-surface w-1/3" /></div>
      </div>
    </main>
  );

  if (!item) return (
    <main className="min-h-screen bg-ghost-bg"><Header />
      <div className="max-w-5xl mx-auto px-6 pt-32">
        <p className="text-ghost-dim">Item not found</p>
        <Link href="/results" className="text-ghost-accent mt-4 inline-block">← Back</Link>
      </div>
    </main>
  );

  const row = (label: string, value: string | undefined) => value ? (
    <div className="flex justify-between text-sm border-b border-ghost-border pb-4">
      <span className="text-ghost-dim text-xs uppercase tracking-wider">{label}</span>
      <span>{value}</span>
    </div>
  ) : null;

  return (
    <main className="min-h-screen bg-ghost-bg">
      <Header />
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <Link href="/results" className="text-xs uppercase tracking-wider text-ghost-dim hover:text-ghost-text transition-colors block mb-12">
          {t.item.back}
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-[3/4] bg-ghost-surface">
            <Image src={item.images[0]} alt={item.title} fill className="object-cover" unoptimized />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-ghost-dim block mb-2">{item.marketplace}</span>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{item.title}</h1>
            <div className="text-3xl font-bold text-ghost-accent mb-8">${item.price.toLocaleString()}</div>

            <div className="space-y-4 mb-8">
              {row(t.item.sku, item.sku)}
              {row(t.item.size, item.size)}
              {row(t.item.condition, item.condition)}
              {row(t.item.era, item.era)}
              {row(t.item.seller, item.sellerCountry)}
            </div>

            {item.tags.length > 0 && (
              <div className="mb-8">
                <p className="text-xs uppercase tracking-wider text-ghost-dim mb-3">{t.item.tags}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs border border-ghost-border text-ghost-dim">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {item.description && <p className="text-ghost-dim text-sm leading-relaxed mb-8">{item.description}</p>}

            <button
              onClick={handleWant}
              disabled={submitting || wanted}
              className={`w-full py-4 font-semibold text-sm uppercase tracking-wider transition-colors ${
                wanted ? 'bg-ghost-muted text-ghost-dim cursor-default' : 'bg-ghost-accent text-ghost-bg hover:bg-ghost-accent-dim'
              }`}
            >
              {wanted ? t.results.wanted : submitting ? '...' : t.item.want}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
