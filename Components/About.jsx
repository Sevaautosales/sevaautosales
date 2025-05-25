import React, { useEffect, useRef, useState } from 'react';
import { Users, Award, Clock, ArrowRight } from 'lucide-react';

function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '-50px 0px', // Start animation 50px before the section comes into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500 opacity-20 dark:opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-purple-600 opacity-20 dark:opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Our Story
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Seva Auto Sales</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-300">
            We're dedicated to enhancing accessibility through innovative vehicle modifications for individuals with physical disabilities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white shadow-xl transform hover:-translate-y-1 transition-transform duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ transitionDelay: '200ms' }}>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="mb-6 text-blue-100">
              At Seva Auto Sales, we believe that mobility is a fundamental right. We're dedicated to enhancing accessibility through innovative vehicle modifications for individuals with physical disabilities.
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Clock size={24} className="text-white" />
              </div>
              <p className="font-medium">Serving our community since 2005</p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-purple-500 opacity-70"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-blue-400 opacity-70"></div>
          </div>
          
          <div className={`bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 border border-gray-200/50 dark:border-white/20 transform hover:-translate-y-1 transition-transform duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          style={{ transitionDelay: '400ms' }}>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-500/20 backdrop-blur-sm p-3 rounded-full mr-4 flex-shrink-0 border border-blue-200 dark:border-blue-400/30">
                  <Users size={24} className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Expert Team</h4>
                  <p className="text-gray-600 dark:text-slate-300">
                    Our team of engineers and technicians brings over 15 years of combined experience in customizing vehicles for accessibility.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-500/20 backdrop-blur-sm p-3 rounded-full mr-4 flex-shrink-0 border border-blue-200 dark:border-blue-400/30">
                  <Award size={24} className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Quality Standards</h4>
                  <p className="text-gray-600 dark:text-slate-300">
                    Every modification adheres to the highest safety standards while ensuring comfort and ease of use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-12 bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-md rounded-xl p-8 border border-blue-200/50 dark:border-white/10 shadow-lg transition-opacity duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '600ms' }}>
          <p className="text-gray-700 dark:text-slate-200 text-lg italic text-center">
            "We're not just modifying vehicles; we're transforming lives by making mobility accessible to everyone."
          </p>
        </div>
        
        <div className={`mt-16 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '800ms' }}>
          <a 
            href="#services" 
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 group"
          >
            Explore Our Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;