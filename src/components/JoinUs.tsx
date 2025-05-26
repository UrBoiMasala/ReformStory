
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const JoinUs = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-copper">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Join the Movement</h2>
            <p className="text-cream mb-8">
              Be part of a growing community committed to reforming our justice system through the power of authentic storytelling and collective action.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">1</span>
                </div>
                <p>Receive updates on new stories and platform developments</p>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">2</span>
                </div>
                <p>Access resources for justice advocacy and reform</p>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">3</span>
                </div>
                <p>Connect with a community of storytellers and advocates</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium mb-6">Stay Connected</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy-500 mb-1">
                  Name
                </label>
                <Input type="text" id="name" placeholder="Your name" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-500 mb-1">
                  Email
                </label>
                <Input type="email" id="email" placeholder="Your email" className="w-full" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-navy-500 mb-1">
                  I am interested in (select all that apply):
                </label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="sharing" className="h-4 w-4 text-copper rounded border-navy-300 focus:ring-copper" />
                    <label htmlFor="sharing" className="ml-2 text-sm text-navy-500">
                      Sharing my story
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="volunteer" className="h-4 w-4 text-copper rounded border-navy-300 focus:ring-copper" />
                    <label htmlFor="volunteer" className="ml-2 text-sm text-navy-500">
                      Volunteering
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="organizational" className="h-4 w-4 text-copper rounded border-navy-300 focus:ring-copper" />
                    <label htmlFor="organizational" className="ml-2 text-sm text-navy-500">
                      Organizational partnership
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="updates" className="h-4 w-4 text-copper rounded border-navy-300 focus:ring-copper" />
                    <label htmlFor="updates" className="ml-2 text-sm text-navy-500">
                      Newsletter updates
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy-500 mb-1">
                  Message (optional)
                </label>
                <textarea 
                  id="message" 
                  rows={3} 
                  className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent" 
                  placeholder="Share any additional information"
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full bg-copper hover:bg-copper-600 text-white">
                Join Us
              </Button>
              
              <p className="text-xs text-navy-300 mt-4">
                We respect your privacy and will never share your information with third parties. 
                See our <a href="#" className="underline">Privacy Policy</a> for more details.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
