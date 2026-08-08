'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  glow?: 'emerald' | 'gold' | 'none';
}

/**
 * Carte à effet de verre (glassmorphism) avec légère élévation au survol.
 * Base visuelle réutilisée par toutes les sections de la landing.
 */
export function GlassCard({ className, glow = 'none', children, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl',
        'shadow-glass transition-colors duration-300 hover:border-white/20',
        glow === 'emerald' && 'hover:shadow-glow',
        glow === 'gold' && 'hover:shadow-glow-gold',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
