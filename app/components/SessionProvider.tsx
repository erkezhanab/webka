'use client';

import { SessionProvider } from 'next-auth/react';
import I18nProvider from './I18nProvider';
import { ToastProvider } from './ui/Toast';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <I18nProvider>
        <ToastProvider>{children}</ToastProvider>
      </I18nProvider>
    </SessionProvider>
  );
}
