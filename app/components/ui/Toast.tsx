'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 3000) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 pointer-events-none z-50">
        {toasts.map(toast => (
          <ToastMessage key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastMessage({ toast }: { toast: Toast }) {
  const bgColor = {
    success: 'border-[rgba(22,128,93,0.2)] bg-[rgba(22,128,93,0.94)]',
    error: 'border-[rgba(209,67,67,0.2)] bg-[rgba(209,67,67,0.94)]',
    info: 'border-[rgba(15,98,254,0.2)] bg-[rgba(15,98,254,0.94)]',
    warning: 'border-[rgba(161,98,7,0.2)] bg-[rgba(161,98,7,0.94)]',
  }[toast.type];

  return (
    <div className={`${bgColor} animate-toast-in pointer-events-auto rounded-2xl border px-4 py-3 text-sm font-medium text-white shadow-[var(--shadow-md)]`}>
      {toast.message}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
