'use client';

import { useMemo, useState } from 'react';
import { offers as allOffers, type Animal, type Offer } from '@/content/data/offers';
import ComparisonTable from './ComparisonTable';

type Budget = 'all' | 'low' | 'mid' | 'high';
type Age = 'all' | 'jeune' | 'adulte' | 'senior';

const budgetFilters: { key: Budget; label: string }[] = [
  { key: 'low', label: '< 10€' },
  { key: 'mid', label: '10-15€' },
  { key: 'high', label: '15€+' },
];

const ageFilters: { key: Age; label: string }[] = [
  { key: 'jeune', label: 'Chiot / chaton' },
  { key: 'adulte', label: 'Adulte' },
  { key: 'senior', label: 'Senior' },
];

function inBudget(offer: Offer, budget: Budget): boolean {
  if (budget === 'all') return true;
  if (budget === 'low') return offer.priceFrom < 10;
  if (budget === 'mid') return offer.priceFrom >= 10 && offer.priceFrom <= 15;
  return offer.priceFrom > 15;
}

/**
 * Filtres du comparateur (animal / budget / âge) + tableau.
 * L'âge est un filtre indicatif : il n'exclut pas d'offres (toutes couvrent
 * tous les âges) mais réordonne selon la pertinence (senior → plafond élevé).
 */
export default function ComparateurFilters() {
  const [animal, setAnimal] = useState<Animal>('chien');
  const [budget, setBudget] = useState<Budget>('all');
  const [age, setAge] = useState<Age>('all');

  const results = useMemo(() => {
    const list = allOffers
      .filter((o) => o.animals.includes(animal))
      .filter((o) => inBudget(o, budget));

    // Tri : meilleur choix / note ; en senior on privilégie le plafond.
    return list.slice().sort((a, b) => {
      if (age === 'senior') return b.plafond - a.plafond;
      if (a.badge && !b.badge) return -1;
      if (!a.badge && b.badge) return 1;
      return b.rating - a.rating;
    });
  }, [animal, budget, age]);

  return (
    <div>
      {/* Barre de filtres */}
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-card md:flex-row md:items-center md:gap-8">
        <FilterGroup label="Animal">
          {(['chien', 'chat'] as const).map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={animal === a}
              onClick={() => setAnimal(a)}
              className={`rounded-md px-4 py-2 text-small font-semibold capitalize transition ${
                animal === a ? 'bg-primary text-white' : 'bg-background-2 text-muted hover:text-ink'
              }`}
            >
              {a === 'chien' ? '🐶 Chien' : '🐱 Chat'}
            </button>
          ))}
        </FilterGroup>

        <FilterGroup label="Budget max / mois">
          <PillToggle
            options={budgetFilters}
            value={budget}
            onChange={(v) => setBudget(budget === v ? 'all' : v)}
          />
        </FilterGroup>

        <FilterGroup label="Âge de l'animal">
          <PillToggle
            options={ageFilters}
            value={age}
            onChange={(v) => setAge(age === v ? 'all' : v)}
          />
        </FilterGroup>
      </div>

      {/* Résultats */}
      <div className="mt-6">
        {results.length > 0 ? (
          <ComparisonTable offers={results} />
        ) : (
          <p className="rounded-2xl border border-line bg-surface p-8 text-center text-body text-muted">
            Aucune offre ne correspond à ces critères. Élargissez votre budget.
          </p>
        )}
      </div>

      <p className="mt-4 text-caption text-muted">
        {results.length} offre{results.length > 1 ? 's' : ''} · ✓ 100 % gratuit et sans engagement ·
        ✓ Classement indépendant · ✓ Devis en 2 minutes
      </p>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function PillToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <>
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-pressed={value === o.key}
          onClick={() => onChange(o.key)}
          className={`rounded-md border px-3 py-2 text-small font-medium transition ${
            value === o.key
              ? 'border-primary bg-primary-tint text-primary-dark'
              : 'border-line bg-surface text-muted hover:border-primary'
          }`}
        >
          {o.label}
        </button>
      ))}
    </>
  );
}
