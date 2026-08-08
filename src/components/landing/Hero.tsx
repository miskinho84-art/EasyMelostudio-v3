'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/Button';

// La scène 3D est lourde (Three.js) : chargée uniquement côté client,
// après l'hydratation, pour ne pas ralentir le premier rendu (LCP).
const HeroScene = dynamic(
  () => import('@/components/landing/three/HeroScene').then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null }
);

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      {/* Scène 3D en arrière-plan discret, derrière tout le texte du Hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <HeroScene />
      </div>

      <Container className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300"
        >
          <Sparkles size={14} />
          Génération musicale par IA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Votre studio musical{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-gold-300 bg-clip-text text-transparent">
            alimenté par l&apos;IA
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg text-midnight-100"
        >
          Transformez une idée en chanson complète — paroles, style, mélodie — en quelques
          minutes. Sans compétences musicales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/inscription" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="group w-full bg-emerald-500 text-midnight-950 shadow-glow hover:bg-emerald-400 sm:w-auto"
            >
              Créer ma première chanson
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </Link>
          <Link href="/tarifs" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white/15 bg-midnight-900/60 text-white hover:bg-white/5 sm:w-auto"
            >
              Voir les tarifs
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 text-sm text-midnight-300"
        >
          10 crédits offerts à l&apos;inscription — aucune carte requise
        </motion.p>
      </Container>
    </section>
  );
}
