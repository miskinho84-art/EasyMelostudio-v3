/**
 * UserService
 * Lecture/mise à jour du profil applicatif (table `profiles`,
 * créée automatiquement à l'inscription via un trigger Supabase).
 */

import { createClient } from '@/lib/supabase/client';
import type { Profile, ProfileRow } from '@/types/database';

function mapRow(row: ProfileRow): Profile {
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    credits: row.credits,
    subscription: row.subscription,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const UserService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (error) throw error;
    return data ? mapRow(data) : null;
  },

  async updateProfile(
    userId: string,
    updates: Partial<Pick<Profile, 'displayName' | 'avatarUrl'>>
  ): Promise<Profile> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .update({
        display_name: updates.displayName,
        avatar_url: updates.avatarUrl,
      })
      .eq('id', userId)
      .select('*')
      .single();
    if (error) throw error;
    return mapRow(data);
  },
};
