
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="container max-w-md mx-auto py-16 px-4">
        <Card className="border-navy-200 shadow-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Button 
                variant={activeTab === 'login' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('login')}
                className={activeTab === 'login' ? 'bg-copper hover:bg-copper-600' : ''}
              >
                Login
              </Button>
              <Button 
                variant={activeTab === 'register' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('register')}
                className={`ml-2 ${activeTab === 'register' ? 'bg-copper hover:bg-copper-600' : ''}`}
              >
                Register
              </Button>
            </div>
            <CardTitle className="text-center font-serif text-2xl text-navy-600">
              {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <p className="text-sm text-navy-400 text-center px-6 my-2">
              By {activeTab === 'login' ? 'logging in' : 'registering'}, you agree to our 
              <Link to="/terms" className="text-copper hover:text-copper-600 ml-1">
                Terms of Service
              </Link> and 
              <Link to="/privacy" className="text-copper hover:text-copper-600 ml-1">
                Privacy Policy
              </Link>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
