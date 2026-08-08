'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { AuroraBackground } from '@/components/landing/AuroraBackground';
import { Container } from '@/components/shared/Container';
import { APP_NAME } from '@/constants/navigation';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center py-16">
      <AuroraBackground />
      <Container className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-2 font-display font-semibold text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-gold-300 text-midnight-950">
              <Music size={18} />
            </span>
            <span className="tracking-tight">{APP_NAME}</span>
          </Link>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="font-display text-2xl font-semibold text-white">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-midnight-100">{subtitle}</p>}
            </div>

            {children}
          </div>

          {footer && <div className="mt-6 text-center text-sm text-midnight-100">{footer}</div>}
        </motion.div>
      </Container>
    </div>
  );
}
