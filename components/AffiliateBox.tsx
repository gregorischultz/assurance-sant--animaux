import { getOffer } from '@/content/data/offers';
import CtaButton from './CtaButton';
import StarRating from './StarRating';
import { affiliatesEnabled } from '@/lib/flags';

/**
 * Bloc « 💡 Notre recommandation » à insérer au milieu des articles MDX.
 * Usage MDX : <AffiliateBox offerId="kozoo" />
 */
export default function AffiliateBox({
  offerId,
  title = '💡 Notre recommandation',
}: {
  offerId: string;
  title?: string;
}) {
  // Feature flag : le bloc entier est masqué tant que l'affiliation est désactivée
  // (aucun espace vide laissé dans l'article).
  if (!affiliatesEnabled) return null;

  const offer = getOffer(offerId);
  if (!offer || !offer.affiliateUrl) return null;

  return (
    <aside className="not-prose my-8 rounded-2xl border border-accent-border bg-accent-tint2 p-6">
      <p className="font-display text-body-sm font-semibold text-accent-active">{title}</p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-title font-bold text-ink">{offer.name}</span>
            <StarRating rating={offer.rating} />
          </div>
          <p className="mt-1 text-body-sm text-text">
            À partir de <strong className="text-primary">{offer.priceFrom}€/mois</strong> · Plafond{' '}
            {offer.plafond.toLocaleString('fr-FR')}€/an · Carence {offer.delaiCarence}
          </p>
        </div>
        <CtaButton href={offer.affiliateUrl} affiliate ariaLabel={`Obtenir un devis ${offer.name}`}>
          Obtenir un devis →
        </CtaButton>
      </div>
    </aside>
  );
}
