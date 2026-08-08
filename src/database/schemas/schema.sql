-- ==========================================================
-- EasyMelo Studio — Schéma de base de données (COMPLET)
-- ==========================================================
-- Généré à partir du code réel du projet :
--   - src/types/database.ts (ProfileRow, Song, SongHistory,
--     Favorite, Credit, Subscription, Settings)
--   - src/services/AuthService.ts (raw_user_meta_data.display_name)
--   - src/services/UserService.ts (table `profiles`, colonnes
--     display_name / avatar_url / credits / subscription)
--
-- À exécuter dans : Supabase Dashboard → SQL Editor → New query
-- (script idempotent : peut être relancé sans erreur si des
-- objets existent déjà).

create extension if not exists "uuid-ossp";

-- ==========================================================
-- FONCTIONS UTILITAIRES (déclarées avant les triggers qui les utilisent)
-- ==========================================================

-- Garde toute colonne "updated_at" synchronisée automatiquement.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ==========================================================
-- PROFILES
-- Profil applicatif lié 1-1 à auth.users (id partagé).
-- Cache dénormalisé de credits/subscription pour un accès rapide ;
-- les tables `credits` et `subscriptions` ci-dessous restent la
-- source de vérité détaillée/historisée (étape 7).
-- ==========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text,
  avatar_url text,
  credits integer not null default 10 check (credits >= 0),
  subscription text not null default 'free'
    check (subscription in ('free', 'starter', 'pro', 'premium')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Profil applicatif 1-1 avec auth.users, créé automatiquement à l''inscription.';

-- Création automatique du profil à l'inscription (AuthService.signUp
-- envoie options.data.display_name -> new.raw_user_meta_data).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  -- Ligne de préférences par défaut, pour éviter tout état "sans
  -- paramètres" côté application (valeurs par défaut des colonnes).
  insert into public.settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ==========================================================
-- SONGS — générateur de chansons (étape 5)
-- ==========================================================
create table if not exists public.songs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  prompt text not null,
  lyrics text,
  language text,
  genre text,
  audio_url text,
  cover_url text,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'completed', 'failed')),
  error_message text,
  -- Identifiant du job chez le fournisseur d'IA musicale externe
  -- (étape 8), pour retrouver/rapprocher une chanson lors du polling
  -- ou de la réception d'un webhook.
  provider_job_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_songs_updated_at on public.songs;
create trigger set_songs_updated_at
  before update on public.songs
  for each row execute procedure public.set_updated_at();

create index if not exists idx_songs_user_id on public.songs (user_id);
create index if not exists idx_songs_user_created_at on public.songs (user_id, created_at desc);
create index if not exists idx_songs_status on public.songs (status);

-- ==========================================================
-- SONG HISTORY — historique (étape 6)
-- ==========================================================
create table if not exists public.song_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  song_id uuid not null references public.songs (id) on delete cascade,
  action text not null check (action in ('created', 'edited', 'regenerated', 'deleted')),
  created_at timestamptz not null default now()
);

create index if not exists idx_song_history_user_id on public.song_history (user_id);
create index if not exists idx_song_history_song_id on public.song_history (song_id);
create index if not exists idx_song_history_user_created_at on public.song_history (user_id, created_at desc);

-- ==========================================================
-- FAVORITES — bibliothèque (étape 6)
-- ==========================================================
create table if not exists public.favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  song_id uuid not null references public.songs (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, song_id)
);

create index if not exists idx_favorites_user_id on public.favorites (user_id);
create index if not exists idx_favorites_song_id on public.favorites (song_id);

-- ==========================================================
-- CREDITS — historique détaillé des mouvements (étape 7)
-- ==========================================================
create table if not exists public.credits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  balance integer not null default 0 check (balance >= 0),
  last_refill_at timestamptz,
  updated_at timestamptz not null default now()
);

drop trigger if exists set_credits_updated_at on public.credits;
create trigger set_credits_updated_at
  before update on public.credits
  for each row execute procedure public.set_updated_at();

-- ==========================================================
-- SUBSCRIPTIONS — abonnements/facturation (étape 7)
-- ==========================================================
create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  plan text not null default 'free'
    check (plan in ('free', 'starter', 'pro', 'premium')),
  status text not null default 'active'
    check (status in ('active', 'canceled', 'past_due', 'trialing')),
  current_period_end timestamptz,
  -- Rapprochement avec Stripe (étape 7) : renseignés uniquement par le
  -- webhook Stripe côté serveur (clé service_role), jamais par le client.
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_subscriptions_updated_at on public.subscriptions;
create trigger set_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.set_updated_at();

-- ==========================================================
-- SETTINGS — préférences utilisateur
-- ==========================================================
create table if not exists public.settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  language text not null default 'fr' check (language in ('fr', 'en')),
  email_notifications boolean not null default true,
  theme text not null default 'system' check (theme in ('light', 'dark', 'system')),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_settings_updated_at on public.settings;
create trigger set_settings_updated_at
  before update on public.settings
  for each row execute procedure public.set_updated_at();

-- ==========================================================
-- ROW LEVEL SECURITY
-- Chaque utilisateur ne peut lire/modifier que ses propres lignes.
-- ==========================================================
alter table public.profiles enable row level security;
alter table public.songs enable row level security;
alter table public.song_history enable row level security;
alter table public.favorites enable row level security;
alter table public.credits enable row level security;
alter table public.subscriptions enable row level security;
alter table public.settings enable row level security;

drop policy if exists "Profiles: lecture de son propre profil" on public.profiles;
create policy "Profiles: lecture de son propre profil"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles: mise à jour de son propre profil" on public.profiles;
create policy "Profiles: mise à jour de son propre profil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Songs: accès à ses propres chansons" on public.songs;
create policy "Songs: accès à ses propres chansons"
  on public.songs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- L'historique est un journal d'audit : lecture et ajout autorisés,
-- mais jamais de modification ni de suppression par l'utilisateur.
drop policy if exists "SongHistory: accès à son propre historique" on public.song_history;
drop policy if exists "SongHistory: lecture de son propre historique" on public.song_history;
create policy "SongHistory: lecture de son propre historique"
  on public.song_history for select
  using (auth.uid() = user_id);

drop policy if exists "SongHistory: ajout à son propre historique" on public.song_history;
create policy "SongHistory: ajout à son propre historique"
  on public.song_history for insert
  with check (auth.uid() = user_id);

drop policy if exists "Favorites: accès à ses propres favoris" on public.favorites;
create policy "Favorites: accès à ses propres favoris"
  on public.favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Credits: lecture de ses propres crédits" on public.credits;
create policy "Credits: lecture de ses propres crédits"
  on public.credits for select
  using (auth.uid() = user_id);

drop policy if exists "Subscriptions: lecture de son propre abonnement" on public.subscriptions;
create policy "Subscriptions: lecture de son propre abonnement"
  on public.subscriptions for select
  using (auth.uid() = user_id);

drop policy if exists "Settings: accès à ses propres paramètres" on public.settings;
create policy "Settings: accès à ses propres paramètres"
  on public.settings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
