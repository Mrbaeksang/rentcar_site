'use client';

import Image from 'next/image';
import { TextReveal } from '@/components/animations/TextReveal';

export const FeaturedCars = () => {
  const cars = [
    {
      id: 1,
      brand: 'LAMBORGHINI',
      model: 'Huracán EVO',
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80'
    },
    {
      id: 2,
      brand: 'BENTLEY',
      model: 'Continental GT',
      image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80'
    },
    {
      id: 3,
      brand: 'PORSCHE',
      model: '911 Turbo S',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80'
    },
    {
      id: 4,
      brand: 'FERRARI',
      model: 'F8 Tributo',
      image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80'
    },
    {
      id: 5,
      brand: 'MERCEDES',
      model: 'G63 AMG',
      image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80'
    },
    {
      id: 6,
      brand: 'ROLLS-ROYCE',
      model: 'Ghost',
      image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80'
    }
  ];

  return (
    <section id="cars" className="py-16 md:py-24 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <TextReveal
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-8 sm:mb-12 md:mb-16 text-white block"
          splitType="words"
          animationType="scaleIn"
          duration={0.6}
          stagger={0.1}
        >
          FEATURED CARS
        </TextReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {cars.map((car, index) => (
            <div
              key={car.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              {/* Image Container - 모바일 최적화 */}
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden bg-gray-900 rounded-t-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              </div>
              
              {/* Car Info - 모바일 최적화 */}
              <div className="pt-3 sm:pt-4 pb-1">
                <h3 className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {car.brand}
                </h3>
                <p className="text-lg sm:text-xl font-bold text-white">
                  {car.model}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};