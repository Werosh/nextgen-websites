import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHardHat, FaTools, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PageUnderConstruction = () => {
  useEffect(() => {
    // Set page title
    document.title = "Page Under Construction";
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const iconVariants = {
    initial: { rotate: -10 },
    animate: { 
      rotate: [0, 15, 0, 15, 0],
      transition: { 
        repeat: Infinity,
        repeatType: "mirror",
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-md w-full">
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="relative">
            <motion.div 
              variants={iconVariants}
              initial="initial"
              animate="animate"
              className="text-yellow-500 text-6xl"
            >
              <FaHardHat />
            </motion.div>
            <motion.div 
              className="absolute -right-4 -bottom-4 text-gray-700 text-3xl"
              initial={{ rotate: 0 }}
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaTools />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4"
        >
          Page Under Construction
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-gray-600 text-center mb-8"
        >
          Oops! The page you're looking for is still under development. 
          We're working hard to bring you something amazing. Please check back soon!
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex justify-center">
          <Link to="/">
            <motion.button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageUnderConstruction;