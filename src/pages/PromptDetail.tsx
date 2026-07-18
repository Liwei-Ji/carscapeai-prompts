import React, { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Copy, Check, Hash, Video, ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import FadeInImage from '../components/FadeInImage';
import NotFound from './NotFound';
import { getPromptBySlug, prompts } from '../lib/prompts';
import {
    SITE_NAME,
    SITE_URL,
    absoluteUrl,
    assetUrl,
    excerpt,
    promptPath,
} from '../lib/site';

const PromptDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const item = slug ? getPromptBySlug(slug) : undefined;

    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = useCallback(() => {
        if (!item) return;
        navigator.clipboard.writeText(item.prompt).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [item]);

    // Unknown slug (only reachable via client-side navigation — every real slug
    // is prerendered): render the 404 page.
    if (!item) return <NotFound />;

    const canonical = absoluteUrl(promptPath(item.slug));
    const description = excerpt(item.prompt, 155);
    const related = prompts
        .filter((p) => p.slug !== item.slug && p.tags.some((t) => item.tags.includes(t)))
        .slice(0, 4);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: item.title,
        headline: `${item.title} — AI car photography prompt`,
        description,
        text: item.prompt,
        image: absoluteUrl(item.imageUrl),
        url: canonical,
        keywords: [item.cameraAngle, ...item.tags].join(', '),
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
    };

    return (
        <>
            <Seo
                title={`${item.title} — AI Car Photography Prompt | ${SITE_NAME}`}
                description={description}
                canonical={canonical}
                image={absoluteUrl(item.imageUrl)}
                type="article"
                jsonLd={jsonLd}
            />

            <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Back to all prompts
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <FadeInImage
                        src={assetUrl(item.imageUrl)}
                        alt={`${item.title} - AI car photography prompt example (${item.tags.join(', ')})`}
                        loading="eager"
                        className="object-contain"
                        wrapperClassName="aspect-[4/5] rounded-2xl border border-gray-200 bg-gray-100"
                    />

                    <div className="flex flex-col">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                            {item.title}
                        </h1>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-blue-50 text-blue-600 uppercase tracking-wide">
                                <Video className="w-3 h-3 mr-1" />
                                {item.cameraAngle}
                            </span>
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 uppercase tracking-wide"
                                >
                                    <Hash className="w-3 h-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h2 className="text-sm font-semibold text-gray-900 mb-2">The prompt</h2>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-4">
                            <p className="font-mono text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                                {item.prompt}
                            </p>
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`inline-flex items-center justify-center h-11 px-6 rounded-full text-sm font-semibold transition-all duration-200 self-start ${isCopied
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105'
                                }`}
                            aria-label="Copy prompt"
                        >
                            {isCopied ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Copied to clipboard
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy prompt
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {related.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-6">
                            Related prompts
                        </h2>
                        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {related.map((p) => (
                                <li key={p.slug}>
                                    <Link
                                        to={promptPath(p.slug)}
                                        className="group block rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                                    >
                                        <FadeInImage
                                            src={assetUrl(p.imageUrl)}
                                            alt={`${p.title} - AI car photography prompt`}
                                            wrapperClassName="aspect-square"
                                        />
                                        <span className="block p-3 text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors">
                                            {p.title}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </article>
        </>
    );
};

export default PromptDetail;
