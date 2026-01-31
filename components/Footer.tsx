import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Confetti = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex justify-center items-end">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          initial={{ y: 0, x: 0, scale: 0, opacity: 1 }}
          animate={{
            y: -Math.random() * 400 - 100,
            x: (Math.random() - 0.5) * 400,
            rotate: Math.random() * 720,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0,
          }}
          transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
          style={{ 
            backgroundColor: ['#EBB305', '#ECEBE4', '#ffffff'][Math.floor(Math.random() * 3)],
            left: '50%' 
          }}
        />
      ))}
    </div>
  );
};

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea when message changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [formData.message]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFieldValid = (name: string, value: string) => {
    if (name === 'email') return isValidEmail(value);
    return value.trim().length > 0;
  };

  const getBorderColor = (name: string, value: string) => {
    if (!touched[name as keyof typeof touched]) return 'border-paper/20 focus:border-accent';
    return isFieldValid(name, value) ? 'border-accent' : 'border-red-500';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validName = isFieldValid('name', formData.name);
    const validEmail = isFieldValid('email', formData.email);
    const validMessage = isFieldValid('message', formData.message);

    if (!validName || !validEmail || !validMessage) {
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      try {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({ ...formData, date: new Date().toISOString() });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        
        setTimeout(() => setStatus('idle'), 6000);
      } catch (err) {
        setStatus('error');
      }
    }, 1500);
  };

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/chirag-mishra-14b128337',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/Code-Game-Ninja',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    },
    { 
      name: 'Portfolio', 
      url: 'https://code-game-ninja.github.io/Personal-Portfolio/',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.183-.437 3.057h-2.557zm-4.994-5.057h3.994v-4h-3.994v4zm1.936-6.383c.319.82.569 1.917.708 3.383h-2.616c.307-1.429.897-2.482 1.908-3.383zm-4.57 2.383c-.396 1.139-.629 2.502-.686 4h3.314v-4h-2.628zm-2.628 6h2.628v4h-3.314c.057 1.498.29 2.861.686 4zm5.198 6.383c-1.011-.9-1.601-1.954-1.908-3.383h2.616c-.139 1.466-.389 2.563-.708 3.383zm3.058-2.383v-4h3.994v4h-3.994zm5.55-6.383c.139 1.466.389 2.563.708 3.383h-2.616c-.307-1.429-.897-2.482-1.908-3.383zm4.57 2.383c.396 1.139.629 2.502.686 4h-3.314v-4h2.628zm2.628-2h-2.628v-4h3.314c-.057 1.498-.29 2.861-.686 4zm-5.198-6.383c1.011.9 1.601 1.954 1.908 3.383h-2.616c.139-1.466.389-2.563.708-3.383z"/>
        </svg>
      )
    }
  ];

  // Animation Variants
  const textRevealVariants: Variants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: "0%",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: i * 0.15 }
    })
  };

  const formContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const formItemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-paper min-h-screen flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* Global styles for placeholder transitions */}
      <style>{`
        input::placeholder, textarea::placeholder {
          transition: opacity 0.5s ease;
        }
      `}</style>

      <div className="flex-grow flex flex-col justify-center px-6 md:px-12 relative z-10 py-20 w-full max-w-7xl mx-auto">
         {/* Layout Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full mb-24">
            
            {/* Left: Big Text */}
            <div className="flex flex-col justify-center">
               {['COME', 'SAY', 'HELLO'].map((text, i) => (
                 <div key={text} className="overflow-hidden relative mb-[-0.1em]">
                    <motion.h2 
                      custom={i}
                      variants={textRevealVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      className={`font-sans text-[12vw] sm:text-[14vw] lg:text-[10rem] font-bold leading-[0.85] tracking-tighter ${text === 'SAY' ? 'text-accent' : 'text-paper'}`}
                    >
                      {text}
                    </motion.h2>
                 </div>
               ))}
            </div>
            
            {/* Right: Sanskrit & Bracket Graphic */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:flex flex-row justify-end items-stretch h-full min-h-[400px]"
            >
               <div className="flex flex-col justify-between items-center py-2 font-sanskrit text-5xl text-paper/80 leading-none mr-8">
                  <motion.span initial={{ rotate: -90 }} animate={{ rotate: 0 }} transition={{ duration: 1 }}>「</motion.span>
                  {/* Vertical text sideways: Rotated 90 degrees for Devanagari */}
                  <motion.span 
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 0.8, scale: 1 }}
                     transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
                     className="vertical-text-sideways tracking-[0.2em] opacity-80"
                  >
                     नमस्ते
                  </motion.span>
                  <motion.span initial={{ rotate: -90 }} animate={{ rotate: 0 }} transition={{ duration: 1 }}>」</motion.span>
               </div>
               
               {/* Vertical Line Graphic */}
               <div className="w-[1px] bg-paper/20 h-full relative">
                 <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full bg-paper/40"
                 />
               </div>
            </motion.div>
         </div>

         {/* Contact Form Section */}
         <div className="w-full mt-auto">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center font-mono space-y-4 py-12 border border-accent/20 bg-accent/5 relative overflow-hidden"
                >
                  <Confetti />
                  <div className="relative z-10">
                    <p className="text-xl text-accent">[ MESSAGE SENT ]</p>
                    <p className="text-sm opacity-70">Thank you. I will be in touch shortly.</p>
                    <button onClick={() => setStatus('idle')} className="text-xs border-b border-accent mt-4 pb-1 hover:text-accent transition-colors">SEND ANOTHER</button>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  variants={formContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-12 font-mono text-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    <motion.div variants={formItemVariants} className="flex flex-col gap-4 group">
                      <label className="uppercase opacity-50 text-xs tracking-widest transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-accent">[ Name ]</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`bg-transparent border-b py-2 focus:outline-none transition-colors placeholder:text-paper/20 placeholder:transition-opacity placeholder:duration-500 focus:placeholder:opacity-0 text-lg ${getBorderColor('name', formData.name)}`}
                        placeholder="Name"
                      />
                    </motion.div>
                    <motion.div variants={formItemVariants} className="flex flex-col gap-4 group">
                      <label className="uppercase opacity-50 text-xs tracking-widest transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-accent">[ Email ]</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`bg-transparent border-b py-2 focus:outline-none transition-colors placeholder:text-paper/20 placeholder:transition-opacity placeholder:duration-500 focus:placeholder:opacity-0 text-lg ${getBorderColor('email', formData.email)}`}
                        placeholder="Email"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div variants={formItemVariants} className="flex flex-col gap-4 group">
                    <label className="uppercase opacity-50 text-xs tracking-widest transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-accent">[ Message ]</label>
                    <textarea 
                      ref={textareaRef}
                      name="message"
                      rows={1}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`bg-transparent border-b py-2 focus:outline-none transition-colors placeholder:text-paper/20 placeholder:transition-opacity placeholder:duration-500 focus:placeholder:opacity-0 resize-none text-lg ${getBorderColor('message', formData.message)}`}
                      placeholder="Message"
                      style={{ minHeight: '40px' }}
                    />
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
         </div>
      </div>

      {/* Bottom Bar */}
       <div className="w-full border-t border-paper/10 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 bg-[#0a0a0a] z-20">
         <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="flex flex-wrap gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
                {socialLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors relative group flex items-center gap-2"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                    </a>
                ))}
            </div>
            <div className="font-mono text-[10px] opacity-40 mt-2">
                chiragmishra2511@gmail.com
            </div>
         </div>

         <div className="flex items-center gap-2 sm:gap-4 bg-charcoal/50 p-2 border border-paper/10 rounded-full pr-4 sm:pr-6 w-full md:w-auto justify-between md:justify-start">
            <div className="w-8 h-8 bg-accent rounded-full animate-spin-slow flex items-center justify-center text-charcoal text-[8px] overflow-hidden">
               <div className="w-full h-[1px] bg-charcoal"></div>
            </div>
            <div className="flex flex-col">
               <span className="font-mono text-[10px] opacity-50 uppercase">Currently on repeat</span>
               <span className="font-mono text-[10px] md:text-xs">DLC - MEAN IT IN THE MORNING</span>
            </div>
            <button 
                type="submit" 
                onClick={handleSubmit}
                disabled={status === 'submitting'}
                className="ml-4 text-xl hover:text-accent transition-colors disabled:opacity-50"
            >
                →
            </button>
         </div>
      </div>
    </footer>
  );
};

export default Footer;