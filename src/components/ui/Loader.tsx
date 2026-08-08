import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface LoaderProps {
  size?: number;
  className?: string;
  label?: string;
}

export function Loader({ size = 24, className, label }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2
        size={size}
        className={cn('animate-spin text-brand-600', className)}
      />
      {label && <p className="text-sm text-gray-500">{label}</p>}
    </div>
  );
}
