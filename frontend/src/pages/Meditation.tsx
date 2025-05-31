
import React from 'react';
import Navigation from '@/components/Navigation';
import MeditationGuide from '@/components/MeditationGuide';
import { Heart } from 'lucide-react';

const Meditation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="p-4 bg-white rounded-full shadow-md">
                <Heart className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Inner Peace</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our collection of guided meditations designed to help you relax, focus, and connect with yourself.
            </p>
          </div>
        </div>
        
        <MeditationGuide />
      </main>
      
      <footer className="bg-calm-gray py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} MindfulSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Meditation;
