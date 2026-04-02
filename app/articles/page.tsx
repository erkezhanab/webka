'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import Card, { CardBody } from '@/app/components/ui/Card';
import Badge from '@/app/components/ui/Badge';
import { CardSkeleton } from '@/app/components/ui/Skeleton';

interface Article {
  _id: string;
  title: string;
  content: string;
  author: { name: string };
  image?: string;
  createdAt: string;
  tags?: string[];
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/articles');
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to load articles');
        }

        const data = await res.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  useEffect(() => {
    let result = articles;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.author.name.toLowerCase().includes(query)
      );
    }

    result = [...result].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredArticles(result);
  }, [articles, searchQuery, sortBy]);

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[32px] px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <span className="eyebrow">Article feed</span>
            <h1 className="section-title text-4xl font-bold tracking-[-0.05em] text-[color:var(--ink)] sm:text-5xl">
              Discover fresh stories from the community.
            </h1>
            <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              Search, filter, and explore articles in a cleaner magazine-style feed.
            </p>
          </div>
          <Link href="/create-article">
            <Button size="lg">Publish Article</Button>
          </Link>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <Input
            type="text"
            placeholder="Search by title, author, or content"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <div className="flex items-center gap-2">
            <Button variant={sortBy === 'newest' ? 'primary' : 'outline'} size="sm" onClick={() => setSortBy('newest')}>
              Newest
            </Button>
            <Button variant={sortBy === 'oldest' ? 'primary' : 'outline'} size="sm" onClick={() => setSortBy('oldest')}>
              Oldest
            </Button>
          </div>
          <div className="rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm text-[color:var(--muted)]">
            {filteredArticles.length} result{filteredArticles.length === 1 ? '' : 's'}
          </div>
        </div>
      </section>

      {error && (
        <div role="alert" className="rounded-[24px] border border-[rgba(209,67,67,0.2)] bg-[rgba(209,67,67,0.08)] px-5 py-4 text-sm text-[color:var(--danger)]">
          {error}
        </div>
      )}

      {loading && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && filteredArticles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link key={article._id} href={`/articles/${article._id}`} className="block h-full">
              <Card className="flex h-full flex-col">
                <div className="relative h-56 overflow-hidden bg-[linear-gradient(135deg,#dbeafe,#ecfeff)]">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      Editorial cover
                    </div>
                  )}
                </div>
                <CardBody className="flex flex-1 flex-col gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {article.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="section-title text-2xl font-bold tracking-[-0.04em] text-[color:var(--ink)]">
                      {article.title}
                    </h2>
                    <p className="line-clamp-3 text-sm leading-7 text-[color:var(--muted)]">{article.content}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-[color:var(--line)] pt-4 text-sm text-[color:var(--muted)]">
                    <span>{article.author.name}</span>
                    <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : null}

      {!loading && filteredArticles.length === 0 && !error ? (
        <Card hover={false}>
          <CardBody className="py-14 text-center">
            <h2 className="section-title text-3xl font-bold text-[color:var(--ink)]">No articles matched your search.</h2>
            <p className="mx-auto mt-3 max-w-xl text-[color:var(--muted)]">
              Try a different keyword or publish the first story for this topic.
            </p>
            <Link href="/create-article" className="mt-6 inline-block">
              <Button>Create the First One</Button>
            </Link>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
