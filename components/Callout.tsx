import type { ReactNode } from 'react';

type Tone = 'info' | 'tip' | 'warning';

const toneStyle: Record<Tone, { box: string; icon: string }> = {
  info: { box: 'border-primary-tint bg-primary-tint2', icon: 'ℹ️' },
  tip: { box: 'border-accent-border bg-accent-tint2', icon: '💡' },
  warning: { box: 'border-star/40 bg-[#FFF7E8]', icon: '⚠️' },
};

/** Encadré de mise en avant dans les articles MDX. */
export default function Callout({
  children,
  tone = 'info',
  title,
}: {
  children: ReactNode;
  tone?: Tone;
  title?: string;
}) {
  const s = toneStyle[tone];
  return (
    <div className={`not-prose my-6 flex gap-3 rounded-xl border p-5 ${s.box}`}>
      <span aria-hidden="true" className="text-lead">
        {s.icon}
      </span>
      <div className="text-body-sm text-text">
        {title && <p className="mb-1 font-display font-semibold text-ink">{title}</p>}
        {children}
      </div>
    </div>
  );
}
