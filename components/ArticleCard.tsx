import Link from 'next/link';
import type { GuideMeta } from '@/lib/mdx';

const categoryLabel: Record<string, string> = {
  chien: 'Guide chien',
  chat: 'Guide chat',
  general: 'Guide',
};

/** Carte d'article pour l'index /guides et la section « Guides & conseils » de la home. */
export default function ArticleCard({ guide }: { guide: GuideMeta }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition hover:-translate-y-1 hover:shadow-float"
    >
      <div className="aspect-[16/9] w-full bg-bg-2" aria-hidden="true">
        {/* Placeholder image — remplacer par <Image> quand cover disponible */}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-micro font-semibold uppercase tracking-wide text-green">
          {categoryLabel[guide.category] ?? categoryLabel.general}
        </span>
        <h3 className="mt-2 font-display text-title font-bold leading-snug text-ink group-hover:text-green-dark">
          {guide.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-body-sm text-muted">{guide.description}</p>
        <span className="mt-4 text-small font-semibold text-cta">Lire le guide →</span>
      </div>
    </Link>
  );
}
