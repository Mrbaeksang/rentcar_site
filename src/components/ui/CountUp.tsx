'use client';

import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  inView?: boolean;
}

export const CountUp = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  decimals = 0,
  inView = true 
}: CountUpProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!inView) return;

    startTimeRef.current = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTimeRef.current) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(end * easeOutQuart * Math.pow(10, decimals)) / Math.pow(10, decimals);
      
      setCount(currentCount);
      countRef.current = currentCount;
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, decimals, inView]);

  return (
    <span>
      {prefix}{count.toLocaleString('ko-KR', { maximumFractionDigits: decimals })}{suffix}
    </span>
  );
};