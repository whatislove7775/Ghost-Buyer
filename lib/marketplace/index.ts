import type { Item, SearchQuery } from '@/types';
import { MOCK_ITEMS } from './mock';

export async function searchItems(query: SearchQuery): Promise<Item[]> {
  // Stub: replace with real Playwright scrapers behind this interface
  await new Promise(r => setTimeout(r, 600));

  const q = (query.description || '').toLowerCase();
  const filtered = MOCK_ITEMS.filter(item => {
    if (query.budgetMax && item.price > query.budgetMax) return false;
    if (query.budgetMin && item.price < query.budgetMin) return false;
    if (query.era && query.era !== 'Any' && item.era !== query.era) return false;
    if (query.size && item.size && !item.size.toLowerCase().includes(query.size.toLowerCase())) return false;
    return true;
  });

  // keyword match or return varied seed set
  const words = q.split(' ').filter(w => w.length > 2);
  const scored = filtered.map(item => ({
    item,
    score: words.filter(w => item.tags.some(t => t.includes(w)) || item.title.toLowerCase().includes(w)).length,
  }));
  scored.sort((a, b) => b.score - a.score);

  const results = scored.map(s => s.item);
  return results.length ? results : MOCK_ITEMS.slice(0, 8);
}

export function getItemById(id: string): Item | undefined {
  return MOCK_ITEMS.find(item => item.id === id);
}

export { MOCK_ITEMS };
