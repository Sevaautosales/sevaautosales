import React, { useState, useEffect, useRef } from "react";

function TestimonialCard({ quote, name, location, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative transform transition-transform duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${200 + index * 300}ms` : '0ms',
        borderLeft: `2px solid ${isHovered ? "#3B82F6" : "transparent"}`,
        borderRight: `2px solid ${isHovered ? "#3B82F6" : "transparent"}`,
        borderBottom: `2px solid ${isHovered ? "#3B82F6" : "transparent"}`,
        borderTop: "none",
        transitionProperty: 'opacity, transform'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card content with curved border effect on hover */}
      <div className="p-8 relative z-20">
        {/* Animated border that follows the card's rounded shape */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: isHovered
              ? "inset 0 0 0 0 rgba(59, 130, 246, 0)"
              : "none",
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        ></div>

        {/* Content wrapper with hover effect */}
        <div
          style={{
            transform: isHovered ? "translateY(-5px)" : "translateY(0)",
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {/* Quote icon */}
          <div
            className="text-blue-600 dark:text-blue-400 mb-6"
            style={{ 
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6.5 3C4.01 3 2 5.01 2 7.5c0 1.172.451 2.235 1.184 3.037C2.89 11.155 2.51 12 1.5 12 1.224 12 1 12.224 1 12.5v1c0 0.276 0.224 0.5 0.5 0.5 1.82 0 3.53-1.086 4.261-2.777C6.101 11.389 6.296 11.5 6.5 11.5c2.49 0 4.5-2.01 4.5-4.5S8.99 3 6.5 3zM18.5 3c-2.49 0-4.5 2.01-4.5 4.5 0 1.172 0.451 2.235 1.184 3.037C14.89 11.155 14.51 12 13.5 12c-0.276 0-0.5 0.224-0.5 0.5v1c0 0.276 0.224 0.5 0.5 0.5 1.82 0 3.53-1.086 4.261-2.777 0.34 0.166 0.535 0.277 0.739 0.277 2.49 0 4.5-2.01 4.5-4.5S20.99 3 18.5 3z" />
            </svg>
          </div>

          {/* Quote text */}
          <p className="text-gray-600 dark:text-gray-300 italic mb-8 text-lg">
            "{quote}"
          </p>

          {/* Divider with animation */}
          <div
            className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"
            style={{ 
              width: isHovered ? "100%" : "30%",
              transition: 'width 0.5s ease-in-out'
            }}
          ></div>

          {/* Author info */}
          <div className="font-medium">
            <p className="text-gray-800 dark:text-white text-lg">{name}</p>
            <p className="text-blue-500 dark:text-blue-400">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
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

  const testimonials = [
    {
      quote:
        "Seva Auto Seles transformed my life. Their car modifications allowed me to regain my independence after my accident. The team was professional, understanding, and delivered beyond my expectations.",
      name: "Ajay Sharma",
      location: "Mumbai, India",
    },
    {
      quote:
        "As someone with limited mobility in my legs, I never thought I'd be able to ride a bike again. Thanks to the custom adaptations from Seva Auto Seles, I'm back on the road. Their attention to detail and focus on safety is exceptional.",
      name: "Priya Patel",
      location: "Delhi, India",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div
          className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-3">
            Client Stories
          </span>

          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Clients</span>{" "}
            Say
          </h2>

          <p className="text-gray-600 dark:text-gray-300">
            Read how our mobility solutions have impacted lives across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div
          className={`mt-12 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: '800ms',
            transitionProperty: 'opacity, transform'
          }}
        >
        </div>
      </div>
    </section>
  );
}

export default Testimonials; 