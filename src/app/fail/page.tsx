'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FailPage() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('orderId');
    const message = searchParams.get('message');
    setOrderId(id);
    setErrorMessage(message);
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
          className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle size={48} className="text-red-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4">
          결제에 실패했습니다
        </h1>
        
        <p className="text-gray-400 mb-6">
          {errorMessage || '결제 처리 중 문제가 발생했습니다. 다시 시도해주세요.'}
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
            className="block w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            다시 시도하기
          </Link>
          
          <a 
            href="tel:1599-4826"
            className="block w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
          >
            고객센터 문의
          </a>
        </div>

        <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
          <p className="text-yellow-400 text-sm">
            💡 결제 오류가 반복되시나요?
          </p>
          <p className="text-gray-400 text-xs mt-2">
            • 카드 한도를 확인해주세요<br/>
            • 다른 결제 수단을 시도해보세요<br/>
            • 고객센터로 문의주시면 도와드리겠습니다
          </p>
        </div>
      </motion.div>
    </div>
  );
}