'use client';

import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Card, { CardBody } from '@/app/components/ui/Card';
import { useI18n } from '@/app/components/I18nProvider';

export default function Home() {
  const { t } = useI18n();

  const features = [
    {
      title: t('home.featureFastTitle'),
      description: t('home.featureFastDescription'),
    },
    {
      title: t('home.featureCreatorsTitle'),
      description: t('home.featureCreatorsDescription'),
    },
    {
      title: t('home.featureClarityTitle'),
      description: t('home.featureClarityDescription'),
    },
  ];

  const stats = [
    { value: '24/7', label: t('home.statPublishingRhythm') },
    { value: '100%', label: t('home.statResponsiveLayout') },
    { value: '1 hub', label: t('home.statReadersAuthors') },
  ];

  return (
    <div className="space-y-8 pb-6">
      <section className="hero-grid glass-panel overflow-hidden rounded-[36px] px-6 py-10 sm:px-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="eyebrow">{t('home.eyebrow')}</span>
            <div className="space-y-4">
              <h1 className="section-title max-w-3xl text-5xl font-bold tracking-[-0.06em] text-[color:var(--ink)] sm:text-6xl">
                {t('home.title')}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
                {t('home.description')}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/articles">
                <Button size="lg">{t('home.exploreArticles')}</Button>
              </Link>
              <Link href="/create-article">
                <Button size="lg" variant="outline">
                  {t('home.startWriting')}
                </Button>
              </Link>
            </div>
          </div>

          <Card hover={false} className="relative border-white/60 bg-white/88">
            <CardBody className="space-y-6 p-7">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-strong)]">
                  {t('home.livePreview')}
                </span>
                <span className="rounded-full bg-[rgba(20,184,166,0.14)] px-3 py-1 text-xs font-semibold text-[color:var(--success)]">
                  {t('home.refreshedUi')}
                </span>
              </div>
              <div className="rounded-[28px] bg-[linear-gradient(135deg,#0f62fe,#14b8a6)] p-6 text-white shadow-[0_24px_40px_rgba(15,98,254,0.24)]">
                <p className="mb-4 text-sm uppercase tracking-[0.16em] text-white/75">{t('home.featuredStory')}</p>
                <h2 className="section-title text-3xl font-bold tracking-[-0.05em]">
                  {t('home.featuredStoryTitle')}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/84">
                  {t('home.featuredStoryDescription')}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-[22px] border border-[color:var(--line)] bg-white px-4 py-4">
                    <div className="section-title text-2xl font-bold text-[color:var(--ink)]">{stat.value}</div>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardBody className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,rgba(15,98,254,0.14),rgba(20,184,166,0.18))]" />
              <h2 className="section-title text-2xl font-bold text-[color:var(--ink)]">{feature.title}</h2>
              <p className="leading-7 text-[color:var(--muted)]">{feature.description}</p>
            </CardBody>
          </Card>
        ))}
      </section>

      <section className="overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#132238,#0f62fe)] px-6 py-10 text-white shadow-[var(--shadow-lg)] sm:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow border-white/20 bg-white/10 text-white">{t('home.readyEyebrow')}</span>
            <h2 className="section-title mt-4 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
              {t('home.readyTitle')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/80">
              {t('home.readyDescription')}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#0f62fe] shadow-none hover:bg-slate-100">
                {t('home.createAccount')}
              </Button>
            </Link>
            <Link href="/articles">
              <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/16">
                {t('home.browseFeed')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
