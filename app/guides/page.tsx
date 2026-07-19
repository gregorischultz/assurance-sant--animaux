import Link from 'next/link';
import type { Metadata } from 'next';
import { getGuidesMeta } from '@/lib/mdx';
import ArticleCard from '@/components/ArticleCard';
import JsonLd from '@/components/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Guides & conseils assurance chien et chat',
  description:
    'Tous nos guides pour bien choisir une assurance santé pour votre chien ou votre chat : prix, garanties, âge de souscription, lexique et comparatifs.',
  path: '/guides',
});

const filters = [
  { key: 'all', label: 'Tous' },
  { key: 'chien', label: '🐶 Chien' },
  { key: 'chat', label: '🐱 Chat' },
  { key: 'lapin', label: '🐰 Lapin' },
  { key: 'general', label: 'Général' },
];

export default function GuidesIndexPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const active = searchParams.category ?? 'all';
  const all = getGuidesMeta();
  const guides = active === 'all' ? all : all.filter((g) => g.category === active);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Guides', path: '/guides' },
        ])}
      />

      <div className="container-content py-12">
        <header className="max-w-reading">
          <h1 className="font-display text-m-h2 font-bold leading-tight text-ink md:text-h1">
            Guides & conseils
          </h1>
          <p className="mt-4 text-lead text-muted">
            Tout comprendre avant d&apos;assurer votre animal : prix, garanties, âge de souscription et
            pièges à éviter. Des guides indépendants, relus par une vétérinaire.
          </p>
        </header>

        {/* Filtres par catégorie */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = active === f.key || (f.key === 'all' && active === 'all');
            return (
              <Link
                key={f.key}
                href={f.key === 'all' ? '/guides' : `/guides?category=${f.key}`}
                className={`rounded-pill px-4 py-2 text-small font-semibold transition ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'border border-line bg-surface text-muted hover:border-primary'
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        {/* Grille d'articles */}
        {guides.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <ArticleCard key={g.slug} guide={g} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-body text-muted">Aucun guide dans cette catégorie pour le moment.</p>
        )}
      </div>
    </>
  );
}
