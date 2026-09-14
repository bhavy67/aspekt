'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-gradient shadow-glow-sm hover:shadow-glow hover:opacity-95 transition-all duration-150',
  secondary:
    'bg-raised border border-border-strong text-foreground hover:bg-border transition-colors duration-150',
  ghost:
    'bg-transparent text-muted hover:bg-raised hover:text-foreground transition-colors duration-150',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 rounded-md text-[11px] font-semibold uppercase tracking-widest',
  md: 'h-9 px-4 rounded-lg text-sm font-semibold',
  lg: 'h-12 px-7 rounded-lg text-sm font-bold',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex cursor-pointer select-none items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      style={variant === 'primary' ? { color: '#0B0B0E' } : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
