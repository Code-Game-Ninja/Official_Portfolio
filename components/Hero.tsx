import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const Hero: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Aggressive spring physics for the mask
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 400 });
    const maskSize = useSpring(0, { damping: 20, stiffness: 300 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const maskImage = useMotionTemplate`radial-gradient(${maskSize}px circle at ${smoothX}px ${smoothY}px, black 30%, transparent 80%)`;

    return (
        <section id="home" className="relative h-screen w-full flex overflow-hidden bg-charcoal">

            {/* 90% Raw Image Area */}
            <div
                className="absolute top-0 right-0 w-full md:w-[85%] h-full bg-charcoal overflow-hidden group cursor-crosshair"
                onMouseEnter={() => maskSize.set(500)}
                onMouseLeave={() => maskSize.set(0)}
            >
                {/* Base Layer: Grayscale, dark, noisy */}
                <motion.img
                    initial={{ scale: 1.1, filter: "grayscale(100%) blur(20px)" }}
                    animate={{ scale: 1, filter: "grayscale(100%) blur(0px)" }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    src="https://picsum.photos/1920/1080?grayscale&random=10"
                    alt="Hero Background Art"
                    className="w-full h-full object-cover opacity-30 mix-blend-luminosity origin-right"
                />

                {/* Masked Hover Layer: High contrast real image */}
                <motion.div
                    className="absolute inset-0 z-10 hidden md:block"
                    style={{ maskImage, WebkitMaskImage: maskImage }}
                >
                    <img
                        src="https://picsum.photos/1920/1080?random=11"
                        alt="Hero Real Color"
                        className="w-full h-full object-cover filter contrast-[1.2] saturate-[1.5]"
                    />
                </motion.div>

                {/* Brutalist Watermark / Coordinates */}
                <div className="absolute top-8 right-8 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 text-right pointer-events-none mix-blend-difference hidden md:block">
                    <p>26.5405° N, 74.8801° E</p>
                    <p className="mt-2 text-accent">ROOT // MHHW-FOLIO</p>
                </div>
            </div>

            {/* 10% Asymmetric Text Block - Bottom Left / Left Edge */}
            <div className="absolute bottom-0 left-0 w-full md:w-[35%] bg-charcoal p-8 md:p-12 z-20 border-t md:border-t-0 md:border-r-[1px] border-paper/10 flex flex-col justify-between md:h-screen shadow-[30px_0_50px_rgba(0,0,0,0.8)]">

                <div className="hidden md:flex flex-col gap-8 opacity-50">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-12 h-12 border-[1px] border-paper/30 rounded-none flex items-center justify-center font-bold text-xs"
                    >
                        CM
                    </motion.div>
                </div>

                <div className="flex flex-col gap-12">
                    <motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="font-sans font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-paper tracking-tighter leading-[0.85] uppercase"
                        >
                            CHIRAG<br />
                            <span className="text-paper/40">MISHRA</span>
                        </motion.h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-[1px] bg-paper/20 mt-12 mb-8 origin-left"
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="flex items-start gap-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-paper/70"
                        >
                            <div className="w-2 h-2 bg-accent mt-1 animate-pulse rounded-none"></div>
                            <div className="flex flex-col gap-2">
                                <span className="text-accent font-bold">FULL STACK DEVELOPER</span>
                                <span>BUILDING SCALABLE ARCHITECTURES</span>
                                <span>BASED IN RAJASTHAN, IN</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Brutalist Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="group self-start border-[1px] border-paper/20 px-8 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-paper hover:text-charcoal transition-colors duration-300 flex items-center gap-4"
                        onClick={() => {
                            const workSection = document.getElementById('work');
                            workSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        EXPLORE INDEX
                        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </motion.button>
                </div>

            </div>

        </section>
    );
};

export default Hero;