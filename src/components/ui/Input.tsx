import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /** 'light' (défaut, dashboard) ou 'dark' (pages d'authentification premium) */
  variant?: 'light' | 'dark';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, variant = 'light', ...props }, ref) => {
    const isDark = variant === 'dark';

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium',
              isDark ? 'text-midnight-100' : 'text-gray-700'
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-11 w-full rounded-lg border px-3 text-sm transition-colors',
            isDark
              ? [
                  'border-white/15 bg-white/5 text-white placeholder:text-midnight-300',
                  'focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/20',
                ]
              : [
                  'border-gray-300 bg-white placeholder:text-gray-400',
                  'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
                ],
            error &&
              (isDark
                ? 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
                : 'border-red-500 focus:border-red-500 focus:ring-red-500/20'),
            className
          )}
          {...props}
        />
        {error && (
          <p className={cn('text-xs', isDark ? 'text-red-300' : 'text-red-500')}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
