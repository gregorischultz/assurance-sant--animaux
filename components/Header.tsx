'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';
import CtaButton from './CtaButton';
import { siteConfig } from '@/lib/site';

/** Header sticky avec nav desktop + menu mobile. Un CTA corail à droite. */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-body-sm font-medium text-text transition hover:text-green-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CtaButton href="/comparatif">Obtenir un devis</CtaButton>
        </div>

        {/* Toggle mobile */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-line md:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-title" aria-hidden="true">
            {open ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <nav className="container-content flex flex-col gap-1 py-4" aria-label="Navigation mobile">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-body font-medium text-text hover:bg-green-tint"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2">
              <CtaButton href="/comparatif" fullWidth>
                Obtenir un devis
              </CtaButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
