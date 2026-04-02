'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Button from './ui/Button';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from './I18nProvider';

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

  const navItems = [
    { href: '/', label: t('header.home') },
    { href: '/articles', label: t('header.articles') },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: '/' });
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8" role="banner">
      <div className="glass-panel mx-auto max-w-7xl rounded-[28px] px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label={t('common.goHome')}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand),var(--accent))] text-lg font-bold text-white shadow-[0_12px_24px_rgba(15,98,254,0.24)]">
              NH
            </div>
            <div>
              <p className="section-title text-xl font-bold text-[color:var(--ink)]">NewsHub</p>
              <p className="text-xs text-[color:var(--muted)]">{t('header.brandTagline')}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label={t('header.mainNavigation')}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--muted)] transition hover:bg-white hover:text-[color:var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
            {session && (
              <>
                <Link
                  href="/create-article"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--muted)] transition hover:bg-white hover:text-[color:var(--ink)]"
                >
                  {t('header.create')}
                </Link>
                <Link
                  href="/profile"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--muted)] transition hover:bg-white hover:text-[color:var(--ink)]"
                >
                  {t('header.profile')}
                </Link>
              </>
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            {session ? (
              <>
                <div className="rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">{t('header.signedIn')}</p>
                  <p className="max-w-56 truncate text-sm font-semibold text-[color:var(--ink)]">{session.user?.email}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  {t('header.logout')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    {t('header.login')}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">{t('header.join')}</Button>
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/70 text-[color:var(--ink)] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t('header.toggleMenu')}
            aria-expanded={menuOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="mt-4 border-t border-[color:var(--line)] pt-4 md:hidden">
            <div className="mb-4 flex justify-start">
              <LanguageSwitcher />
            </div>

            <nav className="space-y-2" aria-label={t('header.mobileNavigation')}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-white"
                >
                  {item.label}
                </Link>
              ))}
              {session && (
                <>
                  <Link
                    href="/create-article"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-white"
                  >
                    {t('header.create')}
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-white"
                  >
                    {t('header.profile')}
                  </Link>
                </>
              )}
            </nav>

            <div className="mt-4 space-y-3 rounded-[24px] border border-[color:var(--line)] bg-white/70 p-4">
              {session ? (
                <>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">{t('header.signedIn')}</p>
                    <p className="mt-1 truncate text-sm font-semibold text-[color:var(--ink)]">{session.user?.email}</p>
                  </div>
                  <Button variant="danger" size="sm" className="w-full" onClick={handleLogout}>
                    {t('header.logout')}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      {t('header.login')}
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)}>
                    <Button size="sm" className="w-full">
                      {t('header.join')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
