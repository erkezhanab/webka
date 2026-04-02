'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import Card, { CardBody, CardHeader } from '@/app/components/ui/Card';
import { useToast } from '@/app/components/ui/Toast';
import { useI18n } from '@/app/components/I18nProvider';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const { t, translateError } = useI18n();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (name.trim().length < 2) newErrors.name = t('register.invalidName');
    if (!/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(email)) newErrors.email = t('register.invalidEmail');
    if (password.length < 6) newErrors.password = t('register.invalidPassword');
    if (password !== confirmPassword) newErrors.confirmPassword = t('register.passwordsMismatch');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to register');
      }

      showToast(t('register.success'), 'success');
      setTimeout(() => router.push('/login'), 800);
    } catch (err: unknown) {
      const message = err instanceof Error ? translateError(err.message) : t('common.unknownError');
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <section className="glass-panel rounded-[32px] px-6 py-8 sm:px-8">
        <span className="eyebrow">{t('register.eyebrow')}</span>
        <h1 className="section-title mt-5 text-4xl font-bold tracking-[-0.05em] text-[color:var(--ink)] sm:text-5xl">
          {t('register.title')}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
          {t('register.description')}
        </p>
      </section>

      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <h2 className="section-title text-3xl font-bold text-[color:var(--ink)]">{t('register.formTitle')}</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">{t('register.formDescription')}</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label={t('register.nameLabel')}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              placeholder={t('register.namePlaceholder')}
              required
              minLength={2}
            />
            <Input
              label={t('register.emailLabel')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder={t('register.emailPlaceholder')}
              required
            />
            <Input
              label={t('register.passwordLabel')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helpText={t('register.passwordHelp')}
              required
              minLength={6}
            />
            <Input
              label={t('register.confirmPasswordLabel')}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
              minLength={6}
            />

            <Button type="submit" className="w-full" loading={loading} size="lg">
              {t('register.submit')}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[color:var(--muted)]">
            {t('register.alreadyRegistered')}{' '}
            <Link href="/login" className="font-semibold text-[color:var(--brand-strong)]">
              {t('register.login')}
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
