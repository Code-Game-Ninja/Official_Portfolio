import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { InteractiveTerminal, Terminal } from './Terminal';
import { profile, projects } from '../portfolioData';

type ProfileMode = 'classical' | 'modern';

const reveal = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

const About: React.FC = () => {
  const [mode, setMode] = useState<ProfileMode>('classical');

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextMode: ProfileMode;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      nextMode = mode === 'classical' ? 'modern' : 'classical';
    } else if (event.key === 'Home') {
      nextMode = 'classical';
    } else if (event.key === 'End') {
      nextMode = 'modern';
    } else {
      return;
    }
    event.preventDefault();
    setMode(nextMode);
    document.getElementById('profile-tab-' + nextMode)?.focus();
  };

  const commands = [
    {
      command: 'profile',
      output: (
        <div className="border-l-2 border-accent pl-4 text-paper/75 mb-5">
          <span className="block text-accent font-bold mb-2">[ IDENTITY ]</span>
          <p>{profile.name} — {profile.role} at Samyora.</p>
          <p className="mt-2">I build end-to-end web and mobile products across interfaces, APIs, databases, authentication, real-time systems, and AI integrations.</p>
        </div>
      ),
    },
    {
      command: 'work',
      output: (
        <div className="border-l-2 border-[#27c93f] pl-4 mb-5">
          <span className="block text-[#27c93f] font-bold mb-3">[ FEATURED SYSTEMS ]</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-paper/75">
            {projects.map((project) => <span key={project.id}>→ {project.title}</span>)}
          </div>
        </div>
      ),
    },
    {
      command: 'stack',
      output: (
        <div className="border-l-2 border-[#ffbd2e] pl-4 mb-5 text-paper/75">
          <span className="block text-[#ffbd2e] font-bold mb-2">[ CAPABILITIES ]</span>
          <p>React · Next.js · TypeScript · Node.js · React Native · Expo · Firebase · Supabase · MongoDB · PostgreSQL · AI APIs · Real-time systems</p>
        </div>
      ),
    },
    {
      command: 'status',
      output: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-l-2 border-accent pl-4 mb-5 text-paper/75">
          <div><span className="block text-paper/35 text-[10px] uppercase">Location</span>{profile.location}</div>
          <div><span className="block text-paper/35 text-[10px] uppercase">Availability</span>Full-time</div>
          <div><span className="block text-paper/35 text-[10px] uppercase">Education</span>{profile.education}</div>
          <div><span className="block text-paper/35 text-[10px] uppercase">University</span>{profile.university}</div>
        </div>
      ),
    },
    {
      command: 'contact',
      output: (
        <div className="border-l-2 border-paper/40 pl-4 mb-5 text-paper/75">
          <a className="block hover:text-accent" href={'mailto:' + profile.email}>{profile.email}</a>
          <a className="block mt-1 hover:text-accent" href={profile.phoneHref}>{profile.phone}</a>
        </div>
      ),
    },
  ];

  return (
    <section id="profile" className="relative overflow-hidden bg-charcoal text-paper px-6 py-28 md:px-12 md:py-36 border-t border-paper/10">
      <div
        className="absolute top-16 right-[-4%] font-sans text-[24vw] font-bold leading-none text-transparent opacity-[0.055] select-none pointer-events-none"
        style={{ WebkitTextStroke: '1px #f4f4f0' }}
      >
        PROFILE
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-paper/15 pb-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent mb-5">Profile interface / Choose a view</p>
            <h2 className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl uppercase tracking-[-0.06em] leading-[0.82]">
              One person.<br /><span className="text-paper/30">Two lenses.</span>
            </h2>
          </div>

          <div className="inline-flex w-full sm:w-auto self-start lg:self-auto border border-paper/20 p-1 font-mono text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.18em]" role="tablist" aria-label="Profile presentation mode">
            {(['classical', 'modern'] as ProfileMode[]).map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                id={'profile-tab-' + option}
                aria-controls={'profile-panel-' + option}
                aria-selected={mode === option}
                tabIndex={mode === option ? 0 : -1}
                onKeyDown={handleTabKeyDown}
                onClick={() => setMode(option)}
                className={'flex-1 sm:flex-none px-3 sm:px-5 py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ' + (mode === option ? 'bg-paper text-charcoal' : 'text-paper/45 hover:text-paper')}
              >
                {option === 'classical' ? 'Classical / Story' : 'Modern / Terminal'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'classical' ? (
            <motion.div
              key="classical"
              id="profile-panel-classical"
              role="tabpanel"
              aria-labelledby="profile-tab-classical"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="pt-16 md:pt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                <motion.div variants={reveal} transition={{ duration: 0.7 }} className="lg:col-span-4">
                  <div className="relative h-[520px] border border-paper/15 overflow-hidden">
                    <img src={profile.githubAvatar} alt={profile.name} className="w-full h-full object-cover object-[center_28%] grayscale contrast-125 brightness-90 transition-all duration-700 hover:grayscale-0 hover:brightness-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Portrait / Kishangarh</span>
                      <p className="font-sans text-3xl font-bold uppercase mt-3">Builder of complete systems.</p>
                    </div>
                  </div>
                </motion.div>

                <div className="lg:col-span-8 lg:pl-10 flex flex-col justify-between">
                  <motion.div variants={reveal} transition={{ duration: 0.7 }}>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/35">01 / The short version</span>
                    <p className="font-sans text-3xl md:text-5xl leading-[1.08] tracking-[-0.035em] mt-6 max-w-4xl">
                      I am a Full Stack Developer who enjoys turning complex product ideas into clear, dependable, and memorable digital experiences.
                    </p>
                  </motion.div>

                  <motion.div variants={reveal} transition={{ duration: 0.7 }} className="mt-16 grid grid-cols-1 md:grid-cols-2 border-t border-paper/15">
                    {[
                      ['Current chapter', 'Building full-stack products at Samyora.'],
                      ['Academic path', profile.education + ', ' + profile.university + '.'],
                      ['Foundation', 'Catering and university guidance systems at Unified Mentor.'],
                      ['Direction', 'Scalable web, mobile, real-time, and AI-enabled products.'],
                    ].map(([title, description]) => (
                      <div key={title} className="py-8 md:pr-8 border-b border-paper/15 md:odd:border-r md:even:pl-8">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{title}</span>
                        <p className="font-mono text-sm leading-relaxed text-paper/60 mt-4">{description}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <motion.div variants={reveal} transition={{ duration: 0.7 }} className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 border-y border-paper/15 py-12">
                <div className="lg:col-span-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/35">02 / Working language</span>
                </div>
                <div className="lg:col-span-9 flex flex-wrap gap-x-7 gap-y-3 font-sans text-2xl md:text-4xl font-bold uppercase tracking-[-0.04em]">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'React Native', 'Databases', 'AI APIs', 'Motion'].map((item, index) => (
                    <span key={item} className={index % 3 === 1 ? 'text-paper/25' : 'text-paper'}>{item}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={reveal} transition={{ duration: 0.7 }} className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <p className="font-mono text-sm text-paper/55 max-w-xl">The longer story includes curiosity, university, internships, production work, and the projects that shaped how I build.</p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/story" className="bg-accent text-charcoal px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-paper transition-colors">Read full story</Link>
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="border border-paper/25 px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] hover:border-accent hover:text-accent transition-colors">Resume ↗</a>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="modern"
              id="profile-panel-modern"
              role="tabpanel"
              aria-labelledby="profile-tab-modern"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              className="pt-16 md:pt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-3 font-mono text-xs leading-relaxed text-paper/45">
                  <p className="text-accent uppercase tracking-[0.2em] mb-5">Interactive profile</p>
                  <p>Type <span className="text-paper">help</span> to inspect available commands.</p>
                  <div className="mt-8 border-t border-paper/15 pt-5 space-y-2">
                    <p>profile — overview</p>
                    <p>work — selected systems</p>
                    <p>stack — capabilities</p>
                    <p>status — availability</p>
                    <p>contact — direct channel</p>
                  </div>
                </div>
                <div className="lg:col-span-9">
                  <Terminal className="min-h-[620px] text-sm md:text-base border-paper/15 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                    <InteractiveTerminal welcomeMessage="Chirag OS v2.6 connected. Type 'help' to explore the profile." commands={commands} />
                  </Terminal>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
