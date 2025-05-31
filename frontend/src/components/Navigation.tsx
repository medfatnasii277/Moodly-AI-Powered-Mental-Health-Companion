import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Heart, BookOpen, MessageCircle, GamepadIcon, 
  Home, ImageIcon, GraduationCap, Users 
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-calm-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Heart className="h-8 w-8 text-accent" />
            <span className="ml-2 text-xl font-bold text-foreground">Moodly</span>
          </Link>
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              <NavLink
                name="Home"
                to="/"
                active={location.pathname === '/'}
                icon={<Home className="h-4 w-4" />}
              />
              <NavLink
                name="Talk"
                to="/chat"
                active={location.pathname === '/chat'}
                icon={<MessageCircle className="h-4 w-4" />}
              />
              <NavLink
                name="Learn"
                to="/learn"
                active={location.pathname === '/learn'}
                icon={<GraduationCap className="h-4 w-4" />}
              />
              <NavLink
                name="Parents"
                to="/parents-guide"
                active={location.pathname === '/parents-guide'}
                icon={<Users className="h-4 w-4" />}
              />
              <NavLink
                name="Meditate"
                to="/meditation"
                active={location.pathname === '/meditation'}
                icon={<BookOpen className="h-4 w-4" />}
              />
              <NavLink
                name="Play"
                to="/games"
                active={location.pathname === '/games'}
                icon={<GamepadIcon className="h-4 w-4" />}
              />
              <NavLink
                name="Mirror"
                to="/how-i-look"
                active={location.pathname === '/how-i-look'}
                icon={<ImageIcon className="h-4 w-4" />}
              />
            </div>
          </div>
          <div>
            <Button className="rounded-full bg-primary px-4 py-1 text-sm font-medium">
              Get Help
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  name: string;
  to: string;
  icon?: React.ReactNode;
  active?: boolean;
}

const NavLink = ({ name, to, icon, active }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-calm-blue/20 text-primary'
          : 'text-foreground hover:bg-calm-gray/30'
      }`}
    >
      {icon}
      <span className="mt-1">{name}</span>
    </Link>
  );
};

export default Navigation;