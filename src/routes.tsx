import type { RouteRecord } from 'vite-react-ssg';
import Layout from './components/Layout';
import Gallery from './pages/Gallery';
import PromptDetail from './pages/PromptDetail';
import NotFound from './pages/NotFound';
import { allSlugs } from './lib/prompts';
import { promptPath } from './lib/site';

export const routes: RouteRecord[] = [
    {
        path: '/',
        Component: Layout,
        children: [
            { index: true, Component: Gallery },
            {
                path: 'prompts/:slug',
                Component: PromptDetail,
                // Enumerate every prompt so vite-react-ssg prerenders one static
                // HTML file per prompt at build time.
                getStaticPaths: () => allSlugs.map((slug) => promptPath(slug)),
            },
            { path: '*', Component: NotFound },
        ],
    },
];
