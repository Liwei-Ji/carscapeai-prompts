import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { PromptItem } from '../types';
import { Copy, Check, Hash, Video } from 'lucide-react';
import FadeInImage from './FadeInImage';
import { assetUrl, excerpt, promptPath } from '../lib/site';

interface PromptCardProps {
    item: PromptItem;
}

const PromptCard: React.FC<PromptCardProps> = ({ item }) => {
    const [isCopied, setIsCopied] = useState(false);
    const to = promptPath(item.slug);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(item.prompt).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [item.prompt]);

    return (
        <div className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
            {/* Image links through to the prompt detail page */}
            <Link to={to} aria-label={item.title} className="block">
                <FadeInImage
                    src={assetUrl(item.imageUrl)}
                    alt={`${item.title} - AI car photography prompt (${item.tags.join(', ')})`}
                    wrapperClassName="aspect-square"
                />
            </Link>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link to={to} className="hover:text-primary-600 transition-colors">
                        {item.title}
                    </Link>
                </h3>

                {/* Excerpt — the full prompt lives on the detail page */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-grow">
                    {excerpt(item.prompt, 120)}
                </p>

                {/* Tags & Action */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        {/* Camera Angle Tag */}
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-blue-50 text-blue-600 uppercase tracking-wide">
                            <Video className="w-2.5 h-2.5 mr-0.5" />
                            {item.cameraAngle}
                        </span>
                        {item.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-gray-100 text-gray-600 uppercase tracking-wide"
                            >
                                <Hash className="w-2.5 h-2.5 mr-0.5" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={handleCopy}
                        className={`
              relative flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium transition-all duration-200 ml-2
              ${isCopied
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-primary-50 text-primary-700 border border-primary-100 hover:bg-primary-100 hover:border-primary-200'
                            }
            `}
                        aria-label="Copy prompt"
                    >
                        {isCopied ? (
                            <>
                                <Check className="w-4 h-4 mr-1.5" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-1.5" />
                                Copy
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptCard;
