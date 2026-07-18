import './index.css';
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';

// Multi-route SSG entry: prerenders the gallery + one static page per prompt at
// build time, then hydrates on the client. Same entry serves dev, build, prod.
export const createRoot = ViteReactSSG({ routes });
