import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border border-[color:var(--line)] bg-white/70 text-[color:var(--muted)]',
  primary: 'bg-[rgba(15,98,254,0.1)] text-[color:var(--brand-strong)]',
  success: 'bg-[rgba(22,128,93,0.12)] text-[color:var(--success)]',
  warning: 'bg-[rgba(251,191,36,0.16)] text-[color:#a16207]',
  danger: 'bg-[rgba(209,67,67,0.12)] text-[color:var(--danger)]',
};

export default function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.04em] ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
