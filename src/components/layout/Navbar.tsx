'use client';

import Link from 'next/link';
import { Music } from 'lucide-react';
import { APP_NAME } from '@/constants/navigation';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/AuthProvider';

export function Navbar() {
  const { user, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-midnight-900/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2 font-display font-semibold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-gold-300 text-midnight-950">
            <Music size={16} />
          </span>
          <span className="tracking-tight">{APP_NAME}</span>
        </Link>

        {!isLoading && (
          <Link href={user ? '/dashboard' : '/inscription'}>
            <Button
              size="md"
              className="bg-emerald-500 text-midnight-950 shadow-glow hover:bg-emerald-400"
            >
              {user ? 'Tableau de bord' : 'Commencer'}
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
