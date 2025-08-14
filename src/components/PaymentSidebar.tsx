'use client';

import { useState, useEffect, useRef } from 'react';
import { X, CreditCard, Calendar, Clock, User, Phone, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PaymentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  car?: {
    id: number;
    brand: string;
    model: string;
    price: number;
    image: string;
  };
}

// 기본 차량 목록
const DEFAULT_CARS = [
  { id: 1, brand: 'LAMBORGHINI', model: 'Huracán EVO', price: 150, image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80' },
  { id: 2, brand: 'BENTLEY', model: 'Continental GT', price: 120, image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80' },
  { id: 3, brand: 'PORSCHE', model: '911 Turbo S', price: 100, image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80' },
  { id: 4, brand: 'FERRARI', model: 'F8 Tributo', price: 180, image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80' },
  { id: 5, brand: 'MERCEDES', model: 'G63 AMG', price: 90, image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80' },
];

export const PaymentSidebar = ({ isOpen, onClose, car }: PaymentSidebarProps) => {
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState(car || DEFAULT_CARS[0]);
  const [rentalDays, setRentalDays] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [widgets, setWidgets] = useState<unknown>(null);
  const [paymentMethodWidget, setPaymentMethodWidget] = useState<unknown>(null);
  
  const phone2Ref = useRef<HTMLInputElement>(null);
  const phone3Ref = useRef<HTMLInputElement>(null);

  // 토스페이먼츠 SDK 초기화
  useEffect(() => {
    const loadTossPayments = async () => {
      try {
        // SDK가 로드될 때까지 대기
        let attempts = 0;
        const maxAttempts = 20;
        
        const waitForSDK = async () => {
          while (attempts < maxAttempts) {
            if (typeof window !== 'undefined' && (window as { TossPayments?: unknown }).TossPayments) {
              const TossPayments = (window as { TossPayments?: unknown }).TossPayments;
              
              if (TossPayments && typeof TossPayments === 'function') {
                console.log('TossPayments SDK loaded successfully');
                
                // 토스페이먼츠 결제위젯 공식 테스트 클라이언트 키
                // 공식 문서에서 제공하는 결제위젯 테스트 키
                const tp = (TossPayments as (key: string) => unknown)('test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm');
                
                if (tp && typeof tp === 'object' && 'widgets' in tp) {
                  try {
                    // TossPayments.ANONYMOUS를 사용하여 비회원 결제 초기화
                    const TossPaymentsClass = (window as { TossPayments?: { ANONYMOUS?: string } }).TossPayments;
                    const ANONYMOUS = TossPaymentsClass?.ANONYMOUS || 'ANONYMOUS';
                    
                    const tpObj = tp as { widgets: (options: { customerKey: string }) => Promise<unknown> };
                    const widgetInstance = await tpObj.widgets({ 
                      customerKey: ANONYMOUS // 비회원 결제
                    });
                    
                    console.log('Widgets initialized with ANONYMOUS:', widgetInstance);
                    setWidgets(widgetInstance);
                    return;
                  } catch (error) {
                    console.error('Widget initialization error:', error);
                  }
                }
              }
            }
            
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          
          console.error('Failed to load TossPayments SDK after', maxAttempts, 'attempts');
        };
        
        await waitForSDK();
      } catch (error) {
        console.error('Error initializing TossPayments:', error);
      }
    };

    if (isOpen) {
      loadTossPayments();
    }
  }, [isOpen]);

  // car prop이 변경되면 selectedCar 업데이트
  useEffect(() => {
    if (car) {
      setSelectedCar(car);
    }
  }, [car]);

  // 결제 위젯 렌더링
  useEffect(() => {
    const renderPaymentWidget = async () => {
      if (!widgets || !isOpen || step !== 3 || !selectedCar) {
        return;
      }

      try {
        console.log('Rendering payment widget with widgets:', widgets);
        
        const widgetsObj = widgets as {
          setAmount: (options: { value: number; currency: string }) => Promise<void>;
          renderPaymentMethods: (options: { selector: string; variantKey?: string }) => Promise<unknown>;
          renderAgreement?: (options: { selector: string; variantKey?: string }) => Promise<unknown>;
        };

        // DOM 요소가 준비될 때까지 대기
        await new Promise(resolve => setTimeout(resolve, 100));

        const paymentElement = document.getElementById('payment-methods');
        const agreementElement = document.getElementById('payment-agreement');
        
        if (!paymentElement) {
          console.error('Payment methods element not found');
          return;
        }

        // 기존 위젯 내용 초기화
        paymentElement.innerHTML = '';
        if (agreementElement) {
          agreementElement.innerHTML = '';
        }

        // 결제 금액 설정 (반드시 렌더링 전에 설정)
        const amount = selectedCar.price * rentalDays * 10000;
        console.log('Setting amount:', amount);
        
        await widgetsObj.setAmount({
          value: amount,
          currency: 'KRW',
        });

        // 결제수단 위젯 렌더링
        console.log('Rendering payment methods widget');
        const widget = await widgetsObj.renderPaymentMethods({
          selector: '#payment-methods',
          variantKey: 'DEFAULT'  // 기본 결제 UI 사용
        });
        
        console.log('Payment widget rendered:', widget);
        setPaymentMethodWidget(widget);
        
        // 결제수단 선택 이벤트 리스너
        if (widget && typeof widget === 'object' && 'on' in widget) {
          const widgetWithEvents = widget as { 
            on: (event: string, callback: (data: unknown) => void) => void;
            getSelectedPaymentMethod?: () => Promise<unknown>;
          };
          
          widgetWithEvents.on('paymentMethodSelect', (selectedPaymentMethod) => {
            console.log('Payment method selected:', selectedPaymentMethod);
          });
        }

        // 이용약관 위젯 렌더링 (선택사항)
        if (widgetsObj.renderAgreement && agreementElement) {
          try {
            await widgetsObj.renderAgreement({
              selector: '#payment-agreement'
            });
            console.log('Agreement widget rendered');
          } catch (err) {
            console.log('Agreement widget render skipped:', err);
          }
        }
      } catch (error) {
        console.error('결제 위젯 렌더링 실패:', error);
      }
    };

    // 위젯이 초기화된 후에만 렌더링
    if (widgets && step === 3) {
      renderPaymentWidget();
    }
  }, [widgets, isOpen, step, selectedCar, rentalDays]);

  const totalPrice = selectedCar ? selectedCar.price * rentalDays : 0;

  const handlePayment = async () => {
    console.log('handlePayment called');
    console.log('widgets:', widgets);
    console.log('selectedCar:', selectedCar);
    console.log('paymentMethodWidget:', paymentMethodWidget);
    
    if (!widgets || !selectedCar) {
      console.error('widgets or selectedCar is missing');
      alert('결제 정보가 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // 결제수단이 선택되었는지 확인
    if (paymentMethodWidget && typeof paymentMethodWidget === 'object' && 'getSelectedPaymentMethod' in paymentMethodWidget) {
      try {
        const selectedMethod = await (paymentMethodWidget as { getSelectedPaymentMethod: () => Promise<unknown> }).getSelectedPaymentMethod();
        console.log('Selected payment method:', selectedMethod);
        
        if (!selectedMethod) {
          alert('결제수단을 선택해주세요.');
          return;
        }
      } catch (err) {
        console.log('Could not get selected payment method:', err);
      }
    }

    if (!customerName || phone1.length !== 3 || phone2.length !== 4 || phone3.length !== 4) {
      alert('고객 정보를 모두 입력해주세요.');
      return;
    }

    const customerPhone = `${phone1}${phone2}${phone3}`;
    console.log('Customer Info:', { customerName, customerPhone });

    try {
      const widgetsObj = widgets as {
        requestPayment: (options: {
          orderId: string;
          orderName: string;
          customerName?: string;
          customerMobilePhone?: string;
          customerEmail?: string;
          successUrl?: string;
          failUrl?: string;
        }) => Promise<void>;
      };

      // 주문 ID 생성 (영문, 숫자, -_=만 허용)
      const orderId = `RENTIP_${Date.now()}`;
      
      const paymentData = {
        orderId: orderId,
        orderName: `${selectedCar.brand} ${selectedCar.model} ${rentalDays}일 렌탈`,
        customerName: customerName,
        customerMobilePhone: customerPhone,
        customerEmail: 'customer@example.com',
        successUrl: `http://localhost:3001/success`,
        failUrl: `http://localhost:3001/fail`,
      };
      
      console.log('Payment Data:', paymentData);
      
      // 결제위젯에서 결제수단을 선택한 후 결제 요청
      await widgetsObj.requestPayment(paymentData);
    } catch (error) {
      console.error('결제 실패 상세:', error);
      if (error instanceof Error) {
        alert(`결제 처리 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert('결제 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const nextStep = () => {
    if (step === 1 && (!startDate || !startTime || rentalDays < 1)) {
      alert('예약 정보를 모두 입력해주세요.');
      return;
    }
    if (step === 2 && (!customerName || phone1.length !== 3 || phone2.length !== 4 || phone3.length !== 4)) {
      alert('고객 정보를 모두 입력해주세요.');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePhone1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setPhone1(value);
    if (value.length === 3) {
      phone2Ref.current?.focus();
    }
  };

  const handlePhone2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPhone2(value);
    if (value.length === 4) {
      phone3Ref.current?.focus();
    }
  };

  const handlePhone3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPhone3(value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* 사이드바 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-white/10 z-50 flex flex-col"
          >
            {/* 헤더 */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">빠른 예약</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* 차량 선택 또는 정보 표시 */}
              {!car ? (
                <div className="bg-white/5 rounded-lg p-4">
                  <label className="text-white text-sm mb-2 block">차량 선택</label>
                  <select
                    value={selectedCar.id}
                    onChange={(e) => {
                      const newCar = DEFAULT_CARS.find(c => c.id === Number(e.target.value));
                      if (newCar) setSelectedCar(newCar);
                    }}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500 [&>option]:text-black"
                  >
                    {DEFAULT_CARS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.brand} {c.model} - {c.price}만원/일
                      </option>
                    ))}
                  </select>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative w-20 h-14">
                      <Image 
                        src={selectedCar.image} 
                        alt={`${selectedCar.brand} ${selectedCar.model}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{selectedCar.brand} {selectedCar.model}</p>
                      <p className="text-yellow-400 font-bold">{selectedCar.price}만원/일</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-16">
                      <Image 
                        src={selectedCar.image} 
                        alt={`${selectedCar.brand} ${selectedCar.model}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{selectedCar.brand}</h3>
                      <p className="text-gray-400 text-sm">{selectedCar.model}</p>
                      <p className="text-yellow-400 font-bold">{selectedCar.price}만원/일</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 진행 단계 */}
              <div className="flex items-center justify-between mt-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${step >= s ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-500'}`}>
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-20 h-0.5 mx-2 ${step > s ? 'bg-red-600' : 'bg-white/10'}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className={`text-xs ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>예약정보</span>
                <span className={`text-xs ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>고객정보</span>
                <span className={`text-xs ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>결제</span>
              </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Step 1: 예약 정보 */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="flex items-center gap-2 text-white mb-2">
                      <Calendar size={18} />
                      픽업 날짜
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white mb-2">
                      <Clock size={18} />
                      픽업 시간
                    </label>
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500 [&>option]:bg-black [&>option]:text-white"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                          {i.toString().padStart(2, '0')}:00
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white mb-2">
                      <Calendar size={18} />
                      렌탈 기간
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                        className="w-10 h-10 bg-white/10 rounded-lg hover:bg-white/20 text-white font-bold"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold text-white min-w-[60px] text-center">
                        {rentalDays}일
                      </span>
                      <button
                        onClick={() => setRentalDays(rentalDays + 1)}
                        className="w-10 h-10 bg-white/10 rounded-lg hover:bg-white/20 text-white font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 mt-6">
                    <div className="flex justify-between text-white mb-2">
                      <span>일일 요금</span>
                      <span>{selectedCar?.price || 0}만원</span>
                    </div>
                    <div className="flex justify-between text-white mb-2">
                      <span>렌탈 기간</span>
                      <span>{rentalDays}일</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 mt-2">
                      <div className="flex justify-between text-yellow-400 font-bold text-lg">
                        <span>총 금액</span>
                        <span>{totalPrice}만원</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: 고객 정보 */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="flex items-center gap-2 text-white mb-2">
                      <User size={18} />
                      이름
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="홍길동"
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white mb-2">
                      <Phone size={18} />
                      연락처
                    </label>
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="tel"
                        value={phone1}
                        onChange={handlePhone1Change}
                        placeholder="010"
                        maxLength={3}
                        className="w-[23%] p-3 bg-white/10 border border-white/20 rounded-lg text-white text-center placeholder-gray-500 focus:outline-none focus:border-red-500"
                      />
                      <span className="text-white">-</span>
                      <input
                        ref={phone2Ref}
                        type="tel"
                        value={phone2}
                        onChange={handlePhone2Change}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && phone2 === '') {
                            setPhone2('');
                            const input = document.querySelector('input[value="' + phone1 + '"]') as HTMLInputElement;
                            input?.focus();
                          }
                        }}
                        placeholder="1234"
                        maxLength={4}
                        className="w-[30%] p-3 bg-white/10 border border-white/20 rounded-lg text-white text-center placeholder-gray-500 focus:outline-none focus:border-red-500"
                      />
                      <span className="text-white">-</span>
                      <input
                        ref={phone3Ref}
                        type="tel"
                        value={phone3}
                        onChange={handlePhone3Change}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && phone3 === '') {
                            setPhone3('');
                            phone2Ref.current?.focus();
                          }
                        }}
                        placeholder="5678"
                        maxLength={4}
                        className="w-[30%] p-3 bg-white/10 border border-white/20 rounded-lg text-white text-center placeholder-gray-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                    <p className="text-yellow-400 text-sm">
                      ⚠️ 운전면허증과 신분증을 지참해주세요
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">예약 요약</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>차량</span>
                        <span>{selectedCar?.brand} {selectedCar?.model}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>픽업일시</span>
                        <span>{startDate} {startTime}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>렌탈기간</span>
                        <span>{rentalDays}일</span>
                      </div>
                      <div className="flex justify-between text-yellow-400 font-bold text-lg pt-2 border-t border-white/10">
                        <span>총 결제금액</span>
                        <span>{(totalPrice * 10000).toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: 결제 */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">결제 정보</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>예약자</span>
                        <span>{customerName}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>연락처</span>
                        <span>{phone1}-{phone2}-{phone3}</span>
                      </div>
                      <div className="flex justify-between text-yellow-400 font-bold text-lg pt-2 border-t border-white/10">
                        <span>총 결제금액</span>
                        <span>{(totalPrice * 10000).toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>

                  {/* 토스페이먼츠 결제위젯 렌더링 영역 */}
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div 
                      id="payment-methods" 
                      className="w-full"
                    />
                  </div>
                  
                  {/* 이용약관 영역 */}
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20 mt-4">
                    <div 
                      id="payment-agreement" 
                      className="w-full opacity-90"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* 하단 버튼 */}
            <div className="p-6 border-t border-white/10">
              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex-1 py-4 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-colors"
                  >
                    이전
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    className="flex-1 py-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    다음
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handlePayment}
                    className="flex-1 py-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} />
                    결제하기
                  </button>
                )}
              </div>

              {step === 3 && (
                <p className="text-center text-gray-500 text-xs mt-3">
                  결제 진행 시 이용약관에 동의한 것으로 간주됩니다
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};