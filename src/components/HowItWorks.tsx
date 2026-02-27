import React from 'react';
import { Camera, Copy, Sparkles } from 'lucide-react';

const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="py-20 pb-0 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        How it works
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Give your die-cast collection the spotlight it deserves in three simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />

                    {/* Step 1 */}
                    <div className="relative flex flex-col items-center text-center group">
                        <div className="w-24 h-24 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:border-primary-200 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <Camera className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">1. Snap a Photo</h3>
                        <p className="text-gray-500 leading-relaxed px-4">
                            Take a clear photo of your model car against a plain <strong>white background</strong>. Lighting is key!
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col items-center text-center group">
                        <div className="w-24 h-24 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:border-purple-200 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                <Copy className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">2. Copy Prompt</h3>
                        <p className="text-gray-500 leading-relaxed px-4">
                            Browse our gallery of cinematic scenes. Click <strong>Copy</strong> on the style that fits your car best.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col items-center text-center group">
                        <div className="w-24 h-24 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:border-pink-200 transition-all duration-300">
                            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">3. Generate in Gemini</h3>
                        <p className="text-gray-500 leading-relaxed px-4">
                            Upload your photo to Gemini, paste the prompt, and watch your car transport to a new world.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;