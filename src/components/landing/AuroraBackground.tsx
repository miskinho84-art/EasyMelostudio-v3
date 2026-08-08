'use client';

import { motion } from 'framer-motion';

/**
 * Fond animé subtil, en position fixe derrière tout le contenu de la
 * landing. Deux halos dégradés dérivent lentement. Purement décoratif.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-midnight-900">
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[60vw] w-[60vw] rounded-full bg-emerald-600/10 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[50vw] w-[50vw] rounded-full bg-gold-400/10 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.06),transparent_60%)]" />
    </div>
  );
}
