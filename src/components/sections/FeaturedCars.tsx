'use client';

import Image from 'next/image';

export const FeaturedCars = () => {
  const cars = [
    {
      id: 1,
      brand: 'LAMBORGHINI',
      model: 'Huracán EVO',
      price: 150,
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80'
    },
    {
      id: 2,
      brand: 'BENTLEY',
      model: 'Continental GT',
      price: 120,
      image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80'
    },
    {
      id: 3,
      brand: 'PORSCHE',
      model: '911 Turbo S',
      price: 100,
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80'
    },
    {
      id: 4,
      brand: 'FERRARI',
      model: 'F8 Tributo',
      price: 180,
      image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80'
    },
    {
      id: 5,
      brand: 'MERCEDES',
      model: 'G63 AMG',
      price: 90,
      image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80'
    },
    {
      id: 6,
      brand: 'ROLLS-ROYCE',
      model: 'Ghost',
      price: 200,
      image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80'
    }
  ];

  return (
    <section id="cars" className="py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-5xl md:text-6xl lg:text-7xl font-black text-center mb-16 text-white"
          data-aos="fade-up"
        >
          FEATURED CARS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <div
              key={car.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden bg-gray-900">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              </div>
              
              {/* Car Info - Minimalist */}
              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {car.brand}
                </h3>
                <p className="text-xl font-bold text-white mb-2">
                  {car.model}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">
                    {car.price}
                  </span>
                  <span className="text-gray-500">만원/일</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};