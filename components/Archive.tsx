import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const allProjects = [
  {
    year: "2025",
    project: "Personal Portfolio V2",
    madeAt: "Personal",
    builtWith: ["React", "Framer Motion", "Tailwind"],
    link: "https://code-game-ninja.github.io/Personal-Portfolio/",
    image: "https://images.unsplash.com/photo-1481480036666-4071ecb1540a?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2024",
    project: "Career Guidance System",
    madeAt: "Academic",
    builtWith: ["MERN Stack", "REST API", "Auth"],
    link: "#",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2024",
    project: "Catering Reservation App",
    madeAt: "Freelance",
    builtWith: ["Express", "MongoDB", "Tailwind"],
    link: "#",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2024",
    project: "Gemini Chat Interface",
    madeAt: "Personal",
    builtWith: ["Gemini API", "React", "Node.js"],
    link: "#",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2023",
    project: "Weather Dashboard",
    madeAt: "Side Project",
    builtWith: ["OpenWeather API", "JavaScript", "CSS"],
    link: "#",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2023",
    project: "E-Commerce Landing",
    madeAt: "Practice",
    builtWith: ["HTML", "SCSS", "JS"],
    link: "#",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2023",
    project: "Task Manager CLI",
    madeAt: "Learning",
    builtWith: ["Node.js", "File System"],
    link: "#",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
  }
];

const Archive: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);

  // Mouse tracking for floating preview image & cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Center the image on the cursor (assuming image is w-80 h-48 roughly 320x192)
    mouseX.set(e.clientX - 160);
    mouseY.set(e.clientY - 96);
  };

  const { scrollYProgress } = useScroll({ target: containerRef });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="bg-charcoal text-paper min-h-screen py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Floating Hover Preview Image */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-48 rounded-lg overflow-hidden pointer-events-none z-50 hidden md:block shadow-2xl"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
          rotate: hoveredIndex !== null ? (hoveredIndex % 2 === 0 ? 3 : -3) : 0
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {allProjects.map((project, i) => (
          <img
            key={i}
            src={project.image}
            alt={project.project}
            className={`absolute inset-0 w-full h-full object-cover filter grayscale sepia-[0.2] transition-opacity duration-300 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </motion.div>

      {/* Decorative Scrolling Background Marquee */}
      <div className="absolute top-[30%] left-0 w-full overflow-hidden pointer-events-none opacity-5 z-0 whitespace-nowrap">
        <motion.div
          style={{ x: marqueeX }}
          className="font-sans font-bold text-[30vw] leading-none uppercase tracking-tighter"
        >
          DATA VAULT // ARCHIVE // DATA VAULT // ARCHIVE //
        </motion.div>
      </div>

      <div className="max-w-[95vw] mx-auto relative z-10">
        <div className="mb-24 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <Link to="/" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/60 hover:text-accent transition-colors mb-8">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Return Home
            </Link>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-bold text-[15vw] md:text-[12vw] tracking-tighter uppercase leading-[0.8] text-paper mix-blend-screen"
            >
              Archive
            </motion.h1>
          </div>
          <div className="hidden md:block pb-4 text-right">
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
              Total Projects: {allProjects.length.toString().padStart(2, '0')}
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
              2023 — 2025
            </p>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 border-b border-paper/20 pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 mb-4">
          <div className="col-span-1">Year</div>
          <div className="col-span-5">Project</div>
          <div className="col-span-2">Made at</div>
          <div className="col-span-3">Built with</div>
          <div className="col-span-1 text-right">Link</div>
        </div>

        {/* List */}
        <div className="flex flex-col" onMouseLeave={() => setHoveredIndex(null)}>
          {allProjects.map((item, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onMouseEnter={() => { setHoveredIndex(i); }}
                onMouseLeave={() => { }}
                className="group relative border-b border-paper/10 transition-colors duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover Background - Extreme Contrast */}
                <motion.div
                  className="absolute inset-0 bg-accent z-0"
                  initial={{ y: "100%" }}
                  animate={{ y: isHovered ? "0%" : "100%" }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                />

                <div
                  className={`relative z-10 md:grid md:grid-cols-12 flex flex-col gap-4 py-8 md:py-10 items-baseline px-4 transition-all duration-300 ${hoveredIndex !== null && !isHovered ? 'opacity-20 blur-[2px]' : 'opacity-100 blur-0'
                    } ${isHovered ? 'text-charcoal' : 'text-paper'}`}
                >

                  <div className={`col-span-1 font-mono text-xs md:text-sm transition-colors duration-300 ${isHovered ? 'text-charcoal font-bold' : 'text-accent opacity-80'}`}>
                    {item.year}
                  </div>

                  <div className="col-span-5">
                    <h3 className={`font-sans text-3xl md:text-5xl font-bold uppercase tracking-tight transition-transform duration-500 ease-out ${isHovered ? 'translate-x-8 mix-blend-multiply' : ''}`}>
                      {item.project}
                    </h3>
                  </div>

                  <div className="col-span-2 font-mono text-xs uppercase tracking-widest opacity-80 font-bold">
                    [{item.madeAt}]
                  </div>

                  <div className="col-span-3 flex flex-wrap gap-2">
                    {item.builtWith.map((tech, t) => (
                      <span
                        key={t}
                        className={`font-mono text-[10px] uppercase border rounded-full px-3 py-1 transition-colors duration-300 ${isHovered ? 'border-charcoal/30 text-charcoal font-bold' : 'border-paper/20 text-paper/60'
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="col-span-1 text-right flex justify-end w-full">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${isHovered
                        ? 'bg-charcoal text-accent border-charcoal rotate-0 scale-110'
                        : 'border-paper/20 text-paper -rotate-45'
                        }`}
                    >
                      <span className="text-xl">→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Archive;