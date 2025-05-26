
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, MessageSquare, Edit, Brain, Activity } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null; // Don't render if not logged in

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="container max-w-6xl py-16 px-4">
        <div className="mb-10 border-b border-navy-100 pb-6">
          <h1 className="text-3xl font-serif text-navy-700">Welcome, {user.username}</h1>
          <p className="text-navy-500 mt-2">Your ReformStory dashboard gives you access to your stories and resources.</p>
          
          <div className="mt-6">
            <Button onClick={() => logout()} variant="outline" className="text-navy-500">
              Sign Out
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Story Card */}
          <Card className="border-navy-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-serif flex items-center">
                <Edit className="mr-2 text-copper" size={20} /> Create Story
              </CardTitle>
              <CardDescription>
                Share your experience in a safe, anonymous environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-navy-500 text-sm">
                Your voice matters. Share your story to help create change and build understanding.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="bg-copper hover:bg-copper-600 w-full" asChild>
                <Link to="/create-story">
                  <Plus size={16} className="mr-2" /> New Story
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* My Stories Card */}
          <Card className="border-navy-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-serif flex items-center">
                <FileText className="mr-2 text-navy-400" size={20} /> My Stories
              </CardTitle>
              <CardDescription>
                Manage your submitted stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-navy-500 text-sm">
                View, edit or manage your submitted stories and track their status.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="border-navy-300 w-full" asChild>
                <Link to="/my-stories">
                  View My Stories
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Mental Health Card - NEW */}
          <Card className="border-navy-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-serif flex items-center">
                <Brain className="mr-2 text-navy-400" size={20} /> Mental Health
              </CardTitle>
              <CardDescription>
                Access personalized well-being resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-navy-500 text-sm">
                Get adaptive therapeutic content tailored to your emotional state and needs.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button variant="outline" className="border-navy-300 w-full" asChild>
                <Link to="/mental-health">
                  View Resources
                </Link>
              </Button>
              <Button variant="outline" className="border-navy-300 w-full" asChild>
                <Link to="/emotion-analyzer">
                  <Activity size={16} className="mr-2" /> Analyze Emotions
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Counseling Card */}
          <Card className="border-navy-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-serif flex items-center">
                <MessageSquare className="mr-2 text-navy-400" size={20} /> Get Counseling
              </CardTitle>
              <CardDescription>
                Access one-on-one counseling support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-navy-500 text-sm">
                Connect with professionals who can provide personalized support and guidance.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="border-navy-300 w-full" asChild>
                <Link to="/counseling">
                  Request Counseling
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
