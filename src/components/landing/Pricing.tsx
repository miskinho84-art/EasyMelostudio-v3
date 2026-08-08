'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Reveal } from '@/components/landing/Reveal';
import { GlassCard } from '@/components/landing/GlassCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: '',
    description: 'Pour découvrir EasyMelo Studio.',
    features: ['1 chanson par mois', 'Styles de base', 'Qualité standard', 'Support communautaire'],
    highlighted: false,
    cta: 'Commencer gratuitement',
  },
  {
    name: 'Starter',
    price: '9€',
    period: '/mois',
    description: 'Pour les créations régulières.',
    features: [
      '10 chansons par mois',
      'Tous les styles musicaux',
      'Qualité haute définition',
      'Téléchargement illimité',
      'Support prioritaire',
    ],
    highlighted: true,
    cta: 'Choisir Starter',
  },
  {
    name: 'Pro',
    price: '29€',
    period: '/mois',
    description: 'Pour un usage professionnel intensif.',
    features: [
      'Chansons illimitées',
      'Tous les styles et langues',
      'Qualité studio',
      'Accès anticipé aux nouveautés',
      'Support dédié',
    ],
    highlighted: false,
    cta: 'Choisir Pro',
  },
];

export function Pricing() {
  return (
    <Section id="tarifs">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-emerald-400">
            Tarifs
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Une offre pour chaque besoin
          </h2>
          <p className="mt-4 text-midnight-100">
            Commence gratuitement, évolue quand tu es prêt. Sans engagement.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.1}>
              <GlassCard
                glow={plan.highlighted ? 'emerald' : 'none'}
                className={cn(
                  'flex h-full flex-col',
                  plan.highlighted && 'border-emerald-400/40 bg-white/[0.05]'
                )}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    Le plus populaire
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-midnight-100">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-midnight-200">{plan.period}</span>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-midnight-100">
                      <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/inscription" className="mt-8">
                  <Button
                    className={cn(
                      'w-full',
                      plan.highlighted
                        ? 'bg-emerald-500 text-midnight-950 shadow-glow hover:bg-emerald-400'
                        : 'border border-white/15 bg-transparent text-white hover:bg-white/5'
                    )}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
