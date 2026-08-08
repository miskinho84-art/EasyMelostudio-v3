'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { AuthService } from '@/services/AuthService';
import { signInSchema, type SignInFormValues } from '@/lib/validations/auth';

const ERROR_MESSAGES: Record<string, string> = {
  lien_invalide: 'Le lien utilisé est invalide ou a expiré. Merci de réessayer.',
};

function ConnexionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(
    ERROR_MESSAGES[searchParams.get('error') ?? ''] ?? null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '', rememberMe: true },
  });

  async function onSubmit(values: SignInFormValues) {
    setFormError(null);
    setIsSubmitting(true);
    try {
      await AuthService.signIn(values);
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setFormError(
        err instanceof Error
          ? "Adresse e-mail ou mot de passe incorrect."
          : 'Une erreur est survenue. Merci de réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Content de vous revoir"
      subtitle="Connectez-vous pour retrouver vos créations."
      footer={
        <>
          Pas encore de compte ?{' '}
          <Link href="/inscription" className="font-medium text-emerald-400 hover:text-emerald-300">
            Créer un compte
          </Link>
        </>
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

        <Input
          variant="dark"
          type="password"
          id="password"
          label="Mot de passe"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            variant="dark"
            id="rememberMe"
            label="Se souvenir de moi"
            {...register('rememberMe')}
          />
          <Link
            href="/mot-de-passe-oublie"
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="group mt-2 bg-emerald-500 text-midnight-950 shadow-glow hover:bg-emerald-400"
        >
          Se connecter
          <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </AuthLayout>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense fallback={null}>
      <ConnexionForm />
    </Suspense>
  );
}
