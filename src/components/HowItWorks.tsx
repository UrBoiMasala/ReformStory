
import React from 'react';
import { Check, FileText, Upload, Users } from 'lucide-react';

const steps = [
  {
    icon: <Upload size={28} />,
    title: "Share Your Story",
    description: "Submit your experience through text, audio, or video in a trauma-informed, private environment."
  },
  {
    icon: <Check size={28} />,
    title: "Review Process",
    description: "Our team reviews submissions with respect and care, protecting privacy while preserving authenticity."
  },
  {
    icon: <FileText size={28} />,
    title: "Publication",
    description: "Stories are published anonymously or with a pseudonym, with full control remaining with the author."
  },
  {
    icon: <Users size={28} />,
    title: "Create Impact",
    description: "Your story joins a powerful collection that educates, builds empathy, and drives criminal justice reform."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 bg-navy-500 text-cream">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">How It Works</h2>
          <p className="text-cream-500/80 max-w-2xl mx-auto">
            ReformStory provides a safe, dignified platform for sharing experiences with incarceration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center bg-navy-400/30 p-6 rounded-lg border border-navy-300/20 relative"
            >
              <div className="h-16 w-16 rounded-full bg-copper/20 flex items-center justify-center mb-4">
                <div className="text-copper">{step.icon}</div>
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-center text-cream-500/70">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-copper-300/30 transform translate-x-1/2"></div>
              )}
              
              <div className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-copper flex items-center justify-center text-xs text-navy-500 font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
