import CtaButton from './CtaButton';

/**
 * Barre CTA fixe en bas d'écran, mobile uniquement (< md).
 * 70 %+ du trafic est mobile → conversion prioritaire.
 */
export default function StickyMobileCta({
  href = '/comparatif',
  label = 'Comparer les offres',
  note = 'Gratuit · 2 min',
}: {
  href?: string;
  label?: string;
  note?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 p-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <CtaButton href={href} fullWidth className="flex-1">
          {label}
        </CtaButton>
        <span className="shrink-0 text-micro text-muted">{note}</span>
      </div>
    </div>
  );
}
