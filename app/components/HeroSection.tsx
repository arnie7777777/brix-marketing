'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BrixCharacter from './BrixCharacter';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Characters with different props
  const brixCharacters = [
    {
      id: 1,
      position: { x: '10%', y: '60%' },
      colors: ['#3490dc', '#6cb2eb', '#2779bd'],
      action: 'walking',
      delay: 0,
    },
    {
      id: 2,
      position: { x: '50%', y: '50%' },
      colors: ['#ffed4a', '#fff382', '#e3d160'],
      action: 'lightbulb',
      delay: 0.5,
    },
    {
      id: 3,
      position: { x: '80%', y: '65%' },
      colors: ['#f56565', '#fc8181', '#e53e3e'],
      action: 'milk',
      delay: 1,
    },
  ];

  return (
    <section ref={sectionRef} className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-dark to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-64 h-64 bg-primary/20 rounded-full filter blur-3xl top-1/4 left-1/3 animate-float"></div>
        <div className="absolute w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl bottom-1/4 right-1/3 animate-float animation-delay-2000"></div>
        <div className="absolute w-72 h-72 bg-accent/20 rounded-full filter blur-3xl top-1/2 right-1/4 animate-float animation-delay-4000"></div>
      </div>

      {/* Grid lines for futuristic effect */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-10">
        {Array(12).fill(0).map((_, i) => (
          <div key={`col-${i}`} className="h-full border-r border-primary/30"></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-12 opacity-10">
        {Array(12).fill(0).map((_, i) => (
          <div key={`row-${i}`} className="w-full border-b border-primary/30"></div>
        ))}
      </div>

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

      {/* Brix characters */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {brixCharacters.map((brix) => (
          <div 
            key={brix.id} 
            style={{ 
              position: 'absolute', 
              left: brix.position.x, 
              bottom: brix.position.y,
              transform: 'translate(-50%, 0)'
            }}
          >
            <BrixCharacter 
              colors={brix.colors}
              action={brix.action}
              delay={brix.delay}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection; 