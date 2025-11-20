"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

export interface SwiperProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  delay?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  showPlayPause?: boolean;
  showProgress?: boolean;
  loop?: boolean;
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow';
  direction?: 'horizontal' | 'vertical';
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  arrowClassName?: string;
  indicatorClassName?: string;
  progressClassName?: string;
  onSlideChange?: (index: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export default function Swiper({
  children,
  autoPlay = true,
  delay = 5000,
  showArrows = true,
  showIndicators = true,
  showPlayPause = true,
  showProgress = true,
  loop = true,
  effect = 'slide',
  direction = 'horizontal',
  speed = 700,
  pauseOnHover = true,
  className = '',
  arrowClassName = '',
  indicatorClassName = '',
  progressClassName = '',
  onSlideChange,
  onPlay,
  onPause
}: SwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const slidesCount = children.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto Play Logic
  const startAutoPlay = useCallback(() => {
    if (!autoPlay || !isPlaying || isHovered) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= slidesCount) {
          return loop ? 0 : slidesCount - 1;
        }
        return nextIndex;
      });
    }, delay);

    // Progress bar animation
    setProgress(0);
    const progressStep = 100 / (delay / 50); // Update every 50ms
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + progressStep;
      });
    }, 50);
  }, [autoPlay, isPlaying, isHovered, delay, slidesCount, loop]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (autoPlay && isPlaying && !isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [autoPlay, isPlaying, isHovered, startAutoPlay, stopAutoPlay]);

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slidesCount) {
      setCurrentIndex(index);
      setProgress(0);
      onSlideChange?.(index);
    }
  }, [slidesCount, onSlideChange]);

  const goNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= slidesCount) {
      if (loop) {
        goToSlide(0);
      }
    } else {
      goToSlide(nextIndex);
    }
  }, [currentIndex, slidesCount, loop, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      if (loop) {
        goToSlide(slidesCount - 1);
      }
    } else {
      goToSlide(prevIndex);
    }
  }, [currentIndex, slidesCount, loop, goToSlide]);

  // Play/Pause toggle
  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  }, [isPlaying, onPlay, onPause]);

  // Effect classes
  const getEffectClasses = () => {
    switch (effect) {
      case 'fade':
        return 'transition-opacity duration-700';
      case 'cube':
        return 'transform-gpu transition-transform duration-700';
      case 'coverflow':
        return 'transform-gpu transition-all duration-700';
      default:
        return 'transition-transform duration-700 ease-in-out';
    }
  };

  const getSlideTransform = (index: number) => {
    switch (effect) {
      case 'fade':
        return index === currentIndex ? 'opacity-100' : 'opacity-0';
      case 'cube':
        const offset = index - currentIndex;
        return `rotateY(${offset * 90}deg) translateZ(-200px)`;
      case 'coverflow':
        const distance = Math.abs(index - currentIndex);
        const scale = distance === 0 ? 1 : 0.8;
        const translateX = (index - currentIndex) * 50;
        return `scale(${scale}) translateX(${translateX}%)`;
      default:
        return `translateX(-${currentIndex * 100}%)`;
    }
  };

  // Arrow component
  const ArrowButton = ({ direction: arrowDirection, onClick }: { direction: 'prev' | 'next', onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 -translate-y-1/2 z-10
        flex items-center justify-center
        w-12 h-12 rounded-full
        bg-white/90 hover:bg-white text-gray-800
        shadow-lg hover:shadow-xl
        transform hover:scale-110 active:scale-95
        transition-all duration-200
        backdrop-blur-sm
        ${arrowDirection === 'prev' ? 'left-4' : 'right-4'}
        ${arrowClassName}
      `}
    >
      {arrowDirection === 'prev' ? (
        <ChevronLeftIcon className="w-6 h-6" />
      ) : (
        <ChevronRightIcon className="w-6 h-6" />
      )}
    </button>
  );

  // Indicator component
  const Indicator = ({ index, isActive, onClick }: { index: number, isActive: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`
        w-3 h-3 rounded-full transition-all duration-300
        transform hover:scale-125 active:scale-95
        ${isActive 
          ? 'bg-primary-main shadow-lg' 
          : 'bg-gray-300 hover:bg-gray-400'
        }
        ${indicatorClassName}
      `}
    />
  );

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      {/* Main Container */}
      <div
        className={`
          ${direction === 'horizontal' ? 'flex' : 'flex-col'}
          ${getEffectClasses()}
        `}
        style={{
          transform: effect === 'slide' ? getSlideTransform(currentIndex) : undefined,
          transitionDuration: `${speed}ms`
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className={`
              ${direction === 'horizontal' ? 'w-full flex-shrink-0' : 'h-full flex-shrink-0'}
              ${effect === 'fade' ? 'absolute inset-0' : ''}
              ${getSlideTransform(i)}
            `}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && slidesCount > 1 && (
        <>
          <ArrowButton direction="prev" onClick={goPrev} />
          <ArrowButton direction="next" onClick={goNext} />
        </>
      )}

      {/* Play/Pause Button */}
      {showPlayPause && autoPlay && (
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 z-10
            flex items-center justify-center
            w-10 h-10 rounded-full
            bg-black/40 hover:bg-black/60 text-white
            backdrop-blur-sm
            transform hover:scale-110 active:scale-95
            transition-all duration-200"
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Progress Bar */}
      {showProgress && autoPlay && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 z-10">
          <div
            className="h-full bg-primary-main transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Indicators */}
      {showIndicators && slidesCount > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {children.map((_, i) => (
            <Indicator
              key={i}
              index={i}
              isActive={i === currentIndex}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute bottom-4 right-4 z-10
        bg-black/40 text-white px-3 py-1 rounded-full
        text-sm font-medium backdrop-blur-sm">
        {currentIndex + 1} / {slidesCount}
      </div>
    </div>
  );
}

// Swiper Slide Component
export interface SwiperSlideProps {
  children: React.ReactNode;
  className?: string;
}

export const SwiperSlide: React.FC<SwiperSlideProps> = ({ children, className = '' }) => (
  <div className={`w-full h-full ${className}`}>
    {children}
  </div>
);

// Swiper Navigation Component
export interface SwiperNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  onPlayPause?: () => void;
  isPlaying?: boolean;
  className?: string;
}

export const SwiperNavigation: React.FC<SwiperNavigationProps> = ({
  onPrev,
  onNext,
  onPlayPause,
  isPlaying,
  className = ''
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <button
      onClick={onPrev}
      className="p-2 rounded-full bg-primary-main text-white hover:bg-primary-dark transition-colors"
    >
      <ChevronLeftIcon className="w-5 h-5" />
    </button>
    
    {onPlayPause && (
      <button
        onClick={onPlayPause}
        className="p-2 rounded-full bg-primary-main text-white hover:bg-primary-dark transition-colors"
      >
        {isPlaying ? (
          <PauseIcon className="w-5 h-5" />
        ) : (
          <PlayIcon className="w-5 h-5" />
        )}
      </button>
    )}
    
    <button
      onClick={onNext}
      className="p-2 rounded-full bg-primary-main text-white hover:bg-primary-dark transition-colors"
    >
      <ChevronRightIcon className="w-5 h-5" />
    </button>
  </div>
);