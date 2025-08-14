'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PaymentSidebar } from '@/components/PaymentSidebar';

interface Car {
  id: number;
  brand: string;
  model: string;
  price: number;
  image: string;
  category: string;
}

interface MarqueeRowProps {
  cars: Car[];
  direction: 'left' | 'right';
  speed: string;
  onCarClick: (car: Car) => void;
}

const MarqueeRow = ({ cars, direction, speed, onCarClick }: MarqueeRowProps) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // 차량을 3번 복제해서 무한 루프 만들기
  const repeatedCars = [...cars, ...cars, ...cars];

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={`flex gap-4 sm:gap-6 md:gap-8`}
        style={{
          animation: `marquee-${direction} ${speed} linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        {repeatedCars.map((car, index) => (
          <div 
            key={`${car.id}-${index}`}
            className="flex-shrink-0 group cursor-pointer"
            onClick={() => onCarClick(car)}
          >
            <div className="relative w-72 h-44 sm:w-80 sm:h-48 md:w-96 md:h-56 lg:w-[420px] lg:h-64 overflow-hidden rounded-xl shadow-2xl">
              <Image 
                src={car.image} 
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* 차량 정보 */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1">{car.brand}</h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 mb-1 sm:mb-2">{car.model}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-yellow-400">
                      {car.price}
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm text-gray-400">만원/일</span>
                  </div>
                  <button className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-[10px] sm:text-xs md:text-sm font-semibold transition-colors">
                    예약
                  </button>
                </div>
              </div>

              {/* 카테고리 배지 */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 rounded-full">
                <span className="text-white text-[10px] sm:text-xs md:text-sm font-semibold uppercase">{car.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MarqueeGallery = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedCar(null), 300); // 애니메이션 후 초기화
  };

  // 실제 차량 데이터
  const cars: Car[] = [
    {
      id: 1,
      brand: 'LAMBORGHINI',
      model: 'Huracán EVO',
      price: 150,
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
      category: 'sports'
    },
    {
      id: 2,
      brand: 'BENTLEY',
      model: 'Continental GT',
      price: 120,
      image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80',
      category: 'luxury'
    },
    {
      id: 3,
      brand: 'PORSCHE',
      model: '911 Turbo S',
      price: 100,
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80',
      category: 'sports'
    },
    {
      id: 4,
      brand: 'FERRARI',
      model: 'F8 Tributo',
      price: 180,
      image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80',
      category: 'sports'
    },
    {
      id: 5,
      brand: 'MERCEDES',
      model: 'G63 AMG',
      price: 90,
      image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80',
      category: 'suv'
    },
    {
      id: 6,
      brand: 'ROLLS-ROYCE',
      model: 'Ghost',
      price: 200,
      image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80',
      category: 'luxury'
    },
    {
      id: 7,
      brand: 'ASTON MARTIN',
      model: 'DB11',
      price: 130,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      category: 'luxury'
    },
    {
      id: 8,
      brand: 'MCLAREN',
      model: '720S',
      price: 160,
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
      category: 'sports'
    },
    {
      id: 9,
      brand: 'BMW',
      model: 'M8 Competition',
      price: 85,
      image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80',
      category: 'sports'
    },
    {
      id: 10,
      brand: 'AUDI',
      model: 'R8 V10',
      price: 110,
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80',
      category: 'sports'
    }
  ];

  // 10개 차량을 3줄로 나누기
  const row1Cars = cars.slice(0, 4);  // 1줄: 4대
  const row2Cars = cars.slice(4, 7);  // 2줄: 3대  
  const row3Cars = cars.slice(7, 10); // 3줄: 3대

  return (
    <>
      <section id="gallery" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black overflow-hidden">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-2 sm:mb-4">
            OUR COLLECTION
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">최고급 슈퍼카 컬렉션을 만나보세요</p>
        </div>

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* 1줄: 왼쪽으로 이동 */}
          <MarqueeRow cars={row1Cars} direction="left" speed="40s" onCarClick={handleCarClick} />
          
          {/* 2줄: 오른쪽으로 이동 (반대방향) */}
          <MarqueeRow cars={row2Cars} direction="right" speed="45s" onCarClick={handleCarClick} />
          
          {/* 3줄: 왼쪽으로 이동 (느리게) */}
          <MarqueeRow cars={row3Cars} direction="left" speed="35s" onCarClick={handleCarClick} />
        </div>

        {/* 모바일 힌트 */}
        <div className="text-center mt-6 sm:mt-8 md:hidden px-4">
          <p className="text-xs sm:text-sm text-gray-500">차량을 터치하면 정지됩니다</p>
        </div>
      </section>

      {/* 결제 사이드바 */}
      <PaymentSidebar 
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        car={selectedCar || undefined}
      />
    </>
  );
};