'use client';

import { motion } from 'framer-motion';
import { Bot, Wand2, Heart, Radio } from 'lucide-react';
import { GlassCard } from '@/components/landing/GlassCard';

const SUGGESTIONS = [
  { icon: Wand2, text: 'Nouveau style disponible : Afro Soul' },
  { icon: Heart, text: 'Essayez une chanson romantique pour votre prochain projet' },
  { icon: Radio, text: 'Votre style préféré en ce moment : Afrobeat' },
];

export function AiSuggestionCard() {
  return (
    <GlassCard className="relative h-full overflow-hidden" glow="gold">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-300/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-300/15 text-gold-300"
        >
          <Bot size={20} />
        </motion.div>
        <div>
          <h2 className="font-display text-base font-semibold text-white">
            L&apos;assistant IA vous recommande
          </h2>
          <p className="text-xs text-midnight-300">Basé sur vos créations récentes</p>
        </div>
      </div>

      <ul className="relative mt-5 space-y-3">
        {SUGGESTIONS.map((s, i) => (
          <motion.li
            key={s.text}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5"
          >
            <s.icon size={14} className="mt-0.5 shrink-0 text-gold-300" />
            <span className="text-sm text-midnight-100">{s.text}</span>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}
