/**
 * Authors & reviewers registry.
 *
 * BEFORE LAUNCH: replace the placeholder entries with real people and
 * delete `placeholder: true`. The article frontmatter field
 * `reviewedBy` references the `id` here (or — for legacy MDX — the raw
 * display name, which we'll match best-effort).
 *
 * The page at `/authors` renders this list publicly.
 */

export interface Author {
  id: string;
  name: string;
  credentials?: string;
  bio: string;
  role: "editor" | "reviewer" | "contributor";
  /** True if this is a placeholder pending real attribution. */
  placeholder?: boolean;
}

export const AUTHORS: Author[] = [
  {
    id: "review-board",
    name: "Foundation Review Board",
    credentials: "Environmental Health",
    bio: "Articles are reviewed for factual accuracy by the foundation's internal review board prior to publication. Individual reviewers will be named publicly once founding sponsorships are finalized — see /about for the foundation's position on anonymity during the early period.",
    role: "reviewer",
    placeholder: true,
  },
];

export function getAuthor(idOrName?: string): Author | null {
  if (!idOrName) return null;
  const lower = idOrName.toLowerCase();
  return (
    AUTHORS.find((a) => a.id === idOrName) ||
    AUTHORS.find((a) => a.name.toLowerCase() === lower) ||
    AUTHORS.find((a) => a.name.toLowerCase().includes(lower)) ||
    // Legacy: if frontmatter still has a free-text byline, synthesize a
    // minimal Author so the article doesn't crash; flag as placeholder.
    {
      id: "legacy",
      name: idOrName,
      bio: "Reviewer information will be updated.",
      role: "reviewer",
      placeholder: true,
    }
  );
}
