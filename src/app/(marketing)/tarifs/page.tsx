import type { Metadata } from 'next';
import { AuroraBackground } from '@/components/landing/AuroraBackground';
import { Pricing } from '@/components/landing/Pricing';

export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Découvrez les offres EasyMelo Studio : Gratuit, Starter et Pro.',
};

export default function TarifsPage() {
  return (
    <>
      <AuroraBackground />
      <div className="pt-8">
        <Pricing />
      </div>
    </>
  );
}
