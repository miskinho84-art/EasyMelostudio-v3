/**
 * ApiService
 * Client générique pour l'API musicale externe qui sera connectée
 * à l'étape 8. Centralise les appels HTTP vers le fournisseur IA.
 */

export interface GenerateSongRequest {
  prompt: string;
  genre?: string;
}

export interface GenerateSongResponse {
  taskId: string;
}

export const ApiService = {
  async generateSong(_payload: GenerateSongRequest): Promise<GenerateSongResponse> {
    throw new Error('ApiService.generateSong: not implemented yet (étape 8)');
  },

  async getGenerationStatus(_taskId: string): Promise<{ status: string }> {
    throw new Error('ApiService.getGenerationStatus: not implemented yet (étape 8)');
  },
};
