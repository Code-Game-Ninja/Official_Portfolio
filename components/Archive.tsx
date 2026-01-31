import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const allProjects = [
  {
    year: "2025",
    project: "Personal Portfolio V2",
    madeAt: "Personal",
    builtWith: ["React", "Framer Motion", "Tailwind"],
    link: "https://code-game-ninja.github.io/Personal-Portfolio/"
  },
  {
    year: "2024",
    project: "Career Guidance System",
    madeAt: "Academic",
    builtWith: ["MERN Stack", "REST API", "Auth"],
    link: "#"
  },
  {
    year: "2024",
    project: "Catering Reservation App",
    madeAt: "Freelance",
    builtWith: ["Express", "MongoDB", "Tailwind"],
    link: "#"
  },
  {
    year: "2024",
    project: "Gemini Chat Interface",
    madeAt: "Personal",
    builtWith: ["Gemini API", "React", "Node.js"],
    link: "#"
  },
  {
    year: "2023",
    project: "Weather Dashboard",
    madeAt: "Side Project",
    builtWith: ["OpenWeather API", "JavaScript", "CSS"],
    link: "#"
  },
  {
    year: "2023",
    project: "E-Commerce Landing",
    madeAt: "Practice",
    builtWith: ["HTML", "SCSS", "JS"],
    link: "#"
  },
  {
    year: "2023",
    project: "Task Manager CLI",
    madeAt: "Learning",
    builtWith: ["Node.js", "File System"],
    link: "#"
  }
];

const Archive: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-charcoal text-paper min-h-screen py-24 px-6 md:px-12 relative overflow-hidden"
    >
       {/* Decorative Background */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-20 -right-20 text-[30vw] font-bold font-sans leading-none text-accent">
            A
          </div>
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
            {allProjects.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredIndex(i)}
                className="group relative border-b border-paper/10 transition-all duration-300"
              >
                 {/* Hover Background */}
                 <motion.div 
                    className="absolute inset-0 bg-paper/5 z-0"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: hoveredIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0 }}
                 />

                 <div className={`relative z-10 md:grid md:grid-cols-12 flex flex-col gap-4 py-6 md:py-8 items-baseline px-2 ${hoveredIndex !== null && hoveredIndex !== i ? 'opacity-30 blur-[1px]' : 'opacity-100 blur-0'} transition-all duration-300`}>
                    
                    <div className="col-span-1 font-mono text-xs md:text-sm text-accent opacity-80">
                        {item.year}
                    </div>
                    
                    <div className="col-span-5">
                        <h3 className="font-sans text-2xl md:text-4xl font-bold uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                            {item.project}
                        </h3>
                    </div>
                    
                    <div className="col-span-2 font-mono text-xs uppercase tracking-widest opacity-60">
                        [{item.madeAt}]
                    </div>
                    
                    <div className="col-span-3 flex flex-wrap gap-2">
                        {item.builtWith.map((tech, t) => (
                        <span key={t} className="font-mono text-[10px] uppercase border border-paper/20 rounded-full px-2 py-0.5 text-paper/60">
                            {tech}
                        </span>
                        ))}
                    </div>
                    
                    <div className="col-span-1 text-right flex justify-end w-full">
                        <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="w-10 h-10 rounded-full border border-paper/20 flex items-center justify-center group-hover:bg-accent group-hover:text-charcoal group-hover:border-accent transition-all duration-300"
                        >
                            <span className="group-hover:-rotate-45 transition-transform duration-300 text-lg">→</span>
                        </a>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
       </div>
    </motion.section>
  );
};

export default Archive;