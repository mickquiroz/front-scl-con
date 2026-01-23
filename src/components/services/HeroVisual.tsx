'use client';

import { cn } from '@/lib/utils';

/**
 * HeroVisual - A decorative automation/RPA visual for the Hyperautomation hero.
 * Pure SVG/CSS, respects prefers-reduced-motion, aria-hidden for a11y.
 */
export function HeroVisual() {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none",
                "w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]",
                "opacity-60 md:opacity-80",
                // Hide on very small screens to preserve text space
                "hidden sm:block"
            )}
        >
            {/* Gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-950/50 to-slate-950 z-10" />

            {/* Main SVG visual */}
            <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Circuit grid background */}
                <defs>
                    <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#0891b2" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
                    </linearGradient>
                    {/* Animated pulse for reduced-motion respectful animation */}
                    <style>
                        {`
                            @media (prefers-reduced-motion: no-preference) {
                                .hero-pulse {
                                    animation: heroPulse 3s ease-in-out infinite;
                                }
                                .hero-rotate {
                                    animation: heroRotate 20s linear infinite;
                                    transform-origin: center;
                                }
                                .hero-float {
                                    animation: heroFloat 4s ease-in-out infinite;
                                }
                                .circuit-draw {
                                    animation: circuitDraw 2s ease-out forwards;
                                    stroke-dasharray: 200;
                                    stroke-dashoffset: 200;
                                }
                            }
                            @keyframes heroPulse {
                                0%, 100% { opacity: 0.6; }
                                50% { opacity: 1; }
                            }
                            @keyframes heroRotate {
                                from { transform: rotate(0deg); }
                                to { transform: rotate(360deg); }
                            }
                            @keyframes heroFloat {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(-10px); }
                            }
                            @keyframes circuitDraw {
                                to { stroke-dashoffset: 0; }
                            }
                        `}
                    </style>
                </defs>

                {/* Outer ring - gear representation */}
                <g className="hero-rotate">
                    <circle
                        cx="200"
                        cy="200"
                        r="150"
                        stroke="url(#circuit-gradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="20 10"
                    />
                    {/* Gear teeth */}
                    {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        // Round to 2 decimal places to ensure SSR/client hydration match
                        const x1 = Math.round((200 + 145 * Math.cos(angle)) * 100) / 100;
                        const y1 = Math.round((200 + 145 * Math.sin(angle)) * 100) / 100;
                        const x2 = Math.round((200 + 165 * Math.cos(angle)) * 100) / 100;
                        const y2 = Math.round((200 + 165 * Math.sin(angle)) * 100) / 100;
                        return (
                            <line
                                key={i}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#22d3ee"
                                strokeWidth="3"
                                strokeLinecap="round"
                                opacity="0.5"
                            />
                        );
                    })}
                </g>

                {/* Inner gear */}
                <g className="hero-rotate" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
                    <circle
                        cx="200"
                        cy="200"
                        r="80"
                        stroke="#0891b2"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="15 8"
                        opacity="0.6"
                    />
                    {/* Inner gear teeth */}
                    {[...Array(8)].map((_, i) => {
                        const angle = (i * 45 * Math.PI) / 180;
                        // Round to 2 decimal places to ensure SSR/client hydration match
                        const x1 = Math.round((200 + 75 * Math.cos(angle)) * 100) / 100;
                        const y1 = Math.round((200 + 75 * Math.sin(angle)) * 100) / 100;
                        const x2 = Math.round((200 + 90 * Math.cos(angle)) * 100) / 100;
                        const y2 = Math.round((200 + 90 * Math.sin(angle)) * 100) / 100;
                        return (
                            <line
                                key={i}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeLinecap="round"
                                opacity="0.4"
                            />
                        );
                    })}
                </g>

                {/* Center robot/automation icon */}
                <g className="hero-float">
                    {/* Robot head */}
                    <rect
                        x="175"
                        y="175"
                        width="50"
                        height="40"
                        rx="8"
                        fill="none"
                        stroke="url(#glow-gradient)"
                        strokeWidth="2"
                    />
                    {/* Robot eyes */}
                    <circle cx="188" cy="192" r="5" fill="#22d3ee" className="hero-pulse" />
                    <circle cx="212" cy="192" r="5" fill="#22d3ee" className="hero-pulse" style={{ animationDelay: '0.3s' }} />
                    {/* Antenna */}
                    <line x1="200" y1="175" x2="200" y2="160" stroke="#0891b2" strokeWidth="2" />
                    <circle cx="200" cy="155" r="5" fill="#22d3ee" className="hero-pulse" style={{ animationDelay: '0.6s' }} />
                    {/* Robot body */}
                    <rect
                        x="180"
                        y="220"
                        width="40"
                        height="30"
                        rx="4"
                        fill="none"
                        stroke="#0891b2"
                        strokeWidth="1.5"
                        opacity="0.6"
                    />
                </g>

                {/* Circuit connection lines */}
                <g opacity="0.5">
                    {/* Top circuit */}
                    <path
                        d="M200 100 L200 140 L240 140"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        fill="none"
                        className="circuit-draw"
                    />
                    <circle cx="240" cy="140" r="4" fill="#06b6d4" className="hero-pulse" />

                    {/* Right circuit */}
                    <path
                        d="M280 200 L320 200 L320 160"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        fill="none"
                        className="circuit-draw"
                        style={{ animationDelay: '0.5s' }}
                    />
                    <circle cx="320" cy="160" r="4" fill="#06b6d4" className="hero-pulse" style={{ animationDelay: '0.5s' }} />

                    {/* Bottom circuit */}
                    <path
                        d="M200 270 L200 310 L160 310"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        fill="none"
                        className="circuit-draw"
                        style={{ animationDelay: '1s' }}
                    />
                    <circle cx="160" cy="310" r="4" fill="#06b6d4" className="hero-pulse" style={{ animationDelay: '1s' }} />

                    {/* Left circuit */}
                    <path
                        d="M120 200 L80 200 L80 240"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        fill="none"
                        className="circuit-draw"
                        style={{ animationDelay: '1.5s' }}
                    />
                    <circle cx="80" cy="240" r="4" fill="#06b6d4" className="hero-pulse" style={{ animationDelay: '1.5s' }} />
                </g>

                {/* Corner nodes - data flow representation */}
                <g opacity="0.4">
                    <circle cx="100" cy="100" r="6" fill="#0891b2" className="hero-pulse" />
                    <circle cx="300" cy="100" r="6" fill="#0891b2" className="hero-pulse" style={{ animationDelay: '0.5s' }} />
                    <circle cx="300" cy="300" r="6" fill="#0891b2" className="hero-pulse" style={{ animationDelay: '1s' }} />
                    <circle cx="100" cy="300" r="6" fill="#0891b2" className="hero-pulse" style={{ animationDelay: '1.5s' }} />
                </g>
            </svg>
        </div>
    );
}
