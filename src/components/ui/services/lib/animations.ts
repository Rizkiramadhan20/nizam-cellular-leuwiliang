import { Variants } from 'framer-motion';

export const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.15,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export const titleAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
    }
};

export const imageAnimation = {
    initial: { opacity: 0, scale: 0.8, x: 20 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.8, x: -20 },
    transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
    }
}; 