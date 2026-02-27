import React, { useState, useMemo } from 'react';
import PromptCard from './PromptCard';
import type { PromptItem } from '../types';

interface PromptGridProps {
    items: PromptItem[];
}

const PromptGrid: React.FC<PromptGridProps> = ({ items }) => {
    const [selectedTag, setSelectedTag] = useState('All');

    // Extract unique tags and sort them
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        items.forEach(item => item.tags.forEach(tag => tags.add(tag)));
        return ['All', ...Array.from(tags).sort()];
    }, [items]);

    // Filter items based on selected tag
    const filteredItems = useMemo(() => {
        if (selectedTag === 'All') return [...items].reverse();
        return [...items]
            .filter(item => item.tags.includes(selectedTag))
            .reverse();
    }, [items, selectedTag]);

    return (
        <section id="prompt-grid" className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Filter section above the grid */}
            <div className="flex flex-wrap justify-center gap-2 mb-12 overflow-x-auto pt-2 pb-4 scrollbar-hide">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`
                            whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                            ${selectedTag === tag
                                ? 'bg-gray-900 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-800'
                            }
                        `}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Header section */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Latest Creations
                </h2>
                <span className="text-sm text-gray-400 font-medium">
                    Showing {filteredItems.length} of {items.length} prompts
                </span>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 min-h-[400px]">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <PromptCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">No prompts found for this category.</p>
                        <button
                            onClick={() => setSelectedTag('All')}
                            className="mt-4 text-primary-600 font-semibold hover:underline"
                        >
                            View all prompts
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PromptGrid;