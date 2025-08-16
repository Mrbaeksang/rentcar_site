'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TextReveal } from '@/components/animations/TextReveal';

// 후기 데이터
const reviews = [
  {
    id: 1,
    name: '김○진',
    rating: 5,
    car: 'BMW 520d',
    content: '와 진짜 렌팁 미쳤네요... 사고대차인데 5시리즈를 준다고? 직원분들도 너무 친절하시고 보험처리도 알아서 다 해주시고. 제 차보다 좋은 차 타서 사고 난 게 오히려 다행이라는 생각이 들 정도ㅋㅋ 진짜 강추!'
  },
  {
    id: 2,
    name: '이○수',
    rating: 5,
    car: 'Mercedes E300',
    content: '렌팁 진짜 대박이에요. 사고 나서 멘붕왔는데 전화하자마자 바로 벤츠 E클래스 준비해주시고, 보험사 서류 처리 같은 것도 다 알아서 해주셔서 저는 진짜 차만 받으면 끝이었어요. 서비스 미쳤다 진짜'
  },
  {
    id: 3,
    name: '박○영',
    rating: 5,
    car: 'BMW M3',
    content: 'M3 타보는 게 소원이었는데 렌팁 덕분에 이뤄졌네요ㅋㅋㅋ 직원분들 진짜 친절하시고, 차도 신차급으로 깨끗하고. 사고대차 맞나 싶을 정도로 서비스가 좋았어요. 무조건 렌팁 추천!'
  },
  {
    id: 4,
    name: '정○민',
    rating: 5,
    car: 'Mercedes S580',
    content: 'S클래스 실화냐... 렌팁 직원분들이 진짜 능력자들이신 것 같아요. 보험사랑 이야기하는 거 다 대신해주시고, 차는 또 이렇게 좋은 걸로 주시고. 완전 감동받았습니다 ㅠㅠ'
  },
  {
    id: 5,
    name: '최○준',
    rating: 5,
    car: 'G63 AMG',
    content: 'G바겐 타면서 출퇴근하니까 회사 사람들이 다 쳐다봄ㅋㅋㅋ 렌팁 진짜 서비스 좋고 직원분들도 너무 친절하심. 다른 사고대차는 상상도 못할 수준이에요!'
  },
  {
    id: 6,
    name: '홍○석',
    rating: 5,
    car: 'BMW 530i',
    content: '렌팁 써보니까 다른 사고대차는 못 쓰겠어요. 일단 차가 너무 좋고, 직원분들이 진짜 프로페셔널하게 모든 걸 처리해주셔서 저는 아무것도 신경 쓸 게 없었어요. 대박!'
  },
  {
    id: 7,
    name: '강○희',
    rating: 5,
    car: 'Mercedes E220',
    content: '집까지 차 가져다주시는 거 실화? 렌팁 서비스 진짜 미쳤어요. 직원분들도 너무 친절하시고, 차도 완전 깨끗하고. 이런 사고대차는 처음이에요!'
  },
  {
    id: 8,
    name: '윤○현',
    rating: 5,
    car: 'BMW M4',
    content: 'M4 운전하면서 느낀 건데 렌팁은 진짜 다르네요. 그냥 좋은 차 주는 게 아니라 진짜 고객을 생각해주는 게 느껴짐. 직원분들도 너무 친절하시고 최고예요!'
  },
  {
    id: 9,
    name: '서○원',
    rating: 5,
    car: 'Mercedes S350',
    content: '거래처 미팅 갔는데 S클래스 타고 가니까 대우가 달라짐ㅋㅋㅋ 렌팁 직원분들이 진짜 일 잘하시고 친절해요. 보험처리도 깔끔하게 해주시고 완전 만족!'
  },
  {
    id: 10,
    name: '임○태',
    rating: 5,
    car: 'BMW 520d',
    content: '5시리즈 타보니까 제 차 팔고 싶어짐... 렌팁 서비스 진짜 좋아요. 직원분들도 너무 친절하시고, 모든 처리가 빠르고 깔끔해서 스트레스 하나도 없었어요!'
  },
  {
    id: 11,
    name: '한○빈',
    rating: 5,
    car: 'Mercedes W214 E300',
    content: '신형 E클래스 미쳤다... 렌팁 직원분들이 진짜 최고의 차를 준비해주신 것 같아요. 친절하고 전문적이고, 이런 서비스는 렌팁밖에 없을 듯!'
  },
  {
    id: 12,
    name: '오○성',
    rating: 5,
    car: 'G80 M3',
    content: 'M3 성능 장난 아니네요ㅋㅋ 렌팁 덕분에 드림카 타봤어요. 직원분들도 진짜 친절하시고, 보험처리도 완벽하게 해주셔서 너무 편했습니다!'
  },
  {
    id: 13,
    name: '장○우',
    rating: 5,
    car: 'Mercedes S63 AMG',
    content: 'S63 AMG 타면서 느낀 건데 렌팁은 차원이 다른 서비스예요. 직원분들이 진짜 고객 입장에서 생각해주시고, 최고의 차량을 제공해주려고 노력하시는 게 느껴져요!'
  },
  {
    id: 14,
    name: '조○연',
    rating: 5,
    car: 'BMW F87 M2',
    content: 'M2 너무 재밌어요ㅋㅋㅋ 렌팁 직원분들이 제가 젊다고 일부러 스포츠카로 준비해주신 것 같아요. 진짜 센스 있고 친절하세요!'
  },
  {
    id: 15,
    name: '신○호',
    rating: 5,
    car: 'Mercedes E300',
    content: '출퇴근길이 행복해졌어요. 렌팁이 진짜 좋은 차로 준비해주시고, 직원분들도 너무 친절해서 감동받았습니다. 무조건 추천!'
  },
  {
    id: 16,
    name: '유○정',
    rating: 5,
    car: 'BMW 530i',
    content: '가족여행 갔는데 530i 덕분에 너무 편하게 다녀왔어요. 렌팁 직원분들이 진짜 세심하게 챙겨주시고, 차도 완전 깨끗해서 너무 좋았어요!'
  },
  {
    id: 17,
    name: '권○철',
    rating: 5,
    car: 'G63 AMG',
    content: 'G클래스 타고 다니니까 인생이 달라진 기분ㅋㅋㅋ 렌팁 직원분들 진짜 최고예요. 친절하고 전문적이고, 이런 서비스는 렌팁밖에 없을 거예요!'
  },
  {
    id: 18,
    name: '노○경',
    rating: 5,
    car: 'Mercedes S580',
    content: '비즈니스 파트너들이 제 차인 줄 알고... ㅎㅎ 렌팁 서비스 진짜 대박이에요. 직원분들도 너무 프로페셔널하시고, 모든 게 완벽했습니다!'
  },
  {
    id: 19,
    name: '문○훈',
    rating: 5,
    car: 'BMW M4',
    content: 'M4로 드라이브 가니까 인생 최고의 순간이었어요. 렌팁 직원분들이 진짜 친절하시고, 차량 상태도 완벽해서 너무 만족스러웠습니다!'
  },
  {
    id: 20,
    name: '배○림',
    rating: 5,
    car: 'Mercedes W222 S350',
    content: '부모님이 S클래스 타보시고 너무 좋아하셨어요. 렌팁 직원분들이 정말 친절하게 모든 걸 설명해주시고, 보험처리도 깔끔하게 해주셔서 감사했습니다!'
  }
];

export const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  // 자동 슬라이드
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setIsFlipping(true);
      setIsAutoPlaying(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setIsFlipping(false);
      }, 300);
      
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }, 4000); // 4초마다 변경

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      setIsFlipping(false);
    }, 300);
    
    // 3초 후 자동 재생 재개
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleNext = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
      setIsFlipping(false);
    }, 300);
    
    // 3초 후 자동 재생 재개
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // 현재, 이전, 다음 리뷰 인덱스
  const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  const nextIndex = (currentIndex + 1) % reviews.length;

  return (
    <section id="reviews" className="py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* 타이틀 */}
        <div className="text-center mb-16">
          <TextReveal
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white block mb-4"
            splitType="words"
            animationType="scaleIn"
            duration={0.6}
            stagger={0.1}
          >
            CUSTOMER REVIEWS
          </TextReveal>
          <p className="text-gray-400 text-lg">렌팁을 이용하신 고객님들의 생생한 후기</p>
        </div>

        {/* 후기 카드 - 3D 카드 스타일 */}
        <div className="max-w-6xl mx-auto relative h-[500px] flex items-center justify-center perspective-1000">
          {/* 네비게이션 버튼 */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* 카드 컨테이너 */}
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            {/* 왼쪽 카드 (이전 리뷰) */}
            <div 
              className="absolute left-0 md:left-10 w-[280px] md:w-[320px] transform -translate-x-1/4 md:-translate-x-1/3 scale-75 md:scale-90 opacity-40 hover:opacity-60 transition-all cursor-pointer z-0"
              onClick={handlePrevious}
              style={{
                transform: 'perspective(1000px) rotateY(25deg) translateX(-50%) scale(0.85)',
              }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 h-[380px]">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < reviews[prevIndex].rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-sky-500/20 rounded-full text-sky-400 text-xs font-semibold">
                    {reviews[prevIndex].car}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 text-center line-clamp-4">
                  {reviews[prevIndex].content}
                </p>
                <div className="text-center">
                  <p className="text-white/70 font-semibold text-sm">{reviews[prevIndex].name}님</p>
                </div>
              </div>
            </div>

            {/* 중앙 카드 (현재 리뷰) */}
            <div 
              className={`relative z-10 w-[320px] md:w-[400px] transition-all duration-500 ${
                isFlipping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{
                transform: 'perspective(1000px) rotateY(0deg)',
              }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl h-[420px] relative overflow-hidden">
                {/* 인용 부호 */}
                <Quote className="absolute top-6 left-6 w-10 h-10 text-sky-500/30" />
                
                {/* 별점 */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < reviews[currentIndex].rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* 차량 정보 */}
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-2 bg-sky-500/20 rounded-full text-sky-400 text-sm font-semibold">
                    {reviews[currentIndex].car}
                  </span>
                </div>

                {/* 후기 내용 */}
                <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 text-center px-2 md:px-4 min-h-[140px]">
                  {reviews[currentIndex].content}
                </p>

                {/* 작성자 정보 */}
                <div className="text-center absolute bottom-8 left-0 right-0">
                  <p className="text-white font-bold text-lg">{reviews[currentIndex].name}님</p>
                </div>
              </div>
            </div>

            {/* 오른쪽 카드 (다음 리뷰) */}
            <div 
              className="absolute right-0 md:right-10 w-[280px] md:w-[320px] transform translate-x-1/4 md:translate-x-1/3 scale-75 md:scale-90 opacity-40 hover:opacity-60 transition-all cursor-pointer z-0"
              onClick={handleNext}
              style={{
                transform: 'perspective(1000px) rotateY(-25deg) translateX(50%) scale(0.85)',
              }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 h-[380px]">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < reviews[nextIndex].rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-sky-500/20 rounded-full text-sky-400 text-xs font-semibold">
                    {reviews[nextIndex].car}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 text-center line-clamp-4">
                  {reviews[nextIndex].content}
                </p>
                <div className="text-center">
                  <p className="text-white/70 font-semibold text-sm">{reviews[nextIndex].name}님</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 인디케이터 - 카드 아래로 이동 */}
        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isFlipping) return;
                setIsFlipping(true);
                setIsAutoPlaying(false);
                
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsFlipping(false);
                }, 300);
                
                setTimeout(() => setIsAutoPlaying(true), 3000);
              }}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 bg-sky-400'
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-sky-400">98%</p>
            <p className="text-gray-500 text-sm mt-2">만족도</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-emerald-400">4.9</p>
            <p className="text-gray-500 text-sm mt-2">평균 평점</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-purple-400">2,847</p>
            <p className="text-gray-500 text-sm mt-2">리뷰 개수</p>
          </div>
        </div>
      </div>
    </section>
  );
};