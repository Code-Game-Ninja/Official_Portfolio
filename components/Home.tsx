import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Info from './Info';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const section = location.state?.section;
    if (!section) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [location.key, location.state]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Info />
      <Footer />
    </motion.div>
  );
};

export default Home;
