'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TextReveal } from '@/components/animations/TextReveal';

export const CarCollection = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // public/images/cars/ 폴더의 모든 이미지 로드
    const loadImages = async () => {
      try {
        // 실제로는 빌드 타임에 이미지 목록을 생성하거나
        // API 엔드포인트를 통해 이미지 목록을 가져와야 합니다
        // 여기서는 임시로 하드코딩된 이미지 목록을 사용합니다
        
        // 이미지 파일명 리스트 (실제 파일명으로 변경 필요)
        const imageFiles = [
          'porsche-911.png',
          'bmw-m2.png',
          'mercedes-s450.png',
          'audi-r8.png',
          'lamborghini-huracan.png',
          'ferrari-488.png',
          'bentley-continental.png',
          'rolls-royce-ghost.png',
          'mclaren-720s.png',
          'tesla-model-3.png',
          // 폴더에 있는 모든 이미지 파일명 추가
        ];

        // 이미지 경로 생성
        const imagePaths = imageFiles.map(filename => `/images/cars/${filename}`);
        setImages(imagePaths);
      } catch (error) {
        console.error('Failed to load images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">이미지 로딩 중...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="collection" className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <TextReveal
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 block"
            splitType="words"
            animationType="scaleIn"
            duration={0.6}
            stagger={0.1}
          >
            OUR COLLECTION
          </TextReveal>
          <TextReveal
            className="text-gray-400 text-sm sm:text-base md:text-lg block"
            splitType="words"
            animationType="fadeUp"
            duration={0.5}
            stagger={0.05}
            delay={0.3}
          >
            프리미엄 차량 컬렉션
          </TextReveal>
        </div>

        {/* 이미지 그리드 - 폴더의 모든 이미지 표시 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {images.map((imagePath, index) => {
            // 파일명에서 차량명 추출 (예: 'porsche-911.png' -> 'PORSCHE 911')
            const fileName = imagePath.split('/').pop()?.replace('.png', '') || '';
            const carName = fileName.split('-').map(word => 
              word.toUpperCase()
            ).join(' ');

            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-105"
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.02}s both`
                }}
              >
                {/* 차량 이미지 */}
                <div className="relative h-32 sm:h-36 md:h-40 mb-3">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-lg" />
                  <Image
                    src={imagePath}
                    alt={carName}
                    fill
                    className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    loading="lazy"
                    onError={(e) => {
                      // 이미지 로드 실패시 placeholder 표시
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex items-center justify-center h-full text-gray-500">
                            <div class="text-center">
                              <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                              </svg>
                              <p class="text-xs">${carName}</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>

                {/* 차량 정보 */}
                <div className="text-center">
                  <p className="text-sm font-bold text-white">
                    {carName}
                  </p>
                </div>

                {/* 호버 효과 - 글로우 */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/10 group-hover:to-purple-600/10 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* 이미지가 없을 때 메시지 */}
        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              /public/images/cars/ 폴더에 차량 이미지를 추가해주세요
            </p>
            <p className="text-gray-500 text-sm mt-2">
              예: porsche-911.png, bmw-m2.png, mercedes-s450.png
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};