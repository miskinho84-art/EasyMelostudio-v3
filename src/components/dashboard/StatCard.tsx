'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/utils/cn';

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  suffix?: string;
  progress?: number;
  accent?: 'emerald' | 'gold';
  delay?: number;
  hint?: string;
}

export function StatCard({
  icon,
  label,
  value,
  suffix = '',
  progress,
  accent = 'emerald',
  delay = 0,
  hint,
}: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const accentColor = accent === 'emerald' ? 'text-emerald-400' : 'text-gold-300';
  const accentBg = accent === 'emerald' ? 'bg-emerald-500/10' : 'bg-gold-300/10';
  const accentGlow = accent === 'emerald' ? 'hover:shadow-glow' : 'hover:shadow-glow-gold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
        className={cn(
          'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5',
          'shadow-glass backdrop-blur-xl transition-shadow duration-300',
          accentGlow
        )}
      >
        {/* Halo permanent discret (micro-animation continue) */}
        <motion.div
          aria-hidden="true"
          className={cn('absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl', accentBg)}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative flex items-start justify-between">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
              accentBg,
              accentColor
            )}
          >
            {icon}
          </div>
        </div>

        <p className={cn('relative mt-4 font-display text-2xl font-semibold text-white')}>
          <AnimatedCounter value={value} suffix={suffix} />
        </p>
        <p className="relative mt-1 text-xs text-midnight-200">{label}</p>

        {typeof progress === 'number' && (
          <div className="relative mt-3">
            <ProgressBar value={progress} delay={delay + 0.3} />
          </div>
        )}

        {hint && <p className="relative mt-2 text-[11px] text-midnight-300">{hint}</p>}
      </motion.div>
    </motion.div>
  );
}
