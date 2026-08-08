'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/providers/AuthProvider';
import { AuthService } from '@/services/AuthService';
import { createClient } from '@/lib/supabase/client';
import {
  updatePasswordSchema,
  type UpdatePasswordFormValues,
} from '@/lib/validations/auth';

export default function ParametresPage() {
  const { user } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  async function onSubmit(values: UpdatePasswordFormValues) {
    if (!user?.email) return;
    setFormError(null);
    setIsSuccess(false);
    setIsSubmitting(true);
    try {
      // Vérifie le mot de passe actuel en tentant une reconnexion avant
      // d'autoriser le changement (Supabase ne le vérifie pas lui-même).
      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: values.currentPassword,
      });
      if (verifyError) {
        setFormError('Le mot de passe actuel est incorrect.');
        return;
      }

      await AuthService.updatePassword(values.newPassword);
      setIsSuccess(true);
      reset();
    } catch {
      setFormError('Impossible de mettre à jour le mot de passe. Merci de réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
      <p className="mt-1 text-sm text-gray-500">Gérez les informations de votre compte.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Informations du compte</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Changer le mot de passe</CardTitle>
          <CardDescription>
            Choisissez un nouveau mot de passe sécurisé pour votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            {formError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {formError}
              </div>
            )}
            {isSuccess && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-700"
              >
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                Mot de passe mis à jour avec succès.
              </div>
            )}

            <Input
              type="password"
              id="currentPassword"
              label="Mot de passe actuel"
              autoComplete="current-password"
              error={errors.currentPassword?.message}
              {...register('currentPassword')}
            />
            <Input
              type="password"
              id="newPassword"
              label="Nouveau mot de passe"
              autoComplete="new-password"
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <Input
              type="password"
              id="confirmPassword"
              label="Confirmation"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button type="submit" isLoading={isSubmitting} className="mt-2 w-fit">
              Mettre à jour le mot de passe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
