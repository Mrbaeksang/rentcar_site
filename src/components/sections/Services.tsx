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
    <section id="services" className="py-24 px-4 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-5xl md:text-6xl lg:text-7xl font-black text-center mb-16 text-white"
          data-aos="fade-up"
        >
          SERVICES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 border border-white/20 rounded-full">
                  <Icon className="w-10 h-10 text-white" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};