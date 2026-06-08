export type Locale = 'ru' | 'en';

export type Marketplace =
  | 'Grailed'
  | 'eBay'
  | 'Vestiaire'
  | 'Vinted'
  | 'Depop'
  | '1stDibs';

export type Era = '70s' | '80s' | '90s' | 'Y2K' | '2010s' | 'Vintage' | 'Any';

export interface Item {
  id: string;
  title: string;
  brand?: string;
  price: number;
  currency: string;
  images: string[];
  marketplace: Marketplace;
  marketplaceUrl: string;
  sellerCountry: string;
  size?: string;
  condition?: string;
  era?: Era;
  tags: string[];
  description?: string;
  sku?: string;
}

export interface SearchQuery {
  description: string;
  budgetMin?: number;
  budgetMax?: number;
  era?: string;
  size?: string;
  vibe?: string;
}

export interface RequestPayload {
  type: 'item' | 'search' | 'link';
  itemId?: string;
  itemTitle?: string;
  itemUrl?: string;
  searchQuery?: SearchQuery;
  name?: string;
  email?: string;
  phone?: string;
  comment?: string;
}
