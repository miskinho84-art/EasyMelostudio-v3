'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function QuickCreateCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 via-white/[0.03] to-gold-300/10 p-8 text-center shadow-glass sm:p-12"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 20%, rgba(16,185,129,0.22), transparent 60%)',
            'radial-gradient(circle at 70% 60%, rgba(16,185,129,0.22), transparent 60%)',
            'radial-gradient(circle at 30% 20%, rgba(16,185,129,0.22), transparent 60%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative">
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400"
        >
          <Sparkles size={26} />
        </motion.div>

        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Une nouvelle idée en tête&nbsp;?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-midnight-100">
          Décrivez-la et laissez l&apos;IA composer votre prochaine chanson en quelques minutes.
        </p>

        <Link href="/creer-une-chanson" className="mt-7 inline-block">
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 font-display text-base font-semibold text-midnight-950 shadow-glow transition-colors hover:bg-emerald-400"
          >
            <Sparkles size={18} />
            Créer une chanson
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}
