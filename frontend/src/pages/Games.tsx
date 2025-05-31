
import React from 'react';
import Navigation from '@/components/Navigation';
import GameEmbed from '@/components/GameEmbed';

const Games = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Therapy Through Play</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Games aren't just for fun—they can also be powerful tools for improving mental health and wellbeing.
              Our collection of interactive games is designed to reduce stress and promote mindfulness.
            </p>
          </div>
        </div>
        
        <GameEmbed />
      </main>
      
      <footer className="bg-calm-gray py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} MindfulSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Games;
