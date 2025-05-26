
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, ExternalLink } from 'lucide-react';

// Mock data - in a real app, this would come from an API
const mockStories = [
  {
    id: '1',
    title: 'My Journey Through the System',
    createdAt: '2025-05-10',
    status: 'published',
    excerpt: 'After being incarcerated for three years, I had to rebuild my life from scratch...',
    tags: ['Life After', 'Reentry']
  },
  {
    id: '2',
    title: 'Finding Hope in Education',
    createdAt: '2025-05-05',
    status: 'under review',
    excerpt: 'The educational programs inside gave me a second chance at a future...',
    tags: ['Education', 'Life Inside']
  },
  {
    id: '3',
    title: 'Reuniting with Family',
    createdAt: '2025-04-28',
    status: 'draft',
    excerpt: 'The first time I saw my children after my release was both terrifying and beautiful...',
    tags: ['Family', 'Life After']
  }
];

const MyStories = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return 'bg-green-500 hover:bg-green-600';
      case 'under review': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'draft': return 'bg-gray-500 hover:bg-gray-600';
      default: return 'bg-navy-500 hover:bg-navy-600';
    }
  };
  
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="container max-w-5xl py-16 px-4">
        <div className="flex justify-between items-center mb-10 border-b border-navy-100 pb-6">
          <div>
            <h1 className="text-3xl font-serif text-navy-700">My Stories</h1>
            <p className="text-navy-500 mt-2">Manage all your stories in one place</p>
          </div>
          <Button className="bg-copper hover:bg-copper-600" asChild>
            <Link to="/create-story">
              <Edit size={16} className="mr-2" /> New Story
            </Link>
          </Button>
        </div>
        
        <div className="space-y-6">
          {mockStories.map(story => (
            <Card key={story.id} className="border-navy-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-serif">{story.title}</CardTitle>
                  <Badge className={`${getStatusColor(story.status)}`}>
                    {story.status}
                  </Badge>
                </div>
                <div className="text-sm text-navy-400 mt-1">Created on {story.createdAt}</div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-navy-600">{story.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {story.tags.map(tag => (
                    <span key={tag} className="text-xs bg-navy-50 text-navy-500 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/stories/${story.id}`}>
                    <ExternalLink size={14} className="mr-1" /> View Story
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/edit-story/${story.id}`}>
                    <Edit size={14} className="mr-1" /> Edit
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {mockStories.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-navy-400 mb-4">You haven't created any stories yet</h3>
            <p className="text-navy-500 mb-6">Share your experiences to help drive meaningful change in our justice system.</p>
            <Button className="bg-copper hover:bg-copper-600" asChild>
              <Link to="/create-story">Create Your First Story</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStories;
