
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stories = [
  {
    id: 1,
    title: "Finding Purpose After Release",
    excerpt: "After 12 years inside, I discovered that my experience could help others navigate the system. Now I work with young people to prevent them from making the same choices I did.",
    author: "Anonymous in California",
    category: "Life After",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Letters to My Younger Self",
    excerpt: "The hardest part wasn't the time served—it was missing my children growing up. These are the letters I wish someone had written to me at 19.",
    author: "J.M.",
    category: "Life Inside",
    readTime: "7 min read"
  }
];

const FeaturedStories = () => {
  return (
    <section id="stories" className="w-full py-16 md:py-24 bg-cream">
      <div className="container max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Featured Stories</h2>
            <p className="text-navy-400 max-w-2xl">
              Real voices, real experiences—shared with dignity and purpose.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="border-navy-300 text-navy-500 hover:bg-navy-50" asChild>
              <Link to="/stories">View All Stories</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-navy-100 flex flex-col transition-all duration-200 hover:shadow-md"
            >
              <div className="p-6 border-b border-navy-50 bg-navy-50/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-navy-100 text-navy-600">
                    {story.category}
                  </span>
                  <span className="text-xs text-navy-300">{story.readTime}</span>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">
                  {story.title}
                </h3>
                <p className="text-navy-400 mb-4 line-clamp-3">
                  {story.excerpt}
                </p>
              </div>
              
              <div className="p-6 mt-auto flex justify-between items-center">
                <span className="text-sm text-navy-300 italic">
                  By {story.author}
                </span>
                <Button variant="link" className="text-copper hover:text-copper-600 p-0" asChild>
                  <Link to={`/stories/${story.id}`}>Read Story</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
