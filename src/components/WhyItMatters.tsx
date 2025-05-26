
import React from 'react';

const WhyItMatters = () => {
  return (
    <section id="why-this-matters" className="w-full py-16 md:py-24 bg-navy-50">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Why This Matters</h2>
            
            <div className="space-y-6 text-navy-500">
              <p className="text-lg">
                With over <span className="font-medium">2 million people</span> currently incarcerated in the United States and millions more impacted by the criminal justice system, we face a crisis of mass incarceration that disproportionately affects communities of color and those living in poverty.
              </p>
              
              <p>
                Behind these statistics are <span className="italic">human beings</span> with stories that rarely reach the public consciousness. Stories that can change minds, challenge assumptions, and humanize a system that too often dehumanizes.
              </p>
              
              <div className="bg-white p-6 rounded-lg border-l-4 border-copper my-8">
                <p className="text-navy-500 font-serif italic">
                  "Stories are the most powerful tool we have to create empathy. And empathy is the most powerful tool we have to create change."
                </p>
              </div>
              
              <p>
                ReformStory believes that narrative change leads to policy change. By creating a platform for authentic voices from within and beyond the system, we're building the foundation for a more just, equitable, and rehabilitative approach to justice.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-navy-100">
                <h4 className="font-medium text-copper mb-1">2.3 million</h4>
                <p className="text-sm text-navy-400">People currently incarcerated in the U.S.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-navy-100">
                <h4 className="font-medium text-copper mb-1">70 million</h4>
                <p className="text-sm text-navy-400">Americans with criminal records</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-navy-100">
                <h4 className="font-medium text-copper mb-1">5× higher</h4>
                <p className="text-sm text-navy-400">Incarceration rate for Black Americans</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-navy-100">
                <h4 className="font-medium text-copper mb-1">77%</h4>
                <p className="text-sm text-navy-400">Recidivism rate within 5 years</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-[32rem] w-full">
            <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-navy-500/30 to-copper-500/20 absolute z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3013&q=80" 
                alt="Abstract architectural structure representing barriers" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 p-8 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-medium mb-2">Our Commitment to Change</h3>
              <p className="text-navy-400">
                ReformStory is committed to amplifying voices, fostering dialogue, and advocating for evidence-based reforms that prioritize rehabilitation, restoration, and human dignity.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-copper mr-2"></span> 
                  <span>Ethical storytelling practices</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-copper mr-2"></span> 
                  <span>Collaborative justice reform advocacy</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-copper mr-2"></span> 
                  <span>Research-backed approach to narrative change</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
