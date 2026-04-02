'use client';

import { useI18n } from './I18nProvider';
import type { Locale } from '@/app/lib/i18n';

interface LanguageSwitcherProps {
  className?: string;
}

const localeLabelKey: Record<Locale, string> = {
  ru: 'language.shortRussian',
  kk: 'language.shortKazakh',
};

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { locale, locales, setLocale, t } = useI18n();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-[color:var(--line)] bg-white/75 p-1 ${className}`}
      aria-label={t('language.switcherLabel')}
      role="group"
    >
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          aria-pressed={locale === item}
          className={`rounded-full px-3 py-2 text-xs font-semibold tracking-[0.08em] transition ${
            locale === item
              ? 'bg-[linear-gradient(135deg,var(--brand),#3b82f6)] text-white shadow-[0_8px_18px_rgba(15,98,254,0.22)]'
              : 'text-[color:var(--muted)] hover:bg-white hover:text-[color:var(--ink)]'
          }`}
          title={item === 'ru' ? t('language.russian') : t('language.kazakh')}
        >
          {t(localeLabelKey[item])}
        </button>
      ))}
    </div>
  );
}
