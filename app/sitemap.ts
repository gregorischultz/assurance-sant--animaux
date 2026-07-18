import type { MetadataRoute } from 'next';
import { getGuidesMeta } from '@/lib/mdx';
import { siteConfig } from '@/lib/site';

// Sitemap dinâmico: páginas estáticas + todos os guias.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/comparatif`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/guides`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/a-propos`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/mentions-legales`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/politique-confidentialite`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const guideRoutes: MetadataRoute.Sitemap = getGuidesMeta().map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: new Date(g.updated ?? g.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...guideRoutes];
}
