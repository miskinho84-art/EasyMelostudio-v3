import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

/**
 * Client Supabase côté serveur (Server Components / Route Handlers).
 * Utilisé notamment par /auth/callback pour échanger le code de
 * confirmation contre une session.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Le set peut échouer dans un Server Component (lecture seule) ;
            // sans conséquence car le middleware rafraîchit déjà les cookies
            // de session à chaque requête.
          }
        },
      },
    }
  );
}
