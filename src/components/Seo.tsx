import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE_URL } from '../lib/site';

interface SeoProps {
    title: string;
    description: string;
    /** Absolute canonical URL for this page. */
    canonical: string;
    /** Absolute image URL for social previews. */
    image?: string;
    type?: 'website' | 'article';
    /** Optional JSON-LD object rendered as a ld+json script. */
    jsonLd?: object;
    /** Emit a robots noindex directive (e.g. for the 404 page). */
    noindex?: boolean;
}

/**
 * Per-page <head> tags for SSG. vite-react-ssg's <Head> injects these into the
 * prerendered HTML and dedupes the title, so each route gets its own metadata.
 */
const Seo: React.FC<SeoProps> = ({
    title,
    description,
    canonical,
    image = `${SITE_URL}/og-image.jpg`,
    type = 'website',
    jsonLd,
    noindex = false,
}) => (
    <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        {noindex && <meta name="robots" content="noindex" />}
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonical} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />

        {jsonLd && (
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
    </Head>
);

export default Seo;
