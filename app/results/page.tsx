'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Item } from '@/types';

function Skeleton() {
  return (
    <div className="ghost-card animate-pulse">
      <div className="aspect-[3/4] bg-ghost-surface" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-ghost-surface rounded w-3/4" />
        <div className="h-4 bg-ghost-surface rounded w-1/2" />
        <div className="h-8 bg-ghost-surface rounded mt-2" />
      </div>
    </div>
  );
}

function ResultsContent() {
  const { t } = useLanguage();
  const params = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: params.get('q') ?? '',
        budgetMin: params.get('min') ? Number(params.get('min')) : undefined,
        budgetMax: params.get('max') ? Number(params.get('max')) : undefined,
        era: params.get('era') ?? undefined,
        size: params.get('size') ?? undefined,
      }),
    })
      .then(r => r.json())
      .then(d => setItems(d.items ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <main className="min-h-screen bg-ghost-bg">
      <Header />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-ghost-dim block mb-3">results</span>
            <h1 className="text-4xl font-bold tracking-tight">{t.results.title}</h1>
            {params.get('q') && <p className="text-ghost-dim mt-1 text-sm">&ldquo;{params.get('q')}&rdquo;</p>}
          </div>
          <Link href="/search" className="text-xs uppercase tracking-wider text-ghost-dim hover:text-ghost-text transition-colors">
            {t.results.backToSearch}
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : items.length === 0 ? (
          <p className="text-ghost-dim">{t.results.noResults}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ghost-bg" />}>
      <ResultsContent />
    </Suspense>
  );
}
