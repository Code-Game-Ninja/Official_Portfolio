import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { profile } from '../portfolioData';

interface NavLinkItem {
  id: string;
  name: string;
  href: string;
  num: string;
}

const navLinks: NavLinkItem[] = [
  { id: 'home', name: 'HOME', href: '#home', num: '01' },
  { id: 'profile', name: 'PROFILE', href: '#profile', num: '02' },
  { id: 'work', name: 'WORK', href: '#work', num: '03' },
  { id: 'experience', name: 'EXPERIENCE', href: '#experience', num: '04' },
  { id: 'info', name: 'STACK', href: '#info', num: '05' },
  { id: 'contact', name: 'CONTACT', href: '#contact', num: '06' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll spy to detect active section & header scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Scroll spy for current section
      const scrollPosition = window.scrollY + 220;
      for (const link of [...navLinks].reverse()) {
        const element = document.getElementById(link.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(link.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Robust one-click navigation with offset calculation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    // 1. Immediately unlock body scroll so mobile browsers don't suppress smooth scrolling
    document.body.style.overflow = '';
    setIsOpen(false);

    // 2. Immediate active feedback
    setActiveSection(targetId);

    // 3. Handle cross-route vs in-page scroll
    if (location.pathname !== '/') {
      navigate('/', { state: { section: targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        // Calculate header offset so headings are never concealed under the floating navbar
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      {/* Desktop Floating Navigation Bar (Screen width >= 1024px) */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pt-5 px-6 xl:px-12 pointer-events-none hidden lg:block"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Brand Identity */}
          <button
            type="button"
            onClick={(e) => handleNavigation(e, '#home')}
            className="group pointer-events-auto flex items-center gap-3 bg-charcoal/80 backdrop-blur-xl border border-paper/15 px-4 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(235,179,5,0.2)]"
          >
            <div className="w-7 h-7 bg-paper/10 border border-paper/20 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-accent group-hover:bg-accent group-hover:text-charcoal transition-colors">
              CM
            </div>
            <div className="text-left font-mono">
              <span className="block text-xs font-bold uppercase tracking-wider text-paper">
                Chirag Mishra
              </span>
              <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-paper/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse" />
                Available Full-Time
              </span>
            </div>
          </button>

          {/* Center Floating Capsule Menu */}
          <nav
            aria-label="Primary navigation"
            className="pointer-events-auto bg-charcoal/80 backdrop-blur-xl border border-paper/15 rounded-full p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-1"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`relative px-3.5 xl:px-4 py-2 rounded-full font-mono text-[10.5px] xl:text-[11px] uppercase tracking-[0.12em] transition-all duration-300 ${
                    isActive
                      ? 'text-charcoal font-bold'
                      : 'text-paper/60 hover:text-paper hover:bg-paper/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-accent rounded-full -z-10 shadow-[0_0_15px_rgba(235,179,5,0.4)]"
                    />
                  )}
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="pointer-events-auto flex items-center gap-2.5">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-charcoal/80 backdrop-blur-xl border border-paper/15 text-paper hover:border-accent hover:text-accent px-4 py-2.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300"
            >
              Resume ↗
            </a>
            <button
              type="button"
              onClick={(e) => handleNavigation(e, '#contact')}
              className="bg-accent text-charcoal hover:bg-paper px-4 py-2.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider shadow-[0_10px_30px_rgba(235,179,5,0.25)] transition-all duration-300"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile & Tablet Header Bar (Screen width < 1024px) */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden px-4 sm:px-6 py-3.5 flex items-center justify-between transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-charcoal/95 backdrop-blur-xl border-b border-paper/15 shadow-xl'
            : 'bg-charcoal/60 backdrop-blur-md'
        }`}
      >
        <button
          type="button"
          onClick={(e) => handleNavigation(e, '#home')}
          className="flex items-center gap-2.5 font-mono max-w-[70%]"
        >
          <div className="w-7 h-7 bg-paper/10 border border-paper/20 rounded-full flex items-center justify-center text-[10px] font-bold text-accent flex-shrink-0">
            CM
          </div>
          <span className="text-xs font-bold tracking-wider text-paper uppercase truncate">
            Chirag Mishra
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse flex-shrink-0" />
        </button>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider border transition-all duration-300 flex-shrink-0 ${
            isOpen
              ? 'bg-accent text-charcoal border-accent font-bold'
              : 'border-paper/25 text-paper bg-charcoal/80'
          }`}
        >
          <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
          <div className="w-3.5 h-3 flex flex-col justify-between py-0.5" aria-hidden="true">
            <span
              className={`h-0.5 w-full bg-current transform transition-transform duration-300 origin-left ${
                isOpen ? 'rotate-45 translate-x-0.5' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transform transition-transform duration-300 origin-left ${
                isOpen ? '-rotate-45 translate-x-0.5' : ''
              }`}
            />
          </div>
        </button>
      </motion.header>

      {/* Mobile & Tablet Curtain Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden overflow-y-auto"
          >
            {/* Top Navigation Links - Generous touch targets for one-click action */}
            <div className="flex flex-col divide-y divide-paper/10 my-auto">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                    className={`min-h-[56px] py-3.5 flex items-center justify-between font-sans text-2xl sm:text-3xl font-bold uppercase tracking-tight transition-colors ${
                      isActive ? 'text-accent pl-2' : 'text-paper hover:text-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-accent font-normal">
                        [{link.num}]
                      </span>
                      <span>{link.name}</span>
                    </div>
                    <span className="font-mono text-xs text-paper/40">
                      {isActive ? '● CURRENT' : '→'}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Footer Actions & Meta */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-6 pt-5 border-t border-paper/15 flex flex-col gap-4 font-mono text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center py-3 border border-paper/20 text-paper font-bold uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
                >
                  Resume ↗
                </a>
                <button
                  type="button"
                  onClick={(e) => handleNavigation(e, '#contact')}
                  className="text-center py-3 bg-accent text-charcoal font-bold uppercase tracking-wider hover:bg-paper transition-colors"
                >
                  Let's Talk
                </button>
              </div>

              <div className="flex justify-between items-center text-[10px] text-paper/40 uppercase tracking-widest pt-1">
                <span>Kishangarh, IN</span>
                <span>© 2026 CM</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
