/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace React {
  interface JSX {
    // Allow any elements
    [elemName: string]: any;
  }
}

declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
  export const useScroll: any;
  export const useTransform: any;
  export const useSpring: any;
  export const useMotionValue: any;
  export const useInView: any;
  export const useAnimation: any;
  // Add other exports as needed
}

declare module '@react-three/fiber' {
  export const Canvas: any;
  export const useFrame: any;
  export const useThree: any;
  export function extend(objects: any): void;
}

declare module '@react-three/drei' {
  export const OrbitControls: any;
  export const Environment: any;
  export const PerspectiveCamera: any;
  export const useGLTF: any;
  export const Text: any;
  export const Html: any;
}

declare module 'three' {
  export class Clock {
    constructor();
    getElapsedTime(): number;
  }
  
  export class AnimationMixer {
    constructor(root: any);
    clipAction(clip: any): any;
    update(delta: number): void;
  }
  
  export class Group {
    children: any[];
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
  }
  
  export class MeshStandardMaterial {
    constructor(params: any);
  }
  
  // Add more Three.js types as needed
}

declare module 'next/font/google' {
  export function Inter(options: any): any;
}

declare module 'next' {
  export type Metadata = any;
} 