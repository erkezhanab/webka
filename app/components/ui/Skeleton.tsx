export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[color:var(--line)] bg-white/80 shadow-[var(--shadow-md)]">
      <div className="h-52 w-full animate-pulse bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
      <div className="space-y-3 px-6 py-5">
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
        <div className="h-4 w-full animate-pulse rounded-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
      </div>
    </div>
  );
}

export function ArticleDetailSkeleton() {
  return (
    <article>
      <div className="mb-6 h-80 w-full animate-pulse rounded-[32px] bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
      <div className="mb-6 space-y-3">
        <div className="h-10 w-3/4 animate-pulse rounded-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
        <div className="h-4 w-2/4 animate-pulse rounded-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
      </div>
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 w-full animate-pulse rounded-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
        ))}
      </div>
    </article>
  );
}
