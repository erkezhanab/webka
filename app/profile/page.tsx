'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Card, { CardBody, CardHeader } from '@/app/components/ui/Card';
import Badge from '@/app/components/ui/Badge';

export default function Profile() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Card hover={false} className="mx-auto max-w-xl">
        <CardBody className="py-14 text-center">
          <h1 className="section-title text-4xl font-bold text-[color:var(--ink)]">Sign in required</h1>
          <p className="mt-3 text-[color:var(--muted)]">Please log in to access your profile and workspace.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Go Home</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  const roleColors: Record<string, 'success' | 'primary' | 'warning' | 'danger'> = {
    admin: 'danger',
    author: 'primary',
    reader: 'success',
  };

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[32px] px-6 py-8 sm:px-8">
        <span className="eyebrow">Profile</span>
        <h1 className="section-title mt-5 text-4xl font-bold tracking-[-0.05em] text-[color:var(--ink)] sm:text-5xl">
          Personal workspace for your account and publishing access.
        </h1>
      </section>

      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <h2 className="section-title text-3xl font-bold text-[color:var(--ink)]">My Profile</h2>
        </CardHeader>
        <CardBody className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">Full Name</p>
              <p className="mt-2 text-xl font-semibold text-[color:var(--ink)]">{session.user.name}</p>
            </div>
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">Email</p>
              <p className="mt-2 text-xl font-semibold text-[color:var(--ink)]">{session.user.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold text-[color:var(--muted)]">Role</p>
            {session.user.role && (
              <Badge variant={roleColors[session.user.role] || 'default'}>
                {session.user.role.charAt(0).toUpperCase() + session.user.role.slice(1)}
              </Badge>
            )}
          </div>

          <div className="rounded-[24px] border border-[color:var(--line)] bg-white/70 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">Account ID</p>
            <p className="mt-2 break-all font-mono text-sm text-[color:var(--ink)]">{session.user.id}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/articles" className="flex-1">
              <Button variant="outline" className="w-full">
                Browse Articles
              </Button>
            </Link>
            <Link href="/create-article" className="flex-1">
              <Button className="w-full">Create Article</Button>
            </Link>
            <Button
              variant="danger"
              className="flex-1"
              onClick={async () => {
                await signOut({ redirect: true, callbackUrl: '/' });
              }}
            >
              Sign Out
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}