import type { ReactNode } from 'react';

type ChipVariant = 'default' | 'accent' | 'gradient';

interface ChipProps {
  variant?: ChipVariant;
  children: ReactNode;
  className?: string;
}

const VARIANT: Record<ChipVariant, string> = {
  default: 'bg-raised text-muted border border-border',
  accent: 'bg-accent-dim text-accent border-transparent',
  gradient: 'bg-accent-gradient border-transparent',
};

export function Chip({ variant = 'default', children, className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex h-[26px] items-center rounded-md px-2.5 text-xs font-medium leading-none ${VARIANT[variant]} ${className}`}
      style={variant === 'gradient' ? { color: '#0B0B0E' } : undefined}
    >
      {children}
    </span>
  );
}
