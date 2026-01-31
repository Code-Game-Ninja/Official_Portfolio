import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'HOME', href: '#home' },
    { name: 'WORK', href: '#work' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'INFO', href: '#info' },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Wait for page transition
    } else {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed top-8 right-8 z-40 mix-blend-difference text-paper hidden md:block"
      >
        <ul className="flex flex-col items-end gap-1 font-mono text-xs uppercase tracking-widest">
          {links.map((link) => (
            <li key={link.name} className="group cursor-pointer flex items-center gap-2">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent">→</span>
              <a 
                href={link.href} 
                onClick={(e) => handleNavigation(e, link.href)}
                className="hover:line-through decoration-accent decoration-2"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Mobile Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden mix-blend-difference text-paper font-mono text-xs uppercase tracking-widest border border-paper/20 px-3 py-1 rounded-full backdrop-blur-sm"
      >
        {isOpen ? 'Close' : 'Menu'}
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-charcoal z-40 flex flex-col items-center justify-center md:hidden"
          >
             <div className="flex flex-col items-center gap-8">
                {links.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="font-sans text-4xl font-bold uppercase hover:text-accent transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
             </div>
             
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.5 }}
               transition={{ delay: 0.6 }}
               className="absolute bottom-12 font-mono text-xs text-center"
             >
                <p>RAJASTHAN, INDIA</p>
                <p>© 2026 CM</p>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;