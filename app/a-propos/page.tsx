import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import AuthorBio from '@/components/AuthorBio';
import CtaButton from '@/components/CtaButton';
import { authors } from '@/content/data/author';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'À propos de Poilou',
  description:
    "Qui sommes-nous ? Notre méthodologie de comparaison indépendante des assurances santé pour chien et chat, et l'équipe derrière Poilou.",
  path: '/a-propos',
});

const method = [
  {
    title: 'Des critères objectifs',
    text: 'Nous comparons chaque offre sur le prix, le taux de remboursement, la franchise, le plafond annuel et le délai de carence — les critères qui comptent vraiment.',
  },
  {
    title: 'Une indépendance affichée',
    text: 'Nos revenus proviennent de commissions d’affiliation, sans surcoût pour vous. Elles n’influencent jamais notre classement, fondé sur le rapport garanties/prix.',
  },
  {
    title: 'Une relecture vétérinaire',
    text: 'Nos guides de santé sont relus par une vétérinaire diplômée d’État pour en garantir l’exactitude médicale.',
  },
];

export default function AProposPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'À propos', path: '/a-propos' },
        ])}
      />

      <div className="container-content py-12">
        <header className="max-w-reading">
          <h1 className="font-display text-m-h2 font-bold leading-tight text-ink md:text-h1">
            À propos de {siteConfig.name}
          </h1>
          <p className="mt-4 text-lead text-muted">
            Nous aidons les maîtres français à protéger leur chien ou leur chat sans se ruiner, grâce à des
            comparaisons indépendantes et des guides fiables.
          </p>
        </header>

        <section id="methodologie" className="mt-14 scroll-mt-24">
          <h2 className="font-display text-h4 font-bold text-ink">Notre méthodologie</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {method.map((m) => (
              <div key={m.title} className="rounded-2xl border border-line bg-card p-6 shadow-card">
                <h3 className="font-display text-title font-bold text-ink">{m.title}</h3>
                <p className="mt-2 text-body-sm text-muted">{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-h4 font-bold text-ink">L&apos;équipe</h2>
          <div className="mt-6 max-w-reading">
            {Object.values(authors).map((a) => (
              <AuthorBio key={a.id} author={a} />
            ))}
          </div>
        </section>

        <section id="contact" className="mt-8 scroll-mt-24 rounded-3xl bg-green px-6 py-12 text-center text-white">
          <h2 className="font-display text-h4 font-bold text-white">Une question ?</h2>
          <p className="mt-2 text-body-sm text-green-tint">
            Écrivez-nous à{' '}
            <a href={`mailto:${siteConfig.email}`} className="underline">
              {siteConfig.email}
            </a>{' '}
            — nous répondons sous 48 h.
          </p>
          <div className="mt-6 flex justify-center">
            <CtaButton href="/comparatif">Comparer les offres →</CtaButton>
          </div>
        </section>
      </div>
    </>
  );
}
