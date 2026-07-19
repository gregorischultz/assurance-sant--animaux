import Link from 'next/link';
import Logo from './Logo';
import { affiliatesEnabled } from '@/lib/flags';

const columns = [
  {
    title: 'Comparateur',
    links: [
      { href: '/comparatif', label: 'Comparatif 2026' },
      { href: '/guides?category=chien', label: 'Assurance chien' },
      { href: '/guides?category=chat', label: 'Assurance chat' },
      { href: '/guides?category=lapin', label: 'Assurance lapin (NAC)' },
      { href: '/guides', label: 'Tous les guides' },
    ],
  },
  {
    title: 'À propos',
    links: [
      { href: '/a-propos', label: 'Qui sommes-nous' },
      { href: '/a-propos#methodologie', label: 'Notre méthodologie' },
      { href: '/a-propos#contact', label: 'Contact' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { href: '/mentions-legales', label: 'Mentions légales' },
      { href: '/politique-confidentialite', label: 'Confidentialité' },
      { href: '/mentions-legales#affiliation', label: 'Liens d’affiliation' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-footer-text">
      <div className="container-content grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo className="[&_span:last-child]:text-white" />
          <p className="mt-4 max-w-xs text-small text-footer-text">
            Comparateur indépendant d&apos;assurance santé pour chien et chat. Classement basé sur les
            garanties réelles et le rapport prix/couverture.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-display text-body-sm font-semibold text-white">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-small text-footer-text transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center justify-between gap-2 py-5 text-micro text-footer-text2 sm:flex-row">
          {/* Éditeur = marque Vupla (TODO: SIRET / statut légal, cf. mentions légales). */}
          <p>© {new Date().getFullYear()} Poilou — édité par Vupla. Tous droits réservés.</p>
          {/* Divulgation affiliation : affichée uniquement quand le flag est actif. */}
          {affiliatesEnabled && (
            <p>
              Certains liens sont des liens d&apos;affiliation : une commission peut nous être versée sans
              surcoût pour vous.
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
