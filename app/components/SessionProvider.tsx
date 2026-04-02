'use client';

import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from './ui/Toast';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  );
}