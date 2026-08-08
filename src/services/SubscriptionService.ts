/**
 * SubscriptionService
 * Gère les abonnements et offres Premium.
 * Implémentation complète prévue à l'étape 7.
 */

import type { Subscription, SubscriptionPlan } from '@/types/database';

export const SubscriptionService = {
  async getCurrentSubscription(_userId: string): Promise<Subscription | null> {
    throw new Error('SubscriptionService.getCurrentSubscription: not implemented yet (étape 7)');
  },

  async subscribeToPlan(_userId: string, _plan: SubscriptionPlan): Promise<void> {
    throw new Error('SubscriptionService.subscribeToPlan: not implemented yet (étape 7)');
  },

  async cancelSubscription(_userId: string): Promise<void> {
    throw new Error('SubscriptionService.cancelSubscription: not implemented yet (étape 7)');
  },
};
