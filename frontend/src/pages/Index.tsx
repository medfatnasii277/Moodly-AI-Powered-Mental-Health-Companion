import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, BookOpen, GamepadIcon, ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 bg-calm-gray/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our range of mental health resources designed to support your wellbeing journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ServiceCard 
                title="Talk to mira" 
                description="Talk with our AI companion for immediate emotional support and guidance."
                icon={<MessageCircle className="h-12 w-12 text-primary" />}
                linkTo="/chat"
              />
              
              <ServiceCard 
                title="Guided Meditation" 
                description="Practice mindfulness with our collection of guided meditations for all levels."
                icon={<BookOpen className="h-12 w-12 text-calm-lavender" />}
                linkTo="/meditation"
              />
              
              <ServiceCard 
                title="Therapeutic Games" 
                description="Engage with interactive games designed to reduce stress and improve focus."
                icon={<GamepadIcon className="h-12 w-12 text-calm-green" />}
                linkTo="/games"
              />
              
              <ServiceCard 
                title="Mind Mirror" 
                description="Visualize your emotions through AI-generated imagery based on how you feel."
                icon={<ImageIcon className="h-12 w-12 text-accent" />}
                linkTo="/how-i-look"
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-calm-blue/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-6">
              <div className="p-4 bg-white rounded-full shadow-md">
                <Heart className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your journey?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Taking care of your mental health is a journey, not a destination. 
              We're here to support you every step of the way.
            </p>
            <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 py-6 text-xl">
              Begin Now
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-calm-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-accent" />
                <span className="ml-2 text-xl font-bold">Moodly</span>
              </div>
              <p className="mt-2 text-muted-foreground">
                Providing mental health resources and support for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/chat" className="text-muted-foreground hover:text-primary transition-colors">Talk to Mira
                </Link></li>
                <li><Link to="/meditation" className="text-muted-foreground hover:text-primary transition-colors">Meditation</Link></li>
                <li><Link to="/games" className="text-muted-foreground hover:text-primary transition-colors">Games</Link></li>
                <li><Link to="/how-i-look" className="text-muted-foreground hover:text-primary transition-colors">How I Look</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Need Help Now?</h3>
              <p className="text-muted-foreground mb-2">
                If you're in crisis, please call the following helpline:
              </p>
              <p className="text-xl font-semibold text-primary">1-800-273-8255</p>
              <p className="text-sm mt-2">National Suicide Prevention Lifeline</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-calm-gray/50 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Moodly. All rights reserved.</p>
           
          </div>
        </div>
      </footer>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
}

const ServiceCard = ({ title, description, icon, linkTo }: ServiceCardProps) => {
  return (
    <Link to={linkTo} className="block">
      <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 p-8 h-full border border-calm-gray/30 text-center flex flex-col">
        <div className="mx-auto mb-4 p-4 bg-calm-gray/20 rounded-full">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
        <Button variant="outline" className="rounded-full w-full">
          Explore
        </Button>
      </div>
    </Link>
  );
};

export default Index;