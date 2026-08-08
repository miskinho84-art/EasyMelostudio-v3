'use client';

import { Zap, GraduationCap, Award, Palette, Globe2, Library, History, Download } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Reveal } from '@/components/landing/Reveal';

const benefits = [
  { label: 'Création rapide', description: 'Une chanson complète en quelques minutes.', icon: Zap },
  {
    label: 'Aucune compétence musicale',
    description: 'Pas besoin de savoir chanter ni composer.',
    icon: GraduationCap,
  },
  { label: 'Résultat professionnel', description: 'Une qualité sonore soignée, prête à partager.', icon: Award },
  { label: 'Plusieurs styles', description: 'Pop, acoustique, festif, épique et bien plus.', icon: Palette },
  { label: 'Plusieurs langues', description: 'Compose dans la langue de ton choix.', icon: Globe2 },
  {
    label: 'Bibliothèque personnelle',
    description: 'Toutes tes créations rangées au même endroit.',
    icon: Library,
  },
  { label: 'Historique', description: 'Retrouve et réécoute chaque génération passée.', icon: History },
  { label: 'Téléchargement', description: 'Emporte ta chanson où tu veux, quand tu veux.', icon: Download },
];

export function WhyEasyMelo() {
  return (
    <Section id="pourquoi">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-emerald-400">
            Avantages
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Pourquoi EasyMelo Studio&nbsp;?
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.label} delay={Math.min(index * 0.05, 0.3)}>
              <div className="flex flex-col gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-gold-300/10 text-emerald-400">
                  <benefit.icon size={20} />
                </div>
                <h3 className="font-display text-base font-medium text-white">{benefit.label}</h3>
                <p className="text-sm text-midnight-100">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
