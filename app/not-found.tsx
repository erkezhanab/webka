import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Card, { CardBody } from '@/app/components/ui/Card';

export default function NotFound() {
  return (
    <Card hover={false} className="mx-auto mt-8 max-w-2xl">
      <CardBody className="py-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-strong)]">404</p>
        <h1 className="section-title mt-4 text-4xl font-bold text-[color:var(--ink)]">Page not found</h1>
        <p className="mx-auto mt-3 max-w-lg text-[color:var(--muted)]">
          The page you requested may have moved, been removed, or the link is no longer valid.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>Return Home</Button>
        </Link>
      </CardBody>
    </Card>
  );
}
