'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import FlowingMenu from '@/components/FlowingMenu';
import { TextReveal } from '@/components/animations/TextReveal';
import { TypeWriter } from '@/components/animations/TypeWriter';

export const Hero = () => {
  // 초기값을 서버 렌더링과 일치시키기 위해 true로 설정 (모바일 우선)
  const [isMobile, setIsMobile] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드임을 표시
    setIsClient(true);
    
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
      
      {/* Background - 모바일/데스크톱 구분 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {!isClient ? (
          // 초기 로딩 시 이미지 표시 (모바일 우선)
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/cars/rentip-mobile-hero.jpg")'
            }}
          />
        ) : !isMobile ? (
          // 데스크톱: 비디오
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover min-h-screen"
          >
            <source src="/videos/RENTIP.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // 모바일: RENTIP 이미지
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/cars/rentip-mobile-hero.jpg")'
            }}
          />
        )}
      </div>

      {/* Content - 모바일 최적화 */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title - 모바일 크기 조정 */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 sm:mb-6 tracking-tight">
            <TextReveal
              className="text-sky-400 drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] sm:drop-shadow-[0_4px_8px_rgba(255,255,255,0.9)] [text-shadow:_0_0_10px_rgba(255,255,255,0.8),_0_0_20px_rgba(255,255,255,0.6)] sm:[text-shadow:_0_0_20px_rgba(255,255,255,0.8),_0_0_40px_rgba(255,255,255,0.6)]"
              splitType="chars"
              animationType="rotateIn"
              duration={0.8}
              stagger={0.05}
              delay={0.2}
            >
              RENTIP
            </TextReveal>
          </h1>
          
          {/* Elegant Subtitle - 모바일 크기 조정 */}
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/95 font-light tracking-wide leading-tight">
            <TypeWriter
              text="Premium Supercar Experience"
              speed={40}
              startDelay={1000}
              cursor={false}
            />
          </div>
          
          {/* Korean Subtitle - 모바일 크기 조정 */}
          <div className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/80 font-light mt-3 sm:mt-4 tracking-wider">
            <TextReveal
              splitType="words"
              animationType="fadeUp"
              duration={0.6}
              stagger={0.1}
              delay={1.5}
            >
              최고급 수퍼카로 특별한 순간을
            </TextReveal>
          </div>
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
          <p className="text-white/70 text-xs sm:text-sm md:text-base font-light tracking-widest uppercase">
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