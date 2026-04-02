"use client";

import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Card, { CardBody } from '@/app/components/ui/Card';
import { useI18n } from '@/app/components/I18nProvider';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const { t, translateError } = useI18n();

  return (
    <Card hover={false} className="mx-auto mt-8 max-w-2xl">
      <CardBody className="py-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--danger)]">{t('error.label')}</p>
        <h1 className="section-title mt-4 text-4xl font-bold text-[color:var(--ink)]">{t('error.title')}</h1>
        <p className="mx-auto mt-3 max-w-lg text-[color:var(--muted)]">
          {error?.message ? translateError(error.message) : t('error.fallback')}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => reset()}>{t('error.retry')}</Button>
          <Link href="/">
            <Button variant="outline">{t('common.goHome')}</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
