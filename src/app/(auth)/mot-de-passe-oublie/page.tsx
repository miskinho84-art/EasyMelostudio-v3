'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowRight, MailCheck } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AuthService } from '@/services/AuthService';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validations/auth';

export default function MotDePasseOubliePage() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setFormError(null);
    setIsSubmitting(true);
    try {
      await AuthService.resetPasswordForEmail(values.email);
      setSentEmail(values.email);
      setIsSent(true);
    } catch {
      setFormError('Une erreur est survenue. Merci de réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSent) {
    return (
      <AuthLayout title="E-mail envoyé">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <MailCheck size={26} />
          </div>
          <p className="text-sm text-midnight-100">
            Si un compte existe pour <span className="font-medium text-white">{sentEmail}</span>,
            un lien de réinitialisation vient de lui être envoyé.
          </p>
          <Link href="/connexion" className="mt-6 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300">
            Retour à la connexion
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Mot de passe oublié"
      subtitle="Indiquez votre e-mail, nous vous enverrons un lien de réinitialisation."
      footer={
        <Link href="/connexion" className="font-medium text-emerald-400 hover:text-emerald-300">
          Retour à la connexion
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {formError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {formError}
          </div>
        )}

        <Input
          variant="dark"
          type="email"
          id="email"
          label="Adresse e-mail"
          autoComplete="email"
          placeholder="vous@exemple.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="group mt-2 bg-emerald-500 text-midnight-950 shadow-glow hover:bg-emerald-400"
        >
          Envoyer le lien
          <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </AuthLayout>
  );
}
