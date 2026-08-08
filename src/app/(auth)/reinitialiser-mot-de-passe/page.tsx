'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AuthService } from '@/services/AuthService';
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/lib/validations/auth';

export default function ReinitialiserMotDePassePage() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    setFormError(null);
    setIsSubmitting(true);
    try {
      await AuthService.updatePassword(values.password);
      setIsDone(true);
      setTimeout(() => router.push('/dashboard'), 1800);
    } catch {
      setFormError(
        "Impossible de mettre à jour le mot de passe. Le lien a peut-être expiré : redemandez-en un nouveau."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isDone) {
    return (
      <AuthLayout title="Mot de passe mis à jour">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 size={26} />
          </div>
          <p className="text-sm text-midnight-100">Redirection vers votre tableau de bord…</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Nouveau mot de passe"
      subtitle="Choisissez un mot de passe sécurisé pour votre compte."
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
          type="password"
          id="password"
          label="Nouveau mot de passe"
          autoComplete="new-password"
          placeholder="8 caractères min., 1 majuscule, 1 chiffre"
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          variant="dark"
          type="password"
          id="confirmPassword"
          label="Confirmation"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="group mt-2 bg-emerald-500 text-midnight-950 shadow-glow hover:bg-emerald-400"
        >
          Mettre à jour le mot de passe
          <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </AuthLayout>
  );
}
