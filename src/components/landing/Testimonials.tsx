'use client';

import { Star } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Reveal } from '@/components/landing/Reveal';
import { GlassCard } from '@/components/landing/GlassCard';
import { Avatar } from '@/components/ui/Avatar';

const testimonials = [
  {
    name: 'Camille R.',
    role: 'Mariage surprise',
    quote:
      "J'ai décrit notre histoire en quelques phrases et la chanson générée a fait pleurer toute la salle pendant la première danse.",
  },
  {
    name: 'Yanis B.',
    role: 'Fondateur, petite entreprise',
    quote:
      "On cherchait un jingle pour notre lancement produit. En moins d'une heure on avait plusieurs versions, toutes utilisables.",
  },
  {
    name: 'Léa M.',
    role: 'Anniversaire des 30 ans de sa sœur',
    quote:
      "Je ne suis pas musicienne du tout. L'interface est simple et le résultat sonne beaucoup plus professionnel que ce que j'imaginais.",
  },
];

export function Testimonials() {
  return (
    <Section id="temoignages">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-emerald-400">
            Témoignages
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Ils ont créé leur chanson
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <GlassCard className="flex h-full flex-col">
                <div className="flex gap-1 text-gold-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-midnight-100">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={testimonial.name} size={36} />
                  <div>
                    <p className="text-sm font-medium text-white">{testimonial.name}</p>
                    <p className="text-xs text-midnight-200">{testimonial.role}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
