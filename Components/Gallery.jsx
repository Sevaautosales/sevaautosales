import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react';

// Modal component for displaying multiple images
function ImageModal({ isOpen, onClose, images, title, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const progressRef = useRef();
  const slideTimerRef = useRef();
  const animationFrameRef = useRef();
  const startTimeRef = useRef();
  const pausedTimeRef = useRef(0);

  const SLIDE_DURATION = 4000; // 4 seconds

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsImageLoaded(false);
    setProgressWidth(0);
    pausedTimeRef.current = 0;
  }, [initialIndex, isOpen]);

  // Progress animation function
  const animateProgress = () => {
    if (!startTimeRef.current || isPaused) return;

    const elapsed = Date.now() - startTimeRef.current + pausedTimeRef.current;
    const progress = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
    
    setProgressWidth(progress);

    if (progress < 100 && !isPaused) {
      animationFrameRef.current = requestAnimationFrame(animateProgress);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isOpen || images.length <= 1 || isPaused) {
      // Clear existing timers and animations
      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current);
        slideTimerRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    // Calculate remaining time based on current progress
    const currentProgress = pausedTimeRef.current;
    const remainingTime = SLIDE_DURATION - currentProgress;

    // Start progress animation
    startTimeRef.current = Date.now();
    animationFrameRef.current = requestAnimationFrame(animateProgress);

    // Set timer for slide change
    slideTimerRef.current = setTimeout(() => {
      goToNextSlide();
    }, remainingTime);

    return () => {
      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, isPaused, images.length, currentIndex]);

  // Handle pause state change
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;

    if (isPaused) {
      // Store current progress when pausing
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        pausedTimeRef.current = Math.min(SLIDE_DURATION, pausedTimeRef.current + elapsed);
      }
      
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, [isPaused, isOpen, images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const togglePlayPause = () => {
    setIsPaused(prev => !prev);
    setShowPlayPauseIcon(true);
    
    // Hide the icon after 1.5 seconds
    setTimeout(() => {
      setShowPlayPauseIcon(false);
    }, 1500);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsImageLoaded(false);
    resetProgress();
  };

  const goToNext = () => {
    clearTimersAndAnimations();
    goToNextSlide();
  };

  const goToPrevious = () => {
    clearTimersAndAnimations();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsImageLoaded(false);
    resetProgress();
  };

  const goToSlide = (index) => {
    clearTimersAndAnimations();
    setCurrentIndex(index);
    setIsImageLoaded(false);
    resetProgress();
  };

  const clearTimersAndAnimations = () => {
    if (slideTimerRef.current) {
      clearTimeout(slideTimerRef.current);
      slideTimerRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const resetProgress = () => {
    setProgressWidth(0);
    pausedTimeRef.current = 0;
    startTimeRef.current = null;
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen ? 'bg-black bg-opacity-90 backdrop-blur-sm' : 'bg-transparent'
      }`}
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.95)'
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        <X className="w-8 h-8" />
      </button>

      {/* Title */}
      <div className={`absolute top-4 left-4 z-10 transition-all duration-500 transform ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: '100ms' }}>
        <h3 className="text-white text-xl font-semibold">{title}</h3>
        <p className="text-gray-300 text-sm">{currentIndex + 1} of {images.length}</p>
      </div>

      {/* Previous button */}
      <button
        onClick={goToPrevious}
        className={`absolute left-4 z-10 p-3 text-white hover:text-gray-300 transition-all duration-300 bg-black bg-opacity-50 rounded-full transform hover:scale-110 ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
        }`}
        style={{ transitionDelay: '300ms' }}
        disabled={images.length <= 1}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={goToNext}
        className={`absolute right-4 z-10 p-3 text-white hover:text-gray-300 transition-all duration-300 bg-black bg-opacity-50 rounded-full transform hover:scale-110 ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`}
        style={{ transitionDelay: '300ms' }}
        disabled={images.length <= 1}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main image */}
      <div 
        className="w-full h-full flex items-center justify-center p-16 cursor-pointer relative"
        onClick={togglePlayPause}
      >
        <div className={`relative transition-all duration-700 transform ${
          isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Fixed container for uniform image sizing */}
          <div 
            className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
            style={{
              width: 'min(800px, 90vw)',
              height: 'min(600px, 70vh)',
              aspectRatio: '4/3'
            }}
          >
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt}
              className="w-full h-full object-cover object-center"
              onLoad={() => setIsImageLoaded(true)}
              style={{
                filter: isImageLoaded ? 'brightness(1)' : 'brightness(0.7)',
                transition: 'filter 0.5s ease-in-out',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
        </div>

        {/* Centered Play/Pause Icon */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${
          showPlayPauseIcon ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <div className="bg-black bg-opacity-70 rounded-full p-6 backdrop-blur-sm">
            {isPaused ? (
              <Play className="w-12 h-12 text-white ml-1" />
            ) : (
              <Pause className="w-12 h-12 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Progress bar - smooth pause and resume without blinking */}
      {images.length > 1 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{
              width: `${progressWidth}%`,
              transition: 'none', // Remove CSS transitions to prevent blinking
            }}
          />
        </div>
      )}

      {/* Dots navigation */}
      <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 transition-all duration-500 ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: '400ms' }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentIndex
                ? 'bg-white scale-110 shadow-lg'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Background overlay - clicking closes modal */}
      <div
        className="absolute inset-0 -z-10"
        onClick={(e) => {
          // Only close if clicking the background, not the image area
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />
    </div>
  );
}

function GalleryItem({ image, alt, title, index, isVisible, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${200 + index * 150}ms` : '0ms',
        transitionProperty: 'opacity, transform'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-48 object-cover"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
            transition: 'transform 0.7s ease-in-out, filter 0.7s ease-in-out'
          }}
        />
      </div>
      
      {/* Info overlay with fade-slide animation */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">{title}</h3>
        <div 
          className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ 
            width: isHovered ? '40px' : '0',
            transition: 'width 0.5s ease-in-out'
          }}
        ></div>
      </div>
    </div>
  );
}

function Gallery() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    images: [],
    title: '',
    initialIndex: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px',
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

  // Sample images for each gallery item - using your local image paths
  const galleryData = {
    1: {
      title: "Hand Control System",
      images: [
        { src: "/images/Hand_Control_System/hcs1.jpg", alt: "Hand Control System - Main View" },
        { src: "/images/Hand_Control_System/hcs2.jpg", alt: "Hand Control System - Detail 1" },
        { src: "/images/Hand_Control_System/hcs3.jpg", alt: "Hand Control System - Detail 2" },
        { src: "/images/Hand_Control_System/hcs4.jpg", alt: "Hand Control System - Installation" },
        { src: "/images/Hand_Control_System/hcs5.png", alt: "Hand Control System - In Use" },
      ]
    },
    2: {
      title: "Auto Clutch System",
      images: [
        { src: "/images/Auto_Clutch_System/Auto Clutch System.png", alt: "Auto Clutch System - Main View" },
        { src: "/images/Auto_Clutch_System/Acs1.png", alt: "Auto Clutch System - Engine Bay" },
        { src: "/images/Auto_Clutch_System/Acs2.png", alt: "Auto Clutch System - Control Unit" },
        { src: "/images/Auto_Clutch_System/Acs3.png", alt: "Auto Clutch System - Mechanism" },
      ]
    },
    3: {
      title: "Bike with Side Wheels",
      images: [
        { src: "/images/Modified_bike_with_Side_Wheels/Modified bike with Side Wheels.jpg", alt: "Bike with Side Wheels - Main View" },
        { src: "/images/Modified_bike_with_Side_Wheels/sw1.png", alt: "Bike with Side Wheels - Side View" },
        { src: "/images/Modified_bike_with_Side_Wheels/sw2.png", alt: "Bike with Side Wheels - Wheel Detail" },
        { src: "/images/Modified_bike_with_Side_Wheels/sw3.png", alt: "Bike with Side Wheels - Rider View" },
      ]
    },
    4: {
      title: "Modified bike with Side Car",
      images: [
        { src: "/images/Modified_bike_with_Side_Car/Modified bike with Side Car.jpg", alt: "Modified bike with Side Car - Main View" },
        { src: "/images/Modified_bike_with_Side_Car/sc1.png", alt: "Side Car - Interior" },
        { src: "/images/Modified_bike_with_Side_Car/sc2.png", alt: "Side Car - Connection Point" },
      ]
    }
  };

  const galleryItems = [
    {
      id: 1,
      image: "/images/Hand_Control_System/hand_control_system.jpg",
      alt: "Modified car with hand controls",
      title: "Hand Control System"
    },
    {
      id: 2,
      image: "/images/Auto_Clutch_System/Auto Clutch System.png",
      alt: "Auto Clutch",
      title: "Auto Clutch System"
    },
    {
      id: 3,
      image: "/images/Modified_bike_with_Side_Wheels/Modified bike with Side Wheels.jpg",
      alt: "Modified bike with Side Wheels",
      title: "Bike with Side Wheels"
    },
    {
      id: 4,
      image: "/images/Modified_bike_with_Side_Car/Modified bike with Side Car.jpg",
      alt: "Modified bike with Side Car",
      title: "Modified bike with Side Car"
    }
  ];

  const openModal = (itemId, title) => {
    const data = galleryData[itemId];
    if (data) {
      setModalState({
        isOpen: true,
        images: data.images,
        title: data.title,
        initialIndex: 0
      });
    }
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return (
    <>
      <section 
        id="gallery" 
        ref={sectionRef}
        className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-3">
              Explore Our Work
            </span>
            
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Mobility</span> Projects
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              See how our customized solutions have transformed lives through innovative vehicle adaptations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryItems.map((item, index) => (
              <GalleryItem 
                key={item.id}
                image={item.image}
                alt={item.alt}
                title={item.title}
                index={index}
                isVisible={isVisible}
                onClick={() => openModal(item.id, item.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        images={modalState.images}
        title={modalState.title}
        initialIndex={modalState.initialIndex}
      />
    </>
  );
}

export default Gallery;