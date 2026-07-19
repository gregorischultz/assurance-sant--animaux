// =========================================================================
// Poilou — Feature flags
// =========================================================================

/**
 * Affiliation activée ?
 *
 * Pilotée par la variable d'environnement `NEXT_PUBLIC_AFFILIATES_ENABLED`
 * (valeur par défaut : `false` — tout ce qui n'est pas exactement "true" désactive).
 *
 * Quand `false` :
 *  - les blocs <AffiliateBox> sont masqués ;
 *  - les CTA d'affiliation « Obtenir un devis » / « Voir l'offre » disparaissent ;
 *  - la colonne CTA de <ComparisonTable> est retirée ;
 *  - la mention de divulgation « liens d'affiliation » n'apparaît pas.
 *
 * ⚠️ `NEXT_PUBLIC_*` est inliné au moment du build : après modification sur
 * Vercel, il faut redéployer pour que le changement prenne effet (cf. README).
 */
export const affiliatesEnabled =
  process.env.NEXT_PUBLIC_AFFILIATES_ENABLED === 'true';
