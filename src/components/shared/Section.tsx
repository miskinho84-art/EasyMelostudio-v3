import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('py-16 sm:py-24', className)} {...props} />;
}
