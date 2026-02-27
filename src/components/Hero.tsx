import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
    const scrollToGrid = () => {
        const grid = document.getElementById('prompt-grid');
        if (grid) {
            grid.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToHowItWorks = (e: React.MouseEvent) => {
        e.preventDefault();
        const section = document.getElementById('how-it-works');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative overflow-hidden bg-white border-b border-gray-100 min-h-screen flex items-center">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary-50/50 to-transparent opacity-60" />
                <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 mix-blend-multiply" />
                <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 mix-blend-multiply" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 max-w-5xl mx-auto leading-[1.1]">
                    Transform Your <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                        Model Car Photography
                    </span>
                </h1>

                <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 leading-relaxed">
                    Turn a simple white background into a cinematic stage.
                    Use our curated <strong>Gemini</strong> prompts to instantly transport your die-cast collection to racetracks, neon streets, or scenic routes.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={scrollToGrid}
                        className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-gray-800 hover:scale-105 hover:shadow-lg focus:outline-none"
                    >
                        Explore Backgrounds
                        <ArrowDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-1" />
                    </button>

                    <button
                        onClick={scrollToHowItWorks}
                        className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 focus:outline-none"
                    >
                        How it works
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;