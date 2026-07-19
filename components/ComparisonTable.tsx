import type { Offer } from '@/content/data/offers';
import CtaButton from './CtaButton';
import StarRating from './StarRating';

/**
 * Tableau comparatif. En-tête vert foncé, lignes alternées, CTA par ligne,
 * badge « Meilleur choix ». Devient une liste de cartes en mobile (< md).
 */
export default function ComparisonTable({ offers }: { offers: Offer[] }) {
  return (
    <div>
      {/* Desktop / tablette : vraie table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line shadow-card md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-primary-dark text-white">
              <th className="px-5 py-4 font-display text-body-sm font-semibold">Assureur</th>
              <th className="px-3 py-4 font-display text-body-sm font-semibold">Note</th>
              <th className="px-3 py-4 font-display text-body-sm font-semibold">Prix / mois</th>
              <th className="px-3 py-4 font-display text-body-sm font-semibold">Franchise</th>
              <th className="px-3 py-4 font-display text-body-sm font-semibold">Plafond / an</th>
              <th className="px-3 py-4 font-display text-body-sm font-semibold">Carence</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, i) => (
              <tr
                key={offer.id}
                className={`border-t border-line ${i % 2 === 1 ? 'bg-background-2/50' : 'bg-surface'}`}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-ink">{offer.name}</span>
                    {offer.badge && (
                      <span className="whitespace-nowrap rounded-pill bg-primary-tint px-2.5 py-0.5 text-micro font-semibold text-primary-dark">
                        ✓ {offer.badge}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-4">
                  <StarRating rating={offer.rating} />
                </td>
                <td className="px-3 py-4 font-display font-bold text-primary">{offer.priceFrom}€</td>
                <td className="px-3 py-4 text-body-sm text-text">{offer.franchise}</td>
                <td className="px-3 py-4 text-body-sm text-text">{offer.plafond.toLocaleString('fr-FR')}€</td>
                <td className="px-3 py-4 text-body-sm text-text">{offer.delaiCarence}</td>
                <td className="px-5 py-4 text-right">
                  <CtaButton
                    href={offer.affiliateUrl}
                    affiliate
                    variant={offer.badge ? 'primary' : 'outline'}
                    ariaLabel={`Obtenir un devis ${offer.name}`}
                  >
                    Obtenir un devis
                  </CtaButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile : cartes empilées */}
      <div className="flex flex-col gap-4 md:hidden">
        {offers.map((offer) => (
          <article
            key={offer.id}
            className={`rounded-2xl bg-surface p-5 ${
              offer.badge ? 'border-2 border-primary shadow-card-primary' : 'border border-line shadow-card'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display text-title font-bold text-ink">{offer.name}</span>
                {offer.badge && (
                  <span className="rounded-pill bg-primary-tint px-2 py-0.5 text-micro font-semibold text-primary-dark">
                    ✓ {offer.badge}
                  </span>
                )}
              </div>
              <StarRating rating={offer.rating} />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-h4 font-bold text-primary">{offer.priceFrom}€</span>
              <span className="text-caption text-muted">/mois</span>
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-caption text-muted">
              <div>
                <dt>Franchise</dt>
                <dd className="font-medium text-ink">{offer.franchise}</dd>
              </div>
              <div>
                <dt>Plafond</dt>
                <dd className="font-medium text-ink">{offer.plafond.toLocaleString('fr-FR')}€</dd>
              </div>
              <div>
                <dt>Carence</dt>
                <dd className="font-medium text-ink">{offer.delaiCarence}</dd>
              </div>
            </dl>
            <div className="mt-4">
              <CtaButton
                href={offer.affiliateUrl}
                affiliate
                variant={offer.badge ? 'primary' : 'outline'}
                fullWidth
                ariaLabel={`Obtenir un devis ${offer.name}`}
              >
                Obtenir un devis
              </CtaButton>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
