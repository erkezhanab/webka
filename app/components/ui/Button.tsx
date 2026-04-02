import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[linear-gradient(135deg,var(--brand),#3b82f6)] text-white shadow-[0_14px_30px_rgba(15,98,254,0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(15,98,254,0.28)]',
  secondary:
    'bg-[linear-gradient(135deg,#1f3b63,#35537d)] text-white shadow-[0_14px_30px_rgba(19,34,56,0.18)] hover:-translate-y-0.5',
  danger:
    'bg-[linear-gradient(135deg,#d14343,#b91c1c)] text-white shadow-[0_14px_30px_rgba(209,67,67,0.18)] hover:-translate-y-0.5',
  success:
    'bg-[linear-gradient(135deg,#16805d,#0f9f79)] text-white shadow-[0_14px_30px_rgba(22,128,93,0.18)] hover:-translate-y-0.5',
  outline:
    'border border-[rgba(15,98,254,0.2)] bg-white/70 text-[color:var(--ink)] hover:bg-white hover:border-[rgba(15,98,254,0.38)] hover:-translate-y-0.5',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-13 px-6 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.02em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
      {children}
    </button>
  );
}

