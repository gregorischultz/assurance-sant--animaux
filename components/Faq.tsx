export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Bloc FAQ accessible via <details>. Le JSON-LD FAQPage est injecté
 * séparément par la page (voir lib/seo.ts → faqJsonLd).
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null;
  return (
    <div className="mx-auto flex max-w-reading flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border border-line bg-surface px-5 py-4 open:shadow-card"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-body-sm font-semibold text-ink">
            {item.q}
            <span className="shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 text-body-sm text-text">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
