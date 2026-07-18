import React, { useCallback, useState } from 'react';

interface FadeInImageProps {
    src: string;
    alt: string;
    /** Classes for the <img> (defaults to object-cover; pass object-contain to avoid cropping). */
    className?: string;
    /** Classes for the wrapper (e.g. aspect ratio). */
    wrapperClassName?: string;
    loading?: 'lazy' | 'eager';
}

/**
 * Image with a load-in fade. The callback ref catches images that already
 * finished loading before React hydrated the prerendered (SSG) HTML — without
 * it, that load event is missed and the image stays stuck at opacity 0.
 */
const FadeInImage: React.FC<FadeInImageProps> = ({
    src,
    alt,
    className = 'object-cover',
    wrapperClassName = '',
    loading = 'lazy',
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const imgRef = useCallback((node: HTMLImageElement | null) => {
        if (node?.complete && node.naturalWidth > 0) setIsLoaded(true);
    }, []);

    return (
        <div className={`relative overflow-hidden bg-gray-200 ${!isLoaded ? 'animate-pulse' : ''} ${wrapperClassName}`}>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                loading={loading}
                className={`w-full h-full transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} ${className}`}
            />
        </div>
    );
};

export default FadeInImage;
