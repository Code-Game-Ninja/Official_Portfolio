import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { profile } from '../portfolioData';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    requestRef.current?.abort();
    requestRef.current = null;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
  }, []);

  // Auto-resize textarea when message changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [formData.message]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFieldValid = (name: string, value: string) => {
    if (name === 'email') return isValidEmail(value.trim());
    return value.trim().length > 0;
  };

  const getBorderColor = (name: string, value: string) => {
    if (!touched[name as keyof typeof touched]) return 'border-paper/20 focus:border-accent';
    return isFieldValid(name, value) ? 'border-accent' : 'border-[#ff5f56] text-[#ff5f56]';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = () => {
    if (requestRef.current) return;
    const validName = isFieldValid('name', formData.name);
    const validEmail = isFieldValid('email', formData.email);
    const validMessage = isFieldValid('message', formData.message);

    if (!validName || !validEmail || !validMessage) {
      setTouched({ name: true, email: true, message: true });
      return;
    }

    void submitForm();
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: profile.linkedinUrl,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: profile.githubUrl,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
    },
    {
      name: 'Resume',
      url: profile.resumeUrl,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.183-.437 3.057h-2.557zm-4.994-5.057h3.994v-4h-3.994v4zm1.936-6.383c.319.82.569 1.917.708 3.383h-2.616c.307-1.429.897-2.482 1.908-3.383zm-4.57 2.383c-.396 1.139-.629 2.502-.686 4h3.314v-4h-2.628zm-2.628 6h2.628v4h-3.314c.057 1.498.29 2.861.686 4zm5.198 6.383c-1.011-.9-1.601-1.954-1.908-3.383h2.616c-.139 1.466-.389 2.563-.708 3.383zm3.058-2.383v-4h3.994v4h-3.994zm5.55-6.383c.139 1.466.389 2.563.708 3.383h-2.616c-.307-1.429-.897-2.482-1.908-3.383zm4.57 2.383c.396 1.139.629 2.502.686 4h-3.314v-4h2.628zm2.628-2h-2.628v-4h3.314c-.057 1.498-.29 2.861-.686 4zm-5.198-6.383c1.011.9 1.601 1.954 1.908 3.383h-2.616c.139-1.466.389-2.563.708-3.383z" />
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

  // Drag and drop state
  const packetRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isHoveringTarget, setIsHoveringTarget] = useState(false);

  // Check if packet was dropped in target
  const handleDragEnd = () => {
    if (!targetRef.current || !packetRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const packetRect = packetRef.current.getBoundingClientRect();

    // Calculate overlap
    const overlapX = Math.max(0, Math.min(packetRect.right, targetRect.right) - Math.max(packetRect.left, targetRect.left));
    const overlapY = Math.max(0, Math.min(packetRect.bottom, targetRect.bottom) - Math.max(packetRect.top, targetRect.top));
    const overlapArea = overlapX * overlapY;

    // If significant overlap (e.g. at least 30% of packet area is inside target), submit
    const packetArea = packetRect.width * packetRect.height;
    if (overlapArea > packetArea * 0.3) {
      handleSubmit();
    }
    setIsHoveringTarget(false);
  };

  const handleDrag = () => {
    if (!targetRef.current || !packetRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const packetRect = packetRef.current.getBoundingClientRect();

    const overlapX = Math.max(0, Math.min(packetRect.right, targetRect.right) - Math.max(packetRect.left, targetRect.left));
    const overlapY = Math.max(0, Math.min(packetRect.bottom, targetRect.bottom) - Math.max(packetRect.top, targetRect.top));
    const overlapArea = overlapX * overlapY;
    const packetArea = packetRect.width * packetRect.height;

    setIsHoveringTarget(overlapArea > packetArea * 0.3);
  };

  const submitForm = async () => {
    if (requestRef.current) return;
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setStatus('submitting');
    setErrorMessage(null);
    try {
      const endpoint = profile.contactFormEndpoint || 'https://formspree.io/f/xoeevvzp';
      const response = await fetch(endpoint, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: `Portfolio message from ${formData.name.trim()}`,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || (result.ok !== true && !result.next)) {
        const msg = (Array.isArray(result.errors) && result.errors.map((e: any) => e.message).join(', '))
          || result.error
          || 'Message delivery failed';
        setErrorMessage(msg);
        throw new Error(msg);
      }
      if (requestRef.current !== controller) return;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setStatus('idle'), 6000);
    } catch (err: any) {
      if (requestRef.current === controller) {
        setStatus('error');
        setErrorMessage(prev => prev || err?.message || 'Message delivery failed.');
      }
    } finally {
      clearTimeout(timeout);
      if (requestRef.current === controller) requestRef.current = null;
    }
  };

  return (
    <footer id="contact" className="bg-[#0a0a0a] text-paper min-h-screen flex flex-col justify-between relative overflow-hidden">

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full mb-24">

          {/* Left: Big Text */}
          <div className="flex flex-col justify-center">
            <div className="font-mono text-accent text-[10px] md:text-xs uppercase tracking-widest mb-6 border-b border-accent/30 inline-block pb-2 pr-12 self-start">
              &gt; SYSTEM_STATUS: READY_TO_RECEIVE
            </div>
            {['INITIATE', 'DIRECT', 'CONTACT'].map((text, i) => (
              <div key={text} className="overflow-hidden relative mb-[-0.1em] pr-4">
                <motion.h2
                  custom={i}
                  variants={textRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`font-sans text-[15vw] sm:text-[12vw] md:text-[8vw] lg:text-[4vw] xl:text-[4.5rem] font-bold leading-[0.85] tracking-tighter uppercase whitespace-nowrap ${text === 'DIRECT' ? 'text-accent mix-blend-screen' : 'text-paper'}`}
                >
                  {text}
                </motion.h2>
              </div>
            ))}
            <div className="mt-8 font-mono text-[10px] md:text-xs text-paper/40 uppercase tracking-widest flex items-center gap-4">
              <span className="w-16 h-[1px] bg-paper/20"></span>
              Direct email channel
            </div>
          </div>

          {/* Right: Technical Readout Graphic */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex flex-col justify-between items-end h-full min-h-[400px] border-r border-dashed border-paper/20 pr-12 relative"
          >
            {/* Decorative corner brackets */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/50"></div>

            <div className="text-right flex flex-col items-end gap-2 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] text-accent tracking-widest uppercase">Uplink Active</span>
                <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
              </div>
              <p className="font-mono text-[10px] text-paper/40 tracking-widest uppercase">Protocol: CHIRAG-PORTFOLIO-V2</p>
              <p className="font-mono text-[10px] text-paper/40 tracking-widest uppercase">Latency: ~ 12ms</p>
              <p className="font-mono text-[10px] text-paper/40 tracking-widest uppercase">Destination: {profile.email}</p>
            </div>

            <div className="w-full max-w-[200px] h-32 border border-paper/10 relative overflow-hidden flex items-end justify-between px-2 bg-paper/5">
              {/* Audio/Data visualizer bars */}
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-paper/20"
                  animate={{
                    height: ['10%', `${20 + Math.random() * 80}%`, '10%'],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random()
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col items-end pb-4">
              <div className="font-sanskrit text-3xl text-paper/20 tracking-widest mb-2">
                सन्देश
              </div>
              <div className="font-mono text-[8px] text-paper/30 uppercase tracking-widest">( Sandesh: Message )</div>
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
                role="status"
              >
                <Confetti />
                <div className="relative z-10">
                  <p className="text-xl text-accent">[ MESSAGE SENT ]</p>
                  <p className="text-sm opacity-70">Thank you. Your message was accepted. I will be in touch shortly.</p>
                  <button type="button" onClick={() => {
                    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
                    setStatus('idle');
                  }} className="text-xs border-b border-accent mt-4 pb-1 hover:text-accent transition-colors">SEND ANOTHER</button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                aria-label="Contact Chirag"
                aria-busy={status === 'submitting'}
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
                variants={formContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {/* Form Inputs (Constructing the Packet) */}
                <div className="flex flex-col gap-8 font-mono text-sm max-w-xl">
                  <p className="text-accent mb-4 tracking-widest uppercase opacity-80 border-b border-accent/30 pb-2">
                    &gt; CONSTRUCT DATA PACKET
                  </p>

                  <motion.div variants={formItemVariants} className="flex flex-col gap-2 group">
                    <label htmlFor="contact-name" className="uppercase opacity-50 text-xs tracking-widest transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-accent">[ Name ]</label>
                    <input
                      id="contact-name"
                      required
                      autoComplete="name"
                      disabled={status === 'submitting'}
                      aria-invalid={touched.name && !isFieldValid('name', formData.name)}
                      aria-describedby={touched.name && !isFieldValid('name', formData.name) ? 'contact-name-error' : undefined}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`bg-charcoal border py-3 px-4 focus:outline-none transition-colors placeholder:text-paper/20 placeholder:transition-opacity text-base md:text-lg ${getBorderColor('name', formData.name)} focus:bg-charcoal/80`}
                      placeholder="ENTER IDENTIFIER"
                    />
                    {touched.name && !isFieldValid('name', formData.name) && <p id="contact-name-error" className="text-xs text-[#ff5f56]">Please enter your name.</p>}
                  </motion.div>

                  <motion.div variants={formItemVariants} className="flex flex-col gap-2 group">
                    <label htmlFor="contact-email" className="uppercase opacity-50 text-xs tracking-widest transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-accent">[ Email ]</label>
                    <input
                      id="contact-email"
                      required
                      autoComplete="email"
                      disabled={status === 'submitting'}
                      aria-invalid={touched.email && !isFieldValid('email', formData.email)}
                      aria-describedby={touched.email && !isFieldValid('email', formData.email) ? 'contact-email-error' : undefined}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`bg-charcoal border py-3 px-4 focus:outline-none transition-colors placeholder:text-paper/20 placeholder:transition-opacity text-base md:text-lg ${getBorderColor('email', formData.email)} focus:bg-charcoal/80`}
                      placeholder="ENTER SECURE CHANNEL"
                    />
                    {touched.email && !isFieldValid('email', formData.email) && <p id="contact-email-error" className="text-xs text-[#ff5f56]">Please enter a valid email address.</p>}
                  </motion.div>

                  <motion.div variants={formItemVariants} className="flex flex-col gap-2 group">
                    <label htmlFor="contact-message" className="uppercase opacity-50 text-xs tracking-widest transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-accent">[ Payload ]</label>
                    <textarea
                      id="contact-message"
                      required
                      disabled={status === 'submitting'}
                      aria-invalid={touched.message && !isFieldValid('message', formData.message)}
                      aria-describedby={touched.message && !isFieldValid('message', formData.message) ? 'contact-message-error' : undefined}
                      ref={textareaRef}
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`bg-charcoal border py-3 px-4 focus:outline-none transition-colors placeholder:text-paper/20 placeholder:transition-opacity resize-vertical text-base md:text-lg ${getBorderColor('message', formData.message)} focus:bg-charcoal/80`}
                      placeholder="TRANSMIT MESSAGE DATA..."
                    />
                    {touched.message && !isFieldValid('message', formData.message) && <p id="contact-message-error" className="text-xs text-[#ff5f56]">Please enter a message.</p>}
                  </motion.div>
                </div>

                {/* Drag Interface */}
                <div className="flex flex-col md:flex-row items-center justify-between border border-paper/10 bg-paper/5 p-8 rounded-xl relative overflow-hidden min-h-[400px]">

                  {/* The Draggable Data Packet */}
                  <motion.div
                    ref={packetRef}
                    drag={status !== 'submitting'}
                    dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    dragElastic={1}
                    dragSnapToOrigin={true}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ scale: 0.9, rotate: -5, cursor: "grabbing" }}
                    className="w-48 h-64 bg-charcoal border border-accent/50 rounded-lg p-4 flex flex-col justify-between cursor-grab shadow-2xl z-20"
                    style={{ touchAction: "none" }}
                  >
                    <div className="border-b border-accent/30 pb-2 mb-2">
                      <p className="font-mono text-[10px] text-accent uppercase tracking-widest opacity-80">Data Packet</p>
                      <p className="font-mono text-xs truncate max-w-full text-paper/80 pt-1">
                        ID: {formData.name ? formData.name.toUpperCase() : 'UNKNOWN'}
                      </p>
                    </div>
                    <div className="flex-1 overflow-hidden pointer-events-none">
                      <p className="font-mono text-[8px] text-paper/40 font-bold uppercase truncate">
                        DEST: {formData.email ? formData.email : 'NULL'}
                      </p>
                      <p className="font-mono text-[8px] text-paper/60 mt-2 line-clamp-6">
                        {formData.message ? formData.message : 'AWAITING PAYLOAD...'}
                      </p>
                    </div>
                    <div className="mt-2 border-t border-accent/30 pt-2 flex justify-between items-center opacity-60">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="font-mono text-[8px] uppercase">Ready</span>
                    </div>
                  </motion.div>

                  {/* Drag Info Text */}
                  <div className="hidden md:flex flex-col items-center justify-center opacity-40 font-mono text-[10px] uppercase text-center w-32 tracking-widest">
                    <span>←</span>
                    <span>Drag to Transmit</span>
                    <span>→</span>
                  </div>

                  {/* Transmission Target Node */}
                  <div
                    ref={targetRef}
                    className={`w-48 h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-300 relative z-10 ${isHoveringTarget ? 'border-accent bg-accent/20 scale-105' : 'border-paper/20 bg-charcoal'
                      }`}
                  >
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${isHoveringTarget ? 'border-accent scale-150 animate-ping opacity-50 absolute' : 'border-paper/20'
                      }`} />

                    <div className={`w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center absolute ${isHoveringTarget ? 'bg-accent text-charcoal' : 'bg-paper/5 text-paper/40'
                      }`}>
                      <span className="font-mono font-bold text-xl leading-none">↓</span>
                    </div>

                    <p className={`font-mono text-[10px] mt-24 uppercase tracking-widest transition-colors duration-300 ${isHoveringTarget ? 'text-accent font-bold' : 'text-paper/40'
                      }`}>
                      {isHoveringTarget ? 'Uplink Established' : 'Transmission Node'}
                    </p>
                  </div>

                </div>
                <div className="md:col-span-2 flex flex-wrap items-center gap-5">
                  <button type="submit" disabled={status === 'submitting'} className="bg-accent text-charcoal px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-paper transition-colors disabled:opacity-50">
                    {status === 'submitting' ? 'Sending...' : 'Send message'}
                  </button>
                  <p role="status" className="font-mono text-xs text-paper/50">
                    {status === 'submitting' ? 'Sending your message. Please wait.' : 'Send with the button, or drag the packet to the node.'}
                  </p>
                </div>
                {status === 'error' && (
                  <div role="alert" className="md:col-span-2 font-mono text-xs border border-[#ff5f56]/40 bg-[#ff5f56]/10 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[#ff5f56] font-bold uppercase tracking-wider">
                      <span>⚠</span>
                      <span>Message Status</span>
                    </div>
                    <p className="text-paper/90 leading-relaxed">
                      {errorMessage || "Message delivery failed. Please send your message directly via email."}
                    </p>
                    <p className="text-paper/60 pt-1">
                      Direct channel: <a className="underline text-accent hover:text-paper" href={`mailto:${profile.email}`}>{profile.email}</a> or call <a className="underline text-accent hover:text-paper" href={profile.phoneHref}>{profile.phone}</a>.
                    </p>
                  </div>
                )}
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
          <div className="font-mono text-[10px] opacity-60 mt-2 flex flex-wrap gap-x-5 gap-y-1">
            <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">{profile.email}</a>
            <a href={profile.phoneHref} className="hover:text-accent transition-colors">{profile.phone}</a>
            <span>{profile.location}</span>
          </div>
        </div>

        <div className="flex flex-col md:items-end font-mono text-[10px] sm:text-xs text-paper/50 uppercase tracking-widest">
          <span className="text-paper/80 font-bold">Chirag Mishra // 2026</span>
          <span className="text-paper/30 mt-1">Kishangarh, IN • All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
