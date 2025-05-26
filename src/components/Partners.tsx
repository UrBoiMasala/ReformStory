
import React from 'react';

const Partners = () => {
  const partners = [
    { name: "Justice Reform Initiative", type: "nonprofit" },
    { name: "Second Chance Alliance", type: "nonprofit" },
    { name: "Center for Narrative Justice", type: "academic" },
    { name: "Pathway Forward", type: "nonprofit" },
    { name: "Voice & Justice Project", type: "media" },
    { name: "Beyond Bars Network", type: "community" }
  ];

  const quotes = [
    {
      text: "ReformStory has created a safe space for authentic voices that are too often silenced. Their platform is changing the narrative.",
      author: "The Criminal Justice Review",
      role: "Media Publication"
    },
    {
      text: "The stories documented through this platform provide invaluable insight for policymakers seeking to understand the human impact of our justice system.",
      author: "National Prison Policy Coalition",
      role: "Advocacy Organization"
    }
  ];

  return (
    <section id="partners" className="w-full py-16 md:py-24 bg-white">
      <div className="container max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center">Community & Partners</h2>
        <p className="text-navy-400 mb-12 max-w-2xl mx-auto text-center">
          ReformStory collaborates with organizations committed to criminal justice reform, ethical storytelling, and elevating marginalized voices.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4 h-32 rounded-lg border border-navy-100 bg-cream">
              <div className="h-12 w-12 rounded-full bg-navy-50 mb-3"></div>
              <h3 className="text-sm font-medium text-navy-600 text-center">{partner.name}</h3>
              <span className="text-xs text-navy-300 capitalize">{partner.type}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {quotes.map((quote, index) => (
            <div key={index} className="bg-navy-50 p-8 rounded-lg border border-navy-100">
              <p className="text-navy-500 font-serif italic mb-4">"{quote.text}"</p>
              <div>
                <p className="font-medium">{quote.author}</p>
                <p className="text-sm text-navy-400">{quote.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-cream p-8 rounded-lg text-center">
          <h3 className="text-xl font-serif mb-4">Partner With Us</h3>
          <p className="text-navy-400 max-w-xl mx-auto mb-6">
            We're seeking partners who share our commitment to justice reform, ethical storytelling, and creating systemic change.
          </p>
          <button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-navy text-white hover:bg-navy-600 transition-colors">
            Join Our Network
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
