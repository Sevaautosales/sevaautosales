import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Send, Mail, User, Car, Settings, MessageSquare, Phone } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    modificationType: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const [visibleElements, setVisibleElements] = useState(new Set());
  
  // Refs for elements to animate
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    emailjs
      .send(
        "service_nn3qw9n",
        "template_r95yuxd",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicleType: formData.vehicleType,
          modificationType: formData.modificationType,
          message: formData.message,
        },
        "S_CjYULWPPtvfxH64"
      )
      .then(() => {
        setFormStatus({
          submitted: true,
          error: false,
          message:
            "Thank you! Your message has been received. We will contact you shortly.",
        });
  
        setFormData({
          name: "",
          email: "",
          phone: "",
          vehicleType: "",
          modificationType: "",
          message: "",
        });
  
        setTimeout(() => {
          setFormStatus({
            submitted: false,
            error: false,
            message: "",
          });
        }, 10000); // clear message after 10 seconds
      })
      .catch(() => {
        setFormStatus({
          submitted: true,
          error: true,
          message:
            "Oops! There was a problem sending your message. Please try again later.",
        });
  
        setTimeout(() => {
          setFormStatus({
            submitted: false,
            error: false,
            message: "",
          });
        }, 10000); // clear error after 10 seconds
      });
  };

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.animate]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elementsToObserve = [headerRef.current, formRef.current];
    elementsToObserve.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Observe status message when it appears
  useEffect(() => {
    if (formStatus.submitted && statusRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleElements(prev => new Set([...prev, 'status']));
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(statusRef.current);
      return () => observer.disconnect();
    }
  }, [formStatus.submitted]);

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500 opacity-5 blur-3xl"></div>
        <div className="absolute bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-600 opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={headerRef}
          data-animate="header"
          className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-700 ease-out ${
            visibleElements.has('header')
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform -translate-y-8'
          }`}
        >
          <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Our Team
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Have questions or ready to discuss your vehicle modification needs?
            Fill out the form below, and our team will contact you shortly.
          </p>
        </div>

        <div
          ref={formRef}
          data-animate="form"
          className={`max-w-3xl mx-auto transition-all duration-700 ease-out delay-200 ${
            visibleElements.has('form')
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform translate-y-8'
          }`}
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
            {/* Top gradient accent */}
            <div className="min-h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"></div>

            <div className="p-8">
              {formStatus.submitted && (
                <div
                  ref={statusRef}
                  data-animate="status"
                  className={`mb-8 p-5 rounded-lg transition-all duration-500 ease-out ${
                    visibleElements.has('status')
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-0 transform -translate-y-4'
                  } ${
                    formStatus.error
                      ? "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500"
                      : "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        formStatus.error
                          ? "bg-red-100 dark:bg-red-800 text-red-500"
                          : "bg-green-100 dark:bg-green-800 text-green-500"
                      }`}
                    >
                      {formStatus.error ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <div className="ml-4">
                      <h4
                        className={`text-lg font-medium ${
                          formStatus.error
                            ? "text-red-700 dark:text-red-400"
                            : "text-green-700 dark:text-green-400"
                        }`}
                      >
                        {formStatus.error ? "Submission Failed" : "Success!"}
                      </h4>
                      <p
                        className={`text-sm ${
                          formStatus.error
                            ? "text-red-600 dark:text-red-300"
                            : "text-green-600 dark:text-green-300"
                        }`}
                      >
                        {formStatus.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-300 ${
                        formData.name
                          ? "text-blue-500 dark:text-blue-400 scale-110"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-blue-400"
                      }`}
                    >
                      <User size={18} />
                    </div>

                    <div className="w-full relative">
                      <label htmlFor="name" className="sr-only">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-0 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                        required
                        aria-required="true"
                      />

                      <div
                        className={`absolute bottom-1 left-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded transition-all duration-500 ease-out`}
                        style={{
                          width: formData.name ? "calc(100% - 1rem)" : "0px",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-300 ${
                        formData.email
                          ? "text-blue-500 dark:text-blue-400 scale-110"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-blue-400"
                      }`}
                    >
                      <Mail size={18} aria-hidden="true" />
                    </div>
                    <label htmlFor="email" className="sr-only">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-0 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                      required
                      aria-required="true"
                    />
                    <div
                      className={`absolute bottom-1 left-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded transition-all duration-500 ease-out`}
                      style={{
                        width: formData.email ? "calc(100% - 1rem)" : "0px",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-300 ${
                        formData.phone
                          ? "text-blue-500 dark:text-blue-400 scale-110"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-blue-400"
                      }`}
                    >
                      <Phone size={18} aria-hidden="true" />
                    </div>
                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-0 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                    />
                    <div
                      className={`absolute bottom-1 left-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded transition-all duration-500 ease-out`}
                      style={{
                        width: formData.phone ? "calc(100% - 1rem)" : "0px",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-300 ${
                        formData.vehicleType
                          ? "text-blue-500 dark:text-blue-400 scale-110"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-blue-400"
                      }`}
                    >
                      <Car size={18} aria-hidden="true" />
                    </div>
                    <label htmlFor="vehicleType" className="sr-only">Vehicle Type</label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white appearance-none border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-0 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                      required
                      aria-required="true"
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="Car">Car</option>
                      <option value="Bike">Bike</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-400 pointer-events-none transition-all duration-300 group-hover:text-blue-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                    <div
                      className={`absolute bottom-1 left-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded transition-all duration-500 ease-out`}
                      style={{
                        width: formData.vehicleType ? "calc(100% - 1rem)" : "0px",
                      }}
                    ></div>
                  </div>

                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-300 ${
                        formData.modificationType
                          ? "text-blue-500 dark:text-blue-400 scale-110"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-blue-400"
                      }`}
                    >
                      <Settings size={18} aria-hidden="true" />
                    </div>
                    <label htmlFor="modificationType" className="sr-only">Modification Type</label>
                    <select
                      id="modificationType"
                      name="modificationType"
                      value={formData.modificationType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white appearance-none border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-0 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                    >
                      <option value="">Select Modification Type</option>
                      <option value="Hand Controls">Hand Controls</option>
                      <option value="Auto Clutch">Auto Clutch</option>
                      <option value="Side Wheels">Side Wheels</option>
                      <option value="Side Car">Side Car</option>
                      <option value="Custom Solution">Custom Solution</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-400 pointer-events-none transition-all duration-300 group-hover:text-blue-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                    <div
                      className={`absolute bottom-1 left-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded transition-all duration-500 ease-out`}
                      style={{
                        width: formData.modificationType ? "calc(100% - 1rem)" : "0px",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="relative mb-8 group">
                  <div
                    className={`absolute left-3 top-[1.1rem] z-10 transition-all duration-300 ${
                      formData.message
                        ? "text-blue-500 dark:text-blue-400 scale-110"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-blue-400"
                    }`}
                  >
                    <MessageSquare size={18} aria-hidden="true" />
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your needs in detail..."
                      rows="5"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white resize-none border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-0 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                      required
                      aria-required="true"
                    ></textarea>

                    <div className="pointer-events-none absolute left-0 bottom-[0.75rem] w-full h-0.5 px-2">
                      <div
                        className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-in-out rounded-full"
                        style={{
                          width: formData.message ? "100%" : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 group hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    Send Message
                    <Send
                      size={16}
                      className="group-hover:translate-x-1 group-hover:translate-y-[-1px] transition-transform duration-300"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;