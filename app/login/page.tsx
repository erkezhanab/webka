'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import Card, { CardBody, CardHeader } from '@/app/components/ui/Card';
import { useToast } from '@/app/components/ui/Toast';
import { useI18n } from '@/app/components/I18nProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const { t, translateError } = useI18n();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim() || !/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(email)) {
      newErrors.email = t('login.invalidEmail');
    }
    if (password.length < 6) {
      newErrors.password = t('login.invalidPassword');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        showToast(t('login.invalidCredentials'), 'error');
        setErrors({ form: t('login.invalidCredentials') });
      } else {
        showToast(t('login.success'), 'success');
        router.push('/');
      }
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
        <span className="eyebrow">{t('login.eyebrow')}</span>
        <h1 className="section-title mt-5 text-4xl font-bold tracking-[-0.05em] text-[color:var(--ink)] sm:text-5xl">
          {t('login.title')}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
          {t('login.description')}
        </p>
      </section>

      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <h2 className="section-title text-3xl font-bold text-[color:var(--ink)]">{t('login.formTitle')}</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">{t('login.formDescription')}</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {errors.form && (
              <p className="rounded-[20px] border border-[rgba(209,67,67,0.18)] bg-[rgba(209,67,67,0.08)] px-4 py-3 text-sm text-[color:var(--danger)]">
                {errors.form}
              </p>
            )}

            <Input
              label={t('login.emailLabel')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder={t('login.emailPlaceholder')}
              required
            />
            <Input
              label={t('login.passwordLabel')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helpText={t('login.passwordHelp')}
              required
              minLength={6}
            />

            <Button type="submit" className="w-full" loading={loading} size="lg">
              {t('login.submit')}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[color:var(--muted)]">
            {t('login.needAccount')}{' '}
            <Link href="/register" className="font-semibold text-[color:var(--brand-strong)]">
              {t('login.createOne')}
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
