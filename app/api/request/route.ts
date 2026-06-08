import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramNotification, buildRequestMessage } from '@/lib/telegram';
import { getAdminClient } from '@/lib/supabase';
import type { RequestPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestPayload;

    // Telegram (fire-and-forget)
    sendTelegramNotification(
      buildRequestMessage({
        type: body.type,
        name: body.name,
        email: body.email,
        phone: body.phone,
        itemTitle: body.itemTitle,
        itemUrl: body.itemUrl,
        searchQuery: body.searchQuery?.description,
        comment: body.comment,
      }),
    ).catch(e => console.error('[telegram]', e));

    // Supabase (best-effort)
    try {
      const admin = getAdminClient();
      if (admin) {
        await admin.from('requests').insert({
          type: body.type,
          item_id: body.itemId,
          item_title: body.itemTitle,
          item_url: body.itemUrl,
          search_query: body.searchQuery ?? null,
          name: body.name,
          email: body.email,
          phone: body.phone,
          comment: body.comment,
          status: 'new',
        });
      }
    } catch (dbErr) {
      console.error('[supabase]', dbErr);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/request]', e);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
