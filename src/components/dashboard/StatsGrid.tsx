'use client';

import { Music2, Star, Library, CreditCard, Flame, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';

/**
 * Données simulées (aucune connexion à la base de données à cette étape,
 * conformément au périmètre de l'étape 4 — design du Dashboard uniquement).
 */
const MOCK_STATS = {
  songsCreated: 12,
  favorites: 5,
  librarySize: 12,
  credits: 34,
  streakDays: 4,
  hoursSaved: 18,
};

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      <StatCard
        icon={<Music2 size={18} />}
        label="Chansons créées"
        value={MOCK_STATS.songsCreated}
        accent="emerald"
        progress={60}
        delay={0}
      />
      <StatCard
        icon={<Star size={18} />}
        label="Favoris"
        value={MOCK_STATS.favorites}
        accent="gold"
        progress={40}
        delay={0.05}
      />
      <StatCard
        icon={<Library size={18} />}
        label="Bibliothèque"
        value={MOCK_STATS.librarySize}
        accent="emerald"
        progress={60}
        delay={0.1}
      />
      <StatCard
        icon={<CreditCard size={18} />}
        label="Crédits IA"
        value={MOCK_STATS.credits}
        accent="gold"
        hint="sur 50 ce mois-ci"
        progress={68}
        delay={0.15}
      />
      <StatCard
        icon={<Flame size={18} />}
        label="Série actuelle"
        value={MOCK_STATS.streakDays}
        suffix=" j"
        accent="emerald"
        progress={57}
        delay={0.2}
      />
      <StatCard
        icon={<TrendingUp size={18} />}
        label="Temps gagné (IA)"
        value={MOCK_STATS.hoursSaved}
        suffix="h"
        accent="gold"
        progress={75}
        delay={0.25}
      />
    </div>
  );
}
