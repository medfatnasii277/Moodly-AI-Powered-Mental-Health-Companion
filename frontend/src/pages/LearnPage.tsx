import React from 'react';
import Navigation from '@/components/Navigation';
import Learn from '@/components/Learn';

const LearnPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Learn />
        <section className="py-16 bg-calm-blue/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Education is an important part of mental health awareness. Understanding symptoms can help you recognize when to seek support.
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-calm-gray py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} MindfulSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnPage;