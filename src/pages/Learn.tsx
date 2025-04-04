
import { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopicCard from "@/components/learning/TopicCard";
import LessonCard from "@/components/learning/LessonCard";
import Quiz from "@/components/learning/Quiz";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const mockQuizQuestions = [
  {
    id: "q1",
    question: "What is the primary function of the stock market?",
    options: [
      { id: "a", text: "To provide loans to businesses" },
      { id: "b", text: "To allow companies to raise capital by selling shares" },
      { id: "c", text: "To regulate banking activities" },
      { id: "d", text: "To print money for circulation" }
    ],
    correctOptionId: "b",
    explanation: "The stock market allows companies to raise capital by selling ownership shares to investors, enabling business growth without taking on debt."
  },
  {
    id: "q2",
    question: "What does P/E ratio stand for?",
    options: [
      { id: "a", text: "Profit/Earnings" },
      { id: "b", text: "Price/Estimate" },
      { id: "c", text: "Price/Earnings" },
      { id: "d", text: "Potential/Evaluation" }
    ],
    correctOptionId: "c",
    explanation: "P/E (Price-to-Earnings) ratio measures a company's current share price relative to its earnings per share, helping investors assess if a stock is overvalued or undervalued."
  },
  {
    id: "q3",
    question: "What is a bull market?",
    options: [
      { id: "a", text: "A market where prices are falling" },
      { id: "b", text: "A market where prices are rising" },
      { id: "c", text: "A market with high volatility" },
      { id: "d", text: "A market dominated by agricultural stocks" }
    ],
    correctOptionId: "b",
    explanation: "A bull market refers to a financial market where prices are rising or expected to rise, typically characterized by investor confidence and optimism."
  }
];

const Learn = () => {
  const [activeTab, setActiveTab] = useState("topics");
  const [showQuiz, setShowQuiz] = useState(false);
  
  const handleStartQuiz = () => {
    setShowQuiz(true);
  };
  
  const handleQuizComplete = (score: number) => {
    toast.success(`Quiz completed! You scored ${score}/${mockQuizQuestions.length}`, {
      position: "top-center",
    });
    setShowQuiz(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        {showQuiz ? (
          <div className="mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-4"
              onClick={() => setShowQuiz(false)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Lessons
            </Button>
            
            <Quiz 
              questions={mockQuizQuestions}
              onComplete={handleQuizComplete}
            />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Learning Hub</h1>
              <p className="text-gray-600">Master financial concepts at your own pace</p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="topics">Topics</TabsTrigger>
                <TabsTrigger value="current">Current Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="topics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TopicCard 
                    title="Finance Basics"
                    description="Learn the fundamental concepts of personal finance"
                    icon="💰"
                    bgColor="bg-pastel-blue"
                    progress={75}
                    isCompleted={false}
                    onClick={() => setActiveTab("current")}
                  />
                  
                  <TopicCard 
                    title="Stock Market"
                    description="Understand how stock markets work and how to analyze stocks"
                    icon="📈"
                    bgColor="bg-pastel-green"
                    progress={30}
                    isCompleted={false}
                    onClick={() => setActiveTab("current")}
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
                  
                  <TopicCard 
                    title="Insurance"
                    description="Understand different insurance products and their benefits"
                    icon="🛡️"
                    bgColor="bg-pastel-pink"
                    progress={0}
                    isLocked={true}
                    isCompleted={false}
                    onClick={() => {}}
                  />
                  
                  <TopicCard 
                    title="Retirement Planning"
                    description="Plan for a financially secure retirement"
                    icon="👴"
                    bgColor="bg-pastel-blue"
                    progress={0}
                    isLocked={true}
                    isCompleted={false}
                    onClick={() => {}}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="current" className="mt-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Stock Market Basics</h2>
                    <p className="text-gray-600">Lesson 3 of 5</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Button variant="outline" className="mr-2" size="sm">
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Prev
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-electric-blue h-2 rounded-full" style={{ width: "60%" }} />
                  </div>
                  <div className="text-xs mt-1 text-right font-medium">
                    60% complete
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <LessonCard 
                    title="Introduction to Stock Markets"
                    description="Learn about the basic functioning of stock markets"
                    type="video"
                    duration={10}
                    xpReward={20}
                    isCompleted={true}
                    onClick={() => {}}
                  />
                  
                  <LessonCard 
                    title="Understanding Stock Prices"
                    description="Factors that influence stock prices and market movements"
                    type="article"
                    duration={15}
                    xpReward={30}
                    isCompleted={true}
                    onClick={() => {}}
                  />
                  
                  <LessonCard 
                    title="Stock Market Analysis Techniques"
                    description="Learn about fundamental and technical analysis"
                    type="video"
                    duration={12}
                    xpReward={25}
                    isCompleted={false}
                    onClick={() => {}}
                  />
                  
                  <LessonCard 
                    title="Stock Valuation Methods"
                    description="Methods to determine if a stock is overvalued or undervalued"
                    type="interactive"
                    duration={20}
                    xpReward={40}
                    isCompleted={false}
                    onClick={() => {}}
                  />
                </div>
                
                <div className="bg-pastel-yellow p-4 rounded-lg mb-6">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">🏆</div>
                    <div>
                      <h3 className="font-bold text-lg">Ready to test your knowledge?</h3>
                      <p className="text-sm mb-4">Take the stock market basics quiz to earn XP and unlock the next topic!</p>
                      <Button onClick={handleStartQuiz}>Start Quiz</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Learn;
