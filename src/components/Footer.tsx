'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Phone, Mail, MapPin, Instagram, MessageCircle, Clock, Car } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* 메인 푸터 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* 회사 정보 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-8 h-8 text-sky-500" />
              <h3 className="text-2xl font-black text-white">RENTIP</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              프리미엄 수입차 렌탈 서비스<br/>
              특별한 순간을 위한 완벽한 선택
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href={siteConfig.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors"
              >
                <MessageCircle size={20} className="text-black" />
              </a>
              <a 
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-all"
              >
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#cars" className="text-gray-400 hover:text-sky-500 transition-colors text-sm">
                  차량 컬렉션
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-sky-500 transition-colors text-sm">
                  서비스 안내
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-gray-400 hover:text-sky-500 transition-colors text-sm">
                  갤러리
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-sky-500 transition-colors text-sm">
                  오시는 길
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 정보 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-sky-500 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{siteConfig.phoneDisplay}</p>
                  <p className="text-gray-500 text-xs">24시간 상담 가능</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-sky-500 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">{siteConfig.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-sky-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">{siteConfig.address}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* 영업 시간 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Business Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-sky-500" />
                <div>
                  <p className="text-gray-400 text-sm">연중무휴 24시간</p>
                  <p className="text-gray-500 text-xs">24/7 Open</p>
                </div>
              </li>
              <li className="mt-4 p-3 bg-sky-600/10 border border-sky-600/30 rounded-lg">
                <p className="text-sky-500 text-sm font-semibold">언제든 연락주세요</p>
                <p className="text-gray-400 text-xs mt-1">심야/새벽 예약 가능</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <div className="border-t border-white/10 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © 2025 RENTIP. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-1">
                사업자등록번호: {siteConfig.businessNumber} | 대표: {siteConfig.ceo}
              </p>
            </div>
            <div className="text-gray-600 text-xs">
              Made with ❤️ by RENTIP Team
            </div>
          </div>
        </div>
      </div>

      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
};