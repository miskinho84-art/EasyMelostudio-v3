'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GreetingHeader } from '@/components/dashboard/GreetingHeader';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { QuickCreateCard } from '@/components/dashboard/QuickCreateCard';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';
import { DailyGoals } from '@/components/dashboard/DailyGoals';
import { AiSuggestionCard } from '@/components/dashboard/AiSuggestionCard';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';

// Scène 3D chargée uniquement côté client, après hydratation, pour ne
// pas ralentir le premier rendu du dashboard.
const DashboardScene = dynamic(
  () => import('@/components/dashboard/three/DashboardScene').then((mod) => mod.DashboardScene),
  { ssr: false, loading: () => null }
);

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aucune donnée réelle à charger à cette étape (design uniquement) ;
    // le court délai simule un chargement pour présenter le skeleton
    // premium et sera remplacé par un vrai chargement de données plus tard.
    const timeout = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-50">
        <DashboardScene />
      </div>

      <div className="flex flex-col gap-6">
        <GreetingHeader />
        <StatsGrid />
        <QuickCreateCard />

        <div className="grid gap-4 lg:grid-cols-2">
          <ActivityTimeline />
          <DailyGoals />
        </div>

        <AiSuggestionCard />
        <ChartsSection />
      </div>
    </div>
  );
}
