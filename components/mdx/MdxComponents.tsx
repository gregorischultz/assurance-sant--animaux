import type { ReactNode } from 'react';
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

/** Componentes disponíveis dentro do MDX + estilização de headings com anchors. */
export const mdxComponents = {
  AffiliateBox,
  Callout,
  LeadForm,
  ComparisonTable: MdxComparisonTable,
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
