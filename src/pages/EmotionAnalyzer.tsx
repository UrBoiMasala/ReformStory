
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Brain, Activity } from 'lucide-react';

// Mock emotion analysis function
// In a real app, this would be an API call to an NLP service
const analyzeEmotion = (text: string) => {
  // This is a very simplistic mock emotion analysis
  // A real implementation would use NLP or a language model
  const emotions = {
    anxious: 0,
    stressed: 0,
    sad: 0,
    angry: 0
  };
  
  const anxiousWords = ['worry', 'anxious', 'nervous', 'afraid', 'fear', 'panic', 'uncertain'];
  const stressedWords = ['stress', 'pressure', 'overwhelm', 'tense', 'burnout', 'exhausted'];
  const sadWords = ['sad', 'depress', 'hopeless', 'grief', 'loss', 'alone', 'empty'];
  const angryWords = ['angry', 'mad', 'frustrat', 'irritat', 'upset', 'rage', 'resent'];
  
  const lowerText = text.toLowerCase();
  
  anxiousWords.forEach(word => {
    if (lowerText.includes(word)) emotions.anxious += 1;
  });
  
  stressedWords.forEach(word => {
    if (lowerText.includes(word)) emotions.stressed += 1;
  });
  
  sadWords.forEach(word => {
    if (lowerText.includes(word)) emotions.sad += 1;
  });
  
  angryWords.forEach(word => {
    if (lowerText.includes(word)) emotions.angry += 1;
  });
  
  // Find the dominant emotion
  let dominant = 'neutral';
  let highestScore = 0;
  
  Object.entries(emotions).forEach(([emotion, score]) => {
    if (score > highestScore) {
      dominant = emotion;
      highestScore = score;
    }
  });
  
  // Fallback if no emotions detected
  if (highestScore === 0) {
    return {
      dominant: 'neutral',
      intensity: 3,
      breakdown: {
        anxious: 0,
        stressed: 0,
        sad: 0,
        angry: 0
      }
    };
  }
  
  // Calculate intensity (1-10)
  // In a real app, this would be more sophisticated
  const intensity = Math.min(Math.round(highestScore * 1.5) + 3, 10);
  
  return {
    dominant,
    intensity,
    breakdown: emotions
  };
};

const EmotionAnalyzer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [storyText, setStoryText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<null | {
    dominant: string;
    intensity: number;
    breakdown: {
      anxious: number;
      stressed: number;
      sad: number;
      angry: number;
    };
  }>(null);
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleAnalyze = () => {
    if (storyText.length < 20) {
      toast({
        title: "Text too short",
        description: "Please write at least 20 characters to analyze emotions.",
        variant: "destructive"
      });
      return;
    }
    
    const result = analyzeEmotion(storyText);
    setAnalysisResult(result);
  };
  
  const handleSave = () => {
    if (!analysisResult) return;
    
    // In a real app, this would save to a database
    toast({
      title: "Emotion data saved",
      description: "Your emotional data has been recorded and will inform your personalized content."
    });
    
    navigate('/mental-health');
  };

  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="container max-w-4xl py-16 px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-serif text-navy-700">AI Emotion Analysis</h1>
          <p className="text-navy-500 mt-2">
            Share your thoughts to get insights into your emotional state and receive personalized resources
          </p>
        </div>
        
        <Card className="border-navy-200 mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-serif flex items-center">
              <Brain className="mr-2 text-copper" size={20} /> How Are You Feeling Today?
            </CardTitle>
            <CardDescription>
              Write about your current thoughts, feelings, or experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="I've been feeling..."
              className="min-h-[200px]"
            />
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleAnalyze} 
              className="bg-copper hover:bg-copper-600 w-full"
            >
              Analyze My Emotions
            </Button>
          </CardFooter>
        </Card>
        
        {analysisResult && (
          <Card className="border-navy-200">
            <CardHeader>
              <CardTitle className="text-xl font-serif flex items-center">
                <Activity className="mr-2 text-copper" size={20} /> Emotion Analysis Results
              </CardTitle>
              <CardDescription>
                Here's what our AI detected in your writing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Primary Emotion: <span className="capitalize text-copper">{analysisResult.dominant}</span></h3>
                  <p className="text-navy-600">
                    Intensity: <span className="font-medium">{analysisResult.intensity}/10</span>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Emotional Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(analysisResult.breakdown).map(([emotion, score]) => (
                      <div key={emotion} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{emotion}</span>
                          <span>{score * 10}%</span>
                        </div>
                        <div className="w-full bg-navy-100 rounded-full h-2">
                          <div 
                            className="bg-copper rounded-full h-2" 
                            style={{ width: `${score * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-navy-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">AI Recommendations</h3>
                  <p className="text-navy-600 mb-3">
                    Based on your emotional state, we recommend focusing on {analysisResult.dominant === 'neutral' ? 'general wellbeing' : analysisResult.dominant} management techniques.
                  </p>
                  <p className="text-navy-600">
                    Visit the Mental Health page for personalized resources targeted to your current emotional needs.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setAnalysisResult(null)}
              >
                Clear Results
              </Button>
              <Button 
                onClick={handleSave} 
                className="bg-copper hover:bg-copper-600"
              >
                Save & View Resources
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmotionAnalyzer;
