create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('item', 'search', 'link')),
  item_id text,
  item_title text,
  item_url text,
  search_query jsonb,
  name text,
  email text,
  phone text,
  comment text,
  status text not null default 'new' check (status in ('new', 'processing', 'done')),
  created_at timestamptz not null default now()
);

create index if not exists requests_status_idx on requests(status);
create index if not exists requests_created_at_idx on requests(created_at desc);
