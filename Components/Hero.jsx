import React from 'react';
import { ArrowRight, Car, Bike } from 'lucide-react';

function Hero() {
  return (
    <section id="hero" className="relative bg-slate-900 dark:bg-slate-900 bg-white dark:text-white text-slate-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500 opacity-10 dark:opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-600 opacity-10 dark:opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 space-y-6 text-center lg:text-left"
            style={{
              animation: 'fadeInLeft 0.8s ease-out forwards',
              opacity: 0,
            }}>
            <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-2"
              style={{
                animation: 'fadeInDown 0.6s ease-out forwards 0.2s',
                opacity: 0,
              }}>
              Accessible Transportation Solutions
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              style={{
                animation: 'fadeInUp 0.8s ease-out forwards 0.3s',
                opacity: 0,
              }}>
              Freedom to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Move</span> Without Limits
            </h1>

            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0"
              style={{
                animation: 'fadeInUp 0.8s ease-out forwards 0.5s',
                opacity: 0,
              }}>
              We transform vehicles into personalized mobility solutions, empowering individuals with disabilities to experience independence on the road.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{
                animation: 'fadeInUp 0.8s ease-out forwards 0.7s',
                opacity: 0,
              }}>
              <a
                href="#services"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 group"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-slate-500 hover:border-slate-700 hover:bg-slate-100 text-slate-800 dark:border-white/30 dark:hover:border-white/70 dark:hover:bg-white/10 dark:text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Get a Custom Quote
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-4 text-sm text-slate-600 dark:text-slate-400"
              style={{
                animation: 'fadeInUp 0.8s ease-out forwards 0.9s',
                opacity: 0,
              }}>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-500 dark:text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span>5K+ satisfied clients</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600"></div>
              <div>Certified specialists</div>
            </div>
          </div>

          {/* Visual element */}
          <div className="flex-1 relative"
            style={{
              animation: 'fadeInRight 0.8s ease-out forwards 0.4s',
              opacity: 0,
            }}>
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-600/20 dark:to-purple-600/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 flex flex-col items-center text-center backdrop-blur-sm"
                  style={{
                    animation: 'fadeInUp 0.6s ease-out forwards 0.8s',
                    opacity: 0,
                  }}>
                  <Car className="w-8 h-8 mb-2 text-blue-500 dark:text-blue-400" aria-hidden="true" />
                  <h3 className="font-medium">Car Modifications</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Custom steering, braking & access solutions</p>
                </div>
                <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 flex flex-col items-center text-center backdrop-blur-sm"
                  style={{
                    animation: 'fadeInUp 0.6s ease-out forwards 1s',
                    opacity: 0,
                  }}>
                  <Bike className="w-8 h-8 mb-2 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-medium">Adapted Bikes</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Specialized bikes for all mobility needs</p>
                </div>
                <div className="col-span-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/20 dark:to-purple-600/20 rounded-lg p-4 flex items-center justify-center backdrop-blur-sm"
                  style={{
                    animation: 'fadeInUp 0.6s ease-out forwards 1.2s',
                    opacity: 0,
                  }}>
                  <p className="text-center font-medium">
                    "Their modifications changed my life. I can now drive independently again." <br />
                    <span className="text-sm text-slate-600 dark:text-slate-300 block mt-1">— Michael R., Customer</span>
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 opacity-70 dark:opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-purple-600 opacity-70 dark:opacity-80"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
      `}</style>
    </section>
  );
}

export default Hero;