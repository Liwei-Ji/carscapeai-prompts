import React from 'react';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './App';
import './index.css';

// Single-page SSG entry: prerenders <App /> to static HTML at build time and
// hydrates it on the client. The same entry works for dev, build (SSG), and prod.
export const createRoot = ViteReactSSG(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
