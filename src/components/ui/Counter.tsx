"use client";

import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

interface CounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function Counter({ value, duration = 2000, className }: CounterProps) {
  // Extract number from string (e.g. "+150" -> 150)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const prefix = value.match(/^[^0-9]*/) ? value.match(/^[^0-9]*/)![0] : '';
  const suffix = value.match(/[^0-9]*$/) ? value.match(/[^0-9]*$/)![0] : '';

  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isVisible && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;

      // Skip animation if user prefers reduced motion
      if (prefersReducedMotion) {
        setCount(numericValue);
        return;
      }

      // Reset to 0 to start animation from beginning
      setCount(0);

      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        // Easing function (easeOutQuart)
        const ease = 1 - Math.pow(1 - percentage, 4);

        setCount(Math.floor(ease * numericValue));

        if (progress < duration) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(numericValue);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isVisible, numericValue, duration]);

  // If nan (e.g. "24/7"), just return original string
  if (isNaN(numericValue)) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

interface CounterGridProps {
  counters: {
    end: number;
    suffix?: string;
    label: string;
  }[];
  className?: string; // This helps pass styles from parent
}

export function CounterGrid({ counters, className }: CounterGridProps) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-8", className)}>
      {counters.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight flex justify-center">
            <Counter value={`${stat.end}${stat.suffix || ''}`} />
          </div>
          <div className="font-medium text-sm md:text-base uppercase tracking-wide opacity-80">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
