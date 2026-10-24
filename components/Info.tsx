import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

type TechCategory = 'all' | 'frontend' | 'backend' | 'mobile' | 'database' | 'cloud_tools';

interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'cloud_tools';
  code: string;
  role: string;
  tag: string;
  logo: string;
  featured?: boolean;
}

const techStack: TechItem[] = [
  {
    name: "React",
    category: "frontend",
    code: "FE",
    role: "Component Architecture & State",
    tag: "CORE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    featured: true,
  },
  {
    name: "Next.js 15",
    category: "frontend",
    code: "FE",
    role: "Full-Stack SSR & App Router",
    tag: "PRODUCTION",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    featured: true,
  },
  {
    name: "TypeScript",
    category: "frontend",
    code: "TS",
    role: "Type-Safe End-to-End Scale",
    tag: "CORE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    featured: true,
  },
  {
    name: "Node.js",
    category: "backend",
    code: "BE",
    role: "High-Concurrency Server Runtime",
    tag: "CORE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    featured: true,
  },
  {
    name: "Express.js",
    category: "backend",
    code: "BE",
    role: "REST APIs & Middleware Layer",
    tag: "API",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "React Native",
    category: "mobile",
    code: "MOB",
    role: "Cross-Platform iOS & Android",
    tag: "MOBILE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    featured: true,
  },
  {
    name: "Expo",
    category: "mobile",
    code: "MOB",
    role: "Native Toolchain & EAS Delivery",
    tag: "MOBILE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Supabase",
    category: "database",
    code: "DATA",
    role: "PostgreSQL, Auth & Realtime",
    tag: "DATABASE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    featured: true,
  },
  {
    name: "Firebase",
    category: "database",
    code: "DATA",
    role: "Live Sockets & Cloud Firestore",
    tag: "DATABASE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "PostgreSQL",
    category: "database",
    code: "DATA",
    role: "Relational Schemas & Indexing",
    tag: "DATABASE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    category: "database",
    code: "DATA",
    role: "Document Store & Aggregations",
    tag: "DATABASE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    code: "UI",
    role: "Modern Responsive Utility Engine",
    tag: "STYLING",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "GSAP / Motion",
    category: "frontend",
    code: "UI",
    role: "Kinetic Animations & Interactive Timelines",
    tag: "MOTION",
    logo: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
  },
  {
    name: "Three.js",
    category: "frontend",
    code: "UI",
    role: "WebGL 3D Interactive Graphics",
    tag: "3D",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },
  {
    name: "Python & AI",
    category: "backend",
    code: "AI",
    role: "RAG Workflows & Gemini Integration",
    tag: "INTELLIGENCE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    featured: true,
  },
  {
    name: "GraphQL",
    category: "backend",
    code: "API",
    role: "Declarative Queries & Schema Types",
    tag: "API",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Docker",
    category: "cloud_tools",
    code: "OPS",
    role: "Containerized Microservices",
    tag: "DEVOPS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "AWS",
    category: "cloud_tools",
    code: "OPS",
    role: "Cloud Compute, S3 & Production Infra",
    tag: "CLOUD",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  },
  {
    name: "Git & GitHub",
    category: "cloud_tools",
    code: "DEV",
    role: "Version Architecture & Workflows",
    tag: "TOOL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Linux",
    category: "cloud_tools",
    code: "SYS",
    role: "POSIX Shell Automation & Server Config",
    tag: "OS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
];

const categories: { id: TechCategory; label: string }[] = [
  { id: 'all', label: 'All Modules' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'database', label: 'Data & Storage' },
  { id: 'cloud_tools', label: 'Cloud & DevOps' },
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
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>('all');

  const filteredTech = selectedCategory === 'all'
    ? techStack
    : techStack.filter(item => item.category === selectedCategory);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(4px)' },
    show: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="info" className="bg-charcoal text-paper py-24 md:py-32 border-t border-paper/10 relative overflow-hidden">
      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(236, 235, 228, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 235, 228, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute right-0 top-32 text-[15vw] font-bold text-paper/5 leading-none select-none pointer-events-none font-sans mix-blend-overlay"
      >
        DATA
      </motion.div>

      <div className="max-w-[95vw] mx-auto relative z-10 flex flex-col gap-24 sm:gap-32 md:gap-44">
        {/* Certifications: The Data Log */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 md:mb-16 border-b border-paper/20 pb-4 sm:pb-6 gap-4">
            <motion.h2
              initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
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
              [ CERTIFICATIONS ]
            </motion.span>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
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
            <div className="flex flex-col" onMouseLeave={() => setHoveredCert(null)}>
              {certifications.map((cert) => {
                const isHovered = hoveredCert === cert.id;
                return (
                  <motion.div
                    key={cert.id}
                    variants={item}
                    onMouseEnter={() => setHoveredCert(cert.id)}
                    className="group relative border-b border-paper/10 overflow-hidden cursor-pointer transition-colors duration-500"
                  >
                    <motion.div
                      className="absolute inset-0 bg-accent z-0"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                      style={{ originY: 1 }}
                    />

                    <motion.div
                      className="absolute right-10 top-1/2 -translate-y-1/2 text-[15vw] font-bold font-sans opacity-0 text-charcoal/10 pointer-events-none z-0 tracking-tighter"
                      animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8, x: isHovered ? 0 : 50 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      {cert.id}
                    </motion.div>

                    <div className={`relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 p-6 md:p-8 items-center transition-all duration-300 ${isHovered ? 'text-charcoal' : 'text-paper'}`}>
                      <div className={`col-span-1 font-mono text-xs transition-colors ${isHovered ? 'text-charcoal font-bold text-lg' : 'text-accent'}`}>{cert.id}</div>
                      <div className={`col-span-1 md:col-span-2 font-mono text-xs uppercase ${isHovered ? 'opacity-100 font-bold' : 'opacity-60'}`}>{cert.date}</div>
                      <div className="col-span-2 md:col-span-3 font-mono text-xs uppercase tracking-wider font-bold">
                        <span className={`${isHovered ? 'bg-charcoal text-accent px-3 py-1 border border-charcoal' : 'border border-transparent'}`}>{cert.issuer}</span>
                      </div>
                      <div className={`col-span-8 md:col-span-5 font-sans text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight leading-none pt-2 md:pt-0 transform transition-transform duration-500 ${isHovered ? 'translate-x-6 mix-blend-multiply' : ''}`}>
                        {cert.title}
                      </div>
                      <div className="col-span-1 hidden md:flex justify-end pr-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${isHovered
                          ? 'bg-charcoal text-accent rotate-0 scale-125 border-none'
                          : 'border border-paper/20 text-paper -rotate-45'
                          }`}>
                          <span className="text-xl leading-none">→</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Upgraded Tech Stack: Architecture & Modules */}
        <div>
          {/* Section Heading & Sanskrit Accent */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 border-b border-paper/20 pb-4 sm:pb-6 gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-accent block mb-3">
                02 // System Capabilities
              </span>
              <motion.h2
                initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter uppercase"
              >
                Tech Stack
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-left md:text-right"
            >
              <span className="font-sanskrit text-4xl text-paper/50 block mb-1">कौशलम्</span>
              <span className="font-mono text-xs uppercase tracking-widest opacity-60">
                [ 20 PRODUCTION MODULES ]
              </span>
            </motion.div>
          </div>

          {/* Telemetry Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-paper/10 bg-paper/[0.02] mb-10 font-mono text-[11px] uppercase tracking-wider text-paper/60">
            <div>
              <span className="text-paper/30 block mb-1">Stack Scope</span>
              <span className="text-accent font-bold">End-to-End Full Stack</span>
            </div>
            <div>
              <span className="text-paper/30 block mb-1">Mobile Engine</span>
              <span className="text-paper font-bold">React Native + Expo</span>
            </div>
            <div>
              <span className="text-paper/30 block mb-1">Intelligence</span>
              <span className="text-paper font-bold">Gemini & Vertex AI RAG</span>
            </div>
            <div>
              <span className="text-paper/30 block mb-1">Runtime Status</span>
              <span className="text-[#27c93f] flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse"></span>
                Operational
              </span>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
            {categories.map((cat) => {
              const count = cat.id === 'all'
                ? techStack.length
                : techStack.filter(t => t.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-accent text-charcoal border-accent font-bold shadow-[0_0_20px_rgba(235,179,5,0.3)]'
                      : 'border-paper/15 text-paper/60 hover:text-paper hover:border-paper/30 bg-paper/[0.02]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-charcoal/20 text-charcoal' : 'bg-paper/10 text-paper/50'
                  }`}>
                    {count.toString().padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Animated Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech, i) => (
                <motion.div
                  layout
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={{ duration: 0.35, delay: i * 0.02 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-xl border border-paper/10 bg-paper/[0.03] backdrop-blur-md p-6 flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:border-accent/50 hover:bg-paper/[0.06] hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  {/* Subtle Accent Glow on Hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top Bar: Code badge, tag, number */}
                  <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-paper/40 relative z-10">
                    <span className="text-accent group-hover:underline">
                      [{tech.code}]
                    </span>
                    <span className="px-2 py-0.5 rounded border border-paper/10 text-[9px] text-paper/60 group-hover:border-accent/40 group-hover:text-accent transition-colors">
                      {tech.tag}
                    </span>
                    <span>
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Main Identity: Logo + Name */}
                  <div className="flex items-center gap-4 my-4 relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-paper/5 border border-paper/10 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:border-accent/40 flex-shrink-0">
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-xl uppercase tracking-tight text-paper group-hover:text-accent transition-colors">
                        {tech.name}
                      </h3>
                      <p className="font-mono text-xs text-paper/55 leading-tight mt-1 line-clamp-2">
                        {tech.role}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Line: Status dot & Direction Arrow */}
                  <div className="flex justify-between items-center pt-3 border-t border-paper/10 font-mono text-[10px] text-paper/40 relative z-10 group-hover:text-paper/70 transition-colors">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Production
                    </span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent text-sm">
                      →
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Kinetic Marquee Ticker */}
          <div className="mt-16 overflow-hidden border-y border-paper/10 py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper/40 bg-paper/[0.015]">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="flex whitespace-nowrap gap-8"
            >
              {[1, 2, 3].map((set) => (
                <div key={set} className="flex gap-8 items-center">
                  <span className="text-accent font-bold">SYSTEM WORKFLOW:</span>
                  <span>React 19 & Next.js 15</span>
                  <span className="text-paper/20">◆</span>
                  <span>TypeScript Strict Types</span>
                  <span className="text-paper/20">◆</span>
                  <span>Expo Native EAS Deployments</span>
                  <span className="text-paper/20">◆</span>
                  <span>Supabase Postgres & Row-Level Security</span>
                  <span className="text-paper/20">◆</span>
                  <span>Google Gemini & Vertex AI RAG</span>
                  <span className="text-paper/20">◆</span>
                  <span>WebSocket Realtime Feeds</span>
                  <span className="text-paper/20">◆</span>
                  <span>Docker Orchestration</span>
                  <span className="text-paper/20">◆</span>
                  <span>High-Fidelity GSAP Motion</span>
                  <span className="text-paper/20">◆</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
