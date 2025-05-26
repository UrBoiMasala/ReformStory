
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import AllStories from "./pages/AllStories";
import StoryView from "./pages/StoryView";
import SubmitStory from "./pages/SubmitStory";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateStory from "./pages/CreateStory";
import Counseling from "./pages/Counseling";
import MyStories from "./pages/MyStories";
import MentalHealth from "./pages/MentalHealth";
import EmotionAnalyzer from "./pages/EmotionAnalyzer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stories" element={<AllStories />} />
            <Route path="/stories/:storyId" element={<StoryView />} />
            <Route path="/submit" element={<SubmitStory />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-story" element={<CreateStory />} />
            <Route path="/counseling" element={<Counseling />} />
            <Route path="/my-stories" element={<MyStories />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/emotion-analyzer" element={<EmotionAnalyzer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
