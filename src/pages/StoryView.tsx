
import React from 'react';
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookmarkPlus } from "lucide-react";

// Sample data structure - in a real app, you would fetch this from a database
const sampleStories = [
  {
    id: "1",
    title: "Finding Purpose After Release",
    content: `After 12 years inside, I discovered that my experience could help others navigate the system. Now I work with young people to prevent them from making the same choices I did.

    The hardest part about coming home wasn't finding a job or a place to stay—it was figuring out who I was now. Prison has a way of freezing you in time while the world moves on. When I got out, smartphones were everywhere. Social media had taken over. My nieces and nephews were adults.

    For the first six months, I barely left my sister's apartment. The noise, the crowds, the endless choices in the grocery store—it was overwhelming. One day, my parole officer suggested I speak at a high school about my experience. I didn't want to do it, but I needed to check the box for "community service."

    Standing in front of those teenagers, seeing their faces as I described the reality of prison—not the TV version—something clicked. They had questions. Real questions. And for the first time since coming home, I had answers that mattered.

    Now I run a program for at-risk youth. We don't preach. We just tell the truth about choices and consequences. Some days it's exhausting, carrying not just my story but the weight of trying to redirect young lives. But every time a kid tells me they thought twice about something because of what I shared, I know this is why I survived those 12 years.

    Prison didn't give me purpose. What came after did.`,
    author: "Anonymous in California",
    category: "Life After",
    tags: ["reentry", "mentorship", "youth"],
    medium: "text",
    readTime: "5 min read",
    publishedDate: "February 12, 2025"
  },
  {
    id: "2",
    title: "Letters to My Younger Self",
    content: `The hardest part wasn't the time served—it was missing my children growing up. These are the letters I wish someone had written to me at 19.

    Dear 19-year-old me,

    Tonight, when that friend asks you to be the lookout, say no. Walk away. Go home. Watch a movie. Call your mom. Do anything but what you're planning to do.

    Because what happens next will cost you 15 years of your life. Fifteen years you can never get back.

    Your daughter will take her first steps without you. Your son will learn to read, graduate elementary school, and have his heart broken for the first time—all without you there to guide him.

    Your mother will age in fast-forward during visitations. Your father won't make it to see your release.

    The woman you love right now will write faithfully for two years, then her letters will slow, then stop. You can't blame her.

    The judge will call you "irredeemable" at your sentencing. For years, you'll believe him.

    But here's what he doesn't know, what I wish I could tell you now:

    You will find strength you never knew you had. You will earn your GED, then an associate's degree. You will become a mentor to younger inmates. You will make peace with your past.

    And when you finally come home, your children—now almost grown—will give you the chance to explain, to apologize, to be present in a way you never understood was important before.

    So please, tonight, just walk away.

    But if you can't—if this letter never reaches across time—then know that survival is possible. Redemption exists. And love, however delayed, will be waiting.
    
    Your older, wiser self`,
    author: "J.M.",
    category: "Life Inside",
    tags: ["family", "reflection", "letters"],
    medium: "text",
    readTime: "7 min read",
    publishedDate: "January 28, 2025"
  },
  {
    id: "3",
    title: "The Sound of Freedom",
    content: "Audio recording transcript would appear here",
    author: "Voice of Change",
    category: "Life After",
    tags: ["release", "freedom", "firstday"],
    medium: "audio",
    readTime: "3 min listen",
    audioUrl: "/audio/sample.mp3", // This would be a real audio file path in production
    publishedDate: "March 5, 2025"
  },
  {
    id: "4",
    title: "When Justice Fails: My Wrongful Conviction Story",
    content: "Full story content would appear here",
    author: "Exoneree #127",
    category: "Legal Abuse",
    tags: ["wrongful conviction", "exoneration", "legal system"],
    medium: "text",
    readTime: "12 min read",
    publishedDate: "December 7, 2024"
  },
  {
    id: "5",
    title: "Solitary: 40 Days in the Hole",
    content: "Full story content would appear here",
    author: "Anonymous",
    category: "Life Inside",
    tags: ["solitary", "mental health", "prison conditions"],
    medium: "text",
    readTime: "8 min read",
    publishedDate: "February 19, 2025"
  },
  {
    id: "6",
    title: "My Message to Lawmakers",
    content: "Video transcript would appear here",
    author: "Silenced Voice",
    category: "Advocacy",
    tags: ["policy", "reform", "politics"],
    medium: "video",
    readTime: "4 min watch",
    videoUrl: "/videos/sample.mp4", // This would be a real video file path in production
    publishedDate: "January 15, 2025"
  }
];

const StoryView = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const story = sampleStories.find(s => s.id === storyId);
  
  if (!story) {
    return (
      <div className="flex flex-col min-h-screen bg-cream">
        <Header />
        <main className="flex-grow py-12">
          <div className="container max-w-3xl">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-navy-100 text-center">
              <h2 className="text-2xl font-serif mb-4">Story Not Found</h2>
              <p className="text-navy-400 mb-6">The story you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/stories">Browse All Stories</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container max-w-3xl">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link to="/stories" className="flex items-center gap-1">
                <ArrowLeft size={16} />
                Back to stories
              </Link>
            </Button>
          </div>
          
          {/* Story content */}
          <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-navy-100">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-navy-100 text-navy-600">
                  {story.category}
                </span>
                <span className="text-sm text-navy-300">{story.publishedDate}</span>
              </div>
              
              <h1 className="text-3xl font-serif font-medium mb-4">
                {story.title}
              </h1>
              
              <div className="flex items-center justify-between mb-8">
                <span className="text-navy-400 italic">
                  By {story.author} • {story.readTime}
                </span>
                
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <BookmarkPlus size={16} />
                  Save
                </Button>
              </div>
              
              {story.medium === 'audio' && (
                <div className="mb-8 bg-navy-50 p-6 rounded-lg">
                  <h3 className="font-medium mb-2">Audio Story</h3>
                  <div className="bg-navy-100 p-4 rounded text-center">
                    <p className="text-navy-500">Audio player would appear here</p>
                  </div>
                </div>
              )}
              
              {story.medium === 'video' && (
                <div className="mb-8 bg-navy-50 p-6 rounded-lg">
                  <h3 className="font-medium mb-2">Video Story</h3>
                  <div className="bg-navy-100 p-4 rounded text-center aspect-video flex items-center justify-center">
                    <p className="text-navy-500">Video player would appear here</p>
                  </div>
                </div>
              )}
              
              {/* Story content */}
              <div className="prose max-w-none text-navy-600">
                {story.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-navy-100">
                {story.tags.map(tag => (
                  <Link 
                    key={tag} 
                    to={`/stories?tag=${tag}`}
                    className="text-xs bg-navy-50 text-navy-500 px-2 py-1 rounded hover:bg-navy-100 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </article>
          
          {/* Related stories - would be dynamically generated in a real app */}
          <div className="mt-12">
            <h2 className="text-xl font-serif mb-6">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleStories
                .filter(s => s.id !== story.id && (s.category === story.category || s.tags.some(t => story.tags.includes(t))))
                .slice(0, 2)
                .map(relatedStory => (
                  <div 
                    key={relatedStory.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-navy-100 flex flex-col"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-2">
                        {relatedStory.title}
                      </h3>
                      <p className="text-navy-400 mb-4 line-clamp-2">
                        {relatedStory.content.split('\n')[0]}
                      </p>
                      <Button variant="link" className="text-copper hover:text-copper-600 p-0" asChild>
                        <Link to={`/stories/${relatedStory.id}`}>Read Story</Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-12 bg-navy-500 text-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-serif mb-3">Have a similar experience to share?</h2>
            <p className="text-navy-100 mb-6">
              Your voice matters in this conversation.
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

export default StoryView;
