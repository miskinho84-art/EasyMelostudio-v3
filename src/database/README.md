# Database

Ce dossier contient la préparation du schéma Supabase / PostgreSQL.

- `schemas/schema.sql` — Définition SQL complète des tables (Users, Songs,
  SongHistory, Favorites, Credits, Subscriptions, Settings). Ce script
  n'est pas exécuté automatiquement.
- `migrations/` — Contiendra les migrations Supabase CLI (`supabase migration new ...`)
  à partir de l'étape 3.

La connexion effective à Supabase (client, variables d'environnement,
Row Level Security) sera mise en place à l'**étape 3 : Authentification
avec Supabase**.
