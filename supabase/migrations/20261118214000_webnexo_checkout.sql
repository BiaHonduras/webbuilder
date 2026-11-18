begin;

create table public.webnexo_products (
  template_id text primary key check (template_id ~ '^[a-z0-9-]+$'),
  name text not null,
  amount_hnl numeric(12,2) not null check (amount_hnl > 0),
  transfer_instructions text,
  card_url text check (card_url like 'https://%'),
  active boolean not null default false
);

create table public.webnexo_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  template_id text not null references public.webnexo_products(template_id),
  method text not null check (method in ('transfer', 'card')),
  reference text not null check (char_length(btrim(reference)) between 4 and 120),
  amount_hnl numeric(12,2) not null check (amount_hnl > 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'rejected')),
  verified_payment_id text unique,
  created_at timestamptz not null default now(),
  check (status <> 'paid' or nullif(btrim(verified_payment_id), '') is not null)
);

create index webnexo_orders_access_idx on public.webnexo_orders (user_id, template_id, status);

alter table public.webnexo_products enable row level security;
alter table public.webnexo_orders enable row level security;

revoke all on public.webnexo_products, public.webnexo_orders from public, anon, authenticated;
grant select on public.webnexo_products, public.webnexo_orders to authenticated;
grant insert (template_id, method, reference) on public.webnexo_orders to authenticated;

create policy webnexo_view_products on public.webnexo_products
  for select to authenticated using (active and (select auth.jwt()->>'is_anonymous') is distinct from 'true');

create policy webnexo_read_own_orders on public.webnexo_orders
  for select to authenticated using (user_id = (select auth.uid()) and (select auth.jwt()->>'is_anonymous') is distinct from 'true');

create policy webnexo_submit_pending_order on public.webnexo_orders
  for insert to authenticated with check (
    user_id = (select auth.uid()) and status = 'pending' and verified_payment_id is null
    and (select auth.jwt()->>'is_anonymous') is distinct from 'true'
  );

create function public.webnexo_fill_order_amount() returns trigger
language plpgsql security invoker set search_path = ''
as $$
begin
  select p.amount_hnl into new.amount_hnl
  from public.webnexo_products p
  where p.template_id = new.template_id and p.active
    and ((new.method = 'transfer' and nullif(btrim(p.transfer_instructions), '') is not null)
      or (new.method = 'card' and p.card_url is not null));
  if new.amount_hnl is null then
    raise exception 'Producto o método de pago no disponible';
  end if;
  return new;
end;
$$;
revoke all on function public.webnexo_fill_order_amount() from public, anon, authenticated;
create trigger webnexo_order_amount before insert on public.webnexo_orders
  for each row execute function public.webnexo_fill_order_amount();

insert into storage.buckets (id, name, public)
values ('webnexo-private-templates', 'webnexo-private-templates', false);

create policy webnexo_read_paid_zip on storage.objects
for select to authenticated using (
  bucket_id = 'webnexo-private-templates'
  and exists (
    select 1 from public.webnexo_orders o
    where o.user_id = (select auth.uid()) and o.status = 'paid'
      and storage.objects.name = o.template_id || '.zip'
  )
);

commit;
