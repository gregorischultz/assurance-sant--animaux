import type { Offer } from '@/content/data/offers';
import CtaButton from './CtaButton';
import StarRating from './StarRating';

/**
 * Carte d'offre (top 3 de la home). Variante "best" = bordure verte + ombre verte
 * + badge « Meilleur choix », conforme aux design tokens.
 */
export default function OfferCard({ offer, featured = false }: { offer: Offer; featured?: boolean }) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl bg-surface p-7 ${
        featured
          ? 'border-2 border-primary shadow-card-primary md:-translate-y-3'
          : 'border border-line shadow-card'
      }`}
    >
      {offer.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-primary px-4 py-1 text-caption font-semibold text-white shadow-card-primary">
          ✓ {offer.badge}
        </span>
      )}

      <div className="flex items-center justify-between">
        <h3 className="font-display text-h4 font-bold text-ink">{offer.name}</h3>
        <StarRating rating={offer.rating} />
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-h2 font-bold text-primary">{offer.priceFrom}€</span>
        <span className="text-small text-muted">/mois · à partir de</span>
      </div>

      <ul className="mt-5 flex flex-col gap-2 text-body-sm text-text">
        {(offer.highlights ?? []).map((h) => (
          <li key={h} className="flex items-start gap-2">
            <span className="mt-0.5 text-success" aria-hidden="true">
              ✓
            </span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-4 text-caption text-muted">
        <div>
          <dt className="text-muted-2">Franchise</dt>
          <dd className="font-medium text-ink">{offer.franchise}</dd>
        </div>
        <div>
          <dt className="text-muted-2">Plafond/an</dt>
          <dd className="font-medium text-ink">{offer.plafond.toLocaleString('fr-FR')}€</dd>
        </div>
        <div>
          <dt className="text-muted-2">Carence</dt>
          <dd className="font-medium text-ink">{offer.delaiCarence}</dd>
        </div>
        <div>
          <dt className="text-muted-2">Remboursement</dt>
          <dd className="font-medium text-ink">jusqu&apos;à {offer.remboursementMax}%</dd>
        </div>
      </dl>

      <div className="mt-6">
        {featured ? (
          <CtaButton href={offer.affiliateUrl} affiliate fullWidth ariaLabel={`Obtenir un devis ${offer.name}`}>
            Obtenir un devis →
          </CtaButton>
        ) : (
          <CtaButton
            href={offer.affiliateUrl}
            affiliate
            variant="outline"
            fullWidth
            ariaLabel={`Voir l'offre ${offer.name}`}
          >
            Voir l&apos;offre
          </CtaButton>
        )}
      </div>
    </article>
  );
}
