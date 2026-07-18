import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import PromptGrid from '../components/PromptGrid';
import Seo from '../components/Seo';
import { prompts } from '../lib/prompts';
import { SITE_URL, SITE_NAME, absoluteUrl, promptPath } from '../lib/site';

const TITLE = 'Carscape AI | AI Prompts for Model & Die-Cast Car Photos';
const DESCRIPTION =
    'Free, curated Gemini prompts that turn plain die-cast and model car photos into cinematic scenes — racetracks, neon streets, wilderness, the moon, and more.';

const Gallery: React.FC = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${SITE_NAME} Prompt Gallery`,
        numberOfItems: prompts.length,
        itemListElement: prompts.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(promptPath(item.slug)),
            name: item.title,
        })),
    };

    return (
        <>
            <Seo
                title={TITLE}
                description={DESCRIPTION}
                canonical={`${SITE_URL}/`}
                jsonLd={jsonLd}
            />
            <Hero />
            <HowItWorks />
            <PromptGrid items={prompts} />
        </>
    );
};

export default Gallery;
