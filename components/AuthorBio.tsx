import type { Author } from '@/content/data/author';

/** Bio auteur (signal E-E-A-T) affichée en fin d'article. */
export default function AuthorBio({ author }: { author: Author }) {
  return (
    <div className="not-prose my-10 flex gap-4 rounded-2xl border border-line bg-green-tint2 p-6">
      <div
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-green font-display text-title font-bold text-white"
        aria-hidden="true"
      >
        {author.name.charAt(0)}
      </div>
      <div>
        <p className="font-display text-body-sm font-bold text-ink">{author.name}</p>
        <p className="text-caption text-green-dark">{author.role}</p>
        <p className="mt-2 text-body-sm text-text">{author.bio}</p>
        {author.credentials.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2">
            {author.credentials.map((c) => (
              <li
                key={c}
                className="rounded-pill bg-card px-3 py-1 text-micro font-medium text-muted-2"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
