import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import InteractiveBubbles from './InteractiveBubbles';

const Hero = () => {
  const [affirmation, setAffirmation] = useState("..");
  
  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const response = await axios.post('http://localhost:3000/ask', {
          message: "Generate a short, positive daily affirmation about mental wellbeing, peace, or self-compassion. Keep it under 20 words and make it different from previous affirmations. Format as a complete sentence without any additional text."
        });
        if (response.data && response.data.response) {
          setAffirmation(response.data.response);
        }
      } catch (error) {
        console.error("Error fetching affirmation:", error);
        setAffirmation("I am capable of creating calm within myself, regardless of what's happening around me.");
      }
    };
    
    fetchAffirmation();
    
    const preventCache = () => {
      const timestamp = new Date().getTime();
      const currentUrl = window.location.href;
      const hasParams = currentUrl.includes('?');
      const newUrl = hasParams
        ? `${currentUrl}&nocache=${timestamp}`
        : `${currentUrl}?nocache=${timestamp}`;
      if (window.location.href !== newUrl) {
        window.history.replaceState({}, document.title, newUrl);
      }
    };
    
    preventCache();
  }, []);
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Interactive bubbles layer */}
      <InteractiveBubbles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Your mental wellbeing matters
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Take a moment for yourself today. Explore our calming tools designed to help you find peace and clarity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 py-6 text-xl">
                Start Your Journey
              </Button>
              <Button variant="outline" className="rounded-full border-calm-blue px-8 py-6 text-xl">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative animate-gentle-float">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-calm-yellow rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-calm-lavender rounded-full opacity-60"></div>
            <div className="relative bg-calm-blue rounded-3xl p-8 shadow-xl overflow-hidden backdrop-blur-sm bg-white/80">
              <div className="absolute top-0 right-0 w-40 h-40 bg-calm-green rounded-full -mr-16 -mt-16 opacity-40"></div>
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-3">Daily Affirmation</h3>
                <p className="text-xl italic text-primary">
                  "{affirmation}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;