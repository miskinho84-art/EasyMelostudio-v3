import type { Metadata } from 'next';
import { AuroraBackground } from '@/components/landing/AuroraBackground';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FinalCta } from '@/components/landing/FinalCta';

export const metadata: Metadata = {
  title: 'EasyMelo Studio — Créez votre chanson par IA',
  description:
    "Transformez une idée en chanson complète — paroles, style, mélodie — en quelques minutes grâce à l'intelligence artificielle.",
};

export default function HomePage() {
  return (
    <>
      <AuroraBackground />
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
