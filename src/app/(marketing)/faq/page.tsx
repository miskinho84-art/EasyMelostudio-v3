import type { Metadata } from 'next';
import { AuroraBackground } from '@/components/landing/AuroraBackground';
import { Faq } from '@/components/landing/Faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Les réponses aux questions les plus fréquentes sur EasyMelo Studio.',
};

export default function FaqPage() {
  return (
    <>
      <AuroraBackground />
      <div className="pt-8">
        <Faq />
      </div>
    </>
  );
}
