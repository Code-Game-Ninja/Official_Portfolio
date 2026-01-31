import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteTextProps {
  sanskrit: string;
  meaning: string;
}

const BackgroundParticles = () => {
  // Generate random particles for background effect
  const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const QuoteText: React.FC<QuoteTextProps> = ({ sanskrit, meaning }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full cursor-pointer flex flex-col items-center justify-center py-12 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-32 md:h-48 flex items-center justify-center w-full px-4 relative overflow-hidden" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="popLayout" initial={false}>
            {!isHovered ? (
            <motion.h3
                key="sanskrit"
                initial={{ opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -50, rotateX: 90, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-sanskrit text-4xl md:text-6xl font-bold text-center text-paper group-hover:text-accent/50 transition-colors duration-300 leading-normal select-none absolute w-full origin-center"
            >
                {sanskrit}
            </motion.h3>
            ) : (
            <motion.p
                key="meaning"
                initial={{ opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -50, rotateX: 90, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-xl md:text-3xl font-bold uppercase tracking-tight text-accent leading-relaxed text-center select-none absolute w-full origin-center px-4"
            >
                {meaning}
            </motion.p>
            )}
        </AnimatePresence>
      </div>
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isHovered ? "20%" : "0%", opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="h-[1px] bg-accent mt-6"
      />
    </div>
  );
};

const Philosophy: React.FC = () => {
  const quotes = [
    {
       sanskrit: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः",
       meaning: "Success comes from effort, not wishful thinking."
    },
    {
       sanskrit: "ज्ञानं परमं बलम्",
       meaning: "Knowledge is the supreme power."
    }
  ];

  return (
    <section className="bg-charcoal text-paper py-32 px-6 border-y border-paper/5 relative overflow-hidden">
       {/* Background Pattern */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
       
       <BackgroundParticles />

       <div className="absolute right-8 top-8 opacity-20 pointer-events-none">
          <span className="font-sanskrit text-6xl md:text-8xl text-paper/10 writing-vertical-rl">दर्शनम्</span>
       </div>

       <div className="max-w-4xl mx-auto flex flex-col gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="font-mono text-accent text-xs uppercase tracking-[0.3em]">[ Philosophy ]</span>
          </motion.div>

          <div className="flex flex-col gap-16">
            {quotes.map((quote, i) => (
               <QuoteText key={i} {...quote} />
            ))}
          </div>
       </div>
    </section>
  );
};

export default Philosophy;