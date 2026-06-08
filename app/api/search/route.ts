import { NextRequest, NextResponse } from 'next/server';
import { searchItems } from '@/lib/marketplace';
import type { SearchQuery } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SearchQuery;
    const items = await searchItems(body);
    return NextResponse.json({ items });
  } catch (e) {
    console.error('[/api/search]', e);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
