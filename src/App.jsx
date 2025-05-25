import React from 'react';
import { ThemeProvider } from '../Components/ThemeProvider';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import About from '../Components/About';
import Services from '../Components/Services';
import Gallery from '../Components/Gallery';
import Testimonials from '../Components/Testimonials';
import Faqs from '../Components/Faqs';
import Contact from '../Components/Contact';
import Footer from '../Components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Testimonials />
            <Faqs />
            <Contact />
          </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;