import Image from 'next/image';
import { cn } from '@/utils/cn';

export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
  className?: string;
}

function getInitials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({ src, name, size = 40, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-brand-600',
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={name ?? 'Avatar'} fill className="object-cover" sizes={`${size}px`} />
      ) : (
        <span className="text-sm font-medium">{getInitials(name)}</span>
      )}
    </div>
  );
}
