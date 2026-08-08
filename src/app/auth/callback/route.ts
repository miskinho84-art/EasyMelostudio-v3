import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Cible du lien envoyé par e-mail (confirmation d'inscription,
 * réinitialisation de mot de passe via un provider tiers, etc.).
 * Échange le `code` contre une session, puis redirige.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Code manquant ou invalide/expiré : retour vers la connexion avec un message.
  return NextResponse.redirect(`${origin}/connexion?error=lien_invalide`);
}
