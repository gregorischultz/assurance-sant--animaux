import type { Metadata } from 'next';
import ComparateurFilters from '@/components/ComparateurFilters';
import StickyMobileCta from '@/components/StickyMobileCta';
import JsonLd from '@/components/JsonLd';
import { offers } from '@/content/data/offers';
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { affiliatesEnabled } from '@/lib/flags';

export const metadata: Metadata = buildMetadata({
  title: 'Comparatif des assurances chien & chat 2026',
  description:
    "Comparez les 8 meilleures assurances santé chien et chat : prix, franchise, plafond, délai de carence. Classement indépendant, mis à jour en 2026.",
  path: '/comparatif',
});

export default function ComparatifPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Accueil', path: '/' },
            { name: 'Comparatif', path: '/comparatif' },
          ]),
          itemListJsonLd(
            offers.map((o) => ({
              name: o.name,
              rating: o.rating,
              priceFrom: o.priceFrom,
              url: `${siteConfig.url}/comparatif`,
            })),
          ),
        ]}
      />

      <div className="container-content py-12 pb-24 md:pb-12">
        <header className="max-w-content">
          <h1 className="font-display text-m-h2 font-bold leading-tight text-ink md:text-h1">
            Comparatif des assurances chien & chat 2026
          </h1>
          <p className="mt-4 text-lead text-muted">
            {offers.length} assureurs analysés. Classement indépendant, mis à jour en mars 2026.
          </p>
        </header>

        <div className="mt-8">
          <ComparateurFilters />
        </div>

        <p className="mt-8 max-w-reading text-caption text-muted">
          Classement établi selon le rapport garanties/prix.{' '}
          {affiliatesEnabled && (
            <>
              Certains liens sont des liens d&apos;affiliation : une commission peut nous être versée sans
              surcoût pour vous.{' '}
            </>
          )}
          Les tarifs affichés sont indicatifs et « à partir de » — le prix final dépend de l&apos;âge, de
          la race et de la formule choisie.
        </p>
      </div>

      <StickyMobileCta href="#" label="Voir les offres" note="Gratuit" />
    </>
  );
}
