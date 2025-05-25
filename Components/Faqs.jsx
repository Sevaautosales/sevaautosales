import React, { useState, useRef, useEffect } from "react";

function FaqItem({ question, answer, index, isOpen, onClick, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div 
      className={`mb-8 overflow-hidden rounded-xl shadow-md transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${200 + index * 150}ms` : '0ms',
        transform: isVisible ? (isHovered ? 'translateY(-5px)' : 'translateY(0)') : 'translateY(32px)',
        boxShadow: isHovered ? '0 10px 25px -5px rgba(59, 130, 246, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-white dark:bg-gray-800 transition-all duration-300 border-l-4 ${isOpen ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'}`}>
        <button
          type="button"
          onClick={onClick}
          className="flex items-center justify-between w-full text-left p-6"
          aria-expanded={isOpen}
        >
          <div className="flex items-center">
            <div 
              className={`mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isOpen 
                  ? 'bg-blue-500 dark:bg-blue-600 text-white' 
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300'
              }`}
            >
              <span className="font-semibold">{index + 1}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {question}
            </h3>
          </div>
          <div 
            className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
              isOpen 
                ? 'bg-blue-500 dark:bg-blue-600 rotate-180' 
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            <svg
              className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </button>

        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-500 ease-in-out px-6 pb-6"
          style={{ 
            maxHeight: `${height}px`,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
          }}
        >
          <div className="pl-14">
            <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Faqs() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLocationHovered, setIsLocationHovered] = useState(false);
  const mapContentRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(0);

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

  useEffect(() => {
    if (mapContentRef.current) {
      setMapHeight(activeIndex === 'location' ? mapContentRef.current.scrollHeight : 0);
    }
  }, [activeIndex]);

  const handleItemClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      question: "What types of disabilities are covered?",
      answer:
        "We cater to a wide range of physical disabilities including limited limb mobility, paraplegia, and amputees.",
    },
    {
      id: 2,
      question: "How long does the modification take?",
      answer:
        "Depending on the customization, it may take between 1-2 business days.",
    },
    {
      id: 3,
      question: "Do you help with legal approvals or registration?",
      answer:
        "Yes, we offer assistance with certification and local transportation registration compliance.",
    },
    {
      id: 4,
      question: "Do you provide home pickup/delivery?",
      answer:
        "Yes, we provide doorstep pickup and delivery for vehicle modifications within the service region.",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="faqs" 
      className="py-16 md:py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-50 dark:opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-900 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-300 dark:bg-purple-900 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-300 dark:bg-indigo-900 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-3">
            Get Answers
          </span>
          
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Questions</span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Everything you need to know about our vehicle modification services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem 
              key={faq.id} 
              question={faq.question} 
              answer={faq.answer} 
              index={index}
              isOpen={activeIndex === index}
              onClick={() => handleItemClick(index)}
              isVisible={isVisible}
            />
          ))}

          {/* Location map section with animations */}
          <div 
            className={`mb-8 overflow-hidden rounded-xl shadow-md transition-all duration-500 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isVisible ? `${200 + faqs.length * 150}ms` : '0ms',
              transform: isVisible ? (isLocationHovered ? 'translateY(-5px)' : 'translateY(0)') : 'translateY(32px)',
              boxShadow: isLocationHovered ? '0 10px 25px -5px rgba(59, 130, 246, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={() => setIsLocationHovered(true)}
            onMouseLeave={() => setIsLocationHovered(false)}
          >
            <div className={`bg-white dark:bg-gray-800 transition-all duration-300 border-l-4 ${activeIndex === 'location' ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'}`}>
              <button
                type="button"
                onClick={() => handleItemClick('location')}
                className="flex items-center justify-between w-full text-left p-6"
                aria-expanded={activeIndex === 'location'}
              >
                <div className="flex items-center">
                  <div 
                    className={`mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                      activeIndex === 'location' 
                        ? 'bg-blue-500 dark:bg-blue-600 text-white' 
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300'
                    }`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Where is your workshop located?
                  </h3>
                </div>
                <div 
                  className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                    activeIndex === 'location' 
                      ? 'bg-blue-500 dark:bg-blue-600 rotate-180' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${activeIndex === 'location' ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </button>

              <div
                ref={mapContentRef}
                className="overflow-hidden transition-all duration-500 ease-in-out px-6 pb-6"
                style={{ 
                  maxHeight: `${mapHeight}px`,
                  opacity: activeIndex === 'location' ? 1 : 0,
                  transform: activeIndex === 'location' ? 'translateY(0)' : 'translateY(-10px)'
                }}
              >
                <div className="pl-14">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mb-4"></div>
                  <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.027221094508!2d72.85700657526253!3d21.210367780479595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f8d5d88703b%3A0x72afe3f7f67a4e24!2sRaghuvir%20Auto%20Garage!5e0!3m2!1sen!2sin!4v1716201871803!5m2!1sen!2sin"
                      className="w-full h-64 rounded-lg border-0"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none rounded-lg border-2 border-blue-500 dark:border-blue-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className={`mt-12 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 group"
          >
            Have more questions? Contact us
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Faqs;