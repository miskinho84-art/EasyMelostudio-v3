/**
 * CreditService
 * Gère le solde de crédits utilisés pour générer des chansons.
 * Implémentation complète prévue à l'étape 7.
 */

import type { Credit } from '@/types/database';

export const CreditService = {
  async getBalance(_userId: string): Promise<number> {
    throw new Error('CreditService.getBalance: not implemented yet (étape 7)');
  },

  async consumeCredits(_userId: string, _amount: number): Promise<Credit> {
    throw new Error('CreditService.consumeCredits: not implemented yet (étape 7)');
  },

  async addCredits(_userId: string, _amount: number): Promise<Credit> {
    throw new Error('CreditService.addCredits: not implemented yet (étape 7)');
  },
};
