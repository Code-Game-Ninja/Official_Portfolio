import React from 'react';
import { motion, Variants } from 'framer-motion';

const skills = [
  { category: "Frontend", code: "FE", items: ["React", "TypeScript", "Tailwind", "Next.js", "Framer Motion", "GSAP", "Three.js"] },
  { category: "Backend", code: "BE", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL", "REST API", "Socket.io"] },
  { category: "AI & Data", code: "AI", items: ["Gemini API", "Python", "Vertex AI", "LangChain", "OpenAI API", "RAG"] },
  { category: "Tools", code: "TL", items: ["Git", "Docker", "Figma", "Linux", "AWS", "Vercel"] },
];

const certifications = [
  { title: "Build Real World AI Applications", issuer: "Google Cloud", id: "01", date: "2024" },
  { title: "Develop GenAI Apps with Gemini", issuer: "Google Cloud", id: "02", date: "2024" },
  { title: "Generative AI with Vertex AI", issuer: "Google Cloud", id: "03", date: "2024" },
  { title: "Inspect Rich Documents (RAG)", issuer: "Google Cloud", id: "04", date: "2024" },
  { title: "Prompt Design in Vertex AI", issuer: "Google Cloud", id: "05", date: "2024" },
  { title: "Intro to Prompt Engineering", issuer: "Simplilearn", id: "06", date: "2023" },
  { title: "Introduction to Figma", issuer: "Simplilearn", id: "07", date: "2023" },
];

const Info: React.FC = () => {
  // Enhanced Animation Variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { y: 50, opacity: 0, filter: 'blur(5px)' },
    show: { 
      y: 0, 
      opacity: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const allSkills = skills.flatMap(grp => grp.items.map(name => ({ category: grp.category, code: grp.code, name })));

  return (
    <section id="info" className="bg-charcoal text-paper py-24 md:py-32 border-t border-paper/10 relative overflow-hidden">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(236, 235, 228, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 235, 228, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute right-0 top-32 text-[15vw] font-bold text-paper/5 leading-none select-none pointer-events-none font-sans mix-blend-overlay"
      >
        DATA
      </motion.div>

      <div className="max-w-[95vw] mx-auto relative z-10 flex flex-col gap-40">
        
        {/* Certifications: The Data Log */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-paper/20 pb-6">
            <motion.h2 
              initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans font-bold text-6xl md:text-8xl tracking-tighter uppercase"
            >
              Certifications
            </motion.h2>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2"
            >
              [ VERIFIED CREDENTIALS ]
            </motion.span>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="w-full"
          >
            {/* Table Header */}
            <motion.div variants={item} className="hidden md:grid grid-cols-12 gap-4 px-4 pb-2 border-b border-paper/20 font-mono text-[10px] uppercase tracking-widest opacity-50">
               <div className="col-span-1">ID</div>
               <div className="col-span-2">Date</div>
               <div className="col-span-3">Issuer</div>
               <div className="col-span-5">Certificate Name</div>
               <div className="col-span-1 text-right">Status</div>
            </motion.div>

            {/* Table Rows */}
            {certifications.map((cert) => (
              <motion.div 
                key={cert.id}
                variants={item}
                whileHover="hover"
                className="group relative border-b border-paper/10 overflow-hidden cursor-default"
              >
                 <motion.div 
                    className="absolute inset-0 bg-paper z-0"
                    initial={{ x: "-100%" }}
                    variants={{
                        hover: { x: "0%", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                    }}
                 />
                 
                 <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center group-hover:text-charcoal transition-colors duration-300">
                    <div className="col-span-1 font-mono text-xs text-accent group-hover:text-charcoal transition-colors">{cert.id}</div>
                    <div className="col-span-1 md:col-span-2 font-mono text-xs opacity-60 group-hover:opacity-100">{cert.date}</div>
                    <div className="col-span-2 md:col-span-3 font-mono text-xs uppercase tracking-wider font-bold">{cert.issuer}</div>
                    <div className="col-span-8 md:col-span-5 font-sans text-xl md:text-2xl font-bold uppercase tracking-tight leading-none pt-2 md:pt-0 transform group-hover:translate-x-2 transition-transform duration-300">{cert.title}</div>
                    <div className="col-span-1 hidden md:flex justify-end">
                       <span className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-charcoal animate-pulse"></span>
                    </div>
                    
                    {/* Arrow Icon on Hover */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block overflow-hidden">
                       <motion.span 
                         className="inline-block text-xl"
                         variants={{
                             hover: { x: 0, opacity: 1, transition: { duration: 0.3 } },
                             initial: { x: -20, opacity: 0 }
                         }}
                         initial="initial"
                       >
                         →
                       </motion.span>
                    </div>
                 </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech Stack: The Modular Grid */}
        <div>
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-paper/20 pb-6">
            <motion.h2 
              initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans font-bold text-6xl md:text-8xl tracking-tighter uppercase"
            >
              Tech Stack
            </motion.h2>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-right"
            >
                <span className="font-sanskrit text-4xl text-paper/50 block mb-2">कौशलम्</span>
                <span className="font-mono text-xs uppercase tracking-widest opacity-60">
                [ SYSTEM MODULES ]
                </span>
            </motion.div>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 border-l border-t border-paper/10"
          >
             {allSkills.map((skill, i) => (
               <motion.div 
                 key={i}
                 variants={item}
                 whileHover={{ scale: 1.02, zIndex: 10 }}
                 className="aspect-square border-r border-b border-paper/10 p-4 relative group bg-charcoal transition-all duration-300"
               >
                  {/* Hover Fill */}
                  <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                  <div className="relative z-10 h-full flex flex-col justify-between group-hover:text-charcoal transition-colors duration-300">
                     <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">[{skill.code}]</span>
                        <span className="font-mono text-[10px] opacity-30 group-hover:opacity-100 transition-opacity">{(i + 1).toString().padStart(2, '0')}</span>
                     </div>

                     <div className="self-center w-full">
                        <span className="font-sans font-bold text-lg md:text-xl lg:text-2xl uppercase text-center block break-words leading-tight group-hover:scale-110 transition-transform duration-300 transform origin-center">
                          {skill.name}
                        </span>
                     </div>

                     <div className="flex justify-between items-end">
                        <div className="w-2 h-2 bg-paper/20 group-hover:bg-charcoal/20 transition-colors"></div>
                        <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">●</span>
                     </div>
                  </div>
               </motion.div>
             ))}
             
             {/* Empty Grid Cells Filler */}
             {Array.from({ length: 5 - (allSkills.length % 5) }).map((_, i) => (
                (allSkills.length % 5 !== 0) && (
                    <motion.div 
                        key={`empty-${i}`} 
                        variants={item}
                        className="hidden lg:block aspect-square border-r border-b border-paper/5 bg-paper/[0.02]"
                    />
                )
             ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Info;