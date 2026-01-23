export const motion = {
    // Base transitions
    transition: "transition-all duration-700 ease-out",
    transitionSlow: "transition-all duration-1000 ease-out",

    // States
    fadeUp: {
        initial: "opacity-0 translate-y-8",
        visible: "opacity-100 translate-y-0",
    },
    fadeIn: {
        initial: "opacity-0",
        visible: "opacity-100",
    },
    scaleIn: {
        initial: "opacity-0 scale-95",
        visible: "opacity-100 scale-100",
    },

    // Hover effects
    hoverLift: "transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl",

    // Delays
    delays: {
        none: "delay-0",
        small: "delay-100",
        medium: "delay-200",
        large: "delay-300",
        xl: "delay-500",
    }
};

export const getStaggerDelay = (index: number, baseDelay = 100) => {
    return { transitionDelay: `${index * baseDelay}ms` };
};
