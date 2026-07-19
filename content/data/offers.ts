// =========================================================================
// Poilou — Dados das seguradoras (source of truth para comparação/afiliados)
//
// 👉 LIENS D'AFFILIATION : source unique de vérité.
//    Renseigner ci-dessous `affiliateUrl` pour chaque offre quand les liens
//    des programmes sont disponibles (laisser '' tant qu'ils manquent).
//    Les CTA d'affiliation ne s'affichent que si NEXT_PUBLIC_AFFILIATES_ENABLED
//    = "true" ET que l'URL est renseignée (cf. lib/flags.ts + README).
// =========================================================================

export type Animal = 'chien' | 'chat';

export interface Offer {
  /** Slug único e estável (usado em keys/anchors). */
  id: string;
  /** Nome comercial da seguradora. */
  name: string;
  /** Nota /5 (source: rapport garanties-prix, indépendant). */
  rating: number;
  /** Prix indicatif à partir de (€/mois). */
  priceFrom: number;
  /** Franchise (texto livre, ex. "Aucune", "20€/acte", "10%"). */
  franchise: string;
  /** Plafond de remboursement annuel (€/an). */
  plafond: number;
  /** Délai de carence (texte, ex. "0 j accident", "45 j maladie"). */
  delaiCarence: string;
  /** Taux de remboursement max annoncé (%). */
  remboursementMax: number;
  /** Animaux couverts par cette offre. */
  animals: Animal[];
  /** Lien d'affiliation (rel="sponsored nofollow"). */
  affiliateUrl: string;
  /** Badge éditorial optionnel. */
  badge?: string;
  /** Arguments courts affichés sur la carte. */
  highlights?: string[];
}

export const offers: Offer[] = [
  {
    id: 'kozoo',
    name: 'Kozoo',
    rating: 4.9,
    priceFrom: 11,
    franchise: '20€/acte',
    plafond: 3000,
    delaiCarence: '0 j accident',
    remboursementMax: 100,
    animals: ['chien', 'chat'],
    affiliateUrl: '',
    badge: 'Meilleur choix',
    highlights: ['Souscription 100 % en ligne', 'Sans délai de carence accident', 'Remboursement en 48 h'],
  },
  {
    id: 'dalma',
    name: 'Dalma',
    rating: 4.6,
    priceFrom: 9,
    franchise: 'Aucune',
    plafond: 2000,
    delaiCarence: '2 j accident',
    remboursementMax: 100,
    animals: ['chien', 'chat'],
    affiliateUrl: '',
    highlights: ['Sans franchise', 'Prévention incluse', 'Application mobile'],
  },
  {
    id: 'santevet',
    name: 'Santévet',
    rating: 4.4,
    priceFrom: 13,
    franchise: '10%',
    plafond: 2500,
    delaiCarence: '45 j maladie',
    remboursementMax: 100,
    animals: ['chien', 'chat'],
    affiliateUrl: '',
    highlights: ['Leader historique', 'Réseau de vétérinaires', 'Tiers payant possible'],
  },
  {
    id: 'assuropoil',
    name: "Assur O'Poil",
    rating: 4.3,
    priceFrom: 12,
    franchise: '30€/an',
    plafond: 2000,
    delaiCarence: '7 j accident',
    remboursementMax: 100,
    animals: ['chien', 'chat'],
    affiliateUrl: '',
    highlights: ['Formules modulables', 'Forfait prévention', 'Sans questionnaire de santé'],
  },
  {
    id: 'bulle-bleue',
    name: 'Bulle Bleue',
    rating: 4.2,
    priceFrom: 14,
    franchise: '20%',
    plafond: 2800,
    delaiCarence: '3 j accident',
    remboursementMax: 100,
    animals: ['chien', 'chat'],
    affiliateUrl: '',
    highlights: ['Sans limite d’âge', 'Devis rapide', 'Assistance 24/7'],
  },
  {
    id: 'lovys',
    name: 'Lovys',
    rating: 4.1,
    priceFrom: 10,
    franchise: '25€/acte',
    plafond: 1800,
    delaiCarence: '15 j accident',
    remboursementMax: 90,
    animals: ['chien', 'chat'],
    affiliateUrl: '',
    highlights: ['100 % digital', 'Résiliation à tout moment', 'Tarifs jeunes animaux'],
  },
  {
    id: 'fido',
    name: 'Fido',
    rating: 4.0,
    priceFrom: 15,
    franchise: 'Aucune',
    plafond: 3500,
    delaiCarence: '30 j maladie',
    remboursementMax: 100,
    animals: ['chien'],
    affiliateUrl: '',
    highlights: ['Plafond élevé', 'Sans franchise', 'Spécial chiens de race'],
  },
  {
    id: 'otherwise',
    name: 'Otherwise',
    rating: 3.9,
    priceFrom: 8,
    franchise: '35€/an',
    plafond: 1500,
    delaiCarence: '10 j accident',
    remboursementMax: 85,
    animals: ['chien', 'chat'],
    affiliateUrl: '',
    highlights: ['Le moins cher', 'Assurance solidaire', 'Cash-back sur cotisations'],
  },
];

/** Top N par nota (para o "top 3" da home). */
export function topOffers(n = 3, animal?: Animal): Offer[] {
  return offers
    .filter((o) => (animal ? o.animals.includes(animal) : true))
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, n);
}

export function getOffer(id: string): Offer | undefined {
  return offers.find((o) => o.id === id);
}
