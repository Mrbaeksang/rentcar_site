'use client';

import { Shield, Clock, Star } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "보험대차",
      description: "사고 시 보험사 직접 처리"
    },
    {
      icon: Star,
      title: "VIP 서비스",
      description: "공항 픽업 & 딜리버리"
    },
    {
      icon: Clock,
      title: "24/7 지원",
      description: "연중무휴 고객 지원"
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-8 sm:mb-12 md:mb-16 text-white"
          data-aos="fade-up"
        >
          SERVICES
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="text-center px-4 sm:px-0"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mb-4 sm:mb-5 md:mb-6 border border-white/20 rounded-full">
                  <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" strokeWidth={1} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};