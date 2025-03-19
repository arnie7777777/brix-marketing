'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BrixCharacterProps {
  colors: string[];
  action: 'walking' | 'lightbulb' | 'milk';
  delay: number;
}

const BrixCharacter: React.FC<BrixCharacterProps> = ({ colors, action, delay }) => {
  // Base block size
  const blockSize = 20;
  
  // Animation variants for different actions
  const characterVariants = {
    walking: {
      initial: { x: -50 },
      animate: { 
        x: 50,
        transition: { 
          repeat: Infinity, 
          repeatType: "mirror", 
          duration: 10,
          delay 
        }
      }
    },
    lightbulb: {
      initial: { y: 0 },
      animate: { 
        y: [0, -10, 0],
        transition: { 
          repeat: Infinity, 
          duration: 4,
          delay,
          times: [0, 0.5, 1]
        }
      }
    },
    milk: {
      initial: { rotate: 0 },
      animate: { 
        rotate: [0, -10, 0, 10, 0],
        transition: { 
          repeat: Infinity, 
          duration: 6,
          delay,
          times: [0, 0.25, 0.5, 0.75, 1]
        }
      }
    }
  };

  // Animations for character parts
  const bodyVariants = {
    walking: {
      initial: {},
      animate: {
        y: [0, -5, 0],
        transition: {
          repeat: Infinity,
          duration: 0.5,
          delay
        }
      }
    },
    lightbulb: {
      initial: { opacity: 1 },
      animate: {}
    },
    milk: {
      initial: {},
      animate: {}
    }
  };

  // Function to render action-specific elements
  const renderActionElements = () => {
    switch (action) {
      case 'lightbulb':
        return (
          <motion.div 
            className="absolute -top-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0.5, 1.2, 0.5],
              y: [0, -15, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              delay: delay + 1,
              times: [0, 0.5, 1]
            }}
          >
            <div className="w-10 h-10 bg-yellow-300 rounded-full filter blur-sm"></div>
            <div className="w-6 h-6 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </motion.div>
        );
      case 'milk':
        return (
          <motion.div 
            className="absolute -right-12 top-3"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: delay + 0.5,
              times: [0, 0.5, 1]
            }}
          >
            <div className="w-8 h-12 bg-white rounded-md"></div>
            <div className="w-4 h-2 bg-gray-200 absolute -top-2 left-1/2 transform -translate-x-1/2 rounded-t-md"></div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="relative"
      variants={characterVariants[action]}
      initial="initial"
      animate="animate"
      style={{ width: blockSize * 5, height: blockSize * 7 }}
    >
      {/* Character body */}
      <motion.div 
        className="relative" 
        variants={bodyVariants[action]}
        initial="initial"
        animate="animate"
      >
        {/* Head */}
        <div className="absolute" style={{ width: blockSize * 3, height: blockSize * 3, top: 0, left: blockSize }}>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: 0, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: 0, left: blockSize }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: 0, left: blockSize * 2 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[2], position: 'absolute', top: blockSize, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: blockSize, left: blockSize }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[2], position: 'absolute', top: blockSize, left: blockSize * 2 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: blockSize * 2, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[2], position: 'absolute', top: blockSize * 2, left: blockSize }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: blockSize * 2, left: blockSize * 2 }}></div>
          
          {/* Eyes */}
          <motion.div 
            style={{ width: blockSize/2, height: blockSize/2, backgroundColor: '#fff', position: 'absolute', top: blockSize/2, left: blockSize/2, borderRadius: '50%' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3, delay }}
          ></motion.div>
          <motion.div 
            style={{ width: blockSize/2, height: blockSize/2, backgroundColor: '#fff', position: 'absolute', top: blockSize/2, right: blockSize/2, borderRadius: '50%' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3, delay: delay + 0.2 }}
          ></motion.div>
          
          {/* Mouth */}
          <motion.div 
            style={{ 
              width: blockSize, 
              height: blockSize/4, 
              backgroundColor: '#fff', 
              position: 'absolute', 
              bottom: blockSize/2, 
              left: '50%', 
              transform: 'translateX(-50%)',
              borderRadius: blockSize/4
            }}
            animate={{ 
              width: action === 'milk' ? [blockSize, blockSize * 1.5, blockSize] : blockSize,
              height: action === 'lightbulb' ? [blockSize/4, blockSize/2, blockSize/4] : blockSize/4
            }}
            transition={{ repeat: Infinity, duration: 2, delay: delay + 0.5 }}
          ></motion.div>
        </div>
        
        {/* Body */}
        <div className="absolute" style={{ width: blockSize * 3, height: blockSize * 2, top: blockSize * 3, left: blockSize }}>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: 0, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: 0, left: blockSize }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: 0, left: blockSize * 2 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[2], position: 'absolute', top: blockSize, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: blockSize, left: blockSize }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[2], position: 'absolute', top: blockSize, left: blockSize * 2 }}></div>
        </div>
        
        {/* Arms */}
        <motion.div 
          className="absolute" 
          style={{ width: blockSize, height: blockSize * 2, top: blockSize * 3, left: 0 }}
          animate={{ 
            rotate: action === 'milk' ? [0, -20, 0] : [0, 20, 0, -20, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: action === 'milk' ? 2 : 1, 
            delay: delay + 0.2
          }}
        >
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[2], position: 'absolute', top: 0, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: blockSize, left: 0 }}></div>
        </motion.div>
        
        <motion.div 
          className="absolute" 
          style={{ width: blockSize, height: blockSize * 2, top: blockSize * 3, right: 0 }}
          animate={{ 
            rotate: action === 'lightbulb' ? [0, 30, 0] : [0, -20, 0, 20, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: action === 'lightbulb' ? 2 : 1, 
            delay: delay + 0.3
          }}
        >
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[2], position: 'absolute', top: 0, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: blockSize, left: 0 }}></div>
        </motion.div>
        
        {/* Legs */}
        <motion.div 
          className="absolute" 
          style={{ width: blockSize, height: blockSize * 2, bottom: 0, left: blockSize }}
          animate={{ 
            rotate: action === 'walking' ? [0, -15, 0, 15, 0] : 0
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1, 
            delay
          }}
        >
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: 0, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: blockSize, left: 0 }}></div>
        </motion.div>
        
        <motion.div 
          className="absolute" 
          style={{ width: blockSize, height: blockSize * 2, bottom: 0, left: blockSize * 3 }}
          animate={{ 
            rotate: action === 'walking' ? [0, 15, 0, -15, 0] : 0
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1, 
            delay: delay + 0.5
          }}
        >
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: 0, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: blockSize, left: 0 }}></div>
        </motion.div>
      </motion.div>

      {/* Action-specific elements */}
      {renderActionElements()}
    </motion.div>
  );
};

export default BrixCharacter; 