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
  // Add other exports as needed
}

declare module 'next/font/google' {
  export function Inter(options: any): any;
}

declare module 'next' {
  export type Metadata = any;
} 