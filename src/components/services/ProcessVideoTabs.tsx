'use client';

import { useState, useRef, useEffect } from 'react';
import { ServiceProcessSector } from '@/config/services';
import { cn } from '@/lib/utils';

interface ProcessVideoTabsProps {
    sectors: ServiceProcessSector[];
}

export function ProcessVideoTabs({ sectors }: ProcessVideoTabsProps) {
    // Always default to first sector (Finance)
    const [activeKey, setActiveKey] = useState(sectors[0]?.key || '');
    const [isVisible, setIsVisible] = useState(false);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAutoAdvanced = useRef(false);

    // IntersectionObserver for reveal animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    // Handle video playback and auto-advance
    useEffect(() => {
        const activeVideo = videoRefs.current[activeKey];

        // Pause all other videos
        Object.keys(videoRefs.current).forEach((key) => {
            const video = videoRefs.current[key];
            if (video && key !== activeKey) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Play active video
        if (activeVideo) {
            hasAutoAdvanced.current = false;
            const playPromise = activeVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Auto-play was prevented (browser policy)
                });
            }

            // Auto-advance to next video when current ends
            const handleVideoEnd = () => {
                if (hasAutoAdvanced.current) return; // Prevent double-firing
                hasAutoAdvanced.current = true;

                const currentIndex = sectors.findIndex((s) => s.key === activeKey);
                const nextIndex = (currentIndex + 1) % sectors.length;
                const nextKey = sectors[nextIndex].key;

                // Small delay for smooth transition
                setTimeout(() => {
                    setActiveKey(nextKey);
                }, 300);
            };

            activeVideo.addEventListener('ended', handleVideoEnd);

            return () => {
                activeVideo.removeEventListener('ended', handleVideoEnd);
            };
        }
    }, [activeKey, sectors]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "w-full max-w-6xl mx-auto flex flex-col items-center transition-all duration-700 ease-out",
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 motion-reduce:translate-y-0"
            )}
        >
            {/* Tabs */}
            <div
                className="flex flex-wrap justify-center gap-3 mb-12"
                role="tablist"
                aria-label="Process Sectors"
            >
                {sectors.map((sector) => {
                    const isActive = activeKey === sector.key;
                    return (
                        <button
                            key={sector.key}
                            id={`tab-${sector.key}`}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${sector.key}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActiveKey(sector.key)}
                            onKeyDown={(e) => {
                                // Arrow key navigation for accessibility
                                const currentIndex = sectors.findIndex((s) => s.key === sector.key);
                                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    const nextIndex = (currentIndex + 1) % sectors.length;
                                    setActiveKey(sectors[nextIndex].key);
                                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    const prevIndex = (currentIndex - 1 + sectors.length) % sectors.length;
                                    setActiveKey(sectors[prevIndex].key);
                                }
                            }}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 border",
                                isActive
                                    ? "bg-primary text-white border-primary shadow-lg scale-105"
                                    : "bg-background text-muted-foreground border-transparent hover:border-border hover:bg-secondary/50"
                            )}
                        >
                            {sector.label}
                        </button>
                    );
                })}
            </div>

            {/* Video Panel - Full video visible with object-contain */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                {sectors.map((sector) => {
                    const isActive = activeKey === sector.key;
                    return (
                        <div
                            key={sector.key}
                            id={`panel-${sector.key}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${sector.key}`}
                            aria-hidden={!isActive}
                            className={cn(
                                "absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out motion-reduce:duration-200",
                                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                            )}
                        >
                            <video
                                ref={(el) => {
                                    if (el) videoRefs.current[sector.key] = el;
                                }}
                                src={sector.videoSrc}
                                className="w-full h-full object-contain"
                                muted
                                playsInline
                                preload="metadata"
                                aria-label={`${sector.label} process visualization`}
                            />
                            {/* Subtle gradient overlay for premium feel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
