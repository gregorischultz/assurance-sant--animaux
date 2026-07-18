// =========================================================================
// Poilou — Config global do site (SEO, organização, contactos).
// =========================================================================

export const siteConfig = {
  name: 'Poilou',
  tagline: "Comparateur d'assurance santé chien & chat",
  description:
    "Comparez les meilleures mutuelles santé pour chien et chat en 2 minutes. Classement indépendant, devis gratuit et sans engagement. Économisez jusqu'à 340 €/an.",
  // URL de produção (ajustar após deploy Vercel).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://poilou.fr',
  locale: 'fr-FR',
  email: 'contact@poilou.fr',
  // TODO: preencher com dados reais do auto-entrepreneur.
  legal: {
    editor: 'Gregori Schultz (auto-entrepreneur)',
    siret: 'TODO — SIRET',
    address: 'TODO — adresse',
    hostName: 'Vercel Inc.',
    hostAddress: '340 S Lemon Ave #4133, Walnut, CA 91789, USA',
  },
  nav: [
    { href: '/comparatif', label: 'Comparatif' },
    { href: '/guides', label: 'Guides' },
    { href: '/guides?category=chien', label: 'Chien' },
    { href: '/guides?category=chat', label: 'Chat' },
  ],
};

export type SiteConfig = typeof siteConfig;
