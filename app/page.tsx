import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import OfferCard from '@/components/OfferCard';
import ArticleCard from '@/components/ArticleCard';
import Faq from '@/components/Faq';
import CtaButton from '@/components/CtaButton';
import StickyMobileCta from '@/components/StickyMobileCta';
import JsonLd from '@/components/JsonLd';
import { topOffers } from '@/content/data/offers';
import { getGuidesMeta } from '@/lib/mdx';
import { buildMetadata, faqJsonLd } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: '/',
});

const steps = [
  { n: 1, title: 'Décrivez votre animal', text: 'Chien ou chat, âge, race : quelques secondes suffisent pour personnaliser votre comparaison.' },
  { n: 2, title: 'Comparez les offres', text: 'Prix, remboursement, franchise et délai de carence : tout est réuni sur un seul écran.' },
  { n: 3, title: 'Souscrivez en ligne', text: 'Choisissez l’offre qui vous protège et souscrivez en quelques clics, sans engagement.' },
];

const homeFaq = [
  {
    q: "L'assurance santé animale est-elle vraiment utile ?",
    a: "Oui : une seule opération (fracture, ingestion, maladie chronique) peut coûter plusieurs centaines à plusieurs milliers d'euros. L'assurance lisse ces dépenses et évite les renoncements aux soins.",
  },
  {
    q: 'Le comparateur est-il vraiment gratuit ?',
    a: "Totalement. Poilou est financé par des commissions d'affiliation versées par les assureurs, sans aucun surcoût pour vous. Notre classement reste indépendant, basé sur les garanties réelles.",
  },
  {
    q: "Qu'est-ce que le délai de carence ?",
    a: "C'est la période après la souscription pendant laquelle vous cotisez sans être encore couvert. Il est court pour les accidents (0 à quelques jours) et plus long pour les maladies (jusqu'à 45 jours).",
  },
  {
    q: 'Mon animal âgé peut-il être assuré ?',
    a: "Souvent oui, mais les cotisations sont plus élevées et certains assureurs fixent une limite d'âge à l'adhésion. Il est donc préférable d'assurer son animal jeune.",
  },
];

export default function HomePage() {
  const top3 = topOffers(3);
  const latestGuides = getGuidesMeta().slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaq)} />

      <Hero />
      <TrustBar />

      {/* Top 3 des mutuelles */}
      <section className="container-content py-18">
        <div className="mx-auto max-w-reading text-center">
          <span className="text-micro font-semibold uppercase tracking-wide text-primary">
            Notre sélection 2026
          </span>
          <h2 className="mt-2 font-display text-m-h2 font-bold text-ink md:text-h2">
            Le top 3 des mutuelles chien & chat
          </h2>
          <p className="mt-3 text-body text-muted">
            Comparées sur le prix, le taux de remboursement et le délai de carence.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-center">
          {top3.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} featured={i === 1} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <CtaButton href="/comparatif" variant="ghost">
            Voir le comparatif complet des 8 assureurs →
          </CtaButton>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-primary-tint2 py-18">
        <div className="container-content">
          <h2 className="text-center font-display text-m-h2 font-bold text-ink md:text-h2">
            Comment ça marche ?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary font-display text-title font-bold text-white shadow-card-primary">
                  {s.n}
                </span>
                <h3 className="mt-5 font-display text-title font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-body-sm text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides & conseils */}
      <section className="container-content py-18">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-m-h2 font-bold text-ink md:text-h2">Guides & conseils</h2>
            <p className="mt-2 text-body text-muted">
              Tout comprendre avant d&apos;assurer votre compagnon.
            </p>
          </div>
          <Link
            href="/guides"
            className="hidden shrink-0 text-body-sm font-semibold text-accent-fill hover:text-accent-fill-hover sm:block"
          >
            Tous les guides →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {latestGuides.map((g) => (
            <ArticleCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background-2 py-18">
        <div className="container-content">
          <h2 className="text-center font-display text-m-h2 font-bold text-ink md:text-h2">
            Questions fréquentes
          </h2>
          <div className="mt-10">
            <Faq items={homeFaq} />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-primary">
        <div className="container-content py-16 text-center text-white">
          <h2 className="font-display text-m-h2 font-bold text-white md:text-h2">
            Prêt à protéger votre compagnon ?
          </h2>
          <p className="mx-auto mt-3 max-w-reading text-lead text-primary-tint">
            Comparez gratuitement les meilleures assurances chien et chat. Sans engagement.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton href="/comparatif">Comparer les offres →</CtaButton>
          </div>
        </div>
      </section>

      <StickyMobileCta />
    </>
  );
}
