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
  gregori: {
    id: 'gregori',
    name: 'Gregori Schultz',
    role: 'Fondateur & rédacteur Poilou',
    bio: "Passionné par le bien-être animal, Gregori analyse depuis 2021 les contrats d'assurance santé pour chiens et chats afin d'aider les maîtres à choisir sans se ruiner. Comparaisons indépendantes, basées sur les garanties réelles et le rapport prix/couverture.",
    credentials: [
      'Analyste indépendant en assurance animale',
      'Auteur de 40+ guides comparatifs',
    ],
    avatar: '/images/authors/gregori.jpg',
    sameAs: [],
  },
  'camille-roux': {
    id: 'camille-roux',
    name: 'Dr. Camille Roux',
    role: 'Vétérinaire',
    bio: "Vétérinaire diplômée d'État, le Dr. Camille Roux relit les guides Poilou pour en garantir l'exactitude médicale et rappeler les bons réflexes de prévention.",
    credentials: [
      "Docteur vétérinaire (diplômée d'État)",
      "10 ans d'exercice en clinique",
    ],
    avatar: '/images/authors/camille-roux.jpg',
    sameAs: [],
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors.gregori;
}
