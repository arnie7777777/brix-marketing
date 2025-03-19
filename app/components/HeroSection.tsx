'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BrixCharacter from './BrixCharacter';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect for background elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Characters with different props
  const brixCharacters = [
    {
      id: 1,
      position: { x: '25%', y: '28%' },
      colors: ['#3490dc', '#6cb2eb', '#2779bd'],
      action: 'walking' as const,
      delay: 0,
      rotation: Math.PI / 4,
    },
    {
      id: 2,
      position: { x: '50%', y: '25%' },
      colors: ['#ffed4a', '#fff382', '#e3d160'],
      action: 'lightbulb' as const,
      delay: 0.5,
      rotation: 0,
    },
    {
      id: 3,
      position: { x: '75%', y: '28%' },
      colors: ['#f56565', '#fc8181', '#e53e3e'],
      action: 'milk' as const,
      delay: 1,
      rotation: -Math.PI / 4,
    },
  ];
  
  // Controls for interactive elements
  const [activeCharacterIndex, setActiveCharacterIndex] = useState<number | null>(null);

  const handleSceneClick = (index: number) => {
    setActiveCharacterIndex(index === activeCharacterIndex ? null : index);
  };

  return (
    <section 
      ref={sectionRef} 
      className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-dark to-black"
    >
      {/* Animated background elements with parallax */}
      <motion.div className="absolute inset-0 opacity-30" style={{ y: bgY1, opacity: opacityFade }}>
        <motion.div
          className="absolute w-64 h-64 bg-primary/20 rounded-full filter blur-3xl top-1/4 left-1/3 animate-float"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl bottom-1/4 right-1/3 animate-float animation-delay-2000"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-accent/20 rounded-full filter blur-3xl top-1/2 right-1/4 animate-float animation-delay-4000"
          animate={{ 
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.35, 0.25]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 9,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </motion.div>

      {/* Futuristic grid effect with parallax */}
      <motion.div className="absolute inset-0 grid grid-cols-12 opacity-10" style={{ y: bgY2 }}>
        {Array(12).fill(0).map((_, i) => (
          <div key={`col-${i}`} className="h-full border-r border-primary/30"></div>
        ))}
      </motion.div>
      <motion.div className="absolute inset-0 grid grid-rows-12 opacity-10" style={{ y: bgY3 }}>
        {Array(12).fill(0).map((_, i) => (
          <div key={`row-${i}`} className="w-full border-b border-primary/30"></div>
        ))}
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Building Your Brand <br /> Block by Block
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Creative marketing solutions constructed with precision and imagination, 
            just like our friendly Brix characters.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white font-medium text-lg hover:shadow-lg transition-all"
            >
              Get Started
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-full bg-dark border-2 border-primary text-white font-medium text-lg hover:bg-primary/20 transition-all"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* 3D Character Space */}
      <div className="absolute inset-0 top-[40%] z-20">
        <div className="relative w-full h-full">
          {/* Characters Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute w-full h-full pointer-events-none">
              {/* Character interaction hints */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: 2,
                  repeatDelay: 5
                }}
                className="absolute top-[10%] left-1/2 transform -translate-x-1/2 bg-dark/80 text-primary px-4 py-2 rounded-full text-sm font-medium z-50"
              >
                Click on a character to interact
              </motion.div>
            </div>
            
            {/* Individual Character Containers */}
            {brixCharacters.map((brix, index) => (
              <div 
                key={brix.id} 
                className={`absolute w-[33.33%] h-full cursor-pointer transition-transform duration-300 ${
                  activeCharacterIndex === index ? 'scale-110 z-30' : activeCharacterIndex !== null ? 'opacity-70' : ''
                }`}
                style={{ 
                  left: `calc(${index * 33.33}%)`,
                }}
                onClick={() => handleSceneClick(index)}
              >
                <div className="w-full h-full px-4 relative">
                  <div className="w-full h-full relative pointer-events-auto">
                    <BrixCharacter 
                      colors={brix.colors}
                      action={
                        activeCharacterIndex === index 
                          ? (brix.action === 'walking' ? 'jumping' : brix.action === 'lightbulb' ? 'lightbulb' : 'waving') 
                          : brix.action
                      }
                      delay={brix.delay}
                      rotation={brix.rotation}
                      is3D={true}
                    />
                  </div>
                  
                  {/* Character name tag */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-[10%] bg-dark/80 px-4 py-1 rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                  >
                    <span className="text-white font-medium">
                      {index === 0 ? 'Walker' : index === 1 ? 'Thinker' : 'Milky'}
                    </span>
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 