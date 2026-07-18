import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_NAME, SITE_URL } from '../lib/site';

const NotFound: React.FC = () => (
    <>
        <Seo
            title={`Page not found | ${SITE_NAME}`}
            description="The page you were looking for doesn't exist."
            canonical={`${SITE_URL}/404`}
            noindex
        />
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
            <p className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 mb-4">
                404
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h1>
            <p className="text-gray-500 mb-8">
                The prompt or page you were looking for doesn't exist or may have moved.
            </p>
            <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors"
            >
                Back to all prompts
            </Link>
        </div>
    </>
);

export default NotFound;
