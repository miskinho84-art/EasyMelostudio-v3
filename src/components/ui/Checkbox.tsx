import { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  error?: string;
  variant?: 'light' | 'dark';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, variant = 'light', ...props }, ref) => {
    const isDark = variant === 'dark';

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5">
          <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              ref={ref}
              id={id}
              type="checkbox"
              className={cn(
                'peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border transition-colors',
                isDark
                  ? 'border-white/20 bg-white/5 checked:border-emerald-500 checked:bg-emerald-500'
                  : 'border-gray-300 bg-white checked:border-brand-600 checked:bg-brand-600',
                error && (isDark ? 'border-red-400/60' : 'border-red-500'),
                className
              )}
              {...props}
            />
            <Check
              size={13}
              strokeWidth={3}
              className="pointer-events-none absolute hidden text-white peer-checked:block"
            />
          </span>
          {label && (
            <span className={cn('text-sm leading-snug', isDark ? 'text-midnight-100' : 'text-gray-600')}>
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className={cn('text-xs', isDark ? 'text-red-300' : 'text-red-500')}>{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
