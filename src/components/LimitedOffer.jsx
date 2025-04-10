import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaClock, FaGem } from 'react-icons/fa';

export default function FramerMotionStarburstBadge() {
  const [isVisible, setIsVisible] = useState(true); // Changed to true so it's always visible
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Only handle expansion animation
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 1500);
    
    return () => {
      clearTimeout(expandTimer);
    };
  }, []);

  const outerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    },
    expanded: {
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const counterRotateVariants = {
    animate: {
      rotate: -360,
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const iconVariants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const floatingParticleVariants = {
    animate1: {
      x: [0, 5, 0, -5, 0],
      y: [0, -5, -8, -5, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity
      }
    },
    animate2: {
      x: [0, -7, 0, 7, 0],
      y: [0, 7, 10, 7, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity
      }
    },
    animate3: {
      x: [0, 7, 10, 7, 0],
      y: [0, -7, 0, 7, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <motion.div 
      className="fixed xl:top-26 lg:top-56 md:top-66 right-6 z-50 cursor-pointer"
      initial="visible" // Changed from "hidden" to "visible"
      animate={isExpanded ? "expanded" : "visible"} // Simplified logic
      variants={outerVariants}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: isExpanded ? 1.15 : 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        {/* Background glow effect */}
        <motion.div 
          className="absolute inset-0 blur-md bg-red-500 rounded-full opacity-20"
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
        
        {/* Outer rotating layer */}
        <motion.div 
          className="absolute inset-0"
          variants={rotateVariants}
          animate="animate"
        >
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full drop-shadow-lg"
          >
            <defs>
              <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Sharp jagged starburst */}
            <path
              d="M100,0 L110,35 L130,10 L125,45 L150,25 L135,55 L170,45 L145,70 L180,70 L145,85 L175,100 L140,105 L165,130 L130,120 L140,155 L110,130 L100,170 L90,130 L60,155 L70,120 L35,130 L60,105 L25,100 L55,85 L20,70 L55,70 L30,45 L65,55 L50,25 L75,45 L70,10 L90,35 Z"
              fill="url(#outerGradient)"
              filter="url(#glow)"
              className="drop-shadow-md"
            />
          </svg>
        </motion.div>
        
        {/* Middle layer - opposite direction */}
        <motion.div 
          className="absolute inset-0"
          variants={counterRotateVariants}
          animate="animate"
        >
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="middleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
            
            {/* Geometric middle layer with triangular points */}
            <path
              d="M100,20 L112,45 L130,30 L125,55 L145,45 L132,65 L155,65 L135,80 L155,95 L132,100 L145,120 L125,115 L130,140 L112,125 L100,145 L88,125 L70,140 L75,115 L55,120 L68,100 L45,95 L65,80 L45,65 L68,65 L55,45 L75,55 L70,30 L88,45 Z"
              fill="url(#middleGradient)"
              className="drop-shadow-lg"
            />
          </svg>
        </motion.div>
        
        {/* Inner pulsing circle */}
        <motion.div
          className="relative"
          variants={pulseVariants}
          animate="animate"
        >
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full"
          >
            <defs>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="70%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </radialGradient>
              <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            <circle 
              cx="100" 
              cy="100" 
              r="60" 
              fill="url(#centerGradient)" 
              filter="url(#innerGlow)"
              className="drop-shadow-md"
            />
            
            {/* Subtle highlight for depth */}
            <ellipse 
              cx="85" 
              cy="85" 
              rx="30" 
              ry="20" 
              fill="rgba(255,255,255,0.15)" 
            />
          </svg>
          
          {/* Text content with icons */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center justify-center mb-1">
              <motion.div variants={iconVariants} animate="animate">
                <FaGem className="text-yellow-400 text-xs md:text-sm mr-1" />
              </motion.div>
            </div>
            
            <div className="text-yellow-400 font-black text-lg md:text-xl tracking-wider leading-none drop-shadow-md">SPECIAL</div>
            <div className="text-yellow-400 font-bold text-lg md:text-xl tracking-wider leading-none drop-shadow-md mb-1">OFFER</div>
            
            <div className="flex items-center justify-center">
              <motion.div variants={iconVariants} animate="animate" style={{ animationDelay: '0.5s' }}>
                <FaClock className="text-yellow-400 text-xs mr-1" />
              </motion.div>
              <div className="text-yellow-300 text-xs font-medium tracking-widest opacity-80">LIMITED TIME</div>
            </div>
            
            <motion.div 
              className="mt-1 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <FaFire className="text-yellow-300 text-xs" />
              <FaFire className="text-yellow-300 text-xs mx-1" />
              <FaFire className="text-yellow-300 text-xs" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Floating particles */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-200 rounded-full"
          variants={floatingParticleVariants}
          animate="animate1"
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-red-100 rounded-full"
          variants={floatingParticleVariants}
          animate="animate2"
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-200 rounded-full"
          variants={floatingParticleVariants}
          animate="animate3"
        />
      </div>
    </motion.div>
  );
}