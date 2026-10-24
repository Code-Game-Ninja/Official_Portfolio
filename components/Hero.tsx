import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../portfolioData';

const Hero: React.FC = () => {
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-charcoal text-paper">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(244,244,240,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,240,0.35) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div className="absolute inset-y-0 left-[8%] w-px bg-paper/10" />
      <div className="absolute inset-y-0 right-[8%] w-px bg-paper/10" />

      <div className="relative z-10 min-h-screen px-6 pt-24 pb-8 md:px-12 md:pt-32 md:pb-10 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-paper/15 pb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55"
        >
          <span>Chirag Mishra / Portfolio 2026</span>
          <span className="flex items-center gap-3 text-paper/80">
            <span className="h-2 w-2 bg-accent animate-pulse" />
            Available full-time
          </span>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center py-14 md:py-20">
          <div className="lg:col-span-7 lg:pr-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-7"
            >
              Full Stack Developer · Samyora
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-bold text-[17vw] sm:text-[13vw] lg:text-[8.6vw] leading-[0.78] tracking-[-0.075em] uppercase"
              >
                Chirag
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-bold text-[17vw] sm:text-[13vw] lg:text-[8.6vw] leading-[0.9] tracking-[-0.075em] uppercase text-paper/35"
              >
                Mishra
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-9 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end border-t border-paper/15 pt-7"
            >
              <p className="max-w-xl font-mono text-sm md:text-base leading-relaxed text-paper/65">
                I build complete digital products—from expressive interfaces to reliable APIs, data systems, mobile experiences, and intelligent features.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={scrollToWork}
                  className="bg-paper text-charcoal px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-accent transition-colors"
                >
                  View selected work
                </button>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-paper/25 px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] hover:border-accent hover:text-accent transition-colors"
                >
                  Resume ↗
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pl-10"
          >
            <div className="relative h-[44vh] min-h-[360px] lg:h-[66vh] border border-paper/15 overflow-hidden bg-paper/5">
              <img
                src={profile.githubAvatar}
                alt={`${profile.name} portrait`}
                className="h-full w-full object-cover object-[center_28%] grayscale contrast-125 brightness-90 transition-all duration-700 hover:grayscale-0 hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              <div className="absolute left-0 top-0 bg-accent px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal">
                Profile / 01
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 font-mono text-[10px] uppercase tracking-[0.18em]">
                <div>
                  <p className="text-paper">{profile.role}</p>
                  <p className="mt-1 text-paper/50">{profile.location}</p>
                </div>
                <span className="vertical-text text-paper/40">CM / 2026</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-paper/15 font-mono text-[10px] uppercase tracking-[0.16em]"
        >
          {[
            ['Current', 'Samyora'],
            ['Education', 'Integrated M.Sc.'],
            ['Focus', 'Web · Mobile · AI'],
            ['Contact', profile.email],
          ].map(([label, value]) => (
            <div key={label} className="border-r border-paper/10 py-5 pr-4 last:border-r-0">
              <span className="block text-paper/35 mb-2">{label}</span>
              <span className="text-paper/80 break-all">{value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
