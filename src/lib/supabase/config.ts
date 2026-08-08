/**
 * Indique si les variables d'environnement Supabase sont renseignées.
 * Permet au reste de l'app de dégrader proprement (plutôt que de
 * planter) tant que le projet Supabase n'est pas encore configuré.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
