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
import WhatsAppButton from '../Components/WhatsAppButton';
import SolutionWizard from '../Components/SolutionWizard';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <SolutionWizard />
          <About />
          <Services />
          <Gallery />
          <Testimonials />
          <Faqs />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}

export default App;