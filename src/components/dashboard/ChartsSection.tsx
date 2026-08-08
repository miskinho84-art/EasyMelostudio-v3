'use client';

import { GlassCard } from '@/components/landing/GlassCard';
import { Reveal } from '@/components/landing/Reveal';
import { CreationsLineChart } from './charts/CreationsLineChart';
import { CreditsRingChart } from './charts/CreditsRingChart';
import { WeeklyActivityChart } from './charts/WeeklyActivityChart';

export function ChartsSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Reveal>
        <GlassCard className="h-full">
          <h3 className="font-display text-sm font-semibold text-white">Évolution des créations</h3>
          <p className="text-xs text-midnight-300">7 derniers jours</p>
          <div className="mt-4">
            <CreationsLineChart />
          </div>
        </GlassCard>
      </Reveal>

      <Reveal delay={0.08}>
        <GlassCard className="h-full">
          <h3 className="font-display text-sm font-semibold text-white">Crédits utilisés</h3>
          <p className="text-xs text-midnight-300">Sur votre forfait actuel</p>
          <div className="mt-5">
            <CreditsRingChart used={34} total={50} />
          </div>
        </GlassCard>
      </Reveal>

      <Reveal delay={0.16}>
        <GlassCard className="h-full">
          <h3 className="font-display text-sm font-semibold text-white">Activité de la semaine</h3>
          <p className="text-xs text-midnight-300">Chansons générées par jour</p>
          <div className="mt-4">
            <WeeklyActivityChart />
          </div>
        </GlassCard>
      </Reveal>
    </div>
  );
}
