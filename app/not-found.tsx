import CtaButton from '@/components/CtaButton';

export default function NotFound() {
  return (
    <div className="container-content grid min-h-[50vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-h1 font-bold text-green">404</p>
        <h1 className="mt-2 font-display text-title font-bold text-ink">Page introuvable</h1>
        <p className="mx-auto mt-3 max-w-reading text-body text-muted">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <CtaButton href="/">Retour à l&apos;accueil</CtaButton>
          <CtaButton href="/comparatif" variant="ghost">
            Voir le comparatif
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
