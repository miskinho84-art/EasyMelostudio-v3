'use client';

import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Reveal } from '@/components/landing/Reveal';
import { GlassCard } from '@/components/landing/GlassCard';

const steps = [
  {
    number: '01',
    title: 'Inscrivez-vous',
    description: '10 crédits offerts, sans carte bancaire.',
  },
  {
    number: '02',
    title: 'Décrivez votre chanson',
    description: 'Un prompt, un style, une durée — c\'est tout.',
  },
  {
    number: '03',
    title: "L'IA compose",
    description: 'Paroles et structure générées en quelques secondes.',
  },
  {
    number: '04',
    title: 'Écoutez & partagez',
    description: 'Sauvegardée dans votre bibliothèque.',
  },
];

export function HowItWorks() {
  return (
    <Section id="comment-ca-marche">
      <Container className="max-w-2xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Comment ça marche
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={Math.min(index * 0.08, 0.3)}>
              <GlassCard glow="emerald">
                <span className="font-display text-3xl font-semibold text-emerald-400">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-midnight-100">{step.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
