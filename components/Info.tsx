import React from 'react';
import { motion, Variants } from 'framer-motion';

// Tech stack with logos (using CDN icons)
const techStack = [
  // Large items (span 2 cols)
  { name: "React", code: "FE", size: "large", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", code: "BE", size: "large", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  
  // Medium items
  { name: "TypeScript", code: "FE", size: "medium", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "MongoDB", code: "BE", size: "medium", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Tailwind", code: "FE", size: "medium", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Express", code: "BE", size: "medium", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  
  // Regular items
  { name: "Next.js", code: "FE", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Python", code: "AI", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Git", code: "TL", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Figma", code: "TL", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Docker", code: "TL", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", code: "BE", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "GraphQL", code: "BE", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "AWS", code: "TL", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Linux", code: "TL", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "GSAP", code: "FE", size: "small", logo: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg" },
  { name: "Three.js", code: "FE", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { name: "Vercel", code: "TL", size: "small", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
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

  const bentoItem: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    show: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

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

      <div className="max-w-[95vw] mx-auto relative z-10 flex flex-col gap-20 sm:gap-28 md:gap-40">
        
        {/* Certifications: The Data Log */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 md:mb-16 border-b border-paper/20 pb-4 sm:pb-6 gap-4">
            <motion.h2 
              initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter uppercase"
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
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 md:mb-16 border-b border-paper/20 pb-4 sm:pb-6 gap-4">
            <motion.h2 
              initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter uppercase"
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

          {/* Bento Grid */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
          >
             {techStack.map((tech, i) => (
               <motion.div 
                 key={i}
                 variants={bentoItem}
                 whileHover={{ scale: 1.02, y: -5 }}
                 className={`
                   relative group cursor-pointer overflow-hidden rounded-2xl border border-paper/10 bg-paper/5 backdrop-blur-sm
                   ${tech.size === 'large' ? 'col-span-2 row-span-2 min-h-[200px] sm:min-h-[250px]' : ''}
                   ${tech.size === 'medium' ? 'col-span-2 sm:col-span-1 lg:col-span-2 min-h-[120px] sm:min-h-[150px]' : ''}
                   ${tech.size === 'small' ? 'col-span-1 min-h-[100px] sm:min-h-[120px]' : ''}
                   transition-all duration-500 ease-out
                 `}
               >
                  {/* Background Logo - Appears on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-all duration-500 ease-out scale-75 group-hover:scale-100">
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className={`
                        ${tech.size === 'large' ? 'w-40 h-40 sm:w-52 sm:h-52' : ''}
                        ${tech.size === 'medium' ? 'w-24 h-24 sm:w-32 sm:h-32' : ''}
                        ${tech.size === 'small' ? 'w-16 h-16 sm:w-20 sm:h-20' : ''}
                        object-contain filter brightness-0 invert
                      `}
                    />
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/20 group-hover:via-accent/10 group-hover:to-transparent transition-all duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-3 sm:p-4 flex flex-col justify-between">
                     {/* Top Row */}
                     <div className="flex justify-between items-start">
                        <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-paper/40 group-hover:text-accent transition-colors duration-300">
                          [{tech.code}]
                        </span>
                        <span className="font-mono text-[8px] sm:text-[10px] text-paper/20 group-hover:text-paper/60 transition-colors duration-300">
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                     </div>

                     {/* Center - Tech Name */}
                     <div className="flex-1 flex items-center justify-center">
                        <span className={`
                          font-sans font-bold uppercase text-center leading-tight
                          group-hover:text-accent transition-colors duration-300
                          ${tech.size === 'large' ? 'text-2xl sm:text-3xl md:text-4xl' : ''}
                          ${tech.size === 'medium' ? 'text-lg sm:text-xl md:text-2xl' : ''}
                          ${tech.size === 'small' ? 'text-sm sm:text-base md:text-lg' : ''}
                        `}>
                          {tech.name}
                        </span>
                     </div>

                     {/* Bottom Row */}
                     <div className="flex justify-between items-end">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-paper/10 group-hover:bg-accent transition-colors duration-300"></div>
                        <motion.span 
                          className="text-[10px] sm:text-xs text-paper/0 group-hover:text-paper/60 transition-all duration-300"
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                        >
                          →
                        </motion.span>
                     </div>
                  </div>

                  {/* Border Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl border border-accent/0 group-hover:border-accent/30 transition-all duration-500"></div>
               </motion.div>
             ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Info;