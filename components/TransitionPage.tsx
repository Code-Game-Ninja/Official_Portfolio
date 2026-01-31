import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionPageProps {
  children: React.ReactNode;
  sanskrit: string;
  english: string;
}

const TransitionPage: React.FC<TransitionPageProps> = ({ children, sanskrit, english }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Total duration - longer to allow reading the quote
    const totalDuration = 4500; 

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, totalDuration);

    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 1.0
      }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isAnimating && (
          <motion.div
            key="transition-overlay"
            className="fixed inset-0 z-50 bg-charcoal flex flex-col items-center justify-center p-8 cursor-wait"
            initial={{ opacity: 1 }}
            exit={{ 
              y: "-100%", 
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-6 md:gap-8 px-4">
              {/* Sanskrit - Blur In */}
              <motion.h2
                initial={{ filter: "blur(15px)", opacity: 0, scale: 1.1 }}
                animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="font-sanskrit text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-paper font-bold leading-normal"
              >
                {sanskrit}
              </motion.h2>

              {/* Divider */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="h-[1px] bg-accent sm:w-[100px]"
              />

              {/* English - Typewriter / Letter by Letter */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="font-mono text-accent text-xs sm:text-sm md:text-lg uppercase tracking-widest max-w-xl px-2"
              >
                {english.split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            
            {/* Loading Indicator at bottom */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-12 font-mono text-[10px] uppercase tracking-widest text-paper/40"
            >
              [ Translating Wisdom... ]
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The actual page content */}
      <div className={`${isAnimating ? 'fixed inset-0 overflow-hidden opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
        {children}
      </div>
    </>
  );
};

export default TransitionPage;