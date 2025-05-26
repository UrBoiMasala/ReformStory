
import React from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturedStories from "@/components/FeaturedStories";
import WhyItMatters from "@/components/WhyItMatters";
import Partners from "@/components/Partners";
import JoinUs from "@/components/JoinUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <FeaturedStories />
        <WhyItMatters />
        <Partners />
        <JoinUs />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
