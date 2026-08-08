'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MailCheck, RotateCw } from 'lucide-react';
import { AuroraBackground } from '@/components/landing/AuroraBackground';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/Button';
import { AuthService } from '@/services/AuthService';

function VerifierEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function handleResend() {
    if (!email) return;
    setStatus('sending');
    try {
      await AuthService.resendConfirmationEmail(email);
      setStatus('sent');
    } catch {
      setStatus('idle');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-16">
      <AuroraBackground />
      <Container className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-glass backdrop-blur-xl"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <MailCheck size={30} />
          </div>

          <h1 className="font-display text-2xl font-semibold text-white">
            Vérifiez votre boîte mail
          </h1>

          <p className="mt-3 text-sm text-midnight-100">
            {email ? (
              <>
                Un e-mail de confirmation a été envoyé à{' '}
                <span className="font-medium text-white">{email}</span>. Cliquez sur le lien
                qu&apos;il contient pour activer votre compte.
              </>
            ) : (
              "Un e-mail de confirmation vous a été envoyé. Cliquez sur le lien qu'il contient pour activer votre compte."
            )}
          </p>

          <p className="mt-2 text-xs text-midnight-300">
            Pensez à vérifier vos courriers indésirables si vous ne le voyez pas.
          </p>

          {email && (
            <Button
              type="button"
              variant="outline"
              className="mt-6 w-full border-white/15 text-white hover:bg-white/5"
              onClick={handleResend}
              isLoading={status === 'sending'}
              disabled={status === 'sent'}
            >
              <RotateCw size={16} className="mr-2" />
              {status === 'sent' ? 'E-mail renvoyé' : "Renvoyer l'e-mail"}
            </Button>
          )}
        </motion.div>
      </Container>
    </div>
  );
}

export default function VerifierEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifierEmailContent />
    </Suspense>
  );
}
