import CtaButton from './CtaButton';

/**
 * Hero de la home. Un seul CTA corail dominant (règle de conversion des tokens).
 * Colonne texte + visuel « mockup » à droite en desktop.
 */
export default function Hero() {
  return (
    <section className="bg-background">
      <div className="container-content grid items-center gap-10 py-14 md:grid-cols-2 md:py-18">
        <div>
          <span className="inline-flex items-center gap-2 rounded-pill bg-primary-tint px-3 py-1 text-caption font-semibold text-primary-dark">
            🐾 Comparateur n°1 des familles françaises
          </span>
          <h1 className="mt-5 font-display text-m-h2 font-bold leading-tight text-ink md:text-h1">
            Protégez votre compagnon sans vous ruiner
          </h1>
          <p className="mt-4 max-w-reading text-lead text-muted">
            Comparez les meilleures assurances chien et chat en 2 minutes. Économisez jusqu&apos;à
            340 €/an et soyez remboursé jusqu&apos;à 100 %.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/comparatif">Comparer les offres →</CtaButton>
            <CtaButton href="/guides" variant="ghost">
              Lire les guides
            </CtaButton>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-caption text-muted">
            <li className="flex items-center gap-1.5">
              <span className="text-success">✓</span> Gratuit
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-success">✓</span> Sans engagement
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-success">✓</span> Classement indépendant
            </li>
          </ul>
        </div>

        {/* Visuel : carte flottante « remboursé en 48 h » */}
        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-3xl border border-line bg-background-2 shadow-frame">
            <div className="grid h-full place-items-center text-caption text-muted">
              Photo — chien/chat heureux
            </div>
          </div>
          <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-float">
            <span
              className="grid h-10 w-10 place-items-center rounded-full bg-success text-white"
              aria-hidden="true"
            >
              ✓
            </span>
            <div>
              <p className="font-display text-body-sm font-bold text-ink">Remboursé en 48 h</p>
              <p className="text-micro text-muted">Vos frais vétérinaires couverts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
