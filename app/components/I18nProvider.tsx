'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_KEY,
  LOCALE_STORAGE_KEY,
  formatResultsCount,
  getLocaleCode,
  getMessage,
  getRoleLabel,
  isSupportedLocale,
  supportedLocales,
  translateKnownMessage,
  type Locale,
} from '@/app/lib/i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  formatDate: (value: string | Date, options?: Intl.DateTimeFormatOptions) => string;
  translateError: (message: string) => string;
  formatResultsLabel: (count: number) => string;
  getLocalizedRoleLabel: (role: string) => string;
  locales: readonly Locale[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

    if (storedLocale && isSupportedLocale(storedLocale)) {
      setLocaleState(storedLocale);
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [initialized, locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const t = useCallback(
    (key: string) => {
      return getMessage(locale, key);
    },
    [locale]
  );

  const formatDate = useCallback(
    (value: string | Date, options?: Intl.DateTimeFormatOptions) => {
      const date = value instanceof Date ? value : new Date(value);

      if (Number.isNaN(date.getTime())) {
        return '';
      }

      return new Intl.DateTimeFormat(getLocaleCode(locale), options).format(date);
    },
    [locale]
  );

  const translateError = useCallback(
    (message: string) => {
      return translateKnownMessage(locale, message);
    },
    [locale]
  );

  const formatResultsLabel = useCallback(
    (count: number) => {
      return formatResultsCount(locale, count);
    },
    [locale]
  );

  const getLocalizedRoleLabel = useCallback(
    (role: string) => {
      return getRoleLabel(locale, role);
    },
    [locale]
  );

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        formatDate,
        translateError,
        formatResultsLabel,
        getLocalizedRoleLabel,
        locales: supportedLocales,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
}
