export async function sendTelegramNotification(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn('[telegram] credentials not set, skipping');
    return;
  }
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  });
  if (!res.ok) console.error('[telegram] send failed:', await res.text());
}

export function buildRequestMessage(data: {
  type: string;
  name?: string;
  email?: string;
  phone?: string;
  itemTitle?: string;
  itemUrl?: string;
  searchQuery?: string;
  comment?: string;
}): string {
  return [
    `🛍 <b>Ghost Buyer — новая заявка</b>`,
    `Тип: <code>${data.type}</code>`,
    data.name   && `Имя: ${data.name}`,
    data.email  && `Email: ${data.email}`,
    data.phone  && `Тел: ${data.phone}`,
    data.itemTitle  && `Товар: ${data.itemTitle}`,
    data.itemUrl    && `Ссылка: ${data.itemUrl}`,
    data.searchQuery && `Запрос: ${data.searchQuery}`,
    data.comment    && `Комментарий: ${data.comment}`,
  ].filter(Boolean).join('\n');
}
