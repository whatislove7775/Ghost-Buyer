'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Item } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

export function ItemCard({ item }: { item: Item }) {
  const { t } = useLanguage();
  const [wanted, setWanted] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleWant() {
    setPending(true);
    try {
      await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'item', itemId: item.id, itemTitle: item.title, itemUrl: item.marketplaceUrl }),
      });
      setWanted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="ghost-card flex flex-col group">
      <Link href={`/item/${item.id}`} className="relative block aspect-[3/4] overflow-hidden bg-ghost-surface flex-shrink-0">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <span className="absolute top-2 left-2 text-xs bg-ghost-bg/80 backdrop-blur-sm px-2 py-0.5 text-ghost-dim">
          {item.marketplace}
        </span>
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link href={`/item/${item.id}`}>
          <h3 className="text-sm font-medium leading-snug hover:text-ghost-accent transition-colors line-clamp-2">
            {item.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between text-sm mt-auto">
          <span className="font-bold text-ghost-accent">
            ${item.price.toLocaleString()}
          </span>
          <span className="text-xs text-ghost-dim">{item.sellerCountry}</span>
        </div>
        {item.size && <p className="text-xs text-ghost-dim">Size: {item.size}</p>}
        <button
          onClick={handleWant}
          disabled={pending || wanted}
          className={`mt-1 w-full py-2 text-xs uppercase tracking-wider transition-colors ${
            wanted
              ? 'bg-ghost-muted text-ghost-dim cursor-default'
              : 'bg-ghost-accent text-ghost-bg hover:bg-ghost-accent-dim'
          }`}
        >
          {wanted ? t.results.wanted : pending ? '...' : t.results.want}
        </button>
      </div>
    </div>
  );
}
