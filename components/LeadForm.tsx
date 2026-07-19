'use client';

import { useState, type FormEvent } from 'react';
import { animalLabels, animalOrder, type Animal } from '@/content/data/offers';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Capture de lead : email + type d'animal. Consentement RGPD OBLIGATOIRE
 * avant envoi. POST vers /api/lead (voir app/api/lead/route.ts).
 */
export default function LeadForm({
  title = 'Recevez notre guide gratuit',
  subtitle = 'Les meilleures offres 2026 + 100 € offerts. Sans spam.',
  compact = false,
}: {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [animal, setAnimal] = useState<Animal>('chien');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Merci de saisir une adresse email valide.');
      return;
    }
    if (!consent) {
      setError('Vous devez accepter la politique de confidentialité pour continuer.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, animal, consent }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      setEmail('');
      setConsent(false);
    } catch {
      setStatus('error');
      setError('Une erreur est survenue. Merci de réessayer.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-primary-tint bg-primary-tint2 p-6 text-center">
        <p className="font-display text-title font-bold text-primary-dark">Merci ! 🎉</p>
        <p className="mt-2 text-body-sm text-text">
          Votre guide arrive dans votre boîte mail. Pensez à vérifier vos spams.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-2xl border border-line bg-surface ${compact ? 'p-5' : 'p-6 sm:p-7'}`}
    >
      <p className="font-display text-title font-bold text-ink">{title}</p>
      <p className="mt-1 text-body-sm text-muted">{subtitle}</p>

      {/* Type d'animal */}
      <fieldset className="mt-4">
        <legend className="sr-only">Type d&apos;animal</legend>
        <div className="inline-flex rounded-pill bg-background-2 p-1">
          {animalOrder.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAnimal(a)}
              aria-pressed={animal === a}
              className={`rounded-pill px-5 py-2 text-small font-semibold capitalize transition ${
                animal === a ? 'bg-primary text-white shadow-card-primary' : 'text-muted'
              }`}
            >
              {animalLabels[a]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Adresse email</span>
          <input
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="votre@email.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error && !email}
            className="field"
            required
          />
        </label>
        <button type="submit" className="btn-cta shrink-0" disabled={status === 'loading'}>
          {status === 'loading' ? 'Envoi…' : 'Recevoir'}
        </button>
      </div>

      {/* Consentement RGPD obligatoire */}
      <label className="mt-4 flex items-start gap-2 text-caption text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-primary"
          required
        />
        <span>
          J&apos;accepte de recevoir des informations par email et j&apos;ai lu la{' '}
          <a href="/politique-confidentialite" className="text-primary-dark underline">
            politique de confidentialité
          </a>
          . Désinscription à tout moment.
        </span>
      </label>

      {error && (
        <p role="alert" className="mt-3 text-caption text-[#D94A3D]">
          {error}
        </p>
      )}
    </form>
  );
}
