'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import Card, { CardBody, CardHeader } from '@/app/components/ui/Card';
import { useToast } from '@/app/components/ui/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim() || !/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
        showToast('Invalid email or password', 'error');
        setErrors({ form: 'Invalid email or password' });
      } else {
        showToast('Login successful', 'success');
        router.push('/');
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Unknown error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <section className="glass-panel rounded-[32px] px-6 py-8 sm:px-8">
        <span className="eyebrow">Welcome back</span>
        <h1 className="section-title mt-5 text-4xl font-bold tracking-[-0.05em] text-[color:var(--ink)] sm:text-5xl">
          Sign in and continue publishing with confidence.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
          Access your profile, manage articles, and keep your editorial workflow moving.
        </p>
      </section>

      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <h2 className="section-title text-3xl font-bold text-[color:var(--ink)]">Log In</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">Use your account details to enter the platform.</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {errors.form && (
              <p className="rounded-[20px] border border-[rgba(209,67,67,0.18)] bg-[rgba(209,67,67,0.08)] px-4 py-3 text-sm text-[color:var(--danger)]">
                {errors.form}
              </p>
            )}

            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} helpText="At least 6 characters" required minLength={6} />

            <Button type="submit" className="w-full" loading={loading} size="lg">
              Enter Workspace
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[color:var(--muted)]">
            Need an account?{' '}
            <Link href="/register" className="font-semibold text-[color:var(--brand-strong)]">
              Create one
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
