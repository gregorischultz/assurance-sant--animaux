// =========================================================================
// Poilou — Leitura/parsing dos guias MDX (gray-matter + next-mdx-remote).
// Sem base de dados: ficheiros em /content/guides/*.mdx.
// =========================================================================
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');

export interface FaqEntry {
  q: string;
  a: string;
}

export interface GuideMeta {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  category: 'chien' | 'chat' | 'general';
  intent: 'informational' | 'commercial';
  cover?: string;
  faq?: FaqEntry[];
  readingTime: number;
}

export interface Guide extends GuideMeta {
  content: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Slugify simples e estável para anchors (H2/H3). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200)); // ~200 mots/min
}

function ensureDir(): boolean {
  return fs.existsSync(GUIDES_DIR);
}

export function getGuideSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    title: data.title ?? slug,
    description: data.description ?? '',
    slug: data.slug ?? slug,
    date: data.date ?? new Date().toISOString().slice(0, 10),
    updated: data.updated,
    author: data.author ?? 'gregori',
    category: (data.category as GuideMeta['category']) ?? 'general',
    intent: (data.intent as GuideMeta['intent']) ?? 'informational',
    cover: data.cover,
    faq: Array.isArray(data.faq) ? (data.faq as FaqEntry[]) : [],
    readingTime: estimateReadingTime(content),
    content,
  };
}

/** Todos os guias, ordenados do mais recente ao mais antigo. */
export function getAllGuides(): Guide[] {
  return getGuideSlugs()
    .map((slug) => getGuideBySlug(slug))
    .filter((g): g is Guide => g !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getGuidesMeta(): GuideMeta[] {
  return getAllGuides().map(({ content, ...meta }) => meta);
}

/** Extrai o sommaire (índice) a partir dos H2/H3 do markdown. */
export function extractToc(content: string): TocItem[] {
  const toc: TocItem[] = [];
  const lines = content.split('\n');
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (match) {
      const level = match[1].length as 2 | 3;
      const text = match[2].replace(/[#*`]/g, '').trim();
      toc.push({ id: slugify(text), text, level });
    }
  }
  return toc;
}
