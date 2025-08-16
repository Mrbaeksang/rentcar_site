'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TextReveal } from '@/components/animations/TextReveal';
import { ImageModal } from '@/components/ui/ImageModal';

interface Car {
  id: number;
  brand: string;
  model: string;
  image: string;
  category: string;
}

interface MarqueeRowProps {
  cars: Car[];
  direction: 'left' | 'right';
  speed: string;
}

// 데스크탑용 마퀴 컴포넌트 (기존 유지)
const MarqueeRow = ({ cars, direction, speed }: MarqueeRowProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  
  // 차량을 3번 복제해서 무한 루프 만들기
  const repeatedCars = [...cars, ...cars, ...cars];

  return (
    <>
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
            className="flex-shrink-0 group cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedCar(car)}
          >
            <div className="relative w-72 h-44 sm:w-80 sm:h-48 md:w-96 md:h-56 lg:w-[420px] lg:h-64 overflow-hidden rounded-xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
              <Image 
                src={car.image} 
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover group-hover:scale-115 transition-transform duration-700"
              />
              
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* 차량 정보 - 왼쪽 상단으로 이동 */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-white">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1">{car.brand}</h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300">{car.model}</p>
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
    
    {/* Modal */}
    <ImageModal
      isOpen={!!selectedCar}
      onClose={() => setSelectedCar(null)}
      imageSrc={selectedCar?.image || ''}
      title={selectedCar?.brand || ''}
      subtitle={selectedCar?.model}
    />
    </>
  );
};

// 모바일용 넷플릭스 스타일 컴포넌트
interface NetflixCarouselProps {
  cars: Car[];
  category?: string;
}

const NetflixCarousel = ({ cars, category }: NetflixCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < cars.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(Math.min(cars.length - 1, currentIndex + 1));
  };

  return (
    <div className="relative">
      {category && (
        <h3 className="text-xl font-bold text-white mb-4 px-4 capitalize">
          {category === 'sports' ? '스포츠카' : category === 'luxury' ? '럭셔리' : 'SUV'}
        </h3>
      )}
      
      <div className="relative group">
        {/* 이전 버튼 */}
        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity md:hidden"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* 다음 버튼 */}
        {currentIndex < cars.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity md:hidden"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* 카드 컨테이너 */}
        <div 
          ref={containerRef}
          className="overflow-hidden px-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-out gap-2"
            style={{ 
              transform: `translateX(-${currentIndex * 85}%)` 
            }}
          >
            {cars.map((car) => (
              <div 
                key={car.id}
                className="flex-shrink-0 w-[85%] cursor-pointer"
                onClick={() => setSelectedCar(car)}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden rounded-lg">
                  <Image 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                    sizes="85vw"
                  />
                  
                  {/* 그라디언트 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* 차량 정보 - 심플하게 */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-bold text-lg">{car.brand}</h4>
                    <p className="text-gray-300 text-sm">{car.model}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 인디케이터 도트 */}
        <div className="flex justify-center gap-1.5 mt-4">
          {cars.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-sky-400' 
                  : 'w-1.5 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Modal */}
      <ImageModal
        isOpen={!!selectedCar}
        onClose={() => setSelectedCar(null)}
        imageSrc={selectedCar?.image || ''}
        title={selectedCar?.brand || ''}
        subtitle={selectedCar?.model}
      />
    </div>
  );
};

export const MarqueeGallery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 실제 차량 데이터
  const cars: Car[] = [
    {
      id: 1,
      brand: 'MERCEDES',
      model: 'W223 S580',
      image: '/images/cars/w223-s580.jpg',
      category: 'luxury'
    },
    {
      id: 2,
      brand: 'MERCEDES',
      model: 'W213 E300',
      image: '/images/cars/w213-e300.jpg',
      category: 'luxury'
    },
    {
      id: 3,
      brand: 'MERCEDES',
      model: 'W213 E220',
      image: '/images/cars/w213-e220.jpg',
      category: 'luxury'
    },
    {
      id: 4,
      brand: 'MERCEDES',
      model: 'W214 E300',
      image: '/images/cars/w214-e300.jpg',
      category: 'luxury'
    },
    {
      id: 5,
      brand: 'MERCEDES',
      model: 'W222 S350',
      image: '/images/cars/w222-s350.jpg',
      category: 'luxury'
    },
    {
      id: 6,
      brand: 'MERCEDES',
      model: 'W223 S63 AMG',
      image: '/images/cars/w223-s63.jpg',
      category: 'sports'
    },
    {
      id: 7,
      brand: 'MERCEDES',
      model: 'G63 AMG',
      image: '/images/cars/w464-g63.jpg',
      category: 'suv'
    },
    {
      id: 8,
      brand: 'BMW',
      model: 'G30 520d',
      image: '/images/cars/g30-520d.jpg',
      category: 'luxury'
    },
    {
      id: 9,
      brand: 'BMW',
      model: 'G30 530i',
      image: '/images/cars/g30-530i.jpg',
      category: 'luxury'
    },
    {
      id: 10,
      brand: 'BMW',
      model: 'G80 M3',
      image: '/images/cars/g80-m3.jpg',
      category: 'sports'
    },
    {
      id: 11,
      brand: 'BMW',
      model: 'G82 M4',
      image: '/images/cars/g82-m4.jpg',
      category: 'sports'
    },
    {
      id: 12,
      brand: 'BMW',
      model: 'F87 M2',
      image: '/images/cars/f87-m2.jpg',
      category: 'sports'
    }
  ];

  // 카테고리별 차량 필터링
  const sportsCars = cars.filter(car => car.category === 'sports');
  const luxuryCars = cars.filter(car => car.category === 'luxury');
  const suvCars = cars.filter(car => car.category === 'suv');

  // 데스크탑용 차량 분할 - 12개 차량을 3개 row로 나눔
  const row1Cars = cars.slice(0, 4);  // 1-4번 차량
  const row2Cars = cars.slice(4, 8);  // 5-8번 차량
  const row3Cars = cars.slice(8, 12); // 9-12번 차량

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-950 overflow-hidden">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center px-4">
          <TextReveal
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-2 sm:mb-4 block"
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
            최고급 슈퍼카 컬렉션을 만나보세요
          </TextReveal>
        </div>

        {isMobile ? (
          // 모바일: 넷플릭스 스타일 카테고리별 캐러셀
          <div className="space-y-8">
            {/* 카테고리 필터 버튼 */}
            <div className="flex gap-2 px-4 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedCategory('sports')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === 'sports' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}
              >
                스포츠카
              </button>
              <button
                onClick={() => setSelectedCategory('luxury')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === 'luxury' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}
              >
                럭셔리
              </button>
              <button
                onClick={() => setSelectedCategory('suv')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === 'suv' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}
              >
                SUV
              </button>
            </div>

            {/* 선택된 카테고리에 따른 캐러셀 표시 */}
            {selectedCategory === 'all' ? (
              <>
                <NetflixCarousel cars={sportsCars} category="sports" />
                <NetflixCarousel cars={luxuryCars} category="luxury" />
                {suvCars.length > 0 && (
                  <NetflixCarousel cars={suvCars} category="suv" />
                )}
              </>
            ) : selectedCategory === 'sports' ? (
              <NetflixCarousel cars={sportsCars} />
            ) : selectedCategory === 'luxury' ? (
              <NetflixCarousel cars={luxuryCars} />
            ) : (
              <NetflixCarousel cars={suvCars} />
            )}

            {/* 스와이프 힌트 */}
            <div className="text-center mt-4 px-4">
              <p className="text-xs text-gray-500">좌우로 스와이프하여 더 많은 차량을 보세요</p>
            </div>
          </div>
        ) : (
          // 데스크탑: 기존 마퀴 애니메이션 (속도 증가)
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <MarqueeRow cars={row1Cars} direction="left" speed="25s" />
            <MarqueeRow cars={row2Cars} direction="right" speed="30s" />
            <MarqueeRow cars={row3Cars} direction="left" speed="20s" />
          </div>
        )}
    </section>
  );
};