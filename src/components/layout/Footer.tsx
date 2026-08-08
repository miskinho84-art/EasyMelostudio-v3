import Link from 'next/link';
import { Music } from 'lucide-react';
import { footerNavItems, APP_NAME } from '@/constants/navigation';
import { Container } from '@/components/shared/Container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-midnight-950">
      <Container className="flex flex-col items-center gap-5 py-12 text-center">
        <div className="flex items-center gap-2 text-sm text-midnight-200">
          <Music size={16} className="text-gold-300" />
          © {year} {APP_NAME}
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <li>
            <Link href="/tarifs" className="text-sm text-midnight-200 transition-colors hover:text-white">
              Tarifs
            </Link>
          </li>
          <li>
            <Link href="/connexion" className="text-sm text-midnight-200 transition-colors hover:text-white">
              Connexion
            </Link>
          </li>
          {footerNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-midnight-200 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
