'use client';

import Image from 'next/image';
import { TextReveal } from '@/components/animations/TextReveal';
import { ArrowRight } from 'lucide-react';

export const FeaturedCars = () => {
  // 실제 보험대차 업그레이드 기준
  const insuranceUpgrades = [
    {
      id: 1,
      beforeCar: '소나타',
      afterCar: '포르쉐 911 터보',
      afterModel: 'Porsche 911 Turbo',
      image: '/images/cars/porsche-911-turbo.jpg',
      date: '2024.11.28'
    },
    {
      id: 2,
      beforeCar: 'K5',
      afterCar: '포르쉐 박스터',
      afterModel: 'Porsche Boxster',
      image: '/images/cars/porsche-boxster.jpg',
      date: '2024.12.15'
    },
    {
      id: 3,
      beforeCar: '싼타페',
      afterCar: 'G63 AMG',
      afterModel: 'Mercedes G63 AMG',
      image: '/images/cars/mercedes-g63.jpg',
      date: '2025.01.09'
    },
    {
      id: 4,
      beforeCar: '아반떼',
      afterCar: 'BMW M8',
      afterModel: 'BMW M8 Competition',
      image: '/images/cars/bmw-m8.jpg',
      date: '2025.02.23'
    },
    {
      id: 5,
      beforeCar: '그랜저',
      afterCar: '벤틀리 컨티넨탈',
      afterModel: 'Bentley Continental GT',
      image: '/images/cars/bentley-continental.jpg',
      date: '2025.04.17'
    },
    {
      id: 6,
      beforeCar: '팰리세이드',
      afterCar: '람보르기니 우루스',
      afterModel: 'Lamborghini Urus',
      image: '/images/cars/lamborghini-urus.jpg',
      date: '2025.06.02'
    }
  ];

  return (
    <section id="cars" className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <TextReveal
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white block mb-4"
            splitType="words"
            animationType="scaleIn"
            duration={0.6}
            stagger={0.1}
          >
            INSURANCE UPGRADE
          </TextReveal>
          <p className="text-gray-400 text-lg">사고차량보다 더 좋은 차로 대차해드립니다</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {insuranceUpgrades.map((upgrade, index) => (
            <div
              key={upgrade.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              {/* 9:16 비율 카드 컨테이너 */}
              <div className="relative aspect-[9/16] overflow-hidden bg-black rounded-xl shadow-2xl">
                {/* 배경 이미지 */}
                <Image
                  src={upgrade.image}
                  alt={upgrade.afterModel}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
                
                {/* 상단 그라데이션 오버레이 - 더 진하게 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-transparent to-black/40" />
                
                {/* 헤더 텍스트 */}
                <div className="absolute top-0 left-0 right-0 p-6">
                  {/* RENTIP 로고 */}
                  <div className="mb-8">
                    <div className="text-sky-400 text-5xl font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">RENTIP</div>
                    <div className="text-white text-base tracking-[3px] uppercase mt-1 font-semibold">Premium Rental Service</div>
                  </div>
                  
                  {/* 업그레이드 텍스트 */}
                  <div className="space-y-4">
                    <div className="text-white text-3xl font-black drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                      사고차량 <span className="text-red-400">{upgrade.beforeCar}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <ArrowRight className="text-yellow-400 w-10 h-10 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]" />
                      <div className="text-4xl font-black">
                        <span className="text-yellow-300 drop-shadow-[0_3px_8px_rgba(0,0,0,1)] bg-black/50 px-3 py-1 rounded">{upgrade.afterCar}</span>
                      </div>
                    </div>
                    <div className="text-white text-3xl font-black mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,1)] flex items-center gap-3">
                      <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">대차완료!</span>
                      <span className="text-white text-2xl font-bold">{upgrade.date}</span>
                    </div>
                  </div>
                </div>
                
                {/* 하단 차량 정보 */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="text-white">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Upgrade Vehicle</p>
                    <p className="text-lg font-bold">{upgrade.afterModel}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA 섹션 */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">렌팁만의 특별한 보험대차 서비스를 경험하세요</p>
          <a
            href="tel:010-2984-1379"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-sky-500/30 transition-all duration-300 hover:scale-105"
          >
            지금 바로 문의하기
          </a>
        </div>
      </div>
    </section>
  );
};