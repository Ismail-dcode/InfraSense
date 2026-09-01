import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const directionClass = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: '',
  }[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${directionClass}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
