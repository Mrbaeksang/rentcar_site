'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitType?: 'chars' | 'words' | 'lines';
  animationType?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'rotateIn';
}

export const TextReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.02,
  splitType = 'chars',
  animationType = 'fadeUp'
}: TextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into spans
    const text = children;
    let htmlContent = '';

    if (splitType === 'chars') {
      htmlContent = text.split('').map(char => 
        char === ' ' ? ' ' : `<span class="split-char inline-block">${char}</span>`
      ).join('');
    } else if (splitType === 'words') {
      htmlContent = text.split(' ').map(word => 
        `<span class="split-word inline-block">${word}</span>`
      ).join(' ');
    } else if (splitType === 'lines') {
      // For lines, we need to calculate line breaks based on container width
      htmlContent = `<span class="split-line inline-block">${text}</span>`;
    }

    textRef.current.innerHTML = htmlContent;
    splitTextRef.current = Array.from(textRef.current.querySelectorAll('.split-char, .split-word, .split-line'));

    // Define animation variants
    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 }
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      scaleIn: {
        from: { opacity: 0, scale: 0.5 },
        to: { opacity: 1, scale: 1 }
      },
      rotateIn: {
        from: { opacity: 0, rotateX: -90 },
        to: { opacity: 1, rotateX: 0 }
      }
    };

    const selectedAnimation = animations[animationType];

    // Set initial state
    gsap.set(splitTextRef.current, selectedAnimation.from);

    // Create scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate elements
    tl.to(splitTextRef.current, {
      ...selectedAnimation.to,
      duration,
      stagger,
      delay,
      ease: 'power3.out'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, delay, duration, stagger, splitType, animationType]);

  return (
    <div ref={textRef} className={className} />
  );
};