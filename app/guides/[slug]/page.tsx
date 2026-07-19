import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { affiliatesEnabled } from '@/lib/flags';
import { getGuideBySlug, getGuideSlugs, extractToc } from '@/lib/mdx';
import { getAuthor } from '@/content/data/author';
import { mdxComponents } from '@/components/mdx/MdxComponents';
import TableOfContents from '@/components/TableOfContents';
import AuthorBio from '@/components/AuthorBio';
import Faq from '@/components/Faq';
import CtaButton from '@/components/CtaButton';
import LeadForm from '@/components/LeadForm';
import StickyMobileCta from '@/components/StickyMobileCta';
import JsonLd from '@/components/JsonLd';
import { buildMetadata, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

// SSG : gera todas as rotas de guias em build.
export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: 'article',
    image: guide.cover ?? '/images/og-default.png',
  });
}

const categoryLabel: Record<string, string> = {
  chien: 'Guide chien',
  chat: 'Guide chat',
  lapin: 'Guide lapin',
  general: 'Guide',
};

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const author = getAuthor(guide.author);
  const toc = extractToc(guide.content);
  const path = `/guides/${guide.slug}`;

  const jsonLd: object[] = [
    articleJsonLd({
      title: guide.title,
      description: guide.description,
      path,
      date: guide.date,
      updated: guide.updated,
      authorName: author.name,
      image: guide.cover,
    }),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Guides', path: '/guides' },
      { name: guide.title, path },
    ]),
  ];
  if (guide.faq?.length) jsonLd.push(faqJsonLd(guide.faq));

  const dateFmt = new Date(guide.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      <article className="container-content py-10 pb-24 md:pb-10">
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="text-caption text-muted">
          <Link href="/" className="hover:text-primary-dark">
            Accueil
          </Link>{' '}
          <span aria-hidden="true">›</span>{' '}
          <Link href="/guides" className="hover:text-primary-dark">
            Guides
          </Link>{' '}
          <span aria-hidden="true">›</span>{' '}
          <span className="text-muted-2">{categoryLabel[guide.category]}</span>
        </nav>

        <header className="mt-4 max-w-reading">
          <span className="text-micro font-semibold uppercase tracking-wide text-primary">
            {categoryLabel[guide.category]}
          </span>
          <h1 className="mt-2 font-display text-m-h2 font-bold leading-tight text-ink md:text-h2">
            {guide.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-caption text-muted">
            <span className="font-medium text-ink">{author.name}</span>
            <span aria-hidden="true">·</span>
            <span>{author.role}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={guide.date}>Mis à jour le {dateFmt}</time>
            <span aria-hidden="true">·</span>
            <span>{guide.readingTime} min de lecture</span>
          </div>
          {affiliatesEnabled && guide.intent === 'commercial' && (
            <p className="mt-4 rounded-lg bg-background-2 px-3 py-2 text-micro text-muted">
              Cet article contient des liens affiliés. En savoir plus sur{' '}
              <Link href="/a-propos#methodologie" className="underline">
                notre méthodologie
              </Link>
              .
            </p>
          )}
        </header>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_260px]">
          {/* Corps de l'article */}
          <div className="prose-article max-w-reading">
            <MDXRemote
              source={guide.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />

            {guide.faq && guide.faq.length > 0 && (
              <section className="not-prose mt-12">
                <h2 className="font-display text-h4 font-bold text-ink">Questions fréquentes</h2>
                <div className="mt-5">
                  <Faq items={guide.faq} />
                </div>
              </section>
            )}

            <AuthorBio author={author} />

            {/* CTA final */}
            <div className="not-prose mt-10 rounded-3xl bg-primary px-6 py-10 text-center text-white">
              <h2 className="font-display text-h4 font-bold text-white">
                Trouvez la meilleure offre pour votre compagnon
              </h2>
              <p className="mt-2 text-body-sm text-primary-tint">
                Comparez gratuitement en 2 minutes. Sans engagement.
              </p>
              <div className="mt-6 flex justify-center">
                <CtaButton href="/comparatif">Comparer les offres →</CtaButton>
              </div>
            </div>
          </div>

          {/* Aside : sommaire + capture lead (sticky desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-6">
              <TableOfContents items={toc} />
              <LeadForm compact title="Recevez nos guides" subtitle="Les meilleures offres, 1 fois/mois." />
            </div>
          </aside>
        </div>
      </article>

      <StickyMobileCta />
    </>
  );
}
