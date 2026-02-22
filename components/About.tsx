import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, InteractiveTerminal, CommandDefinition } from './Terminal';

const CYBER_CHARS = "ABCDEF123456!@#$%^&*()_+-=[]{}|;:,.<>?";

const EncryptedText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
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

// Premium Scrub-to-Reveal Typography Component
const ScrubText: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 60%"]
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="flex flex-wrap gap-x-2 gap-y-1">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        const filter = useTransform(scrollYProgress, [start, end], ["blur(4px)", "blur(0px)"]);

        return (
          <motion.span key={i} style={{ opacity, filter }} className="will-change-transform">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

// Auto-typing Terminal Reveal Component
const TerminalReveal: React.FC<{ children: React.ReactNode; delayBase?: number }> = ({ children, delayBase = 0 }) => {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'revealed'>('idle');
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const bootSequence = [
    "> INITIATING BOOT SEQUENCE...",
    "> BYPASSING MAINFRAME ENCRYPTION...",
    "> ACCESSING SECURE DATA...",
    "> [ CONTENT DECRYPTED ]"
  ];

  useEffect(() => {
    if (isInView && phase === 'idle') {
      setPhase('typing');
      let currentLine = 0;

      const typeNextLine = () => {
        if (currentLine < bootSequence.length) {
          setLines(prev => [...prev, bootSequence[currentLine]]);
          currentLine++;
          setTimeout(typeNextLine, 400 + Math.random() * 400); // Random typing delay
        } else {
          setTimeout(() => setPhase('revealed'), 500); // Wait before reveal
        }
      };

      setTimeout(typeNextLine, delayBase);
    }
  }, [isInView, phase, delayBase]);

  return (
    <div ref={ref} className="w-full relative">
      {phase !== 'revealed' && (
        <div className="font-mono text-xs md:text-sm text-accent flex flex-col gap-2 p-6 bg-charcoal/90 border border-accent/50 min-h-[150px] shadow-[0_0_15px_rgba(255,51,0,0.2)]">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {line}
            </motion.div>
          ))}
          {phase === 'typing' && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-accent mt-1"
            />
          )}
        </div>
      )}
      {phase === 'revealed' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Adjusted parallax values for deep Z-axis overlapping without breaking layout
  // Reduced the negative spread to keep text lines readable
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section ref={containerRef} className="bg-charcoal text-paper min-h-[300vh] py-32 relative overflow-hidden flex flex-col items-center">

      {/* Background massive wireframe text */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[5%] left-[-5%] font-sans font-bold text-[30vw] leading-none text-transparent opacity-10 uppercase select-none pointer-events-none"
        // @ts-ignore
        style={{ WebkitTextStroke: '2px rgba(244, 244, 240, 0.2)', y: y3 }}
      >
        ROOT<br />SYSTEM
      </motion.div>

      <div className="w-full relative z-10 perspective-[1000px] mt-12 min-h-[250vh]">
        <motion.div style={{ rotateX }} className="w-full relative h-full flex flex-col gap-[30vh]">

          {/* BLOCK 1: Giant Typography */}
          <div className="font-sans font-bold text-[14vw] sm:text-[15vw] md:text-[12vw] leading-[0.8] tracking-tighter uppercase text-paper mix-blend-difference z-20 relative w-full">
            <motion.div style={{ y: y1 }} className="ml-[5%] md:ml-[10%] mb-12 border-l-[1px] border-paper/20 pl-4 md:pl-8">
              <EncryptedText text="CHIRAG" />
            </motion.div>

            <motion.div style={{ y: y2 }} className="ml-[20%] md:ml-[30%] mb-12 flex flex-col md:flex-row items-start md:items-center gap-4">
              <span className="font-mono font-normal text-charcoal text-[10px] md:text-sm tracking-widest bg-accent p-2 border border-accent inline-block hover:scale-105 hover:bg-transparent hover:text-accent transition-all cursor-crosshair">
                [ STATUS: WEB DEV ]
              </span>
              <div className="flex items-center gap-4 md:gap-8">
                <div className="hidden md:block w-16 md:w-32 h-[1px] bg-paper"></div>
                <EncryptedText text="MISHRA" delay={200} />
              </div>
            </motion.div>

            <motion.div style={{ y: y1 }} className="ml-[5%] md:ml-[15%] opacity-80 z-0 text-[10vw] sm:text-[12vw] md:text-[10vw] mt-12">
              <EncryptedText text="PROBLEM" delay={400} />
            </motion.div>

            <motion.div style={{ y: y3 }} className="text-right mr-[10%] md:mr-[20%] mt-[5%] z-30 relative text-[12vw] sm:text-[14vw] md:text-[12vw]">
              <EncryptedText text="SOLVER" delay={600} />
            </motion.div>

            <motion.div style={{ y: y2 }} className="ml-[10%] md:ml-[25%] mt-12 text-accent opacity-90 z-40 relative">
              <EncryptedText text="AND AI" delay={800} />
            </motion.div>
          </div>

          {/* BLOCK 2: The Giant Interactive Terminal Window */}
          <div className="relative w-full md:w-[80%] mx-auto mt-32 z-50 min-h-[80vh] flex flex-col items-center justify-center">

            <div className="mb-4 text-center opacity-70 font-mono text-sm max-w-lg">
              <span className="text-accent animate-pulse block mb-2">[ DIRECT ACCESS GRANTED ]</span>
              Interact directly with the terminal below. Type <span className="text-accent">help</span> to view available system commands.
            </div>

            <Terminal className="max-w-4xl w-full h-auto min-h-[60vh] text-sm md:text-base">
              <InteractiveTerminal
                welcomeMessage="Secure connection established. Awaiting input..."
                commands={[
                  {
                    command: "profile",
                    output: (
                      <div className="flex flex-col gap-2 border-l-2 border-accent pl-4 text-paper/80 mb-4">
                        <span className="text-accent font-bold">[ Technical Profile ]</span>
                        <p className="max-w-2xl">Creative and detail-oriented Web Developer with a strong foundation in front-end and back-end technologies. Experienced in building responsive, dynamic, and interactive web apps using the MERN stack.</p>
                        <div className="flex gap-4 mt-2">
                          <Link to="/story" className="text-accent hover:underline">[Read Log]</Link>
                          <a href="/Resume_Chirag.pdf" download="Chirag_Mishra_Resume.pdf" className="text-accent hover:underline">[.PDF]</a>
                        </div>
                      </div>
                    )
                  },
                  {
                    command: "status",
                    output: (
                      <div className="flex flex-col gap-2 border-l-2 border-[#ffbd2e] pl-4 text-paper/80 mb-4">
                        <span className="text-[#ffbd2e] font-bold animate-pulse">[ OVERRIDE ACTIVE ] SYS.02</span>
                        <p className="max-w-2xl">Passionate about UI/UX, optimization, and building scalable web solutions. Skilled in API integration, animations (GSAP/AOS), and secure authentication.</p>
                      </div>
                    )
                  },
                  {
                    command: "telemetry",
                    output: (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-l-2 border-[#27c93f] pl-4 text-paper/80 mb-4">
                        <div>
                          <span className="opacity-50 text-[10px] uppercase block">Location</span>
                          <span className="font-bold text-[#27c93f]">RAJASTHAN, IN</span>
                        </div>
                        <div>
                          <span className="opacity-50 text-[10px] uppercase block">Status</span>
                          <span className="font-bold flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#27c93f] rounded-full animate-pulse"></span>
                            OPEN FOR WORK
                          </span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="opacity-50 text-[10px] uppercase block">Education</span>
                          <span className="font-bold block">B.Sc Computer Science</span>
                          <span className="opacity-50 text-xs">Central Univ. of Rajasthan</span>
                        </div>
                      </div>
                    )
                  }
                ]}
              />
            </Terminal>
          </div>

        </motion.div>
      </div>

    </section>
  );
};

export default About;