import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const CYBER_CHARS = "ABCDEF123456!@#$%^&*()_+-=[]{}|;:,.<>?";

const EncryptedText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let iterations = 0;
      
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
            setDisplayText(
            text
                .split("")
                .map((char, index) => {
                if (index < iterations) {
                    return text[index];
                }
                return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
                })
                .join("")
            );

            if (iterations >= text.length) {
            clearInterval(interval);
            setDisplayText(text);
            }

            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className={className}>{displayText}</span>
  );
};

const About: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item: Variants = {
    hidden: { y: 50, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section className="bg-paper text-charcoal min-h-screen py-24 px-6 md:px-12 relative overflow-hidden flex flex-col justify-center border-b border-charcoal/10">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[95vw] mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row gap-12 lg:gap-32 items-start">
          
          {/* Left Meta Column */}
          <motion.div variants={item} className="w-full md:w-1/4 lg:w-1/5 font-mono text-[10px] md:text-xs uppercase tracking-widest space-y-8 pt-4 md:sticky md:top-32 text-charcoal">
            
            <div className="flex flex-col gap-2">
              <p className="opacity-40 text-[10px]">[ Role ]</p>
              <p className="font-bold text-sm leading-tight">Full Stack Developer</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="opacity-40 text-[10px]">[ Location ]</p>
              <p className="font-bold text-sm leading-tight">Rajasthan, India</p>
            </div>

             <div className="flex flex-col gap-2">
              <p className="opacity-40 text-[10px]">[ Status ]</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                <p className="font-bold text-sm leading-tight">Open for Work</p>
              </div>
            </div>

             <div className="flex flex-col gap-2">
              <p className="opacity-40 text-[10px]">[ Education ]</p>
              <p className="font-bold text-sm leading-tight">B.Sc Computer Science</p>
              <p className="opacity-60 leading-tight">Central University of<br/>Rajasthan</p>
            </div>

          </motion.div>

          {/* Right Content */}
          <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col">
            
            {/* Header Tag */}
            <motion.div variants={item} className="font-mono text-xs md:text-sm mb-12 flex items-center gap-3 text-charcoal">
              <span className="font-bold">CM</span> 
              <span className="bg-charcoal text-paper px-2 py-0.5 text-[10px] font-bold">[ HOME ]</span> 
              <span className="tracking-widest uppercase opacity-60">is the portfolio of</span>
            </motion.div>
            
            {/* Main Typographic Grid */}
            <div className="font-sans font-bold text-[13vw] md:text-[9vw] leading-[0.85] tracking-tighter uppercase text-charcoal flex flex-col items-start">
              
              <motion.div variants={item} className="flex items-center gap-4 md:gap-8 whitespace-nowrap">
                <EncryptedText text="Chirag" />
                <span className="font-mono font-normal text-charcoal/30 text-[1.5rem] md:text-[2.5rem] tracking-widest translate-y-[-0.2em]">
                    <EncryptedText text="[ Coder ]" delay={200} />
                </span>
              </motion.div>
              
              <motion.div variants={item}>
                <EncryptedText text="Mishra" delay={100} />
              </motion.div>
              
              <motion.div variants={item}>
                <EncryptedText text="Web" delay={200} />
              </motion.div>
              
              <motion.div variants={item}>
                <EncryptedText text="Developer," delay={300} />
              </motion.div>
              
              <motion.div variants={item}>
                <EncryptedText text="Problem" delay={400} />
              </motion.div>
              
              <motion.div variants={item}>
                <EncryptedText text="Solver" delay={500} />
              </motion.div>

              <motion.div variants={item} className="text-accent">
                 <EncryptedText text="And AI" delay={600} />
              </motion.div>

            </div>

            {/* Divider */}
            <motion.div variants={item} className="w-full h-[1px] bg-charcoal/10 my-16 md:my-24"></motion.div>

            {/* Description and Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-sm md:text-base leading-relaxed text-charcoal/80">
              <motion.p variants={item}>
                Creative and detail-oriented Web Developer with a strong foundation in front-end and back-end technologies. Experienced in building responsive, dynamic, and interactive web apps using the MERN stack.
              </motion.p>
              <motion.div variants={item} className="flex flex-col gap-6 items-start">
                <p>
                    Passionate about UI/UX, optimization, and building scalable web solutions. Skilled in API integration, animations (GSAP/AOS), and secure authentication.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-4">
                    <a href="/Resume_Chirag.pdf" download="Chirag_Mishra_Resume.pdf">
                        <button className="border border-charcoal px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-charcoal hover:text-paper transition-all duration-300 flex items-center gap-2 group font-bold">
                            Resume
                            <span className="group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
                        </button>
                    </a>

                    <Link to="/story">
                        <button className="bg-charcoal text-paper px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-charcoal transition-all duration-300 flex items-center gap-2 group font-bold">
                            Story
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </button>
                    </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;