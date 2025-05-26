
import React from 'react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users } from 'lucide-react';

const formSchema = z.object({
  reason: z.string().min(20, {
    message: "Please provide at least 20 characters about why you're seeking counseling.",
  }),
  preferredTime: z.string().min(1, {
    message: 'Please indicate your preferred contact time.',
  }),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Counseling = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: '',
      preferredTime: '',
      additionalInfo: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Counseling request:', data);
    
    // In a real app, you'd send this to your API
    toast({
      title: 'Counseling request submitted',
      description: 'A counselor will contact you soon.',
    });
    
    navigate('/dashboard');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="container max-w-6xl py-16 px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-serif text-navy-700">Counseling Support</h1>
          <p className="text-navy-500 mt-2">Request one-on-one counseling to discuss your experiences and get personalized support.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="border-navy-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare size={18} className="mr-2 text-copper" /> How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium">1. Submit a Request</h3>
                    <p className="text-navy-500">Fill out the form with information about what you'd like support with.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">2. Get Matched</h3>
                    <p className="text-navy-500">We'll connect you with an appropriate counselor who specializes in your area of need.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">3. Schedule Session</h3>
                    <p className="text-navy-500">A counselor will contact you to arrange a convenient time.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-navy-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users size={18} className="mr-2 text-copper" /> Our Counselors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-navy-500">
                    Our counselors are trained professionals with experience in:
                  </p>
                  <ul className="list-disc pl-5 text-navy-500">
                    <li>Trauma support</li>
                    <li>Reentry counseling</li>
                    <li>Family reunification</li>
                    <li>Substance abuse recovery</li>
                    <li>Mental health support</li>
                  </ul>
                  <p className="text-navy-500 mt-4">
                    All sessions are confidential and provided at no cost to you.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="border-navy-200">
              <CardHeader>
                <CardTitle>Request Counseling</CardTitle>
                <CardDescription>
                  Please provide some information so we can connect you with the right counselor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What would you like help with?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="I'm seeking support for..."
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Briefly describe what you're experiencing and what kind of support you're looking for.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Contact Time</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Weekday evenings, Monday mornings, etc."
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Let us know when would be convenient for a counselor to reach out to you.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any other details that might help us connect you with the right counselor..."
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Add any other details that might help us understand your needs better.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button type="submit" className="bg-copper hover:bg-copper-600">
                        Submit Request
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counseling;
