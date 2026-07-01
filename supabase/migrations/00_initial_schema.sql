-- Initial Schema for Zenbeatz E-Commerce

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (extends Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Products Table
create table products (
  id uuid default uuid_generate_v4() primary key,
  code text not null unique,
  title text not null,
  description text,
  price numeric(10, 2) not null,
  inventory_count integer default 0,
  image_url text,
  specs jsonb,
  is_popular boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert initial products
insert into products (code, title, description, price, inventory_count, specs, is_popular) values
('5A', 'Versatile & Balanced', 'The industry standard. Perfect for all genres and playing styles. Ideal for worship, studio, and live performance.', 15.00, 100, '{"Length": "16\"", "Diameter": ".565\"", "Weight": "Medium"}', true),
('5B', 'Powerful & Bold', 'Extra thickness for more power and projection. Great for rock, gospel, and high-energy performances.', 15.00, 100, '{"Length": "16\"", "Diameter": ".595\"", "Weight": "Medium-Heavy"}', false),
('7A', 'Light & Fast', 'Thinner profile for speed and finesse. Perfect for jazz, acoustic sets, and intricate patterns.', 15.00, 100, '{"Length": "15.5\"", "Diameter": ".540\"", "Weight": "Light"}', false),
('2B', 'Heavy & Commanding', 'Maximum weight and reach. Built for power drummers, marching, and stadium-sized sound.', 15.00, 100, '{"Length": "16.25\"", "Diameter": ".630\"", "Weight": "Heavy"}', false);


-- 3. Shipping Rates Table
create table shipping_rates (
  id uuid default uuid_generate_v4() primary key,
  city text not null unique,
  fee numeric(10, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

insert into shipping_rates (city, fee) values
('Lagos', 5.00),
('Abuja', 10.00),
('Port Harcourt', 10.00),
('Houston', 15.00),
('Other', 20.00);


-- 4. Orders Table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete set null,
  status text not null check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total_amount numeric(10, 2) not null,
  shipping_city text not null,
  shipping_fee numeric(10, 2) not null,
  shipping_address text not null,
  stripe_session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Order Items Table
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) on delete restrict not null,
  quantity integer not null check (quantity > 0),
  price_at_purchase numeric(10, 2) not null
);


-- Row Level Security (RLS) Policies

alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

alter table products enable row level security;
create policy "Products are viewable by everyone." on products for select using (true);
create policy "Admins can insert products" on products for insert with check (exists (select 1 from profiles where profiles.id = auth.uid() and role = 'admin'));
create policy "Admins can update products" on products for update using (exists (select 1 from profiles where profiles.id = auth.uid() and role = 'admin'));

alter table shipping_rates enable row level security;
create policy "Shipping rates are viewable by everyone." on shipping_rates for select using (true);
create policy "Admins can manage shipping rates" on shipping_rates for all using (exists (select 1 from profiles where profiles.id = auth.uid() and role = 'admin'));

alter table orders enable row level security;
create policy "Users can view their own orders." on orders for select using (auth.uid() = user_id);
create policy "Admins can view all orders" on orders for select using (exists (select 1 from profiles where profiles.id = auth.uid() and role = 'admin'));
create policy "Users can insert their own orders." on orders for insert with check (auth.uid() = user_id);
create policy "Admins can update orders" on orders for update using (exists (select 1 from profiles where profiles.id = auth.uid() and role = 'admin'));

alter table order_items enable row level security;
create policy "Users can view their own order items." on order_items for select using (exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));
create policy "Admins can view all order items" on order_items for select using (exists (select 1 from profiles where profiles.id = auth.uid() and role = 'admin'));
create policy "Users can insert their own order items." on order_items for insert with check (exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));


-- Create a trigger to automatically create a profile for a new user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'customer');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
