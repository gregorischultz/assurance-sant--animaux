import type { TocItem } from '@/lib/mdx';

/** Sommaire (índice) gerado a partir dos H2/H3 do artigo. Sticky em desktop. */
export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Sommaire" className="rounded-2xl border border-line bg-card p-5">
      <p className="font-display text-caption font-semibold uppercase tracking-wide text-muted">
        Dans cet article
      </p>
      <ol className="mt-3 flex flex-col gap-2 text-body-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${item.id}`}
              className="text-text transition hover:text-green-dark"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
