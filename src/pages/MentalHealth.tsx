
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Brain, Heart, BookOpen, CircleHelp, TrendingUp, TrendingDown } from 'lucide-react';

// Mock personalized content based on emotional state
const personalizedContent = {
  anxious: {
    title: 'Managing Anxiety',
    description: 'Techniques to help you cope with anxiety and worry.',
    exercises: [
      {
        title: 'Grounding Exercise',
        description: '5-4-3-2-1 technique: Identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.',
        duration: '5 minutes'
      },
      {
        title: 'Progressive Muscle Relaxation',
        description: 'Tense and then slowly release each muscle group in your body, from your toes to your head.',
        duration: '10 minutes'
      },
      {
        title: 'Worry Time',
        description: 'Set aside a specific time each day to address your worries, then practice postponing worrying thoughts until that time.',
        duration: '15 minutes'
      }
    ]
  },
  stressed: {
    title: 'Stress Reduction',
    description: 'Methods to lower your stress levels and find calm.',
    exercises: [
      {
        title: 'Deep Breathing',
        description: 'Breathe in slowly for 4 counts, hold for 7, and exhale for 8 counts. Repeat 5 times.',
        duration: '3 minutes'
      },
      {
        title: 'Body Scan',
        description: 'Lie down and focus your attention on each part of your body from feet to head, noticing sensations without judgment.',
        duration: '8 minutes'
      },
      {
        title: 'Mindful Walking',
        description: 'Take a walk while paying close attention to each step and your surroundings, staying present in the moment.',
        duration: '10 minutes'
      }
    ]
  },
  sad: {
    title: 'Improving Mood',
    description: 'Activities to help lift your mood and reconnect with positive feelings.',
    exercises: [
      {
        title: 'Gratitude Practice',
        description: 'Write down three things you're grateful for today, no matter how small.',
        duration: '5 minutes'
      },
      {
        title: 'Pleasant Activity Scheduling',
        description: 'Plan and engage in one small enjoyable activity each day, even when you don't feel like it.',
        duration: 'Varies'
      },
      {
        title: 'Challenging Negative Thoughts',
        description: 'Identify a negative thought, examine the evidence for and against it, and create a more balanced perspective.',
        duration: '10 minutes'
      }
    ]
  },
  angry: {
    title: 'Managing Anger',
    description: 'Strategies to handle anger in a healthy way.',
    exercises: [
      {
        title: 'Time-Out',
        description: 'Remove yourself from triggering situations until you feel calmer. Count to 10 and breathe deeply.',
        duration: 'As needed'
      },
      {
        title: 'Physical Release',
        description: 'Channel anger through non-harmful physical activities like going for a run or punching a pillow.',
        duration: '15 minutes'
      },
      {
        title: 'Anger Journal',
        description: 'Write about what made you angry, how you reacted, and how you might respond differently next time.',
        duration: '10 minutes'
      }
    ]
  }
};

// Mock emotion tracking data
const mockEmotionData = [
  { date: '2025-05-15', emotion: 'anxious', intensity: 7 },
  { date: '2025-05-16', emotion: 'stressed', intensity: 6 },
  { date: '2025-05-17', emotion: 'sad', intensity: 4 },
  { date: '2025-05-18', emotion: 'angry', intensity: 8 },
  { date: '2025-05-19', emotion: 'anxious', intensity: 5 },
  { date: '2025-05-20', emotion: 'stressed', intensity: 3 },
];

const MentalHealth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentEmotion, setCurrentEmotion] = useState('anxious');
  const [emotionData, setEmotionData] = useState(mockEmotionData);
  const [progress, setProgress] = useState(65);
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;
  
  // Get personalized content based on current emotion
  const currentContent = personalizedContent[currentEmotion as keyof typeof personalizedContent];
  
  // Calculate emotion trends
  const calculateEmotionTrend = () => {
    if (emotionData.length < 3) return "Not enough data";
    
    const recentIntensities = emotionData.slice(-3).map(entry => entry.intensity);
    const average = recentIntensities.reduce((a, b) => a + b, 0) / recentIntensities.length;
    const firstIntensity = recentIntensities[0];
    const lastIntensity = recentIntensities[recentIntensities.length - 1];
    
    const trend = lastIntensity < firstIntensity ? "improving" : "worsening";
    
    if (average > 7) return { message: "Your emotions have been intense lately", trend };
    if (average > 5) return { message: "You're experiencing moderate emotional fluctuation", trend };
    return { message: "You've been relatively stable recently", trend };
  };
  
  const trendInfo = calculateEmotionTrend();
  const trendIcon = typeof trendInfo === "string" ? null : 
    trendInfo.trend === "improving" ? <TrendingDown className="text-green-500 ml-2" /> : <TrendingUp className="text-red-500 ml-2" />;
  
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="container max-w-6xl py-16 px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-serif text-navy-700">Personalized Mental Health Resources</h1>
          <p className="text-navy-500 mt-2">Content adapted to your current emotional state and needs</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="border-navy-200 mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-serif flex items-center">
                  <Brain className="mr-2 text-copper" size={20} /> Emotion Tracking
                </CardTitle>
                <CardDescription>
                  Monitor your emotional patterns over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-navy-600 mb-1">Current Emotional State</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-medium capitalize">{currentEmotion}</span>
                      <span className="text-sm text-navy-500">Intensity: {emotionData[emotionData.length - 1].intensity}/10</span>
                    </div>
                    <Progress value={emotionData[emotionData.length - 1].intensity * 10} className="h-2 bg-navy-100" />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-navy-600 mb-1">Recent Trend</h3>
                    <div className="flex items-center">
                      <span className="text-navy-600">
                        {typeof trendInfo === "string" ? trendInfo : trendInfo.message}
                      </span>
                      {trendIcon}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-navy-600 mb-2">Emotion History</h3>
                    <div className="space-y-1">
                      {emotionData.slice().reverse().slice(0, 5).map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-navy-500">{item.date}</span>
                          <div className="flex items-center">
                            <span className="capitalize mr-2">{item.emotion}</span>
                            <span className="bg-navy-100 text-navy-600 px-1.5 py-0.5 rounded-full text-xs">
                              {item.intensity}/10
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/emotion-analyzer">Analyze Current Emotions</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-navy-200">
              <CardHeader>
                <CardTitle className="text-xl font-serif flex items-center">
                  <Heart className="mr-2 text-copper" size={20} /> Your Well-being
                </CardTitle>
                <CardDescription>
                  Track your progress and coping skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <h3 className="text-sm font-medium text-navy-600 mb-1">Well-being Progress</h3>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Recovery Journey</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-navy-100" />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-navy-600 mb-2">Top Coping Skills</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Mindfulness</span>
                      <span className="text-green-500">Strong</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Emotional Regulation</span>
                      <span className="text-amber-500">Developing</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Stress Management</span>
                      <span className="text-green-500">Strong</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="border-navy-200">
              <CardHeader>
                <CardTitle className="text-xl font-serif">
                  {currentContent.title}
                </CardTitle>
                <CardDescription>
                  {currentContent.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="exercises">
                  <TabsList className="mb-4">
                    <TabsTrigger value="exercises" className="flex items-center">
                      <BookOpen className="mr-1" size={16} /> Exercises
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex items-center">
                      <CircleHelp className="mr-1" size={16} /> Resources
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="exercises">
                    <div className="space-y-4">
                      {currentContent.exercises.map((exercise, index) => (
                        <Card key={index} className="bg-navy-50 border-navy-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">{exercise.title}</CardTitle>
                            <CardDescription className="text-xs">Duration: {exercise.duration}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-navy-600">{exercise.description}</p>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" size="sm">Start Exercise</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="resources">
                    <div className="space-y-4">
                      <Card className="bg-navy-50 border-navy-100">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-medium">Recommended Reading</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                              <span>Understanding Emotions After Incarceration</span>
                              <Button variant="link" size="sm" className="text-copper">Read</Button>
                            </li>
                            <li className="flex justify-between items-center">
                              <span>Building Resilience Through Adversity</span>
                              <Button variant="link" size="sm" className="text-copper">Read</Button>
                            </li>
                            <li className="flex justify-between items-center">
                              <span>Mindfulness for Emotional Regulation</span>
                              <Button variant="link" size="sm" className="text-copper">Read</Button>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-navy-50 border-navy-100">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-medium">Support Groups</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                              <span>Virtual Peer Support Circle (Tuesdays, 7PM)</span>
                              <Button variant="link" size="sm" className="text-copper">Join</Button>
                            </li>
                            <li className="flex justify-between items-center">
                              <span>Emotional Wellness Workshop (Thursdays, 6PM)</span>
                              <Button variant="link" size="sm" className="text-copper">Join</Button>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-navy-500">
                  Content adapted to your current emotional state
                </div>
                <Button className="bg-copper hover:bg-copper-600">
                  Find More Resources
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;
