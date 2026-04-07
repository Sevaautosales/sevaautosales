import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md transition-all"
      aria-label="Main Navigation"
      style={{
        animation: 'slideInDown 0.8s ease-out forwards',
        transform: 'translateY(-100%)',
        opacity: 1,
      }}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center"
          style={{
            animation: 'fadeInLeft 0.8s ease-out forwards 0.2s',
            opacity: 0,
          }}>
          <a href="#" className="flex items-center gap-2.5 text-2xl font-bold text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform duration-300">
              <img src="logo.svg" alt="" className='h-9'/>
            <span>Seva Auto Sales</span>             
          </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8"
          style={{
            animation: 'fadeInRight 0.8s ease-out forwards 0.4s',
            opacity: 0,
          }}>
          <a href="#" className="nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative py-2 transition-colors duration-300">
            Home
          </a>
          <a href="#about" className="nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative py-2 transition-colors duration-300">
            About
          </a>
          <a href="#services" className="nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative py-2 transition-colors duration-300">
            Services
          </a>
          <a href="#gallery" className="nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative py-2 transition-colors duration-300">
            Gallery
          </a>
          <a href="#faqs" className="nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative py-2 transition-colors duration-300">
            FAQs
          </a>
          <a href="#contact" className="nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative py-2 transition-colors duration-300">
            Contact
          </a>
          <button 
            onClick={toggleDarkMode}
            className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group overflow-hidden"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? "sun" : "moon"}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center justify-center text-amber-500 dark:text-blue-400"
              >
                {darkMode ? <Sun size={22} fill="currentColor" fillOpacity={0.2} /> : <Moon size={22} fill="currentColor" fillOpacity={0.2} />}
              </motion.div>
            </AnimatePresence>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-amber-500/0 dark:bg-blue-400/0 group-hover:bg-amber-500/5 dark:group-hover:bg-blue-400/5 transition-colors duration-300" />
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden"
          style={{
            animation: 'fadeInRight 0.8s ease-out forwards 0.4s',
            opacity: 0,
          }}>
          <button 
            onClick={toggleDarkMode}
            className="p-2 mr-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-amber-500 dark:text-blue-400"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? "sun-mobile" : "moon-mobile"}
                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <Sun size={20} fill="currentColor" fillOpacity={0.2} /> : <Moon size={20} fill="currentColor" fillOpacity={0.2} />}
              </motion.div>
            </AnimatePresence>
          </button>
          
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-200 focus:outline-none hover:scale-110 transition-transform duration-200"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-2 mobile-menu">
          <div className="flex flex-col space-y-3">
            <a 
              href="#" 
              className="mobile-nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="mobile-nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#services" 
              className="mobile-nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#gallery" 
              className="mobile-nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </a>
            <a 
              href="#faqs" 
              className="mobile-nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              FAQs
            </a>
            <a 
              href="#contact" 
              className="mobile-nav-link text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
      
      {/* CSS for animations and effects */}
      <style jsx>{`
        @keyframes slideInDown {
          from {
            transform: translateY(-100%);
            opacity: 1;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Gradient underline effect for desktop nav links */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transform: translateX(-50%);
          transition: width 0.3s ease-in-out;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        /* Mobile menu animation */
        .mobile-menu {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        
        /* Mobile nav links with staggered animation */
        .mobile-nav-link {
          opacity: 0;
          animation: fadeInUp 0.3s ease-out forwards;
          transform: translateY(10px);
        }
        
        .mobile-nav-link:nth-child(1) { animation-delay: 0.1s; }
        .mobile-nav-link:nth-child(2) { animation-delay: 0.15s; }
        .mobile-nav-link:nth-child(3) { animation-delay: 0.2s; }
        .mobile-nav-link:nth-child(4) { animation-delay: 0.25s; }
        .mobile-nav-link:nth-child(5) { animation-delay: 0.3s; }
        .mobile-nav-link:nth-child(6) { animation-delay: 0.35s; }
        
        /* Mobile nav link hover effect */
        .mobile-nav-link:hover {
          padding-left: 8px;
          border-left: 3px solid;
          border-image: linear-gradient(90deg, #3b82f6, #8b5cf6) 1;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;