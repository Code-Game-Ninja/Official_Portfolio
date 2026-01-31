import React from 'react';
import { motion, Variants } from 'framer-motion';

const Experience: React.FC = () => {
  const experiences = [
    {
      company: "Unified Mentor Pvt. Ltd.",
      role: "Fullstack Web Development Intern",
      date: "June 2025 - September 2025",
      type: "Remote",
      description: [
        "Developed and maintained responsive web applications using front-end and back-end technologies, including JavaScript, Express.js, and MongoDB.",
        "Collaborated with the development team on building dynamic and interactive user interfaces with modern CSS frameworks like Tailwind CSS.",
        "Assisted in API integration and database management to ensure seamless application functionality and data flow."
      ]
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0, filter: "blur(5px)" },
    visible: { 
      y: 0, 
      opacity: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      } 
    }
  };

  return (
    <section id="experience" className="bg-paper text-charcoal py-24 px-4 md:px-12 border-t border-charcoal/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
           <div className="w-full md:w-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter uppercase mb-4"
              >
                Experience
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-1 bg-accent w-full"
              />
           </div>
           <div className="mt-8 md:mt-0">
             <motion.span 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="font-sanskrit text-4xl block text-right text-charcoal/80"
             >
               「 अनुभवः 」
             </motion.span>
           </div>
        </div>

        {/* Experience List */}
        <motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-10%" }}
           className="flex flex-col gap-24"
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-8 md:gap-16 border-l-2 border-charcoal/10 pl-8 md:pl-12 relative group hover:border-accent transition-colors duration-500"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-accent border-4 border-paper group-hover:scale-125 transition-transform duration-300"></div>

              {/* Left: Meta */}
              <div className="md:w-1/3 flex flex-col gap-2">
                 <span className="font-mono text-accent text-xs uppercase tracking-widest font-bold">{exp.date}</span>
                 <span className="font-mono text-[10px] opacity-50 uppercase tracking-widest">[{exp.type}]</span>
                 <h3 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase mt-2 group-hover:text-charcoal/70 transition-colors leading-tight">{exp.company}</h3>
              </div>

              {/* Right: Content */}
              <div className="md:w-2/3">
                 <h4 className="font-mono text-xl md:text-2xl font-bold mb-8 uppercase border-b border-charcoal/10 pb-4 inline-block group-hover:border-accent transition-colors duration-500 text-charcoal/90">
                   {exp.role}
                 </h4>
                 <ul className="space-y-4 font-mono text-sm md:text-base leading-relaxed text-charcoal/80">
                   {exp.description.map((point, i) => (
                     <li key={i} className="flex gap-4">
                       <span className="text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" style={{ transitionDelay: `${i * 100}ms` }}>→</span>
                       <span className="group-hover:translate-x-2 transition-transform duration-500">{point}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;