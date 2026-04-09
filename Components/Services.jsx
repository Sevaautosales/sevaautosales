import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Car, Bike, Settings } from 'lucide-react';

function ServiceCard({ title, description, icon, index, isVisible }) {
  return (
    <article 
      className={`relative group bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${200 + index * 200}ms` : '0ms',
        transitionProperty: 'opacity, transform'
      }}
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      
      {/* Content */}
      <div className="p-6 md:p-8">
        <div 
          className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 mb-5 transition-transform group-hover:scale-110 duration-300"
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      
      {/* Bottom hover reveal effect */}
      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 absolute bottom-0 left-0"></div>
    </article>
  );
}

function Services() {
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
      id="services" 
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500 opacity-5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-purple-600 opacity-5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionProperty: 'opacity, transform' }}>
          <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Our Specializations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Vehicle Modification</span> Services in India
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            We provide comprehensive vehicle modifications tailored to your unique needs, specializing in custom vehicle conversions for disabled persons, handicap driving solutions, and accessible mobility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            index={0}
            title="Car Modifications" 
            description="We offer comprehensive car modifications including hand controls, customized seating arrangements, and steering adaptations to ensure driving comfort and safety."
            icon={<Car className="h-7 w-7" />}
            isVisible={isVisible}
          />
          
          <ServiceCard 
            index={1}
            title="Bike Modifications" 
            description="Our bike modification services include enhanced balance mechanisms, single-hand controls, specialized seating, and foot adjustments to provide a safe and comfortable riding experience."
            icon={<Bike className="h-7 w-7" />}
            isVisible={isVisible}
          />
          
          <ServiceCard 
            index={2}
            title="Custom Adaptations" 
            description="We understand that each individual has unique needs. Our team specializes in creating custom vehicle adaptations based on specific requirements to ensure maximum independence and comfort."
            icon={<Settings className="h-7 w-7" />}
            isVisible={isVisible}
          />
        </div>
        
        <div className={`mt-16 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ 
          transitionDelay: '800ms',
          transitionProperty: 'opacity, transform'
        }}>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 group"
          >
            Contact Us for a Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;