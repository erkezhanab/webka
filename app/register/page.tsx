'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import Card, { CardBody, CardHeader } from '@/app/components/ui/Card';
import { useToast } from '@/app/components/ui/Toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (name.trim().length < 2) newErrors.name = 'Name must contain at least 2 characters';
    if (!/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(email)) newErrors.email = 'Please enter a valid email address';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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

      showToast('Registration successful. Redirecting to login...', 'success');
      setTimeout(() => router.push('/login'), 800);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Unknown error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <section className="glass-panel rounded-[32px] px-6 py-8 sm:px-8">
        <span className="eyebrow">Join the platform</span>
        <h1 className="section-title mt-5 text-4xl font-bold tracking-[-0.05em] text-[color:var(--ink)] sm:text-5xl">
          Create an account for publishing, editing, and growing your audience.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
          Set up your profile once and use it across the full NewsHub editorial experience.
        </p>
      </section>

      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <h2 className="section-title text-3xl font-bold text-[color:var(--ink)]">Create Account</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">Join the community and start publishing.</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder="John Doe" required minLength={2} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} helpText="At least 6 characters" required minLength={6} />
            <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors.confirmPassword} required minLength={6} />

            <Button type="submit" className="w-full" loading={loading} size="lg">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[color:var(--muted)]">
            Already registered?{' '}
            <Link href="/login" className="font-semibold text-[color:var(--brand-strong)]">
              Log in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
