'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * HeroVisual - A decorative automation/RPA visual for the Hyperautomation hero.
 * Pure SVG/CSS, respects prefers-reduced-motion, aria-hidden for a11y.
 * 
 * Uses mounted guard pattern to prevent hydration mismatch:
 * - Server renders null (no SVG attributes that could mismatch)
 * - Client renders full visual after mount
 */
export function HeroVisual() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // During SSR and initial client render, return null to prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div
            aria-hidden="true"
            className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none",
                "w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px]",
                "opacity-80 mix-blend-screen",
                // Hide on very small screens to preserve text space, fade in on larger
                "hidden sm:block"
            )}
        >
            {/* Radial mask to blend edges into background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,slate-950_70%)] z-10" />

            {/* Horizontal gradient fade for text overlap area */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent z-20" />

            {/* Main SVG visual */}
            <svg
                viewBox="0 0 800 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#0891b2" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                    </linearGradient>
                    <radialGradient id="cyber-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    <style>
                        {`
                            @media (prefers-reduced-motion: no-preference) {
                                .spin-slow { animation: spin 60s linear infinite; }
                                .spin-reverse { animation: spin-reverse 45s linear infinite; }
                                .pulse-glow { animation: pulse 4s ease-in-out infinite; }
                                .path-flow { stroke-dasharray: 10 10; animation: dash 20s linear infinite; }
                                .float { animation: float 6s ease-in-out infinite; }
                                .blink { animation: blink 3s step-end infinite; }
                            }
                            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                            @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                            @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
                            @keyframes dash { to { stroke-dashoffset: -200; } }
                            @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                            @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.3; } }
                            
                            .hud-ring { transform-origin: center; }
                        `}
                    </style>
                </defs>

                {/* Central Glow */}
                <circle cx="400" cy="400" r="150" fill="url(#cyber-glow)" className="pulse-glow" />

                {/* Layer 1: Background Grid Network - Static/Subtle */}
                <g opacity="0.2">
                    <path d="M100 400 H700 M400 100 V700" stroke="#0891b2" strokeWidth="1" />
                    <circle cx="400" cy="400" r="250" stroke="#0891b2" strokeWidth="0.5" strokeDasharray="4 4" />
                    <circle cx="400" cy="400" r="350" stroke="#0891b2" strokeWidth="0.5" opacity="0.5" />
                </g>

                {/* Layer 2: Rotating HUD Rings */}
                <g className="hud-ring spin-slow" opacity="0.6">
                    <circle cx="400" cy="400" r="180" stroke="url(#cyber-gradient)" strokeWidth="1" strokeDasharray="20 40" />
                    <circle cx="400" cy="400" r="175" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="100 200" opacity="0.5" />
                    {/* Ring Accents */}
                    {[0, 90, 180, 270].map(deg => (
                        <rect key={deg} x="398" y="215" width="4" height="10" fill="#22d3ee" transform={`rotate(${deg} 400 400)`} />
                    ))}
                </g>

                <g className="hud-ring spin-reverse" opacity="0.5">
                    <circle cx="400" cy="400" r="220" stroke="#0891b2" strokeWidth="1" strokeDasharray="5 10 20 10" />
                    <path d="M400 170 L400 190 M400 610 L400 630 M170 400 L190 400 M610 400 L630 400" stroke="#22d3ee" strokeWidth="2" />
                </g>

                {/* Layer 3: Central Core - Automation Logic */}
                <g className="float">
                    {/* Core Hexagon */}
                    <path
                        d="M400 340 L452 370 L452 430 L400 460 L348 430 L348 370 Z"
                        stroke="#22d3ee"
                        strokeWidth="2"
                        fill="#0891b2"
                        fillOpacity="0.1"
                        filter="url(#glow-blur)"
                    />

                    {/* Inner circuitry */}
                    <path d="M400 370 V430 M375 385 L425 415 M425 385 L375 415" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
                    <circle cx="400" cy="400" r="10" fill="#22d3ee" className="pulse-glow" filter="url(#glow-blur)" />

                    {/* Data Orbitals */}
                    <circle cx="400" cy="400" r="40" stroke="#22d3ee" strokeWidth="1" strokeDasharray="5 5" className="spin-slow" style={{ animationDuration: '10s' }} />
                </g>

                {/* Layer 4: Data Streams / Connection Nodes */}
                <g className="path-flow" opacity="0.4">
                    <path d="M100 400 Q 250 400 400 400 T 700 400" stroke="#22d3ee" strokeWidth="1" fill="none" />
                    <path d="M400 100 Q 400 250 400 400 T 400 700" stroke="#22d3ee" strokeWidth="1" fill="none" />
                </g>

                {/* Layer 5: Decorative Pulse Nodes */}
                {[
                    { cx: 250, cy: 250, delay: '0s' },
                    { cx: 550, cy: 250, delay: '1s' },
                    { cx: 550, cy: 550, delay: '2s' },
                    { cx: 250, cy: 550, delay: '3s' }
                ].map((node, i) => (
                    <g key={i} className="blink" style={{ animationDelay: node.delay }}>
                        <circle cx={node.cx} cy={node.cy} r="3" fill="#22d3ee" />
                        <circle cx={node.cx} cy={node.cy} r="6" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5" />
                    </g>
                ))}
            </svg>
        </div>
    );
}
