'use client';

import { useTranslations } from '@/lib/i18n-context';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// 13 room screenshots
const ROOM_SCREENS = [
  '/phone-screens/rooms/1.png',
  '/phone-screens/rooms/2.png',
  '/phone-screens/rooms/3.png',
  '/phone-screens/rooms/4.png',
  '/phone-screens/rooms/5.png',
  '/phone-screens/rooms/6.png',
  '/phone-screens/rooms/7.png',
  '/phone-screens/rooms/8.png',
  '/phone-screens/rooms/9.png',
  '/phone-screens/rooms/10.png',
  '/phone-screens/rooms/11.png',
  '/phone-screens/rooms/12.png',
  '/phone-screens/rooms/13.png',
];

// Single phone component for marquee - static (no floating animation)
function MarqueePhone({ index }: { index: number }) {
  // Subtle rotation variation for visual interest
  const rotation = (index % 5 - 2) * 4; // -8, -4, 0, 4, 8 degrees
  const screenImage = ROOM_SCREENS[index % ROOM_SCREENS.length];

  return (
    <div 
      className="flex-shrink-0 mx-4 sm:mx-5 md:mx-6 lg:mx-8"
      style={{
        transform: `rotateY(${rotation}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* iPhone 15 Pro Frame - SAME SIZE as coverflow lateral phones */}
      <div className="relative w-[100px] sm:w-[115px] md:w-[130px] lg:w-[145px]">
        {/* Orange rim light effect - SAME STYLE */}
        <div 
          className="absolute inset-[-3px] rounded-[1.6rem] sm:rounded-[1.8rem] md:rounded-[2rem] pointer-events-none"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255, 165, 0, 0.3) 0%, 
              rgba(255, 107, 0, 0.18) 50%,
              rgba(255, 140, 0, 0.25) 100%
            )`,
            filter: 'blur(1px)',
          }}
        />
        
        {/* Phone Frame - Titanium style - SAME STYLE */}
        <div 
          className="relative rounded-[1.6rem] sm:rounded-[1.8rem] md:rounded-[2rem] p-[2px] sm:p-[3px]"
          style={{
            background: 'linear-gradient(145deg, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
            boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 165, 0, 0.1)',
          }}
        >
          {/* Inner bezel */}
          <div className="relative bg-black rounded-[1.5rem] sm:rounded-[1.7rem] md:rounded-[1.9rem] overflow-hidden">
            {/* Dynamic Island - SAME SIZE */}
            <div className="absolute top-[4px] sm:top-[5px] md:top-[6px] left-1/2 -translate-x-1/2 w-[38px] sm:w-[45px] md:w-[52px] h-[10px] sm:h-[12px] md:h-[14px] bg-black rounded-full z-20" />
            
            {/* Screen Content - Real Screenshot */}
            <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-zinc-900">
              <Image
                src={screenImage}
                alt={`TattooTalks Room ${index + 1}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100px, (max-width: 768px) 115px, (max-width: 1024px) 130px, 145px"
              />
            </div>
            
            {/* Home indicator - SAME SIZE */}
            <div className="absolute bottom-[3px] sm:bottom-[4px] left-1/2 -translate-x-1/2 w-[35%] h-[2px] sm:h-[3px] bg-zinc-600 rounded-full" />
          </div>
          
          {/* Side buttons - Volume - SAME STYLE */}
          <div className="absolute left-[-1.5px] top-[40px] sm:top-[48px] md:top-[55px] w-[1.5px] h-[10px] sm:h-[12px] md:h-[14px] bg-zinc-500 rounded-l-sm" />
          <div className="absolute left-[-1.5px] top-[54px] sm:top-[64px] md:top-[74px] w-[1.5px] h-[16px] sm:h-[19px] md:h-[22px] bg-zinc-500 rounded-l-sm" />
          <div className="absolute left-[-1.5px] top-[74px] sm:top-[87px] md:top-[100px] w-[1.5px] h-[16px] sm:h-[19px] md:h-[22px] bg-zinc-500 rounded-l-sm" />
          
          {/* Power button - SAME STYLE */}
          <div className="absolute right-[-1.5px] top-[58px] sm:top-[68px] md:top-[80px] w-[1.5px] h-[25px] sm:h-[30px] md:h-[35px] bg-zinc-500 rounded-r-sm" />
        </div>
      </div>
    </div>
  );
}

export default function PhoneMockupMarquee() {
  const t = useTranslations('landing');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const animationRef = useRef<number | null>(null);
  const boundaryCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 13 phones, duplicated 3 times for seamless infinite loop
  const phoneCount = 13;
  const autoScrollSpeed = 0.6; // pixels per frame

  // Check and adjust scroll boundaries for infinite loop
  const checkBoundaries = useCallback(() => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const oneSetWidth = container.scrollWidth / 3;
    
    // If scrolled past 2nd set end, jump back to equivalent position in 1st set
    if (container.scrollLeft >= oneSetWidth * 2) {
      container.scrollLeft = container.scrollLeft - oneSetWidth;
    }
    // If scrolled before 1st set start, jump forward to equivalent position in 2nd set
    else if (container.scrollLeft < oneSetWidth * 0.1) {
      container.scrollLeft = container.scrollLeft + oneSetWidth;
    }
  }, []);

  // Auto-scroll animation with infinite loop
  const autoScroll = useCallback(() => {
    if (!scrollRef.current || isDragging || isInteracting) {
      animationRef.current = requestAnimationFrame(autoScroll);
      return;
    }
    
    const container = scrollRef.current;
    container.scrollLeft += autoScrollSpeed;
    
    // Check boundaries during auto-scroll
    checkBoundaries();
    
    animationRef.current = requestAnimationFrame(autoScroll);
  }, [isDragging, isInteracting, checkBoundaries]);

  // Initialize scroll position to middle set and start auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      const oneSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = oneSetWidth;
    }
    animationRef.current = requestAnimationFrame(autoScroll);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (boundaryCheckTimeoutRef.current) {
        clearTimeout(boundaryCheckTimeoutRef.current);
      }
    };
  }, [autoScroll]);

  // Delayed boundary check (gives momentum scroll time to settle)
  const scheduleBoundaryCheck = useCallback(() => {
    if (boundaryCheckTimeoutRef.current) {
      clearTimeout(boundaryCheckTimeoutRef.current);
    }
    boundaryCheckTimeoutRef.current = setTimeout(() => {
      checkBoundaries();
    }, 150);
  }, [checkBoundaries]);

  // Mouse drag handlers (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsInteracting(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftStart(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
    scheduleBoundaryCheck();
    // Resume auto-scroll after a short delay
    setTimeout(() => setIsInteracting(false), 300);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollRef.current) {
        scrollRef.current.style.cursor = 'grab';
      }
      scheduleBoundaryCheck();
    }
    // Resume auto-scroll after leaving
    setTimeout(() => setIsInteracting(false), 300);
  };

  const handleMouseEnter = () => {
    setIsInteracting(true);
  };

  // Touch handlers for mobile - let native scroll handle the movement
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    setIsDragging(true);
    if (scrollRef.current && e.touches[0]) {
      setStartX(e.touches[0].clientX);
      setScrollLeftStart(scrollRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current || !e.touches[0]) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    scheduleBoundaryCheck();
    // Resume auto-scroll after touch ends with delay for momentum
    setTimeout(() => setIsInteracting(false), 800);
  };

  return (
    <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header - SAME STYLE */}
        <div className="text-center mb-8 md:mb-12 lg:mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('rooms.title')}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-zinc-500 font-light">
            {t('rooms.subtitle')}
          </p>
        </div>
        
        {/* Scrollable Container - SAME HEIGHT as coverflow */}
        <div className="relative h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px]" style={{ perspective: '1800px' }}>
          
          {/* Deep ambient warm glow - SAME STYLE */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[100%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 90% 70% at center, rgba(255, 140, 0, 0.08) 0%, rgba(255, 100, 0, 0.04) 50%, transparent 80%)',
              filter: 'blur(80px)',
            }}
          />
          
          {/* Concentrated spotlight - SAME STYLE */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[60%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 165, 0, 0.15) 0%, rgba(255, 120, 0, 0.08) 40%, transparent 70%)',
              filter: 'blur(35px)',
            }}
          />
          
          {/* Left edge fade - SAME STYLE */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-[12%] sm:w-[10%] md:w-[8%] pointer-events-none z-30"
            style={{
              background: 'linear-gradient(to right, #121212 0%, #121212 30%, transparent 100%)',
            }}
          />
          
          {/* Right edge fade - SAME STYLE */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-[12%] sm:w-[10%] md:w-[8%] pointer-events-none z-30"
            style={{
              background: 'linear-gradient(to left, #121212 0%, #121212 30%, transparent 100%)',
            }}
          />
          
          {/* Infinite Scroll Container */}
          <div 
            ref={scrollRef}
            className="absolute inset-0 flex items-center overflow-x-auto scrollbar-hide select-none touch-pan-x"
            style={{ 
              transformStyle: 'preserve-3d',
              cursor: 'grab',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 13 phones × 3 sets for seamless infinite loop */}
            <div className="flex items-center">
              {/* Set 1 */}
              {Array.from({ length: phoneCount }).map((_, index) => (
                <MarqueePhone key={`set1-${index}`} index={index} />
              ))}
              {/* Set 2 (main visible set) */}
              {Array.from({ length: phoneCount }).map((_, index) => (
                <MarqueePhone key={`set2-${index}`} index={index} />
              ))}
              {/* Set 3 */}
              {Array.from({ length: phoneCount }).map((_, index) => (
                <MarqueePhone key={`set3-${index}`} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
