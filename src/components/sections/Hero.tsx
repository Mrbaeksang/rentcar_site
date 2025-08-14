'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import FlowingMenu from '@/components/FlowingMenu';

export const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 감지
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-[1]" />
      
      {/* Background - 모바일과 데스크탑 구분 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {!isMobile ? (
          // 데스크탑: 고화질 비디오
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover min-h-screen transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/videos/RENTIP.mp4" type="video/mp4" />
          </video>
        ) : (
          // 모바일: 정적 배경 이미지 또는 저화질 비디오
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80")'
            }}
          >
            {/* 모바일에서는 선택적으로 저화질 비디오 로드 */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata" // 메타데이터만 먼저 로드
              className="w-full h-full object-cover opacity-70"
            >
              <source src="/videos/RENTIP.mp4#t=0.1" type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      {/* Content - 모바일 최적화 */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title - 모바일 크기 조정 */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 sm:mb-6 tracking-tight">
            <span className="text-blue-500 drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] sm:drop-shadow-[0_4px_8px_rgba(255,255,255,0.9)] [text-shadow:_0_0_10px_rgba(255,255,255,0.8),_0_0_20px_rgba(255,255,255,0.6)] sm:[text-shadow:_0_0_20px_rgba(255,255,255,0.8),_0_0_40px_rgba(255,255,255,0.6)]">
              RENTIP
            </span>
          </h1>
          
          {/* Elegant Subtitle - 모바일 크기 조정 */}
          <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/95 font-light tracking-wide leading-tight">
            Premium Supercar Experience
          </p>
          
          {/* Korean Subtitle - 모바일 크기 조정 */}
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/80 font-light mt-3 sm:mt-4 tracking-wider">
            최고급 수퍼카로 특별한 순간을
          </p>
        </div>

        {/* Premium CTA Buttons with FlowingMenu - 모바일 높이 조정 */}
        <div className="h-[350px] sm:h-[400px] w-full max-w-2xl mx-auto mt-8 sm:mt-12">
          <FlowingMenu 
            items={[
              { 
                link: `tel:${siteConfig.phone}`, 
                text: siteConfig.phoneDisplay, 
                icon: '/images/tele.png' 
              },
              { 
                link: siteConfig.kakao, 
                text: '카카오톡 상담', 
                icon: '/images/kakao.png' 
              },
              { 
                link: siteConfig.instagram, 
                text: '인스타그램', 
                icon: '/images/insta.png' 
              }
            ]}
          />
        </div>

        {/* Luxury Tagline - 모바일 크기 조정 */}
        <div className="mt-12 sm:mt-16">
          <p className="text-white/60 text-xs sm:text-sm md:text-base font-light tracking-widest uppercase">
            Experience • Luxury • Performance
          </p>
        </div>
      </div>

      {/* Scroll Indicator - 모바일 크기 조정 */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown size={28} className="text-white/60 animate-bounce sm:w-8 sm:h-8" />
      </div>
    </section>
  );
};