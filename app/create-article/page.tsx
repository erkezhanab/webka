'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import Input, { TextArea } from '@/app/components/ui/Input';
import Card, { CardBody, CardHeader } from '@/app/components/ui/Card';
import { useToast } from '@/app/components/ui/Toast';
import { useI18n } from '@/app/components/I18nProvider';

export default function CreateArticle() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const { t, translateError } = useI18n();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!session) {
    return <p className="py-16 text-center text-[color:var(--muted)]">{t('createArticle.redirectingLogin')}</p>;
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (title.trim().length < 5) newErrors.title = t('createArticle.invalidTitle');
    if (content.trim().length < 20) newErrors.content = t('createArticle.invalidContent');
    if (image && !/^https?:\/\/.+/.test(image)) newErrors.image = t('createArticle.invalidImage');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
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
        throw new Error(data.error || 'Failed to create article');
      }

      showToast(t('createArticle.success'), 'success');
      setTimeout(() => router.push('/articles'), 900);
    } catch (err: unknown) {
      const message = err instanceof Error ? translateError(err.message) : t('common.unknownError');
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[32px] px-6 py-8 sm:px-8">
        <span className="eyebrow">{t('createArticle.eyebrow')}</span>
        <h1 className="section-title mt-5 text-4xl font-bold tracking-[-0.05em] text-[color:var(--ink)] sm:text-5xl">
          {t('createArticle.title')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
          {t('createArticle.description')}
        </p>
      </section>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <h2 className="section-title text-3xl font-bold text-[color:var(--ink)]">{t('createArticle.formTitle')}</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">{t('createArticle.formDescription')}</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label={t('createArticle.titleLabel')}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              placeholder={t('createArticle.titlePlaceholder')}
              required
              minLength={5}
            />
            <TextArea
              label={t('createArticle.contentLabel')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={errors.content}
              placeholder={t('createArticle.contentPlaceholder')}
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
              placeholder={t('createArticle.imagePlaceholder')}
            />
            <Input
              label={t('createArticle.tagsLabel')}
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder={t('createArticle.tagsPlaceholder')}
            />

            <Button type="submit" className="w-full" loading={loading} size="lg">
              {t('createArticle.submit')}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
