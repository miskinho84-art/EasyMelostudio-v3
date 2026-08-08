'use client';

import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Reveal } from '@/components/landing/Reveal';
import { Accordion } from '@/components/landing/Accordion';

const faqItems = [
  {
    question: 'Ai-je besoin de compétences musicales ?',
    answer:
      "Non, aucune. Tu décris simplement ton idée en français et l'intelligence artificielle s'occupe de la composition, des paroles et de l'arrangement.",
  },
  {
    question: 'Combien de temps prend la génération ?',
    answer:
      'La plupart des chansons sont générées en quelques minutes. Le temps peut varier selon la complexité de la demande et l\'affluence sur la plateforme.',
  },
  {
    question: 'Puis-je choisir la langue de la chanson ?',
    answer:
      'Oui, plusieurs langues sont disponibles, dont le français et l\'anglais, avec d\'autres langues ajoutées progressivement.',
  },
  {
    question: 'Puis-je télécharger mes chansons ?',
    answer:
      'Oui, toutes tes créations peuvent être téléchargées et t\'appartiennent une fois générées, selon les conditions de ton offre.',
  },
  {
    question: 'Que se passe-t-il si je change de forfait ?',
    answer:
      'Tu peux changer d\'offre à tout moment. Les crédits et fonctionnalités sont ajustés automatiquement dès l\'activation du nouveau forfait.',
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-emerald-400">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Questions fréquentes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <Accordion items={faqItems} />
        </Reveal>
      </Container>
    </Section>
  );
}
