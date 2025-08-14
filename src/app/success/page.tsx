'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('orderId');
    setOrderId(id);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-green-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4">
          예약이 완료되었습니다!
        </h1>
        
        <p className="text-gray-400 mb-6">
          예약 확인 및 상세 안내는 카카오톡으로 발송됩니다.
        </p>

        {orderId && (
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">주문번호</p>
            <p className="text-white font-mono">{orderId}</p>
          </div>
        )}

        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            홈으로 돌아가기
          </Link>
          
          <a 
            href="tel:01029841379"
            className="block w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
          >
            고객센터 문의
          </a>
        </div>

        <p className="text-gray-500 text-xs mt-6">
          * 영업시간: 평일 09:00 - 18:00
        </p>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}