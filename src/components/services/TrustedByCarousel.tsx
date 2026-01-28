'use client';

import React from 'react';
import Image from 'next/image';
import { TrustedCompany } from '@/config/services';
import { cn } from '@/lib/utils';

interface TrustedByCarouselProps {
    companies: TrustedCompany[];
    className?: string;
}

export function TrustedByCarousel({ companies, className }: TrustedByCarouselProps) {
    // Duplicate the companies list to ensure seamless looping and full-width coverage
    // 4x duplication to cover 4k screens effortlessly (12 * 4 = 48 items)
    const seamlessCompanies = [...companies, ...companies, ...companies, ...companies];

    return (
        <div className={cn("relative w-full overflow-hidden select-none group py-8", className)}>

            {/* Edge fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

            {/* Marquee Track */}
            {/* animate-marquee moves from 0 to -50%. 
                For this to work seamlessly, the content inside must be composed of TWO identical halves.
                Since we have 4 sets of companies, we can treat 2 sets as "one half".
                So we actually are good if we just render one huge list?
                
                Actually, the standard marquee trick is:
                Have 2 indentical sets. Move -100% of ONE set.
                Or have 1 container with 2 sets. Move the CONTAINER -50%.
                Let's stick to the container -50% approach.
            */}
            <div className="flex w-max min-w-full animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
                {/*  
                    We need to ensure that the content we are effectively shifting is what we want.
                    The animation moves the entire width by 50%.
                    So we need the total list to consist of [Set A] [Set A].
                    Where Set A is large enough to cover the screen.
                    
                    If distinct items = 12. 
                    If we duplicate 4 times total: [Set 1] [Set 2] [Set 3] [Set 4].
                    The animation will move -50% of the WHOLE track.
                    Whole track = 4 * Set.
                    Moving 50% = Moving 2 * Set.
                    
                    Start: [1][2][3][4] (Visible: [1][part of 2])
                    End:   Moved left by [1][2]. 
                           Visible starts at [3].
                    Since [3] is identical to [1], it is seamless.
                 */}

                {seamlessCompanies.map((company, index) => (
                    <div
                        key={`${company.name}-${index}`}
                        className="flex-none px-6 sm:px-8 md:px-10 flex items-center justify-center min-w-[160px] sm:min-w-[200px]"
                    >
                        <div className="relative h-12 w-full max-w-[140px] opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 filter cursor-pointer">
                            <Image
                                src={company.logo}
                                alt={company.name}
                                fill
                                className="object-contain"
                                sizes="200px"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
