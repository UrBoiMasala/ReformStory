
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Mic, Video, Info, User, Eye, EyeOff, Check } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Submission steps
const STEPS = {
  CONSENT: 'consent',
  STORY_TYPE: 'storyType',
  AUTHOR_INFO: 'authorInfo',
  SUBMISSION: 'submission',
  PREVIEW: 'preview',
};

// Story types
const STORY_TYPES = {
  WRITTEN: 'written',
  AUDIO: 'audio',
  VIDEO: 'video',
};

// Tags for categorizing stories
const AVAILABLE_TAGS = [
  'Life Inside', 'Life After', 'Solitary', 'Reentry',
  'Wrongful Conviction', 'Legal System', 'Mental Health',
  'Family', 'Education', 'Work', 'Advocacy',
  'Prison Conditions', 'Parole', 'Probation'
];

// Categories
const CATEGORIES = [
  'Life Inside',
  'Life After',
  'Legal Abuse',
  'Advocacy',
  'Family Impact',
  'Personal Journey'
];

const SubmitStory = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.CONSENT);
  const [selectedStoryType, setSelectedStoryType] = useState(STORY_TYPES.WRITTEN);
  const [consentGiven, setConsentGiven] = useState(false);
  const [anonymityChoice, setAnonymityChoice] = useState('pseudonym');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submittedStory, setSubmittedStory] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: '',
      category: '',
      authorName: '',
      content: '',
      email: '',
    }
  });

  const handleNextStep = () => {
    if (currentStep === STEPS.CONSENT) {
      if (!consentGiven) {
        toast({
          title: "Consent Required",
          description: "Please review and agree to the terms before continuing.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(STEPS.STORY_TYPE);
    } 
    else if (currentStep === STEPS.STORY_TYPE) {
      setCurrentStep(STEPS.AUTHOR_INFO);
    }
    else if (currentStep === STEPS.AUTHOR_INFO) {
      setCurrentStep(STEPS.SUBMISSION);
    }
    else if (currentStep === STEPS.SUBMISSION) {
      const values = form.getValues();
      setSubmittedStory({
        ...values,
        anonymityChoice,
        selectedTags,
        storyType: selectedStoryType
      });
      setCurrentStep(STEPS.PREVIEW);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Story Submitted",
      description: "Thank you for sharing your story with us. It will be reviewed by our team.",
    });
    // In a real implementation, this would save to a database
    console.log("Story submitted:", submittedStory);
  };

  const handlePreviousStep = () => {
    if (currentStep === STEPS.STORY_TYPE) setCurrentStep(STEPS.CONSENT);
    else if (currentStep === STEPS.AUTHOR_INFO) setCurrentStep(STEPS.STORY_TYPE);
    else if (currentStep === STEPS.SUBMISSION) setCurrentStep(STEPS.AUTHOR_INFO);
    else if (currentStep === STEPS.PREVIEW) setCurrentStep(STEPS.SUBMISSION);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case STEPS.CONSENT:
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-navy-100">
            <h2 className="text-2xl font-serif mb-6">Consent & Privacy</h2>
            
            <div className="mb-6 bg-navy-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="text-navy-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-navy-600 text-sm">
                  Your safety and privacy are our highest priorities. Please review the following information before sharing your story.
                </p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <h3 className="font-medium">How Your Story Will Be Used:</h3>
                <p className="text-navy-600 text-sm">
                  Stories shared on ReformStory are publicly viewable and may be featured on our platform to raise awareness about justice reform. We may share anonymized data with trusted research partners studying criminal justice reform.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Privacy Safeguards:</h3>
                <ul className="list-disc list-inside text-navy-600 text-sm space-y-2">
                  <li>You can share anonymously or use a pseudonym</li>
                  <li>We automatically redact identifying information</li>
                  <li>You retain full control to edit or delete your story at any time</li>
                  <li>We use encryption to protect your data</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Content Guidelines:</h3>
                <p className="text-navy-600 text-sm">
                  We ask that you don't include names of other individuals, specific dates/locations that could identify others, or details of ongoing legal proceedings. All stories undergo a brief review to ensure they meet our community guidelines.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 mb-8">
              <Checkbox 
                id="consent" 
                checked={consentGiven}
                onCheckedChange={(checked) => setConsentGiven(checked === true)}
              />
              <label 
                htmlFor="consent" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I understand and agree to the terms and privacy policy for sharing my story
              </label>
            </div>
          </div>
        );
        
      case STEPS.STORY_TYPE:
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-navy-100">
            <h2 className="text-2xl font-serif mb-6">How Would You Like to Share Your Story?</h2>
            <p className="text-navy-400 mb-8">
              Choose the format that feels most comfortable for expressing your experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div 
                className={`border p-6 rounded-lg flex flex-col items-center text-center cursor-pointer transition-all
                  ${selectedStoryType === STORY_TYPES.WRITTEN ? 'border-copper bg-copper-50' : 'border-navy-100 hover:border-navy-300'}`}
                onClick={() => setSelectedStoryType(STORY_TYPES.WRITTEN)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${selectedStoryType === STORY_TYPES.WRITTEN ? 'bg-copper text-white' : 'bg-navy-100'}`}>
                  <Upload size={24} />
                </div>
                <h3 className="font-medium mb-2">Written Story</h3>
                <p className="text-sm text-navy-400">
                  Type or paste your story in your own words
                </p>
              </div>
              
              <div 
                className={`border p-6 rounded-lg flex flex-col items-center text-center cursor-pointer transition-all
                  ${selectedStoryType === STORY_TYPES.AUDIO ? 'border-copper bg-copper-50' : 'border-navy-100 hover:border-navy-300'}`}
                onClick={() => setSelectedStoryType(STORY_TYPES.AUDIO)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${selectedStoryType === STORY_TYPES.AUDIO ? 'bg-copper text-white' : 'bg-navy-100'}`}>
                  <Mic size={24} />
                </div>
                <h3 className="font-medium mb-2">Audio Recording</h3>
                <p className="text-sm text-navy-400">
                  Record or upload an audio file
                </p>
              </div>
              
              <div 
                className={`border p-6 rounded-lg flex flex-col items-center text-center cursor-pointer transition-all
                  ${selectedStoryType === STORY_TYPES.VIDEO ? 'border-copper bg-copper-50' : 'border-navy-100 hover:border-navy-300'}`}
                onClick={() => setSelectedStoryType(STORY_TYPES.VIDEO)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${selectedStoryType === STORY_TYPES.VIDEO ? 'bg-copper text-white' : 'bg-navy-100'}`}>
                  <Video size={24} />
                </div>
                <h3 className="font-medium mb-2">Video Story</h3>
                <p className="text-sm text-navy-400">
                  Record or upload a video file
                </p>
              </div>
            </div>
          </div>
        );
        
      case STEPS.AUTHOR_INFO:
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-navy-100">
            <h2 className="text-2xl font-serif mb-6">Author Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">How would you like your story to appear?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    className={`border p-4 rounded-lg cursor-pointer ${anonymityChoice === 'pseudonym' ? 'border-copper bg-copper-50' : 'border-navy-100'}`}
                    onClick={() => setAnonymityChoice('pseudonym')}
                  >
                    <div className="flex items-center space-x-3">
                      <User className={`${anonymityChoice === 'pseudonym' ? 'text-copper' : 'text-navy-300'}`} size={20} />
                      <div>
                        <h4 className="font-medium">Use a Pseudonym</h4>
                        <p className="text-xs text-navy-400">Display a pen name instead of your real name</p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`border p-4 rounded-lg cursor-pointer ${anonymityChoice === 'anonymous' ? 'border-copper bg-copper-50' : 'border-navy-100'}`}
                    onClick={() => setAnonymityChoice('anonymous')}
                  >
                    <div className="flex items-center space-x-3">
                      <EyeOff className={`${anonymityChoice === 'anonymous' ? 'text-copper' : 'text-navy-300'}`} size={20} />
                      <div>
                        <h4 className="font-medium">Anonymous</h4>
                        <p className="text-xs text-navy-400">No name will be displayed with your story</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {anonymityChoice === 'pseudonym' ? 'Pseudonym' : 'Optional Contact Email'}
                  </label>
                  <Input 
                    placeholder={anonymityChoice === 'pseudonym' ? "How you'd like to be identified (e.g., 'Former Resident of TX')" : "Your email (only visible to admins)"}
                    {...form.register('authorName')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address (optional, never publicly displayed)
                  </label>
                  <Input 
                    type="email" 
                    placeholder="For notifications about your submission"
                    {...form.register('email')}
                  />
                  <p className="text-xs text-navy-400 mt-1">
                    We'll only use this to notify you about your submission status or if we need to contact you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case STEPS.SUBMISSION:
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-navy-100">
            <h2 className="text-2xl font-serif mb-6">Share Your Story</h2>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title of Your Story</label>
                  <Input 
                    placeholder="Give your story a title"
                    {...form.register('title')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select 
                    className="w-full border border-input rounded-md h-10 px-3 bg-background"
                    {...form.register('category')}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                {selectedStoryType === STORY_TYPES.WRITTEN && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Story</label>
                    <Textarea 
                      placeholder="Share your experience in your own words..."
                      className="min-h-[200px]"
                      {...form.register('content')}
                    />
                  </div>
                )}
                
                {selectedStoryType === STORY_TYPES.AUDIO && (
                  <div className="border-2 border-dashed border-navy-200 rounded-lg p-8 text-center">
                    <Mic className="mx-auto text-navy-400 mb-3" size={32} />
                    <h3 className="font-medium mb-2">Upload Audio Recording</h3>
                    <p className="text-sm text-navy-400 mb-4">
                      Upload an MP3 or WAV file (max 20MB)
                    </p>
                    <Button>Upload Audio File</Button>
                    <p className="mt-4 text-xs text-navy-300">
                      Or use the recorder below to record directly
                    </p>
                  </div>
                )}
                
                {selectedStoryType === STORY_TYPES.VIDEO && (
                  <div className="border-2 border-dashed border-navy-200 rounded-lg p-8 text-center">
                    <Video className="mx-auto text-navy-400 mb-3" size={32} />
                    <h3 className="font-medium mb-2">Upload Video</h3>
                    <p className="text-sm text-navy-400 mb-4">
                      Upload an MP4 or MOV file (max 100MB)
                    </p>
                    <Button>Upload Video File</Button>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (select up to 5)</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_TAGS.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors
                          ${selectedTags.includes(tag) 
                            ? 'bg-navy-500 text-white' 
                            : 'bg-navy-100 text-navy-600 hover:bg-navy-200'}`}
                        disabled={selectedTags.length >= 5 && !selectedTags.includes(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {selectedTags.length >= 5 && (
                    <p className="text-xs text-navy-400 mt-2">
                      Maximum of 5 tags reached
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case STEPS.PREVIEW:
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-navy-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif">Preview Your Story</h2>
              <Button variant="outline" onClick={() => setCurrentStep(STEPS.SUBMISSION)}>
                Edit Story
              </Button>
            </div>
            
            <div className="mb-8 border-b border-navy-100 pb-6">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-navy-100 text-navy-600">
                  {submittedStory?.category || 'Uncategorized'}
                </span>
                <span className="text-sm text-navy-400">Preview Only</span>
              </div>
              
              <h3 className="text-2xl font-serif font-medium mb-4 mt-4">
                {submittedStory?.title || 'Untitled Story'}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-navy-400 mb-6">
                <span>By {anonymityChoice === 'pseudonym' ? submittedStory?.authorName || 'Pseudonym' : 'Anonymous'}</span>
              </div>
              
              {selectedStoryType === STORY_TYPES.WRITTEN && (
                <div className="prose max-w-none text-navy-600">
                  <p>{submittedStory?.content || 'No content provided.'}</p>
                </div>
              )}
              
              {selectedStoryType === STORY_TYPES.AUDIO && (
                <div className="bg-navy-50 p-4 rounded-lg text-center">
                  <p className="text-navy-400">Audio file preview would appear here</p>
                </div>
              )}
              
              {selectedStoryType === STORY_TYPES.VIDEO && (
                <div className="bg-navy-50 p-4 rounded-lg text-center">
                  <p className="text-navy-400">Video file preview would appear here</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mt-6">
                {submittedStory?.selectedTags?.map((tag: string) => (
                  <span key={tag} className="text-xs bg-navy-50 text-navy-500 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-navy-50 p-4 rounded-lg mb-6">
              <div className="flex items-start space-x-3">
                <Info className="text-navy-500 mt-1" size={18} />
                <div>
                  <h4 className="font-medium text-sm mb-1">What happens next?</h4>
                  <p className="text-sm text-navy-600">
                    Your story will be reviewed by our team within 1-2 business days. We may make minor edits to protect privacy or clarity, but will never change the substance of your story.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 mb-8">
              <Checkbox id="final-consent" defaultChecked />
              <label 
                htmlFor="final-consent" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that I want to submit this story for publication on ReformStory
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Share Your Story</h1>
            <p className="text-navy-400">
              Your experience matters and can help drive meaningful change in our justice system. 
            </p>
          </div>
          
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === STEPS.CONSENT || currentStep === STEPS.STORY_TYPE || currentStep === STEPS.AUTHOR_INFO || currentStep === STEPS.SUBMISSION || currentStep === STEPS.PREVIEW ? 'bg-navy text-white' : 'bg-navy-100 text-navy'}`}>
                  {currentStep === STEPS.CONSENT || currentStep === STEPS.STORY_TYPE || currentStep === STEPS.AUTHOR_INFO || currentStep === STEPS.SUBMISSION || currentStep === STEPS.PREVIEW ? <Check size={16} /> : 1}
                </div>
                <span className="text-sm font-medium">Consent</span>
              </div>
              
              <div className="flex-1 h-px bg-navy-100 mx-2"></div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === STEPS.STORY_TYPE || currentStep === STEPS.AUTHOR_INFO || currentStep === STEPS.SUBMISSION || currentStep === STEPS.PREVIEW ? 'bg-navy text-white' : 'bg-navy-100 text-navy'}`}>
                  {currentStep === STEPS.AUTHOR_INFO || currentStep === STEPS.SUBMISSION || currentStep === STEPS.PREVIEW ? <Check size={16} /> : 2}
                </div>
                <span className="text-sm font-medium">Format</span>
              </div>
              
              <div className="flex-1 h-px bg-navy-100 mx-2"></div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === STEPS.AUTHOR_INFO || currentStep === STEPS.SUBMISSION || currentStep === STEPS.PREVIEW ? 'bg-navy text-white' : 'bg-navy-100 text-navy'}`}>
                  {currentStep === STEPS.SUBMISSION || currentStep === STEPS.PREVIEW ? <Check size={16} /> : 3}
                </div>
                <span className="text-sm font-medium">Identity</span>
              </div>
              
              <div className="flex-1 h-px bg-navy-100 mx-2"></div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === STEPS.SUBMISSION || currentStep === STEPS.PREVIEW ? 'bg-navy text-white' : 'bg-navy-100 text-navy'}`}>
                  {currentStep === STEPS.PREVIEW ? <Check size={16} /> : 4}
                </div>
                <span className="text-sm font-medium">Story</span>
              </div>
              
              <div className="flex-1 h-px bg-navy-100 mx-2"></div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === STEPS.PREVIEW ? 'bg-navy text-white' : 'bg-navy-100 text-navy'}`}>
                  5
                </div>
                <span className="text-sm font-medium">Preview</span>
              </div>
            </div>
          </div>
          
          {renderStep()}
          
          <div className="mt-8 flex justify-between">
            {currentStep !== STEPS.CONSENT && (
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
            )}
            
            {currentStep !== STEPS.PREVIEW ? (
              <Button className="ml-auto" onClick={handleNextStep}>
                Continue
              </Button>
            ) : (
              <Button className="ml-auto" onClick={handleSubmit}>
                Submit Story
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitStory;
