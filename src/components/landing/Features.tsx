'use client';

import { Wand2, AudioLines, Zap, Radio } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Reveal } from '@/components/landing/Reveal';
import { GlassCard } from '@/components/landing/GlassCard';

const features = [
  {
    label: 'Prompt → Chanson',
    description: 'Décrivez votre idée, choisissez un style, obtenez une chanson unique.',
    icon: Wand2,
  },
  {
    label: 'Bibliothèque personnelle',
    description: 'Toutes vos créations centralisées, écoutez-les et retrouvez-les à tout moment.',
    icon: AudioLines,
  },
  {
    label: 'Système de crédits',
    description: "Payez à l'usage. Pas d'abonnement caché, pas de mauvaise surprise.",
    icon: Zap,
  },
  {
    label: 'Bientôt : voix & vidéos IA',
    description: 'Pochettes, clips, voix synthétiques et marketplace — la roadmap est chargée.',
    icon: Radio,
  },
];

export function Features() {
  return (
    <Section id="fonctionnalites">
      <Container className="max-w-2xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Tout ce qu&apos;il faut pour créer
          </h2>
          <p className="mt-4 text-midnight-100">
            Une plateforme pensée pour les artistes, créateurs de contenu et curieux.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5">
          {features.map((feature, index) => (
            <Reveal key={feature.label} delay={Math.min(index * 0.08, 0.3)}>
              <GlassCard glow="gold">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-300/10 text-gold-300">
                  <feature.icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg font-medium text-white">
                  {feature.label}
                </h3>
                <p className="mt-2 text-sm text-midnight-100">{feature.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
