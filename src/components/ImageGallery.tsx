import { useState, useEffect } from "react";

interface ImageGalleryProps {
  images: string[];
  isVisible: boolean;
  delay: number;
}

export const ImageGallery = ({ images, isVisible, delay }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying || !isVisible) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = (prev + 1) % images.length;
        return next;
      });
      setProgressKey(prev => prev + 1); // Force progress bar restart
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length, isAutoPlaying, isVisible]);

  // Reset to first image when images change
  useEffect(() => {
    setCurrentImageIndex(0);
    setProgressKey(0);
  }, [images]);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
    setProgressKey(prev => prev + 1);
  };

  const goToPrevious = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setIsAutoPlaying(false);
    setProgressKey(prev => prev + 1);
  };

  const goToNext = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setIsAutoPlaying(false);
    setProgressKey(prev => prev + 1);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setProgressKey(prev => prev + 1);
  };

  if (images.length === 0) return null;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative w-full max-w-lg mx-auto">
        <div className="relative overflow-hidden rounded-xl shadow-2xl bg-black/10 backdrop-blur-sm">
          {/* Main Image Container */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            {images.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={`/${image}`}
                alt={`Image ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
                  index === currentImageIndex
                    ? 'opacity-100 transform scale-100'
                    : 'opacity-0 transform scale-105'
                }`}
                loading="lazy"
                onError={(e) => {
                  console.error('Image failed to load:', image);
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                }}
              />
            ))}
          </div>

          {images.length > 1 && (
            <>
              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10 group"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10 group"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Auto-play Toggle */}
              <button
                onClick={toggleAutoPlay}
                className="absolute top-3 left-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10"
                title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isAutoPlaying ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                      index === currentImageIndex
                        ? "bg-white scale-125 shadow-lg"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Progress Bar for Auto-play */}
              {isAutoPlaying && isVisible && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
                  <div
                    key={progressKey}
                    className="h-full bg-gradient-to-r from-pink-400 to-purple-500 animate-slideProgress"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Thumbnails for multiple images */}
        {images.length > 1 && (
          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'border-white shadow-lg scale-105'
                    : 'border-white/30 hover:border-white/60'
                }`}
                aria-label={`Thumbnail ${index + 1}`}
              >
                <img
                  src={`/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjY2NjIi8+PC9zdmc+';
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
