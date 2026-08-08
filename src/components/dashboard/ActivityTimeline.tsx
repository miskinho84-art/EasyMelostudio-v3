'use client';

import { motion } from 'framer-motion';
import { Music2, Coins, Palette, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/landing/GlassCard';

interface ActivityItem {
  icon: typeof Music2;
  label: string;
  time: string;
  accent: 'emerald' | 'gold';
}

const ACTIVITY_ITEMS: ActivityItem[] = [
  { icon: Music2, label: 'Chanson créée : "Nos 10 ans"', time: 'Il y a 2 heures', accent: 'emerald' },
  { icon: Coins, label: '1 crédit utilisé', time: 'Il y a 2 heures', accent: 'gold' },
  { icon: Palette, label: 'Nouveau style débloqué : Afro Soul', time: 'Hier', accent: 'emerald' },
  { icon: Sparkles, label: 'Nouvelle fonctionnalité disponible : paroles éditables', time: 'Il y a 3 jours', accent: 'gold' },
];

export function ActivityTimeline() {
  return (
    <GlassCard className="h-full">
      <h2 className="font-display text-lg font-semibold text-white">Activité récente</h2>

      <ol className="mt-5 space-y-5">
        {ACTIVITY_ITEMS.map((item, i) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative flex gap-3 pl-1"
          >
            {i < ACTIVITY_ITEMS.length - 1 && (
              <span className="absolute left-[15px] top-8 h-[calc(100%-4px)] w-px bg-white/10" aria-hidden="true" />
            )}
            <span
              className={
                'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ' +
                (item.accent === 'emerald'
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-gold-300/15 text-gold-300')
              }
            >
              <item.icon size={14} />
            </span>
            <div>
              <p className="text-sm text-white">{item.label}</p>
              <p className="text-xs text-midnight-300">{item.time}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </GlassCard>
  );
}
