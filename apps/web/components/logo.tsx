'use client';

import { useId } from 'react';

interface LogoMarkProps {
  size?: number;
  variant?: 'gradient' | 'mono';
  className?: string;
}

export function LogoMark({ size = 20, variant = 'gradient', className }: LogoMarkProps) {
  const id = useId();

  const stroke = variant === 'gradient' ? `url(#${id})` : 'currentColor';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {variant === 'gradient' && (
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      )}
      <path d="M4,14 L4,4 L14,4" stroke={stroke} strokeWidth="2.5" strokeLinecap="square" />
      <path d="M26,4 L36,4 L36,14" stroke={stroke} strokeWidth="2.5" strokeLinecap="square" />
      <path d="M4,26 L4,36 L14,36" stroke={stroke} strokeWidth="2.5" strokeLinecap="square" />
      <path d="M26,36 L36,36 L36,26" stroke={stroke} strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  variant?: 'gradient' | 'mono';
  className?: string;
}

export function Logo({ size = 20, variant = 'gradient', className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <LogoMark size={size} variant={variant} />
      <span
        className="text-foreground"
        style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        Aspekt
      </span>
    </span>
  );
}
