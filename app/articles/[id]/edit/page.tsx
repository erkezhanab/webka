'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import Input, { TextArea } from '@/app/components/ui/Input';
import Card, { CardBody, CardHeader } from '@/app/components/ui/Card';
import { useToast } from '@/app/components/ui/Toast';
import { ArticleDetailSkeleton } from '@/app/components/ui/Skeleton';
import { useI18n } from '@/app/components/I18nProvider';

interface Article {
  _id: string;
  title: string;
  content: string;
  image?: string;
  tags?: string[];
  author: { _id: string; name: string };
}

export default function EditArticle() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();
  const { t, translateError } = useI18n();

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) throw new Error('Article not found');
        const data = await res.json();
        setArticle(data);
        setTitle(data.title);
        setContent(data.content);
        setImage(data.image || '');
        setTags(data.tags?.join(', ') || '');
      } catch (err: unknown) {
        const message = err instanceof Error ? translateError(err.message) : t('editArticle.loadFailed');
        showToast(message, 'error');
        router.push('/articles');
      } finally {
        setLoading(false);
      }
    }

    if (id) loadArticle();
  }, [id, router, showToast, t, translateError]);

  useEffect(() => {
    if (!session) {
      router.push('/login');
    } else if (article && session.user?.id !== article.author._id && session.user?.role !== 'admin') {
      showToast(t('editArticle.ownOnly'), 'error');
      router.push(`/articles/${id}`);
    }
  }, [session, article, router, id, showToast, t]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (title.trim().length < 5) newErrors.title = t('editArticle.invalidTitle');
    if (content.trim().length < 20) newErrors.content = t('editArticle.invalidContent');
    if (image && !/^https?:\/\/.+/.test(image)) newErrors.image = t('editArticle.invalidImage');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          image,
          tags: tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update article');
      }

      showToast(t('editArticle.success'), 'success');
      setTimeout(() => router.push(`/articles/${id}`), 900);
    } catch (err: unknown) {
      const message = err instanceof Error ? translateError(err.message) : t('common.unknownError');
      showToast(message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-4">
        <ArticleDetailSkeleton />
      </div>
    );
  }

  if (!article || !session) {
    return null;
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[32px] px-6 py-8 sm:px-8">
        <span className="eyebrow">{t('editArticle.eyebrow')}</span>
        <h1 className="section-title mt-5 text-4xl font-bold tracking-[-0.05em] text-[color:var(--ink)] sm:text-5xl">
          {t('editArticle.title')}
        </h1>
      </section>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <h2 className="section-title text-3xl font-bold text-[color:var(--ink)]">{t('editArticle.formTitle')}</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">{t('editArticle.formDescription')}</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label={t('createArticle.titleLabel')}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              required
              minLength={5}
            />
            <TextArea
              label={t('createArticle.contentLabel')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={errors.content}
              required
              minLength={20}
              rows={12}
            />
            <Input
              label={t('createArticle.imageLabel')}
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              error={errors.image}
            />
            <Input
              label={t('createArticle.tagsLabel')}
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder={t('createArticle.tagsPlaceholder')}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" className="flex-1" loading={saving} size="lg">
                {t('editArticle.submit')}
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => router.push(`/articles/${id}`)}>
                {t('editArticle.cancel')}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
