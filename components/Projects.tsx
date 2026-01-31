import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
  tech: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Career Guidance System",
    category: "Full Stack Platform",
    image: "https://picsum.photos/800/600?random=1",
    year: "2024",
    description: "A platform that helps students discover strengths via aptitude tests, get personalized career recommendations, and explore suitable colleges. Features a secure user authentication system and RESTful APIs for booking logic.",
    tech: ["HTML/CSS/JS", "Express.js", "MongoDB", "Node.js"]
  },
  {
    id: 2,
    title: "Catering Reservation App",
    category: "Service Platform",
    image: "https://picsum.photos/800/600?random=2",
    year: "2024",
    description: "A platform for users to browse catering services, view menus, and book reservations for events. Designed with an intuitive user interface using Tailwind CSS and robust back-end functionalities.",
    tech: ["JavaScript", "Tailwind CSS", "Express.js", "MongoDB"]
  },
  {
    id: 3,
    title: "Personal Portfolio",
    category: "Interactive Web",
    image: "https://picsum.photos/800/600?random=3",
    year: "2025",
    description: "An interactive and responsive personal portfolio showcasing projects, skills, and experience. Utilized modern front-end libraries like GSAP and AOS to create engaging animations.",
    tech: ["GSAP", "AOS", "React/Tailwind", "Framer Motion"]
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Modal Animation Variants
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const modalVariants: Variants = {
    hidden: { y: 100, opacity: 0, scale: 0.98 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      y: 100, 
      opacity: 0, 
      scale: 0.98,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  const contentItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="work" className="bg-paper text-charcoal py-24 md:py-40 px-6 md:px-12 border-t border-charcoal/10 relative">
       
       <div className="max-w-[95vw] mx-auto flex flex-col gap-32 md:gap-48">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-charcoal/10 pb-6 sm:pb-8">
             <h2 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter uppercase">Selected Work</h2>
             <Link to="/all-projects" className="hidden md:block">
               <button className="font-mono text-xs uppercase tracking-widest border border-charcoal px-6 py-3 hover:bg-charcoal hover:text-paper transition-all">
                 View Archive →
               </button>
             </Link>
          </div>

          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 group`}
            >
              {/* Image Side */}
              <div className="w-full md:w-3/5 overflow-hidden relative cursor-pointer aspect-[16/10] bg-charcoal/5" onClick={() => setSelectedProject(project)}>
                <motion.div
                   whileHover={{ scale: 1.05 }}
                   transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                   className="w-full h-full"
                >
                   <img 
                     src={project.image} 
                     alt={project.title}
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                   />
                </motion.div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-2/5 flex flex-col justify-center text-left">
                 
                 {/* Metadata Line */}
                 <div className="flex items-center gap-4 font-mono text-[10px] md:text-xs text-charcoal/60 mb-6 uppercase tracking-widest">
                    <span className="text-accent">0{project.id}</span>
                    <span className="opacity-50">//</span>
                    <span>{project.year}</span>
                 </div>

                 {/* Separator */}
                 <div className="w-full h-[1px] bg-charcoal/20 mb-8 origin-left transform scale-x-100 transition-transform duration-700 group-hover:bg-accent group-hover:scale-x-110"></div>

                 {/* Title */}
                 <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold uppercase leading-[0.9] mb-4 text-charcoal group-hover:text-accent transition-colors duration-300">
                   {project.title}
                 </h3>

                 {/* Category */}
                 <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] mb-12 text-charcoal/50">
                   {project.category}
                 </p>

                 {/* Link */}
                 <button 
                    onClick={() => setSelectedProject(project)}
                    className="self-start font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-charcoal pb-1 hover:text-accent hover:border-accent transition-all duration-300"
                 >
                    View Case Study
                 </button>
              </div>
            </motion.div>
          ))}

          <div className="md:hidden flex justify-center">
             <Link to="/all-projects">
               <button className="font-mono text-xs uppercase tracking-widest border border-charcoal px-6 py-3 hover:bg-charcoal hover:text-paper transition-all">
                 View Archive →
               </button>
             </Link>
          </div>
       </div>

       {/* Project Modal */}
       <AnimatePresence>
         {selectedProject && (
           <motion.div
             variants={overlayVariants}
             initial="hidden"
             animate="visible"
             exit="exit"
             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-sm"
             onClick={() => setSelectedProject(null)}
           >
             <motion.div
               variants={modalVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
               className="bg-paper text-charcoal w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden relative shadow-2xl"
               onClick={(e) => e.stopPropagation()}
             >
               <motion.button 
                 variants={contentItemVariants}
                 onClick={() => setSelectedProject(null)}
                 className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-charcoal text-paper rounded-full hover:bg-accent hover:text-charcoal transition-colors font-mono"
               >
                 ✕
               </motion.button>
               
               <motion.div variants={contentItemVariants} className="h-[40vh] w-full overflow-hidden">
                 <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
               </motion.div>
               
               <div className="p-8 md:p-12">
                 <motion.div variants={contentItemVariants} className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8 border-b border-charcoal/10 pb-8">
                    <div>
                      <h3 className="font-sans text-4xl md:text-5xl font-bold uppercase mb-2 leading-none">{selectedProject.title}</h3>
                      <p className="font-mono text-xs md:text-sm uppercase text-charcoal/50 tracking-widest">{selectedProject.category} — {selectedProject.year}</p>
                    </div>
                    <button className="bg-charcoal text-paper px-6 py-3 font-mono text-xs hover:bg-accent hover:text-charcoal transition-colors whitespace-nowrap uppercase tracking-widest">
                      Visit Live Site
                    </button>
                 </motion.div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <motion.div variants={contentItemVariants} className="md:col-span-2">
                     <h4 className="font-mono text-[10px] uppercase mb-4 opacity-50 tracking-widest">[ Overview ]</h4>
                     <p className="font-mono text-sm md:text-base leading-relaxed text-charcoal/80">{selectedProject.description}</p>
                   </motion.div>
                   <motion.div variants={contentItemVariants}>
                      <h4 className="font-mono text-[10px] uppercase mb-4 opacity-50 tracking-widest">[ Technologies ]</h4>
                      <ul className="font-mono text-xs md:text-sm space-y-2 text-charcoal/80">
                        {selectedProject.tech.map((t, i) => (
                          <li key={i} className="border-b border-charcoal/10 pb-1">{t}</li>
                        ))}
                      </ul>
                   </motion.div>
                 </div>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </section>
  );
};

export default Projects;