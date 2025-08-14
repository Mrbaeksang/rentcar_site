'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import FlowingMenu from '@/components/FlowingMenu';

export const Hero = () => {

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-[1]" />
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover min-h-screen"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          poster="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
        >
          <source src="/videos/RENTIP.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
            alt="Luxury Car"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title - Netflix Style */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight">
            <span className="text-blue-500 drop-shadow-[0_4px_8px_rgba(255,255,255,0.9)] [text-shadow:_0_0_20px_rgba(255,255,255,0.8),_0_0_40px_rgba(255,255,255,0.6)]">
              RENTIP
            </span>
          </h1>
          
          {/* Elegant Subtitle */}
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/95 font-light tracking-wide leading-tight">
            Premium Supercar Experience
          </p>
          
          {/* Korean Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light mt-4 tracking-wider">
            최고급 수퍼카로 특별한 순간을
          </p>
        </div>

        {/* Premium CTA Buttons with FlowingMenu */}
        <div className="h-[400px] w-full max-w-2xl mx-auto mt-12">
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

        {/* Luxury Tagline */}
        <div className="mt-16">
          <p className="text-white/60 text-sm md:text-base font-light tracking-widest uppercase">
            Experience • Luxury • Performance
          </p>
        </div>
      </div>

      {/* Scroll Indicator - Minimalist */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown size={32} className="text-white/60 animate-bounce" />
      </div>
    </section>
  );
};