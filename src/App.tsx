import React from 'react';
import Hero from './components/Hero';
import PromptGrid from './components/PromptGrid';
import HowItWorks from './components/HowItWorks';
import { mockPrompts } from './data/prompts';
import { Github, Instagram } from 'lucide-react';

// Base URL for absolute links in structured data. The site-wide meta tags
// (title/description/OG/canonical) live statically in index.html.
// Update SITE_URL if the production domain changes.
const SITE_URL = 'https://carscapeai-prompts.vercel.app';

const App: React.FC = () => {
  // Structured data (schema.org ItemList) built from the prompt catalog. Rendered
  // in the body so it is baked into the static HTML during prerendering (SSG).
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(promptListJsonLd) }}
      />

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