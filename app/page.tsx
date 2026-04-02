import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Card, { CardBody } from '@/app/components/ui/Card';

const features = [
  {
    title: 'Fast reading flow',
    description: 'A cleaner article experience helps visitors scan, save, and come back for more.',
  },
  {
    title: 'Built for creators',
    description: 'Writers can move from idea to published story in a simple, polished editor flow.',
  },
  {
    title: 'Editorial clarity',
    description: 'Better spacing, stronger hierarchy, and clearer calls to action across every page.',
  },
];

const stats = [
  { value: '24/7', label: 'publishing rhythm' },
  { value: '100%', label: 'responsive layout' },
  { value: '1 hub', label: 'for readers and authors' },
];

export default function Home() {
  return (
    <div className="space-y-8 pb-6">
      <section className="hero-grid glass-panel overflow-hidden rounded-[36px] px-6 py-10 sm:px-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="eyebrow">Modern editorial platform</span>
            <div className="space-y-4">
              <h1 className="section-title max-w-3xl text-5xl font-bold tracking-[-0.06em] text-[color:var(--ink)] sm:text-6xl">
                Modern news publishing with a calmer, sharper reading experience.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
                NewsHub now feels like a real product: cleaner typography, stronger hierarchy, and a more premium path
                from discovery to publishing.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/articles">
                <Button size="lg">Explore Articles</Button>
              </Link>
              <Link href="/create-article">
                <Button size="lg" variant="outline">
                  Start Writing
                </Button>
              </Link>
            </div>
          </div>

          <Card hover={false} className="relative border-white/60 bg-white/88">
            <CardBody className="space-y-6 p-7">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-strong)]">
                  Live preview
                </span>
                <span className="rounded-full bg-[rgba(20,184,166,0.14)] px-3 py-1 text-xs font-semibold text-[color:var(--success)]">
                  Refreshed UI
                </span>
              </div>
              <div className="rounded-[28px] bg-[linear-gradient(135deg,#0f62fe,#14b8a6)] p-6 text-white shadow-[0_24px_40px_rgba(15,98,254,0.24)]">
                <p className="mb-4 text-sm uppercase tracking-[0.16em] text-white/75">Featured story</p>
                <h2 className="section-title text-3xl font-bold tracking-[-0.05em]">
                  Design updates that make content feel more trustworthy.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/84">
                  Better contrast, better rhythm, and better focus on what matters: the writing itself.
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
            <span className="eyebrow border-white/20 bg-white/10 text-white">Ready to publish</span>
            <h2 className="section-title mt-4 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
              Turn readers into contributors with a cleaner creation flow.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/80">
              Register, sign in, and start publishing with a more polished interface across the full site.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#0f62fe] shadow-none hover:bg-slate-100">
                Create Account
              </Button>
            </Link>
            <Link href="/articles">
              <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/16">
                Browse Feed
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
