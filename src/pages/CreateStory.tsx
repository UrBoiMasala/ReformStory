
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }).max(100),
  story: z.string().min(50, {
    message: 'Story must be at least 50 characters.',
  }),
  useAnonymous: z.boolean().default(false),
  pseudonym: z.string().optional(),
  tags: z.string().optional(),
  consentToShare: z.boolean().refine(value => value === true, {
    message: 'You must consent to sharing your story.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateStory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      story: '',
      useAnonymous: false,
      pseudonym: '',
      tags: '',
      consentToShare: false,
    },
  });

  const nextStep = () => {
    if (step === 1) {
      const { title, story } = form.getValues();
      if (title.length < 5 || story.length < 50) {
        form.trigger(['title', 'story']);
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data: FormValues) => {
    console.log('Story data:', data);
    
    // In a real app, you'd send this to your API
    toast({
      title: 'Story submitted successfully',
      description: 'Thank you for sharing your story.',
    });
    
    navigate('/dashboard');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="container max-w-3xl py-16 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-serif text-navy-700 mb-6">Share Your Story</h1>
          
          <div className="mb-8">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      i <= step ? 'bg-copper text-white' : 'bg-navy-100 text-navy-400'
                    }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`h-1 w-10 mx-1 ${
                        i < step ? 'bg-copper' : 'bg-navy-100'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-navy-500">
              <span>Write</span>
              <span>Details</span>
              <span>Review</span>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {step === 1 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Story Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a title for your story" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a title that captures the essence of your experience.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="story"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Story</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your experience..."
                            className="min-h-[200px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Write freely. Your story will be reviewed before publishing to ensure privacy and safety.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="useAnonymous"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Remain anonymous
                          </FormLabel>
                          <FormDescription>
                            Your real identity will not be shared.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pseudonym"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pseudonym (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 'Hope Seeker' or 'Justice Advocate'"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Choose a name to publish your story under.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., rehabilitation, mental health, reentry"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Add tags separated by commas to help categorize your story.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-navy-50 p-4 rounded-md">
                    <h3 className="font-medium text-navy-700">Story Preview</h3>
                    <h4 className="text-lg font-serif mt-2">{form.getValues('title')}</h4>
                    <p className="text-navy-600 mt-2 whitespace-pre-line">
                      {form.getValues('story').substring(0, 200)}...
                    </p>
                    <div className="mt-2 text-sm text-navy-500">
                      By: {form.getValues('useAnonymous') 
                        ? (form.getValues('pseudonym') || 'Anonymous') 
                        : user.username}
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="consentToShare"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I consent to sharing my story
                          </FormLabel>
                          <FormDescription>
                            I understand that my story will be publicly visible on ReformStory, and may be used
                            for advocacy purposes. All identifying details will be treated according to my privacy
                            preferences.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormMessage className="text-red-500">
                    {form.formState.errors.consentToShare?.message}
                  </FormMessage>
                </div>
              )}
              
              <div className="mt-10 flex justify-between">
                {step > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                )}
                
                {step < 3 ? (
                  <Button 
                    type="button" 
                    className="bg-copper hover:bg-copper-600 ml-auto"
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="bg-copper hover:bg-copper-600 ml-auto"
                  >
                    Submit Story
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
