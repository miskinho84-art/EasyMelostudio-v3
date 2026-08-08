'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { GlassCard } from '@/components/landing/GlassCard';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface Goal {
  id: string;
  label: string;
}

const INITIAL_GOALS: Goal[] = [
  { id: 'create-3', label: 'Créer 3 chansons' },
  { id: 'new-style', label: 'Tester un nouveau style' },
  { id: 'favorite', label: 'Ajouter une chanson en favoris' },
];

export function DailyGoals() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const doneCount = Object.values(completed).filter(Boolean).length;
  const progress = (doneCount / INITIAL_GOALS.length) * 100;

  return (
    <GlassCard className="h-full" glow="emerald">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-white">Objectifs du jour</h2>
        <span className="text-xs font-medium text-emerald-400">
          {doneCount}/{INITIAL_GOALS.length}
        </span>
      </div>

      <div className="mt-4">
        <ProgressBar value={progress} />
      </div>

      <ul className="mt-5 space-y-3">
        {INITIAL_GOALS.map((goal, i) => {
          const isDone = Boolean(completed[goal.id]);
          return (
            <motion.li
              key={goal.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <button
                type="button"
                onClick={() => toggle(goal.id)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/5"
              >
                <span
                  className={
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ' +
                    (isDone
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-white/20 bg-white/5')
                  }
                >
                  {isDone && <Check size={12} strokeWidth={3} className="text-midnight-950" />}
                </span>
                <span
                  className={
                    'text-sm transition-colors ' +
                    (isDone ? 'text-midnight-300 line-through' : 'text-midnight-100')
                  }
                >
                  {goal.label}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
