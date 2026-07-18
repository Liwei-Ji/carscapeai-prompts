import { mockPrompts } from '../data/prompts';
import type { PromptItem } from '../types';

/** All prompts, newest first (mirrors the gallery's display order). */
export const prompts: PromptItem[] = mockPrompts;

const bySlug = new Map(mockPrompts.map((p) => [p.slug, p]));

export function getPromptBySlug(slug: string): PromptItem | undefined {
    return bySlug.get(slug);
}

/** All prompt detail slugs — used by getStaticPaths and the sitemap. */
export const allSlugs: string[] = mockPrompts.map((p) => p.slug);
