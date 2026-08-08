import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastProps {
  variant?: ToastVariant;
  title: string;
  description?: string;
  onClose?: () => void;
}

const variantConfig: Record<ToastVariant, { icon: typeof Info; classes: string }> = {
  success: { icon: CheckCircle2, classes: 'border-green-200 bg-green-50 text-green-800' },
  error: { icon: XCircle, classes: 'border-red-200 bg-red-50 text-red-800' },
  info: { icon: Info, classes: 'border-blue-200 bg-blue-50 text-blue-800' },
};

export function Toast({ variant = 'info', title, description, onClose }: ToastProps) {
  const { icon: Icon, classes } = variantConfig[variant];

  return (
    <div
      className={cn(
        'flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-md',
        classes
      )}
      role="alert"
    >
      <Icon size={20} className="mt-0.5 shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="mt-0.5 text-xs opacity-80">{description}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Fermer" className="shrink-0 opacity-60 hover:opacity-100">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
