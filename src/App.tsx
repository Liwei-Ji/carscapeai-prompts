import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import PromptGrid from './components/PromptGrid';
import HowItWorks from './components/HowItWorks';
import { mockPrompts } from './data/prompts';
import { Github, Instagram } from 'lucide-react';

// Site-wide SEO constants — keep these in sync with the same tags in index.html.
// Update SITE_URL if the production domain changes.
const SITE_URL = 'https://carscapeai-prompts.vercel.app';
const SITE_TITLE = 'Carscape AI | AI Prompts for Model & Die-Cast Car Photos';
const SITE_DESCRIPTION =
  'Free, curated Gemini prompts that turn plain die-cast and model car photos into cinematic scenes — racetracks, neon streets, wilderness, the moon, and more.';

const App: React.FC = () => {
  // Structured data (schema.org ItemList) built from the prompt catalog so search
  // engines can see the gallery contents once the page is prerendered.
  const promptListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Carscape AI Prompt Gallery',
    numberOfItems: mockPrompts.length,
    itemListElement: mockPrompts.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'ImageObject',
        name: item.title,
        contentUrl: item.imageUrl.startsWith('http')
          ? item.imageUrl
          : `${SITE_URL}${item.imageUrl}`,
        keywords: [item.cameraAngle, ...item.tags].join(', '),
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(promptListJsonLd)}</script>
      </Helmet>

      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <PromptGrid items={mockPrompts} />
      </main>

      {/* Footer: Removed border-t border-gray-200 */}
      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CarscapeAI. Created by Liwei.
          </p>

          <div className="flex space-x-8">
            <a
              href="https://github.com/Liwei-Ji/carscapeai-prompts"
              className="text-gray-500 hover:text-gray-900 hover:scale-110 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="h-8 w-8" />
            </a>
            <a
              href="https://www.instagram.com/64_jpw/"
              className="text-gray-500 hover:text-pink-600 hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-8 w-8" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;