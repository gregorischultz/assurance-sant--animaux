import type { CSSProperties, ReactNode } from 'react';
import AffiliateBox from '@/components/AffiliateBox';
import Callout from '@/components/Callout';
import LeadForm from '@/components/LeadForm';
import ComparisonTable from '@/components/ComparisonTable';
import { offers as allOffers, topOffers, type Offer } from '@/content/data/offers';
import { slugify } from '@/lib/mdx';

/** Extrai texto puro de children React para gerar o id do heading. */
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

/**
 * Wrapper MDX de ComparisonTable : dentro do artigo pode ser usado sem props.
 * Aceita `top` (número) ou `ids` (lista) para escolher as ofertas.
 */
function MdxComparisonTable({ top, ids }: { top?: number; ids?: string[] }) {
  let list: Offer[];
  if (ids?.length) {
    list = ids.map((id) => allOffers.find((o) => o.id === id)).filter((o): o is Offer => !!o);
  } else {
    list = topOffers(top ?? 4);
  }
  return <ComparisonTable offers={list} />;
}

/**
 * Tables Markdown (syntaxe `|`) → composants stylés, alignés sur ComparisonTable :
 * en-tête bleu primary, lignes alternées, bordures, coins arrondis, padding confortable.
 * Responsive : le wrapper défile horizontalement en mobile (overflow-x-auto).
 * remark-gfm doit être activé (voir MDXRemote) pour que ces éléments soient générés.
 */
const mdxTable = {
  table: ({ children }: { children?: ReactNode }) => (
    <div className="not-prose my-7 overflow-x-auto rounded-2xl border border-line shadow-card">
      <table className="w-full border-collapse text-left text-body-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="bg-primary-dark text-white">{children}</thead>
  ),
  tbody: ({ children }: { children?: ReactNode }) => (
    <tbody className="[&>tr:nth-child(even)]:bg-background-2/50">{children}</tbody>
  ),
  tr: ({ children }: { children?: ReactNode }) => (
    <tr className="border-t border-line first:border-t-0">{children}</tr>
  ),
  th: ({ children, style }: { children?: ReactNode; style?: CSSProperties }) => (
    <th
      style={style}
      className="whitespace-nowrap px-4 py-3.5 font-display text-body-sm font-semibold"
    >
      {children}
    </th>
  ),
  td: ({ children, style }: { children?: ReactNode; style?: CSSProperties }) => (
    <td style={style} className="px-4 py-3.5 align-top text-text [&_strong]:text-ink">
      {children}
    </td>
  ),
};

/** Componentes disponíveis dentro do MDX + estilização de headings com anchors. */
export const mdxComponents = {
  AffiliateBox,
  Callout,
  LeadForm,
  ComparisonTable: MdxComparisonTable,
  ...mdxTable,
  h2: ({ children }: { children?: ReactNode }) => {
    const id = slugify(textOf(children));
    return (
      <h2 id={id} className="scroll-mt-24">
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children?: ReactNode }) => {
    const id = slugify(textOf(children));
    return (
      <h3 id={id} className="scroll-mt-24">
        {children}
      </h3>
    );
  },
};
