'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Badge from '@/app/components/ui/Badge';
import Card, { CardBody } from '@/app/components/ui/Card';
import { ArticleDetailSkeleton } from '@/app/components/ui/Skeleton';
import { useToast } from '@/app/components/ui/Toast';
import { useI18n } from '@/app/components/I18nProvider';

interface Article {
  _id: string;
  title: string;
  content: string;
  author: { name: string; _id: string };
  image?: string;
  createdAt: string;
  tags?: string[];
}

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { data: session } = useSession();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const { showToast } = useToast();
  const { t, formatDate, translateError } = useI18n();

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Article not found');
        }

        const data = await res.json();
        setArticle(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? translateError(err.message) : t('common.unknownError'));
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadArticle();
    }
  }, [id, t, translateError]);

  const isAuthor = session?.user?.id === article?.author._id || session?.user?.role === 'admin';

  const handleDelete = async () => {
    if (!confirm(t('article.confirmDelete'))) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete article');
      }

      showToast(t('article.deleteSuccess'), 'success');
      router.push('/articles');
    } catch (err: unknown) {
      const message = err instanceof Error ? translateError(err.message) : t('common.unknownError');
      showToast(message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl py-4">
        <ArticleDetailSkeleton />
      </div>
    );
  }

  if (error || !article) {
    return (
      <Card hover={false} className="mx-auto max-w-2xl">
        <CardBody className="py-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--danger)]">{t('article.unavailable')}</p>
          <h1 className="section-title mt-4 text-4xl font-bold text-[color:var(--ink)]">{t('article.notFoundTitle')}</h1>
          <p className="mx-auto mt-3 max-w-lg text-[color:var(--muted)]">
            {error || t('article.notFoundDescription')}
          </p>
          <Link href="/articles" className="mt-6 inline-block">
            <Button>{t('article.backToArticles')}</Button>
          </Link>
        </CardBody>
      </Card>
    );
  }

  return (
    <article className="mx-auto max-w-5xl space-y-8">
      <Link href="/articles" className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[color:var(--muted)] transition hover:bg-white hover:text-[color:var(--ink)]">
        {t('article.backToFeed')}
      </Link>

      <section className="overflow-hidden rounded-[36px] border border-[color:var(--line)] bg-[color:var(--panel)] shadow-[var(--shadow-lg)]">
        {article.image ? (
          <div className="relative h-[24rem] w-full overflow-hidden bg-[linear-gradient(135deg,#dbeafe,#ecfeff)]">
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          </div>
        ) : (
          <div className="flex h-[24rem] items-center justify-center bg-[linear-gradient(135deg,#dbeafe,#ecfeff)] px-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            {t('article.featuredVisual')}
          </div>
        )}

        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
          <header className="space-y-5 border-b border-[color:var(--line)] pb-8">
            <div className="flex flex-wrap gap-2">
              {article.tags?.map((tag) => (
                <Badge key={tag} variant="primary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="section-title max-w-4xl text-4xl font-bold tracking-[-0.05em] text-[color:var(--ink)] sm:text-6xl">
              {article.title}
            </h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted)]">{t('article.writtenBy')}</p>
                <p className="mt-1 text-lg font-semibold text-[color:var(--ink)]">{article.author.name}</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  {formatDate(article.createdAt, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              {isAuthor && (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={`/articles/${article._id}/edit`}>
                    <Button variant="secondary">{t('article.editArticle')}</Button>
                  </Link>
                  <Button variant="danger" loading={deleting} onClick={handleDelete}>
                    {t('article.deleteArticle')}
                  </Button>
                </div>
              )}
            </div>
          </header>

          <section className="article-prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </section>
        </div>
      </section>
    </article>
  );
}
