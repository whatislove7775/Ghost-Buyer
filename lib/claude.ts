import Anthropic from '@anthropic-ai/sdk';

export interface SearchTags {
  keywords: string[];
  brands: string[];
  era: string;
  category: string;
  style: string[];
}

export async function interpretQuery(query: string): Promise<SearchTags> {
  if (!process.env.ANTHROPIC_API_KEY) return mockTags(query);
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 256,
      messages: [{
        role: 'user',
        content: `Fashion search expert. Extract JSON tags from query: "${query}"\n\nRespond ONLY with JSON: {"keywords":string[],"brands":string[],"era":string,"category":string,"style":string[]}`,
      }],
    });
    const text = msg.content[0].type === 'text' ? msg.content[0].text : '{}';
    return JSON.parse(text) as SearchTags;
  } catch (e) {
    console.error('[claude]', e);
    return mockTags(query);
  }
}

function mockTags(query: string): SearchTags {
  const q = query.toLowerCase();
  const brandList = ['nike','adidas','levis','comme des garcons','margiela','prada','stone island','cp company','raf simons','helmut lang'];
  return {
    keywords: query.split(' ').slice(0, 4),
    brands: brandList.filter(b => q.includes(b)),
    era: q.includes('80') ? '80s' : q.includes('90') ? '90s' : q.includes('y2k') || q.includes('2000') ? 'Y2K' : 'Any',
    category: q.includes('jean') || q.includes('denim') ? 'jeans' : q.includes('jacket') ? 'jacket' : q.includes('sneaker') || q.includes('shoe') ? 'sneakers' : 'clothing',
    style: ['vintage','rare'],
  };
}
