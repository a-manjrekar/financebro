
import { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoadmapModule from "@/components/learning/RoadmapModule";
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

const mockLearningModules = [
  {
    id: "finance-basics",
    title: "Finance Basics",
    description: "Learn the fundamental concepts of personal finance",
    progress: 75,
    lessons: [
      { id: "fb-1", title: "Budgeting Fundamentals", description: "Learn how to create and maintain a personal budget", isCompleted: true, xpReward: 20 },
      { id: "fb-2", title: "Saving Strategies", description: "Effective ways to save money and build emergency funds", isCompleted: true, xpReward: 25 },
      { id: "fb-3", title: "Debt Management", description: "Understanding different types of debt and how to manage them", isCompleted: true, xpReward: 30 },
      { id: "fb-4", title: "Investment Basics", description: "Introduction to investment options and strategies", isCompleted: false, xpReward: 35 }
    ],
    isLocked: false
  },
  {
    id: "stock-market",
    title: "Stock Market",
    description: "Understand how stock markets work and how to analyze stocks",
    progress: 30,
    lessons: [
      { id: "sm-1", title: "Introduction to Stock Markets", description: "Learn about the basic functioning of stock markets", isCompleted: true, xpReward: 20 },
      { id: "sm-2", title: "Understanding Stock Prices", description: "Factors that influence stock prices and market movements", isCompleted: true, xpReward: 30 },
      { id: "sm-3", title: "Stock Market Analysis Techniques", description: "Learn about fundamental and technical analysis", isCompleted: false, xpReward: 25 },
      { id: "sm-4", title: "Stock Valuation Methods", description: "Methods to determine if a stock is overvalued or undervalued", isCompleted: false, xpReward: 40 },
      { id: "sm-5", title: "Building a Stock Portfolio", description: "Strategies for creating a diversified stock portfolio", isCompleted: false, xpReward: 45 }
    ],
    isLocked: false
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    description: "Learn about different types of mutual funds and how to invest",
    progress: 0,
    lessons: [
      { id: "mf-1", title: "Mutual Funds Basics", description: "Understanding what mutual funds are and how they work", isCompleted: false, xpReward: 25 },
      { id: "mf-2", title: "Types of Mutual Funds", description: "Explore various categories of mutual funds", isCompleted: false, xpReward: 30 },
      { id: "mf-3", title: "SIP vs Lump Sum Investing", description: "Comparing systematic investment plans with lump sum investments", isCompleted: false, xpReward: 35 },
      { id: "mf-4", title: "Analyzing Fund Performance", description: "Metrics to evaluate mutual fund performance", isCompleted: false, xpReward: 40 }
    ],
    isLocked: true
  },
  {
    id: "tax-planning",
    title: "Tax Planning",
    description: "Strategies to optimize your tax savings legally",
    progress: 0,
    lessons: [
      { id: "tp-1", title: "Tax Basics for Individuals", description: "Understanding the Indian tax system and income slabs", isCompleted: false, xpReward: 30 },
      { id: "tp-2", title: "Tax-Saving Investment Options", description: "Investments that qualify for tax deductions", isCompleted: false, xpReward: 35 },
      { id: "tp-3", title: "Tax Filing Process", description: "Step-by-step guide to filing income tax returns", isCompleted: false, xpReward: 40 }
    ],
    isLocked: true
  },
  {
    id: "insurance",
    title: "Insurance",
    description: "Understand different insurance products and their benefits",
    progress: 0,
    lessons: [],
    isLocked: true
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning",
    description: "Plan for a financially secure retirement",
    progress: 0,
    lessons: [],
    isLocked: true
  }
];

const Learn = () => {
  const [activeTab, setActiveTab] = useState("topics");
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const handleStartModule = (moduleId: string) => {
    setActiveModule(moduleId);
    setActiveTab("current");
    
    toast.success(`Starting module: ${mockLearningModules.find(m => m.id === moduleId)?.title}`, {
      position: "top-center",
    });
  };
  
  const handleStartQuiz = () => {
    setShowQuiz(true);
  };
  
  const handleQuizComplete = (score: number) => {
    toast.success(`Quiz completed! You scored ${score}/${mockQuizQuestions.length}`, {
      position: "top-center",
    });
    setShowQuiz(false);
  };
  
  // Get the current module details
  const currentModule = activeModule 
    ? mockLearningModules.find(m => m.id === activeModule) 
    : mockLearningModules.find(m => m.progress > 0);
  
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
                <TabsTrigger value="topics">Roadmap</TabsTrigger>
                <TabsTrigger value="current">Current Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="topics" className="mt-6">
                <div className="grid grid-cols-1 gap-4">
                  {mockLearningModules.map((module) => (
                    <RoadmapModule
                      key={module.id}
                      id={module.id}
                      title={module.title}
                      description={module.description}
                      progress={module.progress}
                      lessons={module.lessons}
                      isLocked={module.isLocked}
                      onStart={handleStartModule}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="current" className="mt-6">
                {currentModule && (
                  <>
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{currentModule.title}</h2>
                        <p className="text-gray-600">
                          Lesson {currentModule.lessons.filter(l => l.isCompleted).length + 1} of {currentModule.lessons.length}
                        </p>
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
                        <div 
                          className="bg-electric-blue h-2 rounded-full" 
                          style={{ width: `${currentModule.progress}%` }} 
                        />
                      </div>
                      <div className="text-xs mt-1 text-right font-medium">
                        {currentModule.progress}% complete
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      {currentModule.lessons.map((lesson) => (
                        <LessonCard 
                          key={lesson.id}
                          title={lesson.title}
                          description={lesson.description}
                          type={lesson.id.includes("-1") ? "video" : lesson.id.includes("-2") ? "article" : lesson.id.includes("-3") ? "interactive" : "video"}
                          duration={lesson.id.includes("video") ? 10 : lesson.id.includes("article") ? 15 : 20}
                          xpReward={lesson.xpReward}
                          isCompleted={lesson.isCompleted}
                          onClick={() => {
                            if (!lesson.isCompleted) {
                              toast.success(`Started lesson: ${lesson.title}`, {
                                position: "top-center",
                              });
                            }
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="bg-pastel-yellow p-4 rounded-lg mb-6">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">🏆</div>
                        <div>
                          <h3 className="font-bold text-lg">Ready to test your knowledge?</h3>
                          <p className="text-sm mb-4">Take the {currentModule.title.toLowerCase()} quiz to earn XP and unlock the next topic!</p>
                          <Button onClick={handleStartQuiz}>Start Quiz</Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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
