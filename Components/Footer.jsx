import React, { useState, useEffect } from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const footerPosition = document.getElementById('footer')?.offsetTop - window.innerHeight;
      
      if (position > footerPosition - 200) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check in case footer is already in view
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer id="footer" className={`bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-16 pb-8 relative overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-64 h-64 rounded-full bg-blue-500 opacity-5 -top-20 -left-20 animate-float-slow"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-5 top-40 -right-40 animate-float-medium"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-500 opacity-5 -top-40 left-1/2 animate-float-medium"></div>
        <div className="absolute w-40 h-40 rounded-full bg-green-500 opacity-5 bottom-20 left-1/4 animate-float-reverse"></div>
        {/* Additional floating shapes for more dynamic effect */}
        <div className="absolute w-32 h-32 rounded-full bg-pink-500 opacity-5 top-1/3 right-1/4 animate-float-slow-reverse"></div>
        <div className="absolute w-48 h-48 rounded-full bg-yellow-500 opacity-5 bottom-1/3 right-1/3 animate-float-medium-reverse"></div>
        <div className="absolute w-20 h-20 rounded-full bg-indigo-500 opacity-5 top-1/4 left-1/3 animate-float-medium-reverse"></div>
      </div>
      
      {/* Custom CSS for floating animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(20px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-25px) translateX(-15px); }
          66% { transform: translateY(-15px) translateX(-30px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          20% { transform: translateY(-15px) translateX(15px); }
          40% { transform: translateY(-30px) translateX(-10px); }
          60% { transform: translateY(-20px) translateX(25px); }
          80% { transform: translateY(-35px) translateX(-5px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(20px) translateX(-10px); }
          50% { transform: translateY(30px) translateX(-20px); }
          75% { transform: translateY(15px) translateX(-5px); }
        }
        
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(25px) translateX(-15px); }
          50% { transform: translateY(15px) translateX(-25px); }
          75% { transform: translateY(35px) translateX(-10px); }
        }
        
        @keyframes float-medium-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(20px) translateX(20px); }
          66% { transform: translateY(35px) translateX(-15px); }
        }
        
        @keyframes float-fast-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          20% { transform: translateY(18px) translateX(-12px); }
          40% { transform: translateY(25px) translateX(18px); }
          60% { transform: translateY(12px) translateX(-20px); }
          80% { transform: translateY(30px) translateX(8px); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-slow-reverse 9s ease-in-out infinite;
        }
        
        .animate-float-medium-reverse {
          animation: float-medium-reverse 5s ease-in-out infinite;
        }
        
        .animate-float-fast-reverse {
          animation: float-fast-reverse 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-12">
          {/* Company Information */}
          <div className={`lg:col-span-3 transform transition-all duration-1000 ${isVisible ? 'translate-y-0' : 'translate-y-16'}`}>
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {/* <img src="logo.svg" alt="Seva auto Sales" className="h-12 w-auto"/>   */}
                <span>Seva Auto Sales</span>             
              </a>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering mobility through innovative vehicle modifications for individuals with disabilities.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className={`lg:col-span-2 lg:ml-8 transform transition-all duration-1000 delay-100 ${isVisible ? 'translate-y-0' : 'translate-y-16'}`}>
            <h3 className="text-xl font-bold mb-6 relative before:content-[''] before:absolute before:w-12 before:h-1 before:bg-blue-500 before:-bottom-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Gallery', 'FAQs', 'Contact'].map((item, index) => (
                <li key={index} className="transform hover:-translate-y-1 transition-transform duration-300">
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-white flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className={`lg:col-span-2 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0' : 'translate-y-16'}`}>
            <h3 className="text-xl font-bold mb-6 relative before:content-[''] before:absolute before:w-12 before:h-1 before:bg-blue-500 before:-bottom-2">
              Contact Us
            </h3>
            <address className="not-italic">
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <div className="flex-shrink-0 mt-0.5 mr-3 p-2 rounded-full bg-gray-700 group-hover:bg-blue-600 transition-colors duration-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">Shop No. 64, Street No. 14, L.H.Road, Varachha, Surat, Gujarat, 395006</span>
                </li>
                <li className="flex items-center group">
                  <div className="flex-shrink-0 mr-3 p-2 rounded-full bg-gray-700 group-hover:bg-blue-600 transition-colors duration-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm"><a href="tel:+919904366000" className="hover:text-blue-400">+91 99043 66000</a></span>
                </li>
                <li className="flex items-center group">
                  <div className="flex-shrink-0 mr-3 p-2 rounded-full bg-gray-700 group-hover:bg-blue-600 transition-colors duration-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm"><a href="tel:+918128379660" className="hover:text-blue-400">+91 81283 79660</a></span>
                </li>
                <li className="flex items-center group">
                  <div className="flex-shrink-0 mr-3 p-2 rounded-full bg-gray-700 group-hover:bg-blue-600 transition-colors duration-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm"><a href="mailto:sevaautosales@gmail.com" className="hover:text-blue-400">sevaautosales@gmail.com</a></span>
                </li>
              </ul>
            </address>
          </div>
          
          {/* Google Map */}
          <div className={`lg:col-span-3 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0' : 'translate-y-16'}`}>
            <h3 className="text-xl font-bold mb-6 relative before:content-[''] before:absolute before:w-12 before:h-1 before:bg-blue-500 before:-bottom-2">
              Find Us
            </h3>
            <div className="h-64 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-[1.02] duration-500">
              {/* Replace the src with the actual Google Maps embed URL for your location */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.027221094508!2d72.85700657526253!3d21.210367780479595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f8d5d88703b%3A0x72afe3f7f67a4e24!2sRaghuvir%20Auto%20Garage!5e0!3m2!1sen!2sin!4v1716201871803!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Seva Auto Sales Location"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className={`pt-8 mt-8 flex flex-col md:flex-row justify-between items-center transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Seva Auto Sales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;