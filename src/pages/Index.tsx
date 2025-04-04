
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, MessageCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import Onboarding from "@/components/Onboarding";
import TopicCard from "@/components/learning/TopicCard";

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading and checking onboarding status
  useEffect(() => {
    const checkOnboarding = () => {
      // In a real app, this would check local storage or an API
      const completed = localStorage.getItem("onboardingCompleted") === "true";
      setHasCompletedOnboarding(completed);
      setIsLoading(false);
    };
    
    const timer = setTimeout(checkOnboarding, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setHasCompletedOnboarding(true);
  };
  
  // Show onboarding if user hasn't completed it
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-blue via-white to-pastel-green">
        <div className="animate-pulse-scale flex flex-col items-center">
          <div className="text-4xl font-bold text-electric-blue mb-2">FinFun</div>
          <div className="text-lg text-gray-600">Loading your financial journey...</div>
        </div>
      </div>
    );
  }
  
  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }
  
  // Main dashboard content
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to FinFun!</h1>
          <p className="text-gray-600">Your journey to financial literacy starts here.</p>
        </div>
        
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-electric-blue to-blue-600 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex-1 mb-4 sm:mb-0">
                  <h2 className="text-2xl font-bold mb-2">Continue Learning</h2>
                  <p className="mb-4 opacity-90">
                    Pick up where you left off: Stock Market Basics
                  </p>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-electric-blue hover:bg-gray-100"
                    asChild
                  >
                    <Link to="/learn">
                      Continue Learning
                    </Link>
                  </Button>
                </div>
                <div className="flex-shrink-0 ml-0 sm:ml-6">
                  <div className="bg-white/20 rounded-full p-6 backdrop-blur-sm">
                    <BookOpen className="w-16 h-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Learning Roadmap</h2>
            <Link to="/learn" className="text-electric-blue font-medium text-sm">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TopicCard 
              title="Finance Basics"
              description="Learn the fundamental concepts of personal finance"
              icon="💰"
              bgColor="bg-pastel-blue"
              progress={75}
              isCompleted={false}
              onClick={() => {}}
            />
            
            <TopicCard 
              title="Stock Market"
              description="Understand how stock markets work and how to analyze stocks"
              icon="📈"
              bgColor="bg-pastel-green"
              progress={30}
              isCompleted={false}
              onClick={() => {}}
            />
            
            <TopicCard 
              title="Mutual Funds"
              description="Learn about different types of mutual funds and how to invest"
              icon="📊"
              bgColor="bg-pastel-yellow"
              progress={0}
              isLocked={true}
              isCompleted={false}
              onClick={() => {}}
            />
            
            <TopicCard 
              title="Tax Planning"
              description="Strategies to optimize your tax savings legally"
              icon="📝"
              bgColor="bg-pastel-purple"
              progress={0}
              isLocked={true}
              isCompleted={false}
              onClick={() => {}}
            />
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-electric-blue" />
                Fantasy Trading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-3">
                Join today's contest and build your fantasy portfolio
              </p>
              <Button asChild className="w-full">
                <Link to="/fantasy">Play Now</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-electric-blue" />
                Expert Q&A
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-3">
                Ask your financial questions to our expert community
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/qa">Ask a Question</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award className="w-5 h-5 mr-2 text-electric-blue" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-3">
                You've earned 5/20 badges. Complete lessons to earn more!
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/profile">View Achievements</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
