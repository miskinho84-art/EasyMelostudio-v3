'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  delay?: number;
}

export function ProgressBar({ value, max = 100, className, barClassName, delay = 0 }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-white/10', className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className={cn('h-full rounded-full bg-gradient-to-r from-emerald-400 to-gold-300', barClassName)}
      />
    </div>
  );
}
