import React from 'react';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Info from './Info';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
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