'use client';

import { useEffect, useState } from 'react';

/**
 * CMP conforme CNIL :
 *  - aucun script ads/analytics chargé AVANT consentement ;
 *  - choix « Accepter / Refuser / Personnaliser » à granularité égale ;
 *  - choix mémorisé (localStorage) + rediffusé via CustomEvent pour les
 *    composants qui écoutent (ex. AdSlot, chargement analytics).
 *
 * Le refus est aussi simple que l'acceptation (obligation CNIL).
 */

export type ConsentState = {
  analytics: boolean;
  ads: boolean;
};

const STORAGE_KEY = 'poilou-consent-v1';
const EVENT = 'poilou:consent';

const DENIED: ConsentState = { analytics: false, ads: false };
const GRANTED: ConsentState = { analytics: true, ads: true };

export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function persist(state: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* stockage indisponible : on ignore, rien n'est chargé par défaut */
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(EVENT, { detail: state }));
}

/** Hook utilitaire pour les composants dépendant du consentement. */
export function useConsent(): ConsentState {
  const [consent, setConsent] = useState<ConsentState>(DENIED);
  useEffect(() => {
    setConsent(getStoredConsent() ?? DENIED);
    const handler = (e: Event) => setConsent((e as CustomEvent<ConsentState>).detail);
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);
  return consent;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>(DENIED);

  useEffect(() => {
    // N'afficher que si aucun choix n'a encore été fait.
    if (!getStoredConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  function decide(state: ConsentState) {
    persist(state);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface shadow-frame md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:rounded-2xl md:border"
    >
      <div className="p-5 md:p-6">
        <p className="font-display text-body-sm font-bold text-ink">🍪 Votre vie privée</p>
        <p className="mt-2 text-caption text-muted">
          Nous utilisons des cookies pour mesurer l&apos;audience et afficher des publicités. Aucun cookie
          non essentiel n&apos;est déposé sans votre accord.{' '}
          <a href="/politique-confidentialite" className="text-primary-dark underline">
            En savoir plus
          </a>
          .
        </p>

        {customizing && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl bg-background-2 p-4">
            <label className="flex items-center justify-between gap-3 text-caption text-text">
              <span>
                <span className="font-semibold text-ink">Mesure d&apos;audience</span> — statistiques anonymes
              </span>
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                className="h-4 w-4 accent-primary"
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-caption text-text">
              <span>
                <span className="font-semibold text-ink">Publicité</span> — annonces personnalisées
              </span>
              <input
                type="checkbox"
                checked={prefs.ads}
                onChange={(e) => setPrefs((p) => ({ ...p, ads: e.target.checked }))}
                className="h-4 w-4 accent-primary"
              />
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {customizing ? (
            <button type="button" className="btn-cta flex-1" onClick={() => decide(prefs)}>
              Enregistrer mes choix
            </button>
          ) : (
            <button type="button" className="btn-cta flex-1" onClick={() => decide(GRANTED)}>
              Accepter
            </button>
          )}
          <button type="button" className="btn-ghost flex-1" onClick={() => decide(DENIED)}>
            Refuser
          </button>
          {!customizing && (
            <button
              type="button"
              className="btn-ghost flex-1"
              onClick={() => {
                setPrefs(getStoredConsent() ?? DENIED);
                setCustomizing(true);
              }}
            >
              Personnaliser
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
