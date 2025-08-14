'use client';

import { Phone, MessageCircle, Instagram, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export const Hero = () => {
  const handleCall = () => {
    window.location.href = `tel:${siteConfig.phone}`;
  };

  const handleKakao = () => {
    window.open(siteConfig.kakao, '_blank');
  };

  const handleInstagram = () => {
    window.open(siteConfig.instagram, '_blank');
  };

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
          <source src="/videos/1.mp4" type="video/mp4" />
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
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
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

        {/* Premium CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          <button 
            onClick={handleCall}
            className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25 min-w-[200px]"
          >
            <Phone size={20} />
            <span className="hidden sm:inline">{siteConfig.phoneDisplay}</span>
            <span className="sm:hidden">전화상담</span>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </button>
          
          <button 
            onClick={handleKakao}
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl min-w-[200px]"
          >
            <MessageCircle size={20} />
            카카오톡 상담
            
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
          </button>
          
          <button 
            onClick={handleInstagram}
            className="group relative px-8 py-4 bg-transparent border-2 border-white/30 text-white/90 rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:border-white hover:text-white transition-all duration-300 transform hover:scale-105 min-w-[200px]"
          >
            <Instagram size={20} />
            <span className="hidden sm:inline">인스타그램</span>
            <span className="sm:hidden">Instagram</span>
          </button>
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