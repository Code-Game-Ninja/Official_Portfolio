import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ChapterProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const Chapter: React.FC<ChapterProps> = ({ number, title, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className="flex flex-col md:flex-row gap-12 md:gap-32 py-24 md:py-32 border-t border-paper/10 relative">
      <div className="md:w-1/4 md:sticky md:top-32 self-start">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col gap-2"
          >
            <span className="font-mono text-accent text-xs md:text-sm font-bold uppercase tracking-widest display-block mb-2">
              ( Chapter {number} )
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-[0.9] text-paper">
              {title}
            </h2>
          </motion.div>
        </div>
      </div>
      <div className="md:w-3/4">
        {children}
      </div>
    </div>
  );
};

const ScrubText: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 60%"]
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="flex flex-wrap gap-x-2 gap-y-1 mb-8 sm:mb-12 font-sans text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed font-light">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        const filter = useTransform(scrollYProgress, [start, end], ["blur(8px)", "blur(0px)"]);

        // Handle special injected interactive nodes if we pass them
        // For simple text splitting, we just render the word.
        return (
          <motion.span key={i} style={{ opacity, filter }} className="will-change-transform text-paper">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

// Hover Image Reveal Component for specific words
const ImageRevealWord: React.FC<{ word: string; imgSrc: string }> = ({ word, imgSrc }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <span
      className="relative inline-block text-paper border-b-2 border-accent cursor-pointer z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {word}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={isHovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
        transition={{ duration: 0.4, ease: "backOut" }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 h-48 md:w-64 md:h-64 pointer-events-none rounded-xl overflow-hidden shadow-2xl border border-paper/20 z-[100]"
        style={{ originY: 1 }}
      >
        <img src={imgSrc} alt="Reveal" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
      </motion.div>
    </span>
  );
};

// Advanced Scrub Text that accepts React Nodes
const InteractiveScrubText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 60%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(8px)", "blur(0px)"]);

  return (
    <motion.p
      ref={containerRef}
      style={{ opacity, filter }}
      className="mb-8 sm:mb-12 font-sans text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed font-light text-paper"
    >
      {children}
    </motion.p>
  );
};

const Story: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-charcoal text-paper min-h-screen relative overflow-hidden"
    >
      {/* Background massive wireframe text */}
      <motion.div
        className="fixed top-[20%] left-[-5%] font-sans font-bold text-[40vw] leading-none text-transparent opacity-5 uppercase select-none pointer-events-none z-0"
        // @ts-ignore
        style={{ WebkitTextStroke: '1px rgba(244, 244, 240, 0.3)', y: yBg }}
      >
        ORIGIN
      </motion.div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-[90vw] md:max-w-[80vw] mx-auto pt-12 md:pt-24 pb-32">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-24 md:mb-40">
          <Link to="/" className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/60 hover:text-accent transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Return Home
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-paper/40 hidden md:block">
            [ KISHANGARH — INDIA ]
          </span>
        </div>

        {/* Hero Title */}
        <div className="mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-sans font-bold text-[14vw] sm:text-[12vw] leading-[0.8] tracking-tighter uppercase text-paper mix-blend-screen">
              The<br />
              <span className="text-accent">Origin</span><br />
              Story
            </h1>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="h-[1px] bg-paper/20 mt-12"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">

          <Chapter number="01" title="The Spark">
            <InteractiveScrubText>
              It didn't start with code. It started with curiosity.
            </InteractiveScrubText>
            <InteractiveScrubText>
              Growing up in <ImageRevealWord word="Rajasthan" imgSrc="https://images.unsplash.com/photo-1599661559905-3bb5eb1268ea?q=80&w=1000&auto=format&fit=crop" />, surrounded by vibrant culture and intricate patterns, I was always drawn to the hidden logic within chaos. The way a pattern repeats, the way a story unfolds.
            </InteractiveScrubText>
            <InteractiveScrubText>
              My journey into technology wasn't a straight line—it was a winding path of questioning 'How?' and 'Why?'.
            </InteractiveScrubText>
            <InteractiveScrubText>
              I wrote my first line of code while pursuing my Integrated M.Sc. at the Central University of Rajasthan. It was simple, clumsy, but it rendered 'Hello World' onto a screen. That moment was electric: I could create something from nothing.
            </InteractiveScrubText>
          </Chapter>

          <Chapter number="02" title="The Craft">
            <InteractiveScrubText>
              I dove headfirst into the MERN stack. I loved the structure of MongoDB, the logic of Express, and the versatility of Node.js.
            </InteractiveScrubText>
            <InteractiveScrubText>
              But <ImageRevealWord word="React" imgSrc="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop" />? React was where I found my voice.
            </InteractiveScrubText>
            <InteractiveScrubText>
              I didn't just want to build websites; I wanted to build experiences. I started experimenting with Tailwind CSS for rapid styling and GSAP/Framer Motion to breathe life into static elements.
            </InteractiveScrubText>
            <InteractiveScrubText>
              At Unified Mentor, I built a catering system and a university career guidance system. The work strengthened my full-stack fundamentals, disciplined debugging, communication, and ability to turn requirements into usable products.
            </InteractiveScrubText>
          </Chapter>

          <Chapter number="03" title="The Future">
            <InteractiveScrubText>
              Today, I work as a Full Stack Developer at Samyora, at the intersection of Design and <ImageRevealWord word="Intelligence" imgSrc="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" />.
            </InteractiveScrubText>
            <InteractiveScrubText>
              I'm not just coding interfaces; I'm integrating AI. Working with Google Cloud's Gemini API and Vertex AI has opened a new dimension.
            </InteractiveScrubText>
            <InteractiveScrubText>
              I'm exploring how Prompt Engineering can make applications smarter, more intuitive, and more human. The goal isn't just to write code, but to write the future.
            </InteractiveScrubText>
          </Chapter>

        </div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-24 border-t border-paper/10 flex flex-col items-center text-center gap-8"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
            [ Continue the journey ]
          </p>
          <Link to="/all-projects" className="group relative inline-block">
            <span className="font-sans font-bold text-5xl md:text-8xl uppercase tracking-tighter text-paper group-hover:text-accent transition-colors duration-300">
              View Archive
            </span>
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Story;
