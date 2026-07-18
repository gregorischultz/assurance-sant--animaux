import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';

interface CtaButtonProps {
  children: ReactNode;
  href: string;
  variant?: Variant;
  /** true = link de afiliado externo → rel="sponsored nofollow", target _blank. */
  affiliate?: boolean;
  className?: string;
  /** Rótulo acessível se o texto visível não bastar. */
  ariaLabel?: string;
  fullWidth?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-cta',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
};

/**
 * Botão de conversão. Usa <Link> para rotas internas e <a> para afiliados
 * (com rel de conformidade SEO). min-height 48px garantido via classes.
 */
export default function CtaButton({
  children,
  href,
  variant = 'primary',
  affiliate = false,
  className = '',
  ariaLabel,
  fullWidth = false,
}: CtaButtonProps) {
  const classes = `${variantClass[variant]}${fullWidth ? ' w-full' : ''} ${className}`.trim();

  if (affiliate) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="sponsored nofollow noopener"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
