/**
 * Types représentant les entités de la base de données.
 * Correspond au schéma défini dans src/database/schemas/schema.sql.
 * Connecté à Supabase depuis l'étape 3 (Authentification).
 */

export type UUID = string;
export type ISODateString = string;

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'premium';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';
export type SongStatus = 'pending' | 'processing' | 'completed' | 'failed';

/** Profil applicatif lié 1-1 à auth.users (id partagé). */
export interface Profile {
  id: UUID;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  credits: number;
  subscription: SubscriptionPlan;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Song {
  id: UUID;
  userId: UUID;
  title: string;
  prompt: string;
  lyrics: string | null;
  language: string | null;
  genre: string | null;
  audioUrl: string | null;
  coverUrl: string | null;
  durationSeconds: number | null;
  status: SongStatus;
  errorMessage: string | null;
  /** Identifiant du job chez le fournisseur d'IA musicale externe (étape 8). */
  providerJobId: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface SongHistory {
  id: UUID;
  userId: UUID;
  songId: UUID;
  action: 'created' | 'edited' | 'regenerated' | 'deleted';
  createdAt: ISODateString;
}

export interface Favorite {
  id: UUID;
  userId: UUID;
  songId: UUID;
  createdAt: ISODateString;
}

export interface Credit {
  id: UUID;
  userId: UUID;
  balance: number;
  lastRefillAt: ISODateString | null;
  updatedAt: ISODateString;
}

export interface Subscription {
  id: UUID;
  userId: UUID;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodEnd: ISODateString | null;
  /** Renseignés uniquement côté serveur (webhook Stripe), jamais par le client. */
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Settings {
  id: UUID;
  userId: UUID;
  language: 'fr' | 'en';
  emailNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  updatedAt: ISODateString;
}

/**
 * Lignes brutes telles que retournées par Supabase (snake_case),
 * utilisées pour typer le client `createClient<Database>()`.
 */
export interface ProfileRow {
  id: UUID;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  credits: number;
  subscription: SubscriptionPlan;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow> & { id: UUID; email: string };
        Update: Partial<ProfileRow>;
      };
      songs: { Row: Song };
      song_history: { Row: SongHistory };
      favorites: { Row: Favorite };
      credits: { Row: Credit };
      subscriptions: { Row: Subscription };
      settings: { Row: Settings };
    };
  };
}
