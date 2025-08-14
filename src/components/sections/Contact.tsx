'use client';

import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const Contact = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-8 sm:mb-12 md:mb-16 text-white"
          data-aos="fade-up"
        >
          CONTACT
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Info */}
          <div data-aos="fade-right">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm sm:text-base text-gray-400 mb-1">전화번호</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{siteConfig.phoneDisplay}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm sm:text-base text-gray-400 mb-1">이메일</p>
                  <p className="text-xl sm:text-2xl font-bold text-white break-all">{siteConfig.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm sm:text-base text-gray-400 mb-1">주소</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{siteConfig.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm sm:text-base text-gray-400 mb-1">인스타그램</p>
                  <a 
                    href={siteConfig.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl sm:text-2xl font-bold text-white hover:text-gray-300 transition-colors"
                  >
                    @rentip_official
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Google Map */}
          <div data-aos="fade-left" className="h-80 sm:h-96 lg:h-full min-h-[320px] sm:min-h-[400px] bg-gray-900 rounded-lg overflow-hidden mt-8 lg:mt-0">
            <iframe
              src="https://maps.google.com/maps?q=경상남도+진주시+하대로+80&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-lg"
              title="렌팁 위치 - 경상남도 진주시 하대로 80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};