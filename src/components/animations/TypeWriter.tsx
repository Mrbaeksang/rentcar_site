'use client';

import { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
  startDelay?: number;
}

export const TypeWriter = ({
  text,
  speed = 50,
  className = '',
  cursor = true,
  onComplete,
  startDelay = 0
}: TypeWriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(cursor);
  const indexRef = useRef(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const timer = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayText(prev => prev + text.charAt(indexRef.current));
          indexRef.current++;
        } else {
          clearInterval(timer);
          if (onComplete) onComplete();
          // Hide cursor after completion
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, speed);

      return () => clearInterval(timer);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, onComplete, startDelay]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className="animate-pulse ml-0.5">|</span>
      )}
    </span>
  );
};