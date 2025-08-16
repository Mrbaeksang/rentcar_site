'use client';

import { TextReveal } from '@/components/animations/TextReveal';
import { Trophy, Users, Shield, Clock, Star, Car } from 'lucide-react';

export const About = () => {
  const stats = [
    { number: '10+', label: '년 경력', icon: Trophy },
    { number: '5000+', label: '만족 고객', icon: Users },
    { number: '80+', label: '프리미엄 차량', icon: Car },
    { number: '24/7', label: '고객 지원', icon: Clock },
  ];

  const features = [
    {
      icon: Shield,
      title: '완벽한 보험 시스템',
      description: '모든 차량은 종합보험에 가입되어 있으며, 고객님의 안전을 최우선으로 생각합니다.'
    },
    {
      icon: Star,
      title: 'VIP 맞춤 서비스',
      description: '공항 픽업, 호텔 딜리버리 등 고객님께 맞춤형 프리미엄 서비스를 제공합니다.'
    },
    {
      icon: Car,
      title: '최신 차량 보유',
      description: '람보르기니, 벤틀리, 롤스로이스 등 최고급 슈퍼카와 럭셔리 차량을 보유하고 있습니다.'
    },
    {
      icon: Clock,
      title: '24시간 운영',
      description: '언제든지 필요하실 때 연락주시면 신속하게 대응해드립니다.'
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* 메인 타이틀 */}
        <div className="text-center mb-16">
          <TextReveal
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 block"
            splitType="words"
            animationType="scaleIn"
            duration={0.6}
            stagger={0.1}
          >
            ABOUT RENTIP
          </TextReveal>
          <TextReveal
            className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto block"
            splitType="words"
            animationType="fadeUp"
            duration={0.5}
            stagger={0.05}
            delay={0.3}
          >
            렌팁은 국내 최고의 프리미엄 렌터카 서비스를 제공합니다.
            고객님의 특별한 순간을 더욱 특별하게 만들어 드립니다.
          </TextReveal>
        </div>

        {/* 통계 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                  <Icon className="w-8 h-8 text-sky-400 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
                
                {/* 글로우 효과 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/0 to-purple-600/0 group-hover:from-sky-500/20 group-hover:to-purple-600/20 transition-all duration-300 pointer-events-none blur-xl" />
              </div>
            );
          })}
        </div>

        {/* 회사 소개 텍스트 */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            <span className="text-sky-400 font-bold">렌팁(RENTIP)</span>은 2014년 설립 이래로 
            국내 최고 수준의 프리미엄 렌터카 서비스를 제공하고 있습니다.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            단순한 차량 대여를 넘어, 고객님께 잊지 못할 드라이빙 경험과 
            최상의 서비스를 제공하는 것이 저희의 목표입니다.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            웨딩, 프로포즈, VIP 의전, 기업 행사 등 특별한 순간에 
            품격 있는 차량과 전문적인 서비스로 함께하겠습니다.
          </p>
        </div>

        {/* 특징 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 호버 글로우 효과 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/0 to-purple-600/0 group-hover:from-sky-500/10 group-hover:to-purple-600/10 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* CTA 섹션 */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-sky-500/10 to-purple-600/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              특별한 순간을 더욱 특별하게
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              렌팁과 함께 잊지 못할 추억을 만들어보세요.
              전문 상담사가 고객님께 최적의 차량과 서비스를 추천해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:010-2984-1379"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-sky-500 to-purple-600 text-white font-bold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>전화 상담</span>
                <span className="ml-2">010-2984-1379</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                오시는 길 확인
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};