// =========================================================================
// Poilou — Helpers de metadata + JSON-LD structured data.
// =========================================================================
import type { Metadata } from 'next';
import { siteConfig } from './site';

interface PageSeoInput {
  title: string;
  description?: string;
  /** Path relatif (ex. "/comparatif"). */
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

/** Constrói o objeto Metadata do Next com canonical, OG, Twitter e hreflang. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image = '/images/og-default.png',
  type = 'website',
  noindex = false,
}: PageSeoInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = path === '/' ? title : `${title} · ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        'fr-FR': url,
        // Facile d'étendre : 'fr-CH': ...
      },
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'fr_FR',
      type,
      images: [{ url: new URL(image, siteConfig.url).toString(), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [new URL(image, siteConfig.url).toString()],
    },
  };
}

// ------- JSON-LD builders (renderizados como <script type="application/ld+json">) -------

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: new URL('/images/logo.png', siteConfig.url).toString(),
    description: siteConfig.description,
    email: siteConfig.email,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'fr-FR',
  };
}

interface ArticleJsonLdInput {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
  authorName: string;
  image?: string;
}

export function articleJsonLd({
  title,
  description,
  path,
  date,
  updated,
  authorName,
  image = '/images/og-default.png',
}: ArticleJsonLdInput) {
  const url = new URL(path, siteConfig.url).toString();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: new URL(image, siteConfig.url).toString(),
    datePublished: date,
    dateModified: updated ?? date,
    author: { '@type': 'Person', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: new URL('/images/logo.png', siteConfig.url).toString() },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Lista de produtos (offres) com review agregada, para /comparatif. */
export function itemListJsonLd(
  products: { name: string; rating: number; priceFrom: number; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        offers: { '@type': 'Offer', price: p.priceFrom, priceCurrency: 'EUR' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: p.rating,
          bestRating: 5,
          ratingCount: 100,
        },
      },
    })),
  };
}
