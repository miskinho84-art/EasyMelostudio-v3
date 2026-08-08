'use client';

import Link from 'next/link';
import { AudioLines, ArrowRight } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Reveal } from '@/components/landing/Reveal';
import { Button } from '@/components/ui/Button';

export function FinalCta() {
  return (
    <Section id="cta-final">
      <Container className="max-w-2xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/[0.02] to-gold-300/10 px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)]"
            />
            <div className="relative mx-auto flex h-10 w-10 items-center justify-center text-gold-300">
              <AudioLines size={28} />
            </div>
            <h2 className="relative mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
              Prêt à créer votre première chanson&nbsp;?
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-midnight-100">
              Rejoignez EasyMelo Studio et commencez à composer avec l&apos;IA dès aujourd&apos;hui.
            </p>
            <div className="relative mt-8 flex justify-center">
              <Link href="/inscription">
                <Button
                  size="lg"
                  className="group bg-emerald-500 text-midnight-950 shadow-glow hover:bg-emerald-400"
                >
                  Créer mon compte
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
