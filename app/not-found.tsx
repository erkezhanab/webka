'use client';

import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Card, { CardBody } from '@/app/components/ui/Card';
import { useI18n } from '@/app/components/I18nProvider';

export default function NotFound() {
  const { t } = useI18n();

  return (
    <Card hover={false} className="mx-auto mt-8 max-w-2xl">
      <CardBody className="py-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-strong)]">404</p>
        <h1 className="section-title mt-4 text-4xl font-bold text-[color:var(--ink)]">{t('notFound.title')}</h1>
        <p className="mx-auto mt-3 max-w-lg text-[color:var(--muted)]">
          {t('notFound.description')}
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>{t('notFound.returnHome')}</Button>
        </Link>
      </CardBody>
    </Card>
  );
}
