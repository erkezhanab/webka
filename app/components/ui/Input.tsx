'use client';

import React from 'react';
import { useI18n } from '@/app/components/I18nProvider';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export default function Input({ label, error, helpText, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-[color:var(--ink)]">{label}</label>}
      <input
        className={`w-full rounded-[22px] border bg-white/90 px-4 py-3 text-[color:var(--ink)] shadow-sm outline-none transition placeholder:text-[color:var(--muted)] focus:border-[rgba(15,98,254,0.4)] focus:ring-4 ${
          error
            ? 'border-[rgba(209,67,67,0.45)] focus:ring-[rgba(209,67,67,0.12)]'
            : 'border-[color:var(--line)] focus:ring-[rgba(15,98,254,0.12)]'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
      {helpText && <p className="text-sm text-[color:var(--muted)]">{helpText}</p>}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export function TextArea({ label, error, helpText, className = '', ...props }: TextAreaProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-[color:var(--ink)]">{label}</label>}
      <textarea
        className={`w-full resize-y rounded-[22px] border bg-white/90 px-4 py-3 text-[color:var(--ink)] shadow-sm outline-none transition placeholder:text-[color:var(--muted)] focus:border-[rgba(15,98,254,0.4)] focus:ring-4 ${
          error
            ? 'border-[rgba(209,67,67,0.45)] focus:ring-[rgba(209,67,67,0.12)]'
            : 'border-[color:var(--line)] focus:ring-[rgba(15,98,254,0.12)]'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
      {helpText && <p className="text-sm text-[color:var(--muted)]">{helpText}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-[color:var(--ink)]">{label}</label>}
      <select
        className={`w-full rounded-[22px] border bg-white/90 px-4 py-3 text-[color:var(--ink)] shadow-sm outline-none transition focus:border-[rgba(15,98,254,0.4)] focus:ring-4 ${
          error
            ? 'border-[rgba(209,67,67,0.45)] focus:ring-[rgba(209,67,67,0.12)]'
            : 'border-[color:var(--line)] focus:ring-[rgba(15,98,254,0.12)]'
        } ${className}`}
        {...props}
      >
        <option value="">{t('common.selectOption')}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
    </div>
  );
}
