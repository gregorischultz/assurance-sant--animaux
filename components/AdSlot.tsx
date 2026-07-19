'use client';

import { useConsent } from './CookieConsent';

/**
 * Emplacement publicitaire (AdSense). NE charge RIEN tant que le consentement
 * « ads » n'est pas donné. Désactivé par défaut : à activer après validation
 * du compte AdSense (remplacer le placeholder par le <ins> AdSense).
 */
export default function AdSlot({ label = 'Emplacement publicitaire' }: { label?: string }) {
  const consent = useConsent();

  // Master switch : passer à true une fois AdSense approuvé + variable d'env définie.
  const ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

  if (!ENABLED || !consent.ads) return null;

  return (
    <div className="my-8 grid min-h-[90px] place-items-center rounded-xl border border-dashed border-line bg-background-2 text-micro text-muted">
      {label}
      {/* TODO: injecter ici le code AdSense (<ins class="adsbygoogle" …>) */}
    </div>
  );
}
