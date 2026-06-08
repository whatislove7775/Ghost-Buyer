import { NextRequest, NextResponse } from 'next/server';
import { getItemById } from '@/lib/marketplace';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const item = getItemById(params.id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ item });
}
