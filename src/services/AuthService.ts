/**
 * AuthService
 * Centralise tous les appels à Supabase Auth (client navigateur).
 * Utilisé par les formulaires d'inscription, connexion, mot de passe
 * oublié/changement et déconnexion.
 */

import { createClient } from '@/lib/supabase/client';
import { appConfig } from '@/config/app';

export interface SignUpPayload {
  email: string;
  password: string;
  lastName: string;
  firstName?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

/** Construit un nom d'affichage à partir du nom/prénom fournis à l'inscription. */
function buildDisplayName(lastName: string, firstName?: string): string {
  return [firstName, lastName].filter(Boolean).join(' ').trim();
}

export const AuthService = {
  /** Inscription — envoie un e-mail de confirmation (lien vers /auth/callback). */
  async signUp({ email, password, lastName, firstName }: SignUpPayload) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${appConfig.url}/auth/callback`,
        data: {
          display_name: buildDisplayName(lastName, firstName),
          last_name: lastName,
          first_name: firstName ?? null,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  /** Connexion par e-mail / mot de passe. */
  async signIn({ email, password }: SignInPayload) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  /** Déconnexion et nettoyage de la session locale. */
  async signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /** Envoie un e-mail contenant un lien de réinitialisation du mot de passe. */
  async resetPasswordForEmail(email: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${appConfig.url}/reinitialiser-mot-de-passe`,
    });
    if (error) throw error;
  },

  /**
   * Définit un nouveau mot de passe. Utilisé à la fois pour le parcours
   * "mot de passe oublié" (session de récupération temporaire) et pour
   * le changement de mot de passe depuis les Paramètres (utilisateur connecté).
   */
  async updatePassword(newPassword: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },

  /** Renvoie l'e-mail de confirmation d'inscription. */
  async resendConfirmationEmail(email: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: `${appConfig.url}/auth/callback` },
    });
    if (error) throw error;
  },

  /** Récupère la session courante (ou null si non connecté). */
  async getSession() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /** Récupère l'utilisateur courant (ou null si non connecté). */
  async getCurrentUser() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
};
