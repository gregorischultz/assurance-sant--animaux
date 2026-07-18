import Link from 'next/link';

/** Logotipo Poilou (marca "P" em verde + wordmark). SVG inline = zero requests. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`} aria-label="Poilou — accueil">
      <span
        className="grid h-9 w-9 place-items-center rounded-xl bg-green font-display text-lg font-bold text-white"
        aria-hidden="true"
      >
        P
      </span>
      <span className="font-display text-title font-bold text-ink">poilou</span>
    </Link>
  );
}
