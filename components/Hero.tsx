import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Hero: React.FC = () => {
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    // Hold time for intro animation
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Variants for Cinematic Text Effect
  const containerLeft: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const containerRight: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };
  
  const characterAnim: Variants = {
    hidden: { 
        opacity: 0, 
        y: 100, 
        scale: 1.1,
        filter: "blur(20px)" 
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)",
        transition: { 
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1] 
        } 
    }
  };

  return (
    <section id="home" className="relative h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-charcoal">
       {/* Background */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

       {/* Top Left Info - Appears after transition */}
       <div className="absolute top-8 left-8 z-20">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: isIntro ? 0 : 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-paper/60 leading-relaxed"
          >
            <p>PORTFOLIO 2026 ©</p>
            <p>BASED IN INDIA</p>
          </motion.div>
       </div>

       {/* Main Content Area */}
       <div className="flex-grow flex items-center justify-center w-full relative z-10 h-full">
            <div className="flex items-center gap-4 md:gap-12 lg:gap-20 w-full justify-center">
                
                {/* Left Side Text Container */}
                <div className="flex-1 flex justify-end">
                    <AnimatePresence mode="wait">
                        {isIntro ? (
                            <motion.h1 
                                key="full-name"
                                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.3 } }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="font-sans font-bold text-3xl md:text-6xl text-right text-paper tracking-tight leading-none"
                            >
                                CHIRAG<br/>MISHRA
                            </motion.h1>
                        ) : (
                            <motion.h1 
                                key="abbr-name"
                                variants={containerLeft}
                                initial="hidden"
                                animate="visible"
                                className="font-sans font-bold text-[25vw] md:text-[20vw] leading-none text-paper tracking-tighter text-right select-none flex overflow-hidden"
                            >
                                {['C', 'M'].map((char, i) => (
                                    <motion.span key={i} variants={characterAnim} className="inline-block">{char}</motion.span>
                                ))}
                            </motion.h1>
                        )}
                    </AnimatePresence>
                </div>

                {/* Center Vertical Divider - Appears in final state */}
                <motion.div 
                    className="flex flex-col items-center justify-center gap-4 h-[40vh] md:h-[50vh] min-w-[20px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isIntro ? 0 : 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Top Line */}
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: isIntro ? 0 : "100%" }}
                        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.3 }}
                        className="w-[1px] bg-accent flex-grow origin-top"
                    ></motion.div>
                    
                    {/* Vertical Text */}
                    <div className="flex flex-col items-center gap-2 md:gap-4 py-2">
                         {['C','H','I','R','A','G'].map((char, i) => (
                             <motion.span 
                                key={i}
                                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                                animate={{ opacity: isIntro ? 0 : 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.5 + (i * 0.05), duration: 0.6 }}
                                className="font-mono text-accent font-bold text-sm md:text-base leading-none select-none"
                             >
                                {char}
                             </motion.span>
                         ))}
                    </div>

                    {/* Bottom Line */}
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: isIntro ? 0 : "100%" }}
                        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.3 }}
                        className="w-[1px] bg-accent flex-grow origin-bottom"
                    ></motion.div>
                </motion.div>

                {/* Right Side Text Container */}
                <div className="flex-1 flex justify-start">
                    <AnimatePresence mode="wait">
                        {isIntro ? (
                            <motion.h1 
                                key="full-role"
                                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.3 } }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="font-sans font-bold text-3xl md:text-6xl text-left text-paper tracking-tight leading-none"
                            >
                                FULL STACK<br/>DEVELOPER
                            </motion.h1>
                        ) : (
                            <motion.h1 
                                key="abbr-role"
                                variants={containerRight}
                                initial="hidden"
                                animate="visible"
                                className="font-sans font-bold text-[25vw] md:text-[20vw] leading-none text-paper tracking-tighter text-left select-none flex overflow-hidden"
                            >
                                {['D', 'E', 'V'].map((char, i) => (
                                    <motion.span key={i} variants={characterAnim} className="inline-block">{char}</motion.span>
                                ))}
                            </motion.h1>
                        )}
                    </AnimatePresence>
                </div>

            </div>
       </div>

       {/* Bottom Ticker */}
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: isIntro ? 0 : 1, y: 0 }}
         transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
         className="w-full overflow-hidden py-4 border-t border-paper/10 relative z-10"
       >
         <div className="w-full flex">
             <motion.div 
                animate={{ x: ["0%", "-50%"] }} 
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                className="flex whitespace-nowrap gap-8 font-mono text-[10px] md:text-xs uppercase tracking-widest text-paper/60"
             >
                {/* Duplicated content for seamless loop */}
                {Array(6).fill(null).map((_, i) => (
                    <span key={i} className="flex-shrink-0">
                        ( DESIGN — FULL STACK DEVELOPER — CREATIVE THINKER — AI INTEGRATION — UI/UX DESIGN — )
                    </span>
                ))}
             </motion.div>
         </div>
       </motion.div>
    </section>
  );
};

export default Hero;