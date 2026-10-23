import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PortfolioProject, projects } from '../portfolioData';

// Clean Brutalist Image Component (No Blur/Liquid Distortion)
const CleanImage: React.FC<{ src: string; alt: string; isActive: boolean }> = ({ src, alt, isActive }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-charcoal pointer-events-none border border-paper/10">
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-colors duration-700"
        animate={{
          scale: isActive ? 1.05 : 1.0,
          filter: isActive
            ? "grayscale(0%) contrast(1.3) saturate(1.5)"
            : "grayscale(100%) contrast(1.1) saturate(0)"
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

const ProjectRow: React.FC<{ project: PortfolioProject; setSelectedProject: (p: PortfolioProject) => void }> = ({ project, setSelectedProject }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full border-b border-paper/10 group cursor-crosshair overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedProject(project)}
    >

      {/* Expanding Image Container */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isHovered ? (window.innerWidth < 768 ? "30vh" : "50vh") : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative origin-center"
      >
        <CleanImage src={project.image} alt={project.title} isActive={isHovered} />

        {/* Overlay Details visible only on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute inset-0 bg-charcoal/40 p-6 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start text-paper">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-charcoal/80 border border-paper/20 backdrop-blur-md">
              [ {project.category} ]
            </span>
            <span className="font-mono text-xs text-accent">
              {project.year}
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div className="w-1/2 hidden md:block">
              <p className="font-mono text-xs leading-relaxed text-paper/80 bg-charcoal/60 backdrop-blur-md p-4 border border-paper/10">
                {project.description}
              </p>
            </div>
            <button className="font-mono text-[10px] md:text-sm uppercase tracking-widest border border-paper/50 px-6 py-4 bg-charcoal/80 text-paper hover:bg-accent hover:text-charcoal hover:border-accent transition-colors">
              Access Protocol →
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Massive Typographic Header (Mix Blend runs over the image) */}
      <div className="relative z-10 w-full px-4 py-8 pointer-events-none mix-blend-difference">
        <div className="flex items-center gap-8">
          <span className="font-mono text-sm md:text-2xl text-accent opacity-50 block w-[50px] shrink-0">
            0{project.id}
          </span>
          <h2 className="font-sans font-bold text-[8vw] md:text-[6vw] leading-none uppercase tracking-tighter text-paper whitespace-nowrap overflow-hidden text-ellipsis">
            {project.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Modal Animation Variants (Updated for Brutalism)
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const modalVariants: Variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const contentItemVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <section id="work" className="bg-charcoal text-paper z-10 w-full min-h-screen pt-32 pb-64">

        {/* Section Header */}
        <div className="w-full px-6 md:px-12 mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-paper/20 pb-12">
          <h2 className="font-sans font-bold text-6xl md:text-8xl tracking-tighter uppercase leading-[0.8]">
            <span className="block text-accent">SELECTED</span>
            <span className="block text-paper">WORK</span>
          </h2>
          <div className="text-right">
            <span className="font-mono text-xs uppercase tracking-widest text-paper/50">[ INDEX ARCHIVE ]</span>
            <p className="font-mono text-sm mt-2 max-w-xs text-paper/80">
              Interact with rows to initialize visual data blocks. Proceed to Archive for full logs.
            </p>
          </div>
        </div>

        {/* The Vertical Hover Slicer */}
        <div className="w-full border-t border-paper/10 flex flex-col">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} setSelectedProject={setSelectedProject} />
          ))}
        </div>

        {/* Final pane with 'View Archive' */}
        <div className="w-full flex justify-center mt-32">
          <Link to="/all-projects">
            <button className="border border-paper text-paper px-12 py-6 font-sans font-bold uppercase tracking-widest text-xl hover:bg-paper hover:text-charcoal transition-all pointer-events-auto shadow-[10px_10px_0_#FF3300] hover:shadow-[15px_15px_0_#FF3300] hover:-translate-x-1 hover:-translate-y-1">
              ENTER ARCHIVE →
            </button>
          </Link>
        </div>

      </section>

      {/* Project Modal: Slides in from the right brutally */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] flex justify-end bg-charcoal/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-paper text-charcoal w-full md:w-[60vw] lg:w-[45vw] h-full overflow-y-auto overflow-x-hidden relative shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-8 border-b border-charcoal/20">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">[ DATA LOG {selectedProject.id} ]</span>
                <motion.button
                  variants={contentItemVariants}
                  onClick={() => setSelectedProject(null)}
                  className="font-mono text-xl uppercase hover:text-accent hover:rotate-90 transition-all duration-300"
                >
                  ✕
                </motion.button>
              </div>

              <motion.div variants={contentItemVariants} className="w-full h-[30vh] md:h-[40vh] overflow-hidden border-b border-charcoal/20">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover filter grayscale contrast-[1.2] hover:grayscale-0 transition-all duration-700" />
              </motion.div>

              <div className="p-8 md:p-12 flex-1 flex flex-col gap-12">
                <motion.div variants={contentItemVariants}>
                  <p className="font-mono text-xs uppercase text-charcoal/50 tracking-widest mb-4">{selectedProject.category} // {selectedProject.year}</p>
                  <h3 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9]">{selectedProject.title}</h3>
                </motion.div>

                <div className="w-full h-[1px] bg-charcoal/10"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div variants={contentItemVariants}>
                    <h4 className="font-mono text-[10px] uppercase mb-4 text-accent tracking-widest font-bold">/// Overview</h4>
                    <p className="font-mono text-sm leading-relaxed text-charcoal/80">{selectedProject.description}</p>
                  </motion.div>
                  <motion.div variants={contentItemVariants}>
                    <h4 className="font-mono text-[10px] uppercase mb-4 text-accent tracking-widest font-bold">/// Tech Stack</h4>
                    <ul className="font-mono text-sm space-y-2 text-charcoal/80">
                      {selectedProject.tech.map((t, i) => (
                        <li key={i} className="border-b border-charcoal/10 pb-2">{t}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <motion.div variants={contentItemVariants} className="mt-auto pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={selectedProject.primaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-charcoal text-paper py-6 px-4 text-center font-mono font-bold text-sm hover:bg-accent hover:text-charcoal transition-colors uppercase tracking-widest"
                  >
                    {selectedProject.primaryLabel}
                  </a>
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full border border-charcoal text-charcoal py-6 px-4 text-center font-mono font-bold text-sm hover:bg-charcoal hover:text-paper transition-colors uppercase tracking-widest"
                  >
                    View GitHub
                  </a>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
