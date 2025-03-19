'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';

interface BrixCharacterProps {
  colors: string[];
  action: 'walking' | 'lightbulb' | 'milk' | 'jumping' | 'waving';
  delay: number;
  position?: { x: string; y: string };
  rotation?: number;
  is3D?: boolean;
}

// 3D Brix Character Component
const BrixCharacter3D = ({ colors, action, delay }: Omit<BrixCharacterProps, 'position' | 'rotation' | 'is3D'>) => {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clockRef = useRef(new THREE.Clock());
  
  // Animation state
  const [animationState, setAnimationState] = useState({
    headRotation: 0,
    armRotation: 0,
    legRotation: 0,
    bodyPosition: 0
  });

  // Create color materials from the colors array
  const materials = {
    primary: new THREE.MeshStandardMaterial({ color: colors[0], roughness: 0.3, metalness: 0.2 }),
    secondary: new THREE.MeshStandardMaterial({ color: colors[1], roughness: 0.3, metalness: 0.2 }),
    accent: new THREE.MeshStandardMaterial({ color: colors[2], roughness: 0.3, metalness: 0.2 }),
    skin: new THREE.MeshStandardMaterial({ color: "#f8d9b4", roughness: 0.3, metalness: 0 }),
    eyes: new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.1, metalness: 0.1 }),
    pupil: new THREE.MeshStandardMaterial({ color: "#333333", roughness: 0.1, metalness: 0 })
  };

  // Use frame for animation
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Basic animation logic based on action type
    const time = state.clock.getElapsedTime() + delay;
    
    // Head animation
    groupRef.current.children[0].rotation.y = Math.sin(time * 0.5) * 0.2;
    
    // Body animation
    groupRef.current.position.y = Math.sin(time * 2) * 0.05;
    
    // Arms animation
    const arms = [groupRef.current.children[1], groupRef.current.children[2]];
    
    if (action === 'walking' || action === 'jumping') {
      // Walking animation
      arms[0].rotation.x = Math.sin(time * 2) * 0.4;
      arms[1].rotation.x = Math.sin(time * 2 + Math.PI) * 0.4;
      
      // Legs animation
      const legs = [groupRef.current.children[3], groupRef.current.children[4]];
      legs[0].rotation.x = Math.sin(time * 2) * 0.6;
      legs[1].rotation.x = Math.sin(time * 2 + Math.PI) * 0.6;
      
      if (action === 'jumping') {
        // Add jumping motion
        groupRef.current.position.y += Math.abs(Math.sin(time * 1.5)) * 0.3;
      }
    } else if (action === 'waving') {
      // Waving animation
      arms[0].rotation.x = 0;
      arms[0].rotation.z = Math.sin(time * 5) * 0.5 - 0.5;
      arms[1].rotation.x = 0;
    } else if (action === 'lightbulb') {
      // Thinking with lightbulb animation
      arms[0].rotation.x = 0.5;
      arms[0].rotation.z = -0.5;
      arms[1].rotation.x = 0;
      arms[1].rotation.z = 0;
      
      // Scratch head occasionally
      if (Math.sin(time * 0.5) > 0.7) {
        arms[0].rotation.x = 1.2;
        arms[0].rotation.z = -0.8;
      }
    } else if (action === 'milk') {
      // Drinking milk animation
      arms[0].rotation.x = 0;
      arms[0].rotation.z = 0;
      arms[1].rotation.x = 1;
      arms[1].rotation.z = 0;
      
      // Occasional drinking motion
      if (Math.sin(time * 0.5) > 0.6) {
        arms[1].rotation.x = 1.3;
        groupRef.current.children[0].rotation.x = 0.2; // Tilt head back
      } else {
        groupRef.current.children[0].rotation.x = 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <group position={[0, 1.5, 0]}>
        <mesh material={materials.primary} position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
        </mesh>
        {/* Eyes */}
        <mesh material={materials.eyes} position={[0.25, 0.1, 0.41]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <mesh material={materials.pupil} position={[0, 0, 0.08]}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>
        </mesh>
        <mesh material={materials.eyes} position={[-0.25, 0.1, 0.41]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <mesh material={materials.pupil} position={[0, 0, 0.08]}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>
        </mesh>
        {/* Mouth */}
        <mesh material={materials.secondary} position={[0, -0.15, 0.41]} scale={[0.4, 0.1, 0.1]}>
          <boxGeometry args={[1, 1, 0.1]} />
        </mesh>
      </group>

      {/* Left Arm */}
      <group position={[-0.6, 0.9, 0]} rotation={[0, 0, -0.2]}>
        <mesh material={materials.secondary} position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
        </mesh>
        <mesh material={materials.accent} position={[0, -0.5, 0]}>
          <boxGeometry args={[0.25, 0.5, 0.25]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.6, 0.9, 0]} rotation={[0, 0, 0.2]}>
        <mesh material={materials.secondary} position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
        </mesh>
        <mesh material={materials.accent} position={[0, -0.5, 0]}>
          <boxGeometry args={[0.25, 0.5, 0.25]} />
        </mesh>
        {action === 'milk' && (
          <group position={[0, -0.8, 0.2]} rotation={[0.3, 0, 0]}>
            <mesh material={new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.1, transparent: true, opacity: 0.8 })}>
              <cylinderGeometry args={[0.15, 0.12, 0.4, 12]} />
            </mesh>
          </group>
        )}
        {action === 'lightbulb' && (
          <group position={[0, -1.2, 0.5]} rotation={[0, 0, 0]}>
            <mesh material={new THREE.MeshStandardMaterial({ color: "#ffff00", roughness: 0.1, emissive: "#ffff00", emissiveIntensity: 0.5 })}>
              <sphereGeometry args={[0.2, 16, 16]} />
            </mesh>
          </group>
        )}
      </group>

      {/* Body */}
      <mesh material={materials.primary} position={[0, 0.9, 0]}>
        <boxGeometry args={[0.7, 0.8, 0.4]} />
      </mesh>
      <mesh material={materials.secondary} position={[0, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.45]} />
      </mesh>

      {/* Left Leg */}
      <group position={[-0.25, -0.4, 0]} rotation={[0, 0, 0]}>
        <mesh material={materials.accent} position={[0, 0, 0]}>
          <boxGeometry args={[0.25, 0.5, 0.25]} />
        </mesh>
        <mesh material={materials.primary} position={[0, -0.5, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.3]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.25, -0.4, 0]} rotation={[0, 0, 0]}>
        <mesh material={materials.accent} position={[0, 0, 0]}>
          <boxGeometry args={[0.25, 0.5, 0.25]} />
        </mesh>
        <mesh material={materials.primary} position={[0, -0.5, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.3]} />
        </mesh>
      </group>
    </group>
  );
};

// Main BrixCharacter component that decides between 2D and 3D rendering
const BrixCharacter: React.FC<BrixCharacterProps> = ({ colors, action, delay, position, rotation = 0, is3D = true }) => {
  // 3D Character rendering
  if (is3D) {
    return (
      <div style={{ width: "100%", height: "300px" }} className="relative">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 40 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <directionalLight position={[-10, 10, 5]} intensity={0.5} />
          <Environment preset="city" />
          
          <group position={[0, -0.5, 0]} rotation={[0, rotation, 0]}>
            <BrixCharacter3D colors={colors} action={action} delay={delay} />
          </group>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.8} 
            minAzimuthAngle={-Math.PI / 4} 
            maxAzimuthAngle={Math.PI / 4} 
          />
        </Canvas>
      </div>
    );
  }
  
  // Legacy 2D rendering below - fallback for older browsers
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
    },
    jumping: {
      initial: { y: 0 },
      animate: { 
        y: [0, -30, 0],
        transition: { 
          repeat: Infinity, 
          duration: 1.5,
          delay,
          times: [0, 0.5, 1]
        }
      }
    },
    waving: {
      initial: { rotate: 0 },
      animate: { 
        rotate: 0,
        transition: { 
          repeat: Infinity, 
          duration: 3,
          delay
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
    },
    jumping: {
      initial: {},
      animate: {
        y: [0, -10, 0],
        transition: {
          repeat: Infinity,
          duration: 1.5,
          delay
        }
      }
    },
    waving: {
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
      style={{ width: blockSize * 5, height: blockSize * 10 }} // Made taller to accommodate legs
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
            rotate: action === 'milk' ? [0, -20, 0] : action === 'waving' ? [0, 30, 60, 30, 0] : [0, 20, 0, -20, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: action === 'milk' ? 2 : action === 'waving' ? 1.5 : 1, 
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
        
        {/* Hips */}
        <div className="absolute" style={{ width: blockSize * 3, height: blockSize, top: blockSize * 5, left: blockSize }}>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: 0, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: 0, left: blockSize }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: 0, left: blockSize * 2 }}></div>
        </div>
        
        {/* Legs */}
        <motion.div 
          className="absolute" 
          style={{ width: blockSize, height: blockSize * 3, top: blockSize * 6, left: blockSize }}
          animate={{ 
            rotate: action === 'walking' || action === 'jumping' ? [0, -15, 0, 15, 0] : 0
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1, 
            delay
          }}
        >
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[2], position: 'absolute', top: 0, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: blockSize, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: blockSize * 2, left: 0 }}></div>
        </motion.div>
        
        <motion.div 
          className="absolute" 
          style={{ width: blockSize, height: blockSize * 3, top: blockSize * 6, left: blockSize * 3 }}
          animate={{ 
            rotate: action === 'walking' || action === 'jumping' ? [0, 15, 0, -15, 0] : 0
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1, 
            delay: delay + 0.5
          }}
        >
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[2], position: 'absolute', top: 0, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[1], position: 'absolute', top: blockSize, left: 0 }}></div>
          <div style={{ width: blockSize, height: blockSize, backgroundColor: colors[0], position: 'absolute', top: blockSize * 2, left: 0 }}></div>
        </motion.div>
      </motion.div>

      {/* Action-specific elements */}
      {renderActionElements()}
    </motion.div>
  );
};

export default BrixCharacter; 