
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, BookmarkPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Define TypeScript types for better structure
type StoryMedium = 'text' | 'audio' | 'video';
type StoryCategory = 'Life After' | 'Life Inside' | 'Legal Abuse' | 'Advocacy' | 'Family Impact' | 'Personal Journey';

interface Story {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: StoryCategory;
  tags: string[];
  medium: StoryMedium;
  readTime: string;
  isFeatured?: boolean;
}

// Sample data structure - this would come from a database in a real implementation
const sampleStories: Story[] = [
  {
    id: 1,
    title: "Finding Purpose After Release",
    excerpt: "After 12 years inside, I discovered that my experience could help others navigate the system. Now I work with young people to prevent them from making the same choices I did.",
    author: "Anonymous in California",
    category: "Life After",
    tags: ["reentry", "mentorship", "youth"],
    medium: "text",
    readTime: "5 min read",
    isFeatured: true
  },
  {
    id: 2,
    title: "Letters to My Younger Self",
    excerpt: "The hardest part wasn't the time served—it was missing my children growing up. These are the letters I wish someone had written to me at 19.",
    author: "J.M.",
    category: "Life Inside",
    tags: ["family", "reflection", "letters"],
    medium: "text",
    readTime: "7 min read",
    isFeatured: true
  },
  {
    id: 3,
    title: "The Sound of Freedom",
    excerpt: "I recorded this audio the morning I was released after 8 years. These were my first thoughts as I walked out those gates.",
    author: "Voice of Change",
    category: "Life After",
    tags: ["release", "freedom", "firstday"],
    medium: "audio",
    readTime: "3 min listen"
  },
  {
    id: 4,
    title: "When Justice Fails: My Wrongful Conviction Story",
    excerpt: "For 15 years, I fought to prove my innocence. This is what it cost me, and what I learned about our system.",
    author: "Exoneree #127",
    category: "Legal Abuse",
    tags: ["wrongful conviction", "exoneration", "legal system"],
    medium: "text",
    readTime: "12 min read"
  },
  {
    id: 5,
    title: "Solitary: 40 Days in the Hole",
    excerpt: "They put me in solitary for a rule violation that never happened. This is what isolation does to a human mind.",
    author: "Anonymous",
    category: "Life Inside",
    tags: ["solitary", "mental health", "prison conditions"],
    medium: "text",
    readTime: "8 min read"
  },
  {
    id: 6,
    title: "My Message to Lawmakers",
    excerpt: "What I wish politicians knew before they voted on criminal justice policies. Recorded from inside.",
    author: "Silenced Voice",
    category: "Advocacy",
    tags: ["policy", "reform", "politics"],
    medium: "video",
    readTime: "4 min watch"
  },
  {
    id: 7,
    title: "Visiting Hours: A Child's Perspective",
    excerpt: "My mom was incarcerated when I was 9. This is what it was like to grow up seeing her only through glass.",
    author: "Child of the System",
    category: "Family Impact",
    tags: ["children", "visitation", "family separation"],
    medium: "text",
    readTime: "6 min read"
  },
  {
    id: 8,
    title: "The Prosecutor Who Changed My Life",
    excerpt: "After my wrongful conviction was overturned, the most unlikely person reached out to me: the prosecutor who put me away.",
    author: "Second Chance",
    category: "Legal Abuse",
    tags: ["prosecutors", "redemption", "forgiveness"],
    medium: "text",
    readTime: "10 min read"
  },
  {
    id: 9,
    title: "Starting Over at 52",
    excerpt: "How do you build a life when you've been away for 30 years? My journey of learning technology, finding work, and rebuilding trust.",
    author: "Late Bloomer",
    category: "Life After",
    tags: ["elderly", "technology", "employment"],
    medium: "audio",
    readTime: "15 min listen"
  }
];

const AllStories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterMedium, setFilterMedium] = useState<string>('');
  const [filterTag, setFilterTag] = useState<string>('');
  const [savedStories, setSavedStories] = useState<number[]>([]);

  // Extract unique categories, mediums, and tags
  const categories = Array.from(new Set(sampleStories.map(story => story.category)));
  const mediums = Array.from(new Set(sampleStories.map(story => story.medium)));
  const allTags = Array.from(new Set(sampleStories.flatMap(story => story.tags)));

  // Filter stories based on search term and filters
  const filteredStories = sampleStories.filter(story => {
    const matchesSearch = !searchTerm || 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filterCategory || story.category === filterCategory;
    const matchesMedium = !filterMedium || story.medium === filterMedium;
    const matchesTag = !filterTag || story.tags.includes(filterTag);
    
    return matchesSearch && matchesCategory && matchesMedium && matchesTag;
  });

  const handleSaveStory = (storyId: number) => {
    if (savedStories.includes(storyId)) {
      setSavedStories(savedStories.filter(id => id !== storyId));
      toast({
        title: "Removed from bookmarks",
        description: "Story removed from your saved stories",
      });
    } else {
      setSavedStories([...savedStories, storyId]);
      toast({
        title: "Story saved",
        description: "Story added to your bookmarks",
      });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setFilterMedium('');
    setFilterTag('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container max-w-7xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Stories</h1>
            <p className="text-navy-400 max-w-2xl">
              Browse real voices and experiences from the justice system—shared with dignity and purpose.
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-navy-100">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-300" size={18} />
                <Input
                  type="search"
                  placeholder="Search stories by keyword, tag, or author..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                <Filter size={20} className="text-navy-400" />
                <select 
                  className="bg-cream border border-navy-200 rounded px-2 py-2 text-sm"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select 
                  className="bg-cream border border-navy-200 rounded px-2 py-2 text-sm"
                  value={filterMedium}
                  onChange={(e) => setFilterMedium(e.target.value)}
                >
                  <option value="">All Formats</option>
                  {mediums.map(medium => (
                    <option key={medium} value={medium}>{medium}</option>
                  ))}
                </select>
                
                <select 
                  className="bg-cream border border-navy-200 rounded px-2 py-2 text-sm"
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {(searchTerm || filterCategory || filterMedium || filterTag) && (
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-navy-100">
                <div className="text-sm text-navy-500">
                  <span className="font-medium">{filteredStories.length}</span> {filteredStories.length === 1 ? 'story' : 'stories'} found
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearFilters}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div 
                key={story.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-navy-100 flex flex-col transition-all duration-200 hover:shadow-md"
              >
                <div className="p-6 border-b border-navy-50 bg-navy-50/20">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-navy-100 text-navy-600">
                      {story.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {story.medium === 'audio' && (
                        <span className="text-xs bg-copper-100 text-copper-800 px-2 py-0.5 rounded-full">Audio</span>
                      )}
                      {story.medium === 'video' && (
                        <span className="text-xs bg-copper-100 text-copper-800 px-2 py-0.5 rounded-full">Video</span>
                      )}
                      <span className="text-xs text-navy-300">{story.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-3">
                    {story.title}
                  </h3>
                  <p className="text-navy-400 mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {story.tags.map(tag => (
                      <button 
                        key={tag} 
                        className="text-xs bg-navy-50 text-navy-500 px-2 py-0.5 rounded hover:bg-navy-100 transition-colors"
                        onClick={() => setFilterTag(tag)}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 mt-auto flex justify-between items-center">
                  <span className="text-sm text-navy-300 italic">
                    By {story.author}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-8 h-8 p-0" 
                      onClick={() => handleSaveStory(story.id)}
                    >
                      <BookmarkPlus 
                        size={18} 
                        className={savedStories.includes(story.id) ? "text-copper fill-copper" : "text-navy-400"} 
                      />
                      <span className="sr-only">Save story</span>
                    </Button>
                    <Button variant="link" className="text-copper hover:text-copper-600 p-0" asChild>
                      <Link to={`/stories/${story.id}`}>Read Story</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredStories.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-navy-100 my-8">
              <h3 className="text-xl font-medium mb-2">No stories found</h3>
              <p className="text-navy-400 mb-6">We couldn't find any stories that match your search criteria.</p>
              <Button onClick={handleClearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
          
          {/* Submit Your Story CTA */}
          <div className="mt-12 bg-navy-500 text-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-3">Have a story to share?</h2>
            <p className="text-navy-100 max-w-2xl mx-auto mb-6">
              Your experience matters and can help drive meaningful change in our justice system.
            </p>
            <Button className="bg-copper hover:bg-copper-600 text-white" asChild>
              <Link to="/submit">Share Your Story</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllStories;
