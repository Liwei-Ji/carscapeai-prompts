// Postbuild: generate dist/sitemap.xml from the pages vite-react-ssg actually
// prerendered. Derives prompt URLs by listing dist/prompts/* so the sitemap
// always matches what shipped. Run after `vite-react-ssg build`.
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Keep in sync with SITE_URL in src/lib/site.ts.
const SITE_URL = 'https://carscapeai-prompts.vercel.app';
const dist = resolve(process.cwd(), 'dist');
const promptsDir = resolve(dist, 'prompts');

function promptSlugs() {
    if (!existsSync(promptsDir)) return [];
    return readdirSync(promptsDir, { withFileTypes: true })
        .flatMap((e) => {
            if (e.isDirectory()) return [e.name]; // nested: prompts/<slug>/index.html
            if (e.isFile() && e.name.endsWith('.html')) return [e.name.replace(/\.html$/, '')]; // flat
            return [];
        })
        .sort();
}

const paths = ['/', ...promptSlugs().map((s) => `/prompts/${s}`)];
const body = paths
    .map((p) => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n  </url>`)
    .join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(resolve(dist, 'sitemap.xml'), xml);
console.log(`[gen-sitemap] wrote ${paths.length} URLs to dist/sitemap.xml`);
