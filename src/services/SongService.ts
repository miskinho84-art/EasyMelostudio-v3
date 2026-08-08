/**
 * SongService
 * Gère la génération, la récupération et la gestion des chansons.
 * Implémentation complète prévue à l'étape 5 (Générateur) et 6 (Bibliothèque).
 */

import type { Song } from '@/types/database';

export interface CreateSongPayload {
  prompt: string;
  genre?: string;
}

export const SongService = {
  async createSong(_payload: CreateSongPayload): Promise<Song> {
    throw new Error('SongService.createSong: not implemented yet (étape 5)');
  },

  async getSongById(_id: string): Promise<Song | null> {
    throw new Error('SongService.getSongById: not implemented yet (étape 6)');
  },

  async listSongsByUser(_userId: string): Promise<Song[]> {
    throw new Error('SongService.listSongsByUser: not implemented yet (étape 6)');
  },

  async deleteSong(_id: string): Promise<void> {
    throw new Error('SongService.deleteSong: not implemented yet (étape 6)');
  },
};
