import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  autoPlay?: boolean;
  interval?: number;
}

export default function ImageCarousel({
  images,
  alt,
  autoPlay = true,
  interval = 4000
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreview, setIsPreview] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isPreview || images.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, goToNext, isPreview, images.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrev();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') setIsPreview(false);
  };

  if (images.length === 0) return null;

  return (
    <>
      {/* Main Carousel */}
      <div
        className="relative group"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="aspect-[16/9] overflow-hidden rounded-2xl">
          <img
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500 ease-out"
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-brown-500" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-brown-500" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-white rounded-full shadow-lg'
                    : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* Image Counter & Preview Button */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="glass px-3 py-1.5 rounded-xl text-sm font-medium text-brown-500">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={() => setIsPreview(true)}
            className="glass w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white transition-all duration-200"
          >
            <ZoomIn className="w-5 h-5 text-brown-500" />
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={() => setIsPreview(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsPreview(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <img
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl animate-zoom-in"
          />

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                  index === currentIndex
                    ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-black scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
