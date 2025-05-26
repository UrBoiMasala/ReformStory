
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full p-4 md:p-6 bg-cream">
      <div className="container max-w-7xl flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-navy-500 flex items-center justify-center text-cream font-serif font-bold text-xl">R</div>
            <span className="text-navy-500 font-serif font-medium text-xl hidden sm:inline-block">ReformStory</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/#how-it-works" className="text-navy-500 hover:text-navy-700 animated-underline">How It Works</a>
          <a href="/#stories" className="text-navy-500 hover:text-navy-700 animated-underline">Stories</a>
          <a href="/#why-this-matters" className="text-navy-500 hover:text-navy-700 animated-underline">Why It Matters</a>
          <a href="/#partners" className="text-navy-500 hover:text-navy-700 animated-underline">Partners</a>
        </nav>
        
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-navy-300 text-navy-500 hover:bg-navy-50"
                asChild
              >
                <Link to="/dashboard">
                  <User size={16} className="mr-1" /> Dashboard
                </Link>
              </Button>
              <Button 
                size="sm" 
                className="bg-copper hover:bg-copper-600 text-white"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-navy-300 text-navy-500 hover:bg-navy-50"
                asChild
              >
                <Link to="/auth">Login</Link>
              </Button>
              <Button 
                size="sm" 
                className="bg-copper hover:bg-copper-600 text-white"
                asChild
              >
                <Link to="/auth">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
