'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { AuthService } from '@/services/AuthService';
import { signUpSchema, type SignUpFormValues } from '@/lib/validations/auth';

export default function InscriptionPage() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false as unknown as true,
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    setFormError(null);
    setIsSubmitting(true);
    try {
      await AuthService.signUp({
        email: values.email,
        password: values.password,
        lastName: values.lastName,
        firstName: values.firstName || undefined,
      });
      router.push(`/verifier-email?email=${encodeURIComponent(values.email)}`);
    } catch (err) {
      const message =
        err instanceof Error && err.message.toLowerCase().includes('already registered')
          ? 'Un compte existe déjà avec cette adresse e-mail.'
          : 'Impossible de créer le compte. Merci de réessayer.';
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Créer votre compte"
      subtitle="10 crédits offerts pour composer vos premières chansons."
      footer={
        <>
          Déjà un compte ?{' '}
          <Link href="/connexion" className="font-medium text-emerald-400 hover:text-emerald-300">
            Se connecter
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            variant="dark"
            id="lastName"
            label="Nom"
            autoComplete="family-name"
            placeholder="Dupont"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
          <Input
            variant="dark"
            id="firstName"
            label="Prénom (optionnel)"
            autoComplete="given-name"
            placeholder="Alex"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
        </div>

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
          autoComplete="new-password"
          placeholder="8 caractères min., 1 majuscule, 1 chiffre"
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          variant="dark"
          type="password"
          id="confirmPassword"
          label="Confirmation du mot de passe"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Checkbox
          variant="dark"
          id="acceptTerms"
          error={errors.acceptTerms?.message}
          label={
            <>
              J&apos;accepte les{' '}
              <Link href="/conditions" className="text-emerald-400 hover:text-emerald-300">
                Conditions Générales
              </Link>{' '}
              et la{' '}
              <Link href="/confidentialite" className="text-emerald-400 hover:text-emerald-300">
                Politique de confidentialité
              </Link>
              .
            </>
          }
          {...register('acceptTerms')}
        />

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="group mt-2 bg-emerald-500 text-midnight-950 shadow-glow hover:bg-emerald-400"
        >
          Créer mon compte
          <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </AuthLayout>
  );
}
