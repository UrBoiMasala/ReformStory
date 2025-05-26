
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-cream relative overflow-hidden">
      {/* Abstract decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="w-full h-full bg-copper rotate-12 transform translate-x-1/3 -translate-y-1/4"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 opacity-10">
        <div className="w-full h-full bg-navy rounded-full transform -translate-x-1/2 translate-y-1/3"></div>
      </div>
      
      <div className="container max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-4">
                Stories That Matter.
                <span className="text-copper"> Voices That Reform.</span>
              </h1>
              <p className="text-xl md:text-2xl text-navy-400 max-w-xl">
                A platform for the incarcerated and formerly incarcerated to safely share experiences that drive change.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-navy hover:bg-navy-600 text-white px-8 py-6 text-lg" asChild>
                <Link to="/submit">Share Your Story</Link>
              </Button>
              <Button variant="outline" className="border-navy-300 text-navy-500 hover:bg-navy-50 px-8 py-6 text-lg" asChild>
                <Link to="/stories">Read Stories</Link>
              </Button>
            </div>
            
            <div className="text-sm text-navy-300 max-w-md">
              <p>All stories can be shared anonymously or with a pseudonym. 
              Your safety and privacy are our highest priorities.</p>
            </div>
          </div>
          
          <div className="relative h-[24rem] w-full rounded-xl bg-navy-50 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-navy-500/30 to-copper-500/20 absolute z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80" 
                alt="Abstract architectural structure" 
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-navy-900/80 to-transparent">
                <blockquote className="text-cream font-serif italic">
                  "Our stories are bridges to understanding, and understanding is the foundation of reform."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
