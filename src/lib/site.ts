// Central site configuration. Update SITE_URL if the production domain changes;
// it feeds canonical/OG URLs, structured data, and the generated sitemap.
export const SITE_URL = 'https://carscapeai-prompts.vercel.app';

export const SITE_NAME = 'Carscape AI';

/** Absolute URL for a site-relative path (e.g. "/prompts/foo" -> "https://.../prompts/foo"). */
export function absoluteUrl(path: string): string {
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Route path for a prompt detail page. */
export function promptPath(slug: string): string {
    return `/prompts/${slug}`;
}

/** Resolve a site-root asset path against the Vite base (for <img src>). */
export function assetUrl(path: string): string {
    const base = import.meta.env.BASE_URL;
    return path.startsWith('/') ? `${base}${path.slice(1)}` : path;
}

/** Truncate text to a clean excerpt at a word boundary. */
export function excerpt(text: string, max = 160): string {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    return `${clean.slice(0, clean.lastIndexOf(' ', max)).trimEnd()}…`;
}
