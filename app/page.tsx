'use client';

import { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time to allow assets to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-dark z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 relative">
              <div className="w-8 h-8 bg-primary absolute top-0 left-0 animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-8 h-8 bg-secondary absolute top-0 right-0 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-8 h-8 bg-accent absolute bottom-0 left-0 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-8 h-8 bg-light absolute bottom-0 right-0 animate-bounce" style={{ animationDelay: '0.6s' }}></div>
            </div>
            <p className="mt-4 text-xl font-medium text-primary">Loading Brix...</p>
          </div>
        </div>
      ) : (
        <>
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
          <ContactSection />
        </>
      )}
    </main>
  );
} 