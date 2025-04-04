
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoadmapModule from "@/components/learning/RoadmapModule";
import LessonCard from "@/components/learning/LessonCard";
import Quiz from "@/components/learning/Quiz";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    lessons: [
      { id: "ins-1", title: "Insurance Basics", description: "Understanding the concept of insurance and risk management", isCompleted: false, xpReward: 25 },
      { id: "ins-2", title: "Life Insurance", description: "Types of life insurance policies and their benefits", isCompleted: false, xpReward: 30 },
      { id: "ins-3", title: "Health Insurance", description: "How health insurance works and choosing the right plan", isCompleted: false, xpReward: 35 },
      { id: "ins-4", title: "Other Insurance Types", description: "Vehicle, home, and travel insurance explained", isCompleted: false, xpReward: 30 }
    ],
    isLocked: true
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning",
    description: "Plan for a financially secure retirement",
    progress: 0,
    lessons: [
      { id: "rp-1", title: "Retirement Planning Basics", description: "Why start early and how much to save", isCompleted: false, xpReward: 30 },
      { id: "rp-2", title: "Retirement Investment Vehicles", description: "PPF, NPS, EPF and other retirement products", isCompleted: false, xpReward: 35 },
      { id: "rp-3", title: "Creating a Retirement Roadmap", description: "Step-by-step approach to retirement planning", isCompleted: false, xpReward: 40 }
    ],
    isLocked: true
  }
];

// Lesson content types for the Duolingo-style learning
const LESSON_CONTENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  INTERACTIVE: 'interactive',
  QUIZ: 'quiz'
};

// Sample lesson content for Duolingo-style learning
const mockLessonContent = {
  "fb-4": [
    {
      type: LESSON_CONTENT_TYPES.TEXT,
      content: "# Investment Basics\n\nInvesting is putting money to work to generate returns. It differs from saving, which is setting money aside for future use without significant growth. When you invest, your money has the potential to grow over time."
    },
    {
      type: LESSON_CONTENT_TYPES.IMAGE,
      content: "https://via.placeholder.com/600x400?text=Investment+Types",
      caption: "Different types of investments"
    },
    {
      type: LESSON_CONTENT_TYPES.TEXT,
      content: "## Types of Investments\n\n- **Stocks**: Ownership in a company\n- **Bonds**: Lending money to a company or government\n- **Mutual Funds**: Collection of stocks, bonds, or other securities\n- **Real Estate**: Property and land investments\n- **Fixed Deposits**: Time deposits with banks"
    },
    {
      type: LESSON_CONTENT_TYPES.INTERACTIVE,
      content: "Match the investment type with its description",
      items: [
        { id: 1, term: "Stocks", definition: "Ownership in a company" },
        { id: 2, term: "Bonds", definition: "Lending money to an entity" },
        { id: 3, term: "Mutual Funds", definition: "Collection of securities" },
        { id: 4, term: "Real Estate", definition: "Property investments" }
      ]
    },
    {
      type: LESSON_CONTENT_TYPES.TEXT,
      content: "## Risk and Return\n\nGenerally, investments with higher potential returns carry higher risks. It's important to understand your risk tolerance before investing."
    },
    {
      type: LESSON_CONTENT_TYPES.QUIZ,
      question: "Which of these typically has the highest risk?",
      options: [
        { id: "a", text: "Government bonds" },
        { id: "b", text: "Blue-chip company stocks" },
        { id: "c", text: "Small-cap startup stocks" },
        { id: "d", text: "Fixed deposits" }
      ],
      correctOptionId: "c",
      explanation: "Small-cap startup stocks typically have the highest risk because these companies are less established and more prone to failure compared to blue-chip companies or government-backed investments."
    }
  ],
  "sm-3": [
    // Content for Stock Market Analysis Techniques
    {
      type: LESSON_CONTENT_TYPES.TEXT,
      content: "# Stock Market Analysis Techniques\n\nInvestors use various techniques to analyze stocks and make investment decisions. The two main approaches are Fundamental Analysis and Technical Analysis."
    },
    {
      type: LESSON_CONTENT_TYPES.IMAGE,
      content: "https://via.placeholder.com/600x400?text=Analysis+Methods",
      caption: "Fundamental vs Technical Analysis"
    },
    {
      type: LESSON_CONTENT_TYPES.TEXT,
      content: "## Fundamental Analysis\n\nFundamental analysis evaluates a stock by examining the company's financial statements, industry position, management, and economic factors. Key metrics include:\n\n- **P/E Ratio**: Price to Earnings\n- **EPS**: Earnings Per Share\n- **ROE**: Return on Equity\n- **Debt-to-Equity Ratio**: Financial leverage"
    },
    {
      type: LESSON_CONTENT_TYPES.TEXT,
      content: "## Technical Analysis\n\nTechnical analysis studies past market data, primarily price and volume, to forecast future price movements. It uses various indicators and chart patterns to identify trends and potential reversal points."
    },
    {
      type: LESSON_CONTENT_TYPES.INTERACTIVE,
      content: "Identify which analysis type uses the following:",
      items: [
        { id: 1, term: "P/E Ratio", definition: "Fundamental Analysis" },
        { id: 2, term: "Moving Averages", definition: "Technical Analysis" },
        { id: 3, term: "Balance Sheet", definition: "Fundamental Analysis" },
        { id: 4, term: "Volume Trends", definition: "Technical Analysis" }
      ]
    },
    {
      type: LESSON_CONTENT_TYPES.QUIZ,
      question: "Which factor would NOT be considered in fundamental analysis?",
      options: [
        { id: "a", text: "Company's profit margins" },
        { id: "b", text: "Management team quality" },
        { id: "c", text: "Chart patterns and support levels" },
        { id: "d", text: "Industry growth prospects" }
      ],
      correctOptionId: "c",
      explanation: "Chart patterns and support levels are elements of technical analysis, which focuses on price movements and trading patterns rather than company fundamentals."
    }
  ]
};

const Learn = () => {
  const [activeTab, setActiveTab] = useState("topics");
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDuolingoLesson, setShowDuolingoLesson] = useState(false);
  const [lessonStep, setLessonStep] = useState(0);
  const [duolingoProgress, setDuolingoProgress] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check URL for module parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const moduleParam = searchParams.get('module');
    if (moduleParam) {
      const module = mockLearningModules.find(m => m.id === moduleParam);
      if (module && !module.isLocked) {
        setActiveModule(moduleParam);
        setActiveTab("current");
      }
    }
  }, [location]);
  
  const handleStartModule = (moduleId: string) => {
    setActiveModule(moduleId);
    setActiveTab("current");
    
    // Update URL with module parameter
    navigate(`/learn?module=${moduleId}`);
    
    toast.success(`Starting module: ${mockLearningModules.find(m => m.id === moduleId)?.title}`, {
      position: "top-center",
    });
  };
  
  const handleStartQuiz = () => {
    setShowQuiz(true);
    setShowDuolingoLesson(false);
  };
  
  const handleQuizComplete = (score: number) => {
    toast.success(`Quiz completed! You scored ${score}/${mockQuizQuestions.length}`, {
      position: "top-center",
    });
    setShowQuiz(false);
    
    // If score is good, unlock next module
    if (score >= 2) {
      toast("🏆 New module unlocked: Mutual Funds", {
        description: "Check it out in your learning roadmap",
        position: "bottom-center",
        duration: 4000,
      });
    }
  };
  
  const handleStartLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setShowDuolingoLesson(true);
    setShowQuiz(false);
    setLessonStep(0);
    setDuolingoProgress(0);
    
    toast.success(`Starting lesson: ${
      currentModule?.lessons.find(l => l.id === lessonId)?.title
    }`, {
      position: "top-center",
    });
  };
  
  const handleNextStep = () => {
    if (!activeLessonId) return;
    
    const lessonContent = mockLessonContent[activeLessonId as keyof typeof mockLessonContent];
    if (!lessonContent) return;
    
    if (lessonStep < lessonContent.length - 1) {
      setLessonStep(prev => prev + 1);
      setDuolingoProgress(((lessonStep + 1) / (lessonContent.length - 1)) * 100);
    } else {
      // Lesson complete
      setShowDuolingoLesson(false);
      
      // Mark lesson as completed in mockData (in a real app, this would update an API)
      const moduleIndex = mockLearningModules.findIndex(m => m.id === activeModule);
      if (moduleIndex >= 0) {
        const lessonIndex = mockLearningModules[moduleIndex].lessons.findIndex(l => l.id === activeLessonId);
        if (lessonIndex >= 0) {
          mockLearningModules[moduleIndex].lessons[lessonIndex].isCompleted = true;
          
          // Update progress
          const completedLessons = mockLearningModules[moduleIndex].lessons.filter(l => l.isCompleted).length;
          const totalLessons = mockLearningModules[moduleIndex].lessons.length;
          mockLearningModules[moduleIndex].progress = Math.round((completedLessons / totalLessons) * 100);
        }
      }
      
      toast.success(`Lesson completed! Earned ${
        currentModule?.lessons.find(l => l.id === activeLessonId)?.xpReward
      } XP`, {
        position: "top-center",
      });
    }
  };
  
  const handlePrevStep = () => {
    if (lessonStep > 0) {
      setLessonStep(prev => prev - 1);
      setDuolingoProgress(((lessonStep - 1) / (mockLessonContent[activeLessonId as keyof typeof mockLessonContent]?.length - 1)) * 100);
    }
  };
  
  // Get the current module details
  const currentModule = activeModule 
    ? mockLearningModules.find(m => m.id === activeModule) 
    : mockLearningModules.find(m => m.progress > 0);
  
  // Render Duolingo-style lesson content
  const renderLessonContent = () => {
    if (!activeLessonId) return null;
    
    const lessonContent = mockLessonContent[activeLessonId as keyof typeof mockLessonContent];
    if (!lessonContent || lessonStep >= lessonContent.length) return null;
    
    const currentStep = lessonContent[lessonStep];
    
    switch (currentStep.type) {
      case LESSON_CONTENT_TYPES.TEXT:
        return (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: currentStep.content.replace(/\n/g, '<br>').replace(/^# (.*$)/gm, '<h1>$1</h1>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- (.*$)/gm, '<li>$1</li>') }} />
          </div>
        );
        
      case LESSON_CONTENT_TYPES.IMAGE:
        return (
          <div className="text-center">
            <img 
              src={currentStep.content} 
              alt={currentStep.caption || "Lesson image"} 
              className="max-w-full rounded-lg mx-auto mb-2" 
            />
            {currentStep.caption && (
              <p className="text-sm text-gray-500 italic">{currentStep.caption}</p>
            )}
          </div>
        );
        
      case LESSON_CONTENT_TYPES.INTERACTIVE:
        return (
          <div className="bg-pastel-blue/20 p-4 rounded-lg">
            <h3 className="font-medium mb-3">{currentStep.content}</h3>
            <div className="space-y-2">
              {currentStep.items.map((item: any) => (
                <div key={item.id} className="bg-white p-3 rounded-md shadow-sm flex justify-between items-center">
                  <span className="font-medium">{item.term}</span>
                  <span className="text-gray-600">{item.definition}</span>
                </div>
              ))}
            </div>
          </div>
        );
        
      case LESSON_CONTENT_TYPES.QUIZ:
        return (
          <div className="bg-pastel-yellow/20 p-4 rounded-lg">
            <h3 className="font-medium mb-3">{currentStep.question}</h3>
            <div className="space-y-2">
              {currentStep.options.map((option: any) => (
                <div 
                  key={option.id}
                  onClick={() => {
                    if (option.id === currentStep.correctOptionId) {
                      toast.success("Correct answer! 🎉", { 
                        position: "bottom-center",
                        duration: 2000
                      });
                    } else {
                      toast.error(`Incorrect. The right answer is: ${
                        currentStep.options.find((o: any) => o.id === currentStep.correctOptionId).text
                      }`, { 
                        position: "bottom-center",
                        duration: 3000
                      });
                    }
                    // Short delay before moving to next step
                    setTimeout(handleNextStep, 1500);
                  }}
                  className="bg-white p-3 rounded-md shadow-sm hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  {option.text}
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <p>Content not available</p>;
    }
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
        ) : showDuolingoLesson ? (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDuolingoLesson(false)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Exit Lesson
              </Button>
              
              <div className="flex-1 mx-4">
                <Progress value={duolingoProgress} className="h-2" />
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{lessonStep + 1}</span>
                <span>/</span>
                <span>{mockLessonContent[activeLessonId as keyof typeof mockLessonContent]?.length || 0}</span>
              </div>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                {renderLessonContent()}
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                disabled={lessonStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              <Button onClick={handleNextStep}>
                {lessonStep === (mockLessonContent[activeLessonId as keyof typeof mockLessonContent]?.length - 1) 
                  ? (
                    <>
                      Complete Lesson
                      <CheckCircle className="w-4 h-4 ml-1" />
                    </>
                  ) 
                  : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )
                }
              </Button>
            </div>
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
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="modules">
                          <AccordionTrigger className="text-lg font-medium">
                            Module Lessons
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 pt-2">
                              {currentModule.lessons.map((lesson, index) => (
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
                                      handleStartLesson(lesson.id);
                                    } else {
                                      toast.info("You've already completed this lesson", { 
                                        position: "bottom-center" 
                                      });
                                    }
                                  }}
                                />
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Card className="bg-gradient-to-br from-pastel-blue to-blue-100 hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-start space-x-4">
                            <div className="bg-white/60 p-3 rounded-full">
                              <BookOpen className="h-8 w-8 text-electric-blue" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg mb-1">Continue Learning</h3>
                              <p className="text-sm text-gray-700 mb-3">
                                {!currentModule.lessons.every(l => l.isCompleted)
                                  ? `Continue with ${currentModule.lessons.find(l => !l.isCompleted)?.title}`
                                  : "All lessons completed! Take the quiz to test your knowledge"
                                }
                              </p>
                              <Button
                                onClick={() => {
                                  const nextLesson = currentModule.lessons.find(l => !l.isCompleted);
                                  if (nextLesson) {
                                    handleStartLesson(nextLesson.id);
                                  } else {
                                    handleStartQuiz();
                                  }
                                }}
                              >
                                {!currentModule.lessons.every(l => l.isCompleted)
                                  ? "Continue Learning"
                                  : "Take Quiz"
                                }
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-pastel-yellow to-yellow-100 hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-start space-x-4">
                            <div className="bg-white/60 p-3 rounded-full">
                              <Award className="h-8 w-8 text-yellow-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg mb-1">Module Quiz</h3>
                              <p className="text-sm text-gray-700 mb-3">
                                Test your knowledge and earn XP to unlock the next module
                              </p>
                              <Button variant="outline" onClick={handleStartQuiz}>
                                Start Quiz
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-pastel-yellow p-4 rounded-lg mb-6">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">🏆</div>
                        <div>
                          <h3 className="font-bold text-lg">Unlock Achievement</h3>
                          <p className="text-sm mb-4">Complete all lessons and the quiz to earn the {currentModule.title} Expert badge!</p>
                          <Progress value={currentModule.progress} className="h-2 mb-2" />
                          <div className="flex justify-between text-xs">
                            <span>Progress: {currentModule.progress}%</span>
                            <span>{currentModule.lessons.filter(l => l.isCompleted).length}/{currentModule.lessons.length} Lessons</span>
                          </div>
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
