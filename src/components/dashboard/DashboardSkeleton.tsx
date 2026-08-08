'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

function Shimmer({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-white/[0.04]', className)}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Chargement du tableau de bord">
      <Shimmer className="h-32 w-full rounded-3xl sm:h-28" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Shimmer key={i} className="h-28 w-full rounded-2xl" />
        ))}
      </div>

      <Shimmer className="h-44 w-full rounded-3xl" />

      <div className="grid gap-4 lg:grid-cols-2">
        <Shimmer className="h-64 w-full rounded-2xl" />
        <Shimmer className="h-64 w-full rounded-2xl" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Shimmer key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
