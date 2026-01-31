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
            <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase leading-[0.9] text-paper">
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

interface ParagraphProps {
  children: React.ReactNode;
  highlight?: boolean;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, highlight = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`font-sans text-xl md:text-3xl leading-relaxed mb-12 ${highlight ? 'text-paper' : 'text-paper/70'} font-light`}
    >
      {children}
    </motion.p>
  );
};

const Story: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-charcoal text-paper min-h-screen relative"
    >
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
            [ EST. 199X — RAJ ]
          </span>
        </div>

        {/* Hero Title */}
        <div className="mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
             <h1 className="font-sans font-bold text-[12vw] leading-[0.8] tracking-tighter uppercase text-paper mix-blend-screen">
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
            <Paragraph>
              It didn't start with code. It started with <span className="text-accent italic">curiosity</span>.
            </Paragraph>
            <Paragraph>
              Growing up in Rajasthan, surrounded by vibrant culture and intricate patterns, I was always drawn to the hidden logic within chaos. The way a pattern repeats, the way a story unfolds.
            </Paragraph>
            <Paragraph>
              My journey into technology wasn't a straight line—it was a winding path of questioning "How?" and "Why?".
            </Paragraph>
            <Paragraph>
              I wrote my first line of code during my undergrad at the Central University of Rajasthan. It was simple, clumsy, but it rendered "Hello World" onto a screen. That moment was electric. It was the realization that I could <span className="text-paper border-b border-accent">create something from nothing</span>.
            </Paragraph>
          </Chapter>

          <Chapter number="02" title="The Craft">
             <Paragraph>
               I dove headfirst into the <span className="text-accent">MERN stack</span>. I loved the structure of MongoDB, the logic of Express, and the versatility of Node.js.
             </Paragraph>
             <Paragraph highlight>
               But React? React was where I found my voice.
             </Paragraph>
             <Paragraph>
               I didn't just want to build websites; I wanted to build <span className="italic">experiences</span>. I started experimenting with Tailwind CSS for rapid styling and GSAP/Framer Motion to breathe life into static elements.
             </Paragraph>
             <Paragraph>
               My internship at Unified Mentor was the crucible. Working remotely, I learned the importance of disciplined code, clear communication, and the art of debugging at 2 AM. It transformed me from a student into a builder.
             </Paragraph>
          </Chapter>

          <Chapter number="03" title="The Future">
             <Paragraph>
               Today, I stand at the intersection of <span className="text-accent">Design and Intelligence</span>.
             </Paragraph>
             <Paragraph>
               I'm not just coding interfaces; I'm integrating AI. Working with Google Cloud's Gemini API and Vertex AI has opened a new dimension.
             </Paragraph>
             <Paragraph>
               I'm exploring how Prompt Engineering can make applications smarter, more intuitive, and more human. The goal isn't just to write code, but to write the future.
             </Paragraph>
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