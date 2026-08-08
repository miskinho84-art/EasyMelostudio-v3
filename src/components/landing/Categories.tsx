'use client';

import {
  Heart,
  Cake,
  Building2,
  Package,
  Megaphone,
  Award,
  PartyPopper,
  Snowflake,
  Flame,
  Gift,
  CalendarHeart,
  Sparkle,
} from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Reveal } from '@/components/landing/Reveal';
import { GlassCard } from '@/components/landing/GlassCard';

const categories = [
  { label: 'Mariage', icon: CalendarHeart },
  { label: 'Anniversaire', icon: Cake },
  { label: 'Amour', icon: Heart },
  { label: 'Entreprise', icon: Building2 },
  { label: 'Produit', icon: Package },
  { label: 'Publicité', icon: Megaphone },
  { label: 'Hommage', icon: Award },
  { label: 'Fête', icon: PartyPopper },
  { label: 'Noël', icon: Snowflake },
  { label: 'Motivation', icon: Flame },
  { label: 'Remerciement', icon: Gift },
  { label: 'Événement', icon: Sparkle },
];

export function Categories() {
  return (
    <Section id="categories">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-emerald-400">
            Catégories
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Une chanson pour chaque occasion
          </h2>
          <p className="mt-4 text-midnight-100">
            Choisis une catégorie pour orienter le ton, les mots et l&apos;émotion de ta chanson.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.label} delay={Math.min(index * 0.04, 0.4)}>
              <GlassCard
                glow="emerald"
                className="flex flex-col items-center gap-3 py-8 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <category.icon size={22} />
                </div>
                <span className="font-medium text-white">{category.label}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
