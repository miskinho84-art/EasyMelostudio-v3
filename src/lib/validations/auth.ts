import { z } from 'zod';

const emailField = z
  .string()
  .trim()
  .min(1, "L'adresse e-mail est requise.")
  .email('Adresse e-mail invalide.');

const passwordField = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule.')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre.');

export const signUpSchema = z
  .object({
    lastName: z.string().trim().min(1, 'Le nom est requis.').max(80),
    firstName: z.string().trim().max(80).optional().or(z.literal('')),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, 'Merci de confirmer le mot de passe.'),
    acceptTerms: z.literal(true, {
      message: 'Vous devez accepter les Conditions Générales.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Le mot de passe est requis.'),
  rememberMe: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string().min(1, 'Merci de confirmer le mot de passe.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Le mot de passe actuel est requis.'),
    newPassword: passwordField,
    confirmPassword: z.string().min(1, 'Merci de confirmer le mot de passe.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  });

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;
