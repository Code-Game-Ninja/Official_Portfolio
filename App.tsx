import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Story from './components/Story';
import Archive from './components/Archive';
import TransitionPage from './components/TransitionPage';
import { AnimatePresence, motion } from 'framer-motion';

// ScrollToTop component to ensure pages start at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Counter animation for preloader
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20);

    // Loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-charcoal text-paper overflow-x-hidden selection:bg-accent selection:text-charcoal">
      
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 bg-charcoal z-50 flex flex-col justify-between p-8 md:p-12 text-paper font-mono uppercase"
          >
            <div className="flex justify-between items-start">
               <span>[ System Initializing ]</span>
               <span>Rajasthan, India</span>
            </div>
            
            <div className="flex flex-col items-center">
               <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="font-sans font-bold text-6xl md:text-9xl tracking-tighter"
               >
                  CM
               </motion.h1>
               <div className="w-64 h-[1px] bg-paper/20 mt-8 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: `${count}%` }}
                  />
               </div>
            </div>

            <div className="flex justify-between items-end">
               <span className="text-accent text-xl">{count}%</span>
               <span>© 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              
              <Route 
                path="/story" 
                element={
                  <TransitionPage 
                    sanskrit="विद्या ददाति विनयम्" 
                    english="Knowledge gives humility."
                  >
                    <Story />
                  </TransitionPage>
                } 
              />
              
              <Route 
                path="/all-projects" 
                element={
                  <TransitionPage 
                    sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन" 
                    english="You have the right to work, but never to its fruits."
                  >
                    <Archive />
                  </TransitionPage>
                } 
              />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;