// =========================================================================
// Poilou — Autores (sinais E-E-A-T). Referenciados no frontmatter dos MDX.
// =========================================================================

export interface Author {
  id: string;
  name: string;
  role: string;
  /** Bio courte affichée en fin d'article. */
  bio: string;
  /** Credenciais / diplomas (E-E-A-T). */
  credentials: string[];
  avatar: string;
  /** Perfis para JSON-LD sameAs. */
  sameAs?: string[];
}

export const authors: Record<string, Author> = {
  // Marque éditoriale (aucune personne physique — signature de marque).
  vupla: {
    id: 'vupla',
    name: "L'équipe éditoriale Vupla",
    role: 'Rédaction Vupla',
    bio: "L'équipe Vupla analyse et compare les offres d'assurance pour vous aider à décider en toute transparence. Nos guides s'appuient sur des tarifs publics et des données vérifiées.",
    credentials: [
      'Analyses indépendantes',
      'Tarifs publics vérifiés',
      'Aucune rémunération influençant le classement',
    ],
    // Avatar/logo de marque (pas de photo personnelle).
    avatar: '/images/brand/vupla-avatar.svg',
    sameAs: [],
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors.vupla;
}
