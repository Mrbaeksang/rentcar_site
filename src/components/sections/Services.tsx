'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, Car, CheckCircle, ArrowRight, MessageCircle, Users, TrendingUp, FileCheck } from 'lucide-react';
import { TextReveal } from '@/components/animations/TextReveal';
import { CountUp } from '@/components/ui/CountUp';

export const Services = () => {
  const [isInView, setIsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // 오늘 날짜 기반 실시간 카운터 (예시 데이터)
  const today = new Date();
  const hour = today.getHours();
  const todayQueries = Math.floor(12 + hour * 1.5); // 시간당 1.5건씩 증가
  
  // Intersection Observer
  useEffect(() => {
    const currentRef = statsRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // 3단계 프로세스
  const process = [
    {
      step: "1",
      title: "접수",
      description: "대물접수번호만 알려주세요",
      icon: Phone
    },
    {
      step: "2", 
      title: "차량 제공",
      description: "즉시 대체 차량 준비",
      icon: Car
    },
    {
      step: "3",
      title: "비용 0원",
      description: "렌팁이 보험사와 직접 처리",
      icon: CheckCircle
    }
  ];

  // 핵심 혜택
  const benefits = [
    {
      title: "본인부담 0원",
      description: "렌팁이 모든 비용 처리"
    },
    {
      title: "보험사 직접청구",
      description: "복잡한 서류 없이 간편"
    },
    {
      title: "즉시 배차",
      description: "당일 차량 준비 완료"
    },
    {
      title: "프리미엄 차량",
      description: "최신 고급 차량 제공"
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 메인 타이틀 */}
        <div className="text-center mb-8">
          <TextReveal
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white block"
            splitType="words"
            animationType="scaleIn"
            duration={0.6}
            stagger={0.1}
          >
            SERVICES
          </TextReveal>
        </div>

        {/* 실시간 통계 */}
        <div ref={statsRef} className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            {/* 오늘 문의 */}
            <div className="bg-gradient-to-br from-sky-500/20 to-sky-600/10 backdrop-blur-sm rounded-2xl p-6 border border-sky-500/30 text-center">
              <div className="flex justify-center mb-3">
                <Phone className="w-8 h-8 text-sky-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <CountUp end={todayQueries} duration={2000} inView={isInView} />
                <span className="text-sky-400">건</span>
              </div>
              <p className="text-sm text-gray-400">오늘 문의</p>
            </div>

            {/* 일평균 처리 */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30 text-center">
              <div className="flex justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <CountUp end={35} duration={2000} inView={isInView} />
                <span className="text-emerald-400">건</span>
              </div>
              <p className="text-sm text-gray-400">일평균 처리</p>
            </div>

            {/* 누적 요청건수 */}
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 text-center">
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <CountUp end={12847} duration={2000} inView={isInView} />
                <span className="text-purple-400">건</span>
              </div>
              <p className="text-sm text-gray-400">누적 요청건수</p>
            </div>

            {/* 누적 계약 */}
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30 text-center">
              <div className="flex justify-center mb-3">
                <FileCheck className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <CountUp end={8543} duration={2500} inView={isInView} />
                <span className="text-orange-400">+</span>
              </div>
              <p className="text-sm text-gray-400">누적 계약</p>
            </div>
          </div>

          {/* 실시간 업데이트 표시 */}
          <div className="text-center mt-6">
            <span className="inline-flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              실시간 업데이트
            </span>
          </div>
        </div>

        {/* 보험대차 메인 히어로 영역 */}
        <div className="relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              사고로 차가 없으신가요?
            </h2>
            <p className="text-xl sm:text-2xl text-sky-400 font-semibold">
              렌팁이 모든 절차를 대신 처리해드립니다
            </p>
          </div>

          {/* 3단계 프로세스 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 max-w-5xl mx-auto">
            {process.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div 
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-sky-400/50 transition-all duration-300 hover:bg-white/10"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-sky-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-2">
                          <span className="text-3xl font-black text-sky-400">{item.step}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mb-3">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 화살표 (데스크탑만) */}
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-sky-400/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 핵심 혜택 그리드 - 통일된 디자인 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="relative group"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className="rounded-xl p-6 h-full transition-all duration-300 bg-white/5 border border-white/10 hover:border-sky-400/30 backdrop-blur-sm hover:bg-white/10">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 text-sky-400" />
                    <div>
                      <h4 className="font-bold text-white mb-2 text-lg">{benefit.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <a
                href="tel:1599-4826"
                className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-sky-500/30 transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-6 h-6 mr-3" />
                <span>전화 문의</span>
              </a>
              <a
                href="https://pf.kakao.com/_xjZxhwn/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                <span>카톡 문의</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};