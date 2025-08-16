'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ChevronUp, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { PaymentSidebar } from '@/components/PaymentSidebar';

export const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCall = () => {
    window.location.href = `tel:${siteConfig.phone}`;
  };

  const handleKakao = () => {
    window.open(siteConfig.kakao, '_blank');
  };

  const handleQuickPayment = () => {
    setIsPaymentOpen(true);
  };

  return (
    <>
      <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 flex flex-col gap-3">
        {/* Quick Payment Button - 주석처리로 비활성화 */}
        {/* <motion.button
          onClick={handleQuickPayment}
          className="group relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CreditCard size={24} className="text-white" />
          
          <div className="absolute right-full mr-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            빠른 예약
            <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-l-black/80 border-t-transparent border-b-transparent transform -translate-y-1/2"></div>
          </div>

          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
          
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
        </motion.button> */}

        {/* Kakao Talk Button */}
        <motion.button
          onClick={handleKakao}
          className="group relative w-14 h-14 md:w-16 md:h-16 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MessageCircle size={24} className="text-black" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            카카오톡 상담
            <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-l-black/80 border-t-transparent border-b-transparent transform -translate-y-1/2"></div>
          </div>

          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-20"></div>
        </motion.button>

        {/* Phone Button */}
        <motion.button
          onClick={handleCall}
          className="group relative w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Phone size={24} className="text-white" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {siteConfig.phoneDisplay}
            <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-l-black/80 border-t-transparent border-b-transparent transform -translate-y-1/2"></div>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
        </motion.button>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="group relative w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 100, scale: 0 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ChevronUp size={24} className="text-white" />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                맨 위로
                <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-l-black/80 border-t-transparent border-b-transparent transform -translate-y-1/2"></div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 빠른 예약 사이드바 - 기본 차량 없이 */}
      <PaymentSidebar 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />
    </>
  );
};