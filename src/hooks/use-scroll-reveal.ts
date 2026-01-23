"use client";

import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * Hook to trigger animations when element enters viewport
 * Returns: [ref, isVisible]
 */
export function useScrollReveal<T extends HTMLElement>(
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
): [RefObject<T | null>, boolean] {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce && element) {
                        observer.unobserve(element);
                    }
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce]);

    // Handle ref casting
    return [ref, isVisible];
}
