import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phoneNumber = '919904366000'; // Seva Auto Sales Number
  const message = 'Hello Seva Auto Sales, I am interested in your vehicle modification services. Can you provide more information?';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-200/50 hover:bg-[#20ba59] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 transition-colors duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat with Seva Auto Sales on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={32} className="group-hover:animate-pulse" />
        
        {/* Tooltip/Label */}
        <span className="absolute right-16 rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap hidden md:block">
          Chat with us
        </span>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton;
