
import { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter, Search } from "lucide-react";
import QuestionCard from "@/components/qa/QuestionCard";
import ExpertCard from "@/components/qa/ExpertCard";
import { toast } from "sonner";

// Mock data
const mockQuestions = [
  {
    id: "1",
    title: "What's the difference between mutual funds and ETFs?",
    content: "I'm new to investing and confused about the differences between mutual funds and ETFs. Could someone explain the key differences, advantages, and disadvantages of each?",
    tags: ["Mutual Funds", "ETFs", "Basics"],
    authorName: "Rahul Singh",
    createdAt: "2 hours ago",
    answersCount: 3,
    likes: 12,
    isAnswered: true,
  },
  {
    id: "2",
    title: "How to analyze company financial statements?",
    content: "I want to learn how to analyze balance sheets and income statements of companies before investing. What are the key metrics I should focus on?",
    tags: ["Stock Analysis", "Financial Statements"],
    authorName: "Priya Desai",
    createdAt: "1 day ago",
    answersCount: 5,
    likes: 24,
    isAnswered: true,
  },
  {
    id: "3",
    title: "Is SIP better than lump sum investment?",
    content: "I have 2 lakhs to invest. Should I invest it all at once or divide it into monthly SIPs? What are the pros and cons of both approaches?",
    tags: ["SIP", "Mutual Funds", "Strategy"],
    authorName: "Ananya Kapoor",
    createdAt: "3 days ago",
    answersCount: 7,
    likes: 31,
    isAnswered: false,
  },
  {
    id: "4",
    title: "How to start investing with 10,000 rupees?",
    content: "I'm a college student with 10,000 rupees saved up. What's the best way to start investing this amount? Looking for low-risk options.",
    tags: ["Beginner", "Small Capital"],
    authorName: "Vikram Joshi",
    createdAt: "1 week ago",
    answersCount: 12,
    likes: 45,
    isAnswered: true,
  },
];

const mockExperts = [
  {
    id: "1",
    name: "Neha Sharma",
    title: "Certified Financial Planner",
    expertise: ["Mutual Funds", "Tax Planning", "Retirement"],
    rating: 4.9,
    reviewCount: 124,
    sessionPrice: 1500,
    isAvailable: true,
  },
  {
    id: "2",
    name: "Rajiv Kumar",
    title: "Stock Market Analyst",
    expertise: ["Equity Research", "Technical Analysis", "IPOs"],
    rating: 4.7,
    reviewCount: 98,
    sessionPrice: 2000,
    isAvailable: true,
  },
  {
    id: "3",
    name: "Preeti Gupta",
    title: "Tax & Investment Advisor",
    expertise: ["Tax Saving", "Portfolio Management", "Wealth Creation"],
    rating: 4.8,
    reviewCount: 156,
    sessionPrice: 1800,
    isAvailable: false,
  },
];

const availableTags = [
  "Mutual Funds", "ETFs", "Stocks", "IPOs", "SIP", 
  "Tax Planning", "Retirement", "Financial Statements", 
  "Technical Analysis", "Beginner", "Advanced"
];

const QA = () => {
  const [activeTab, setActiveTab] = useState("questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questionTags, setQuestionTags] = useState<string[]>([]);
  
  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleQuestionTagSelect = (tag: string) => {
    if (questionTags.includes(tag)) {
      setQuestionTags(questionTags.filter(t => t !== tag));
    } else if (questionTags.length < 3) {
      setQuestionTags([...questionTags, tag]);
    } else {
      toast.info("You can select up to 3 tags", {
        position: "top-center",
      });
    }
  };
  
  const handleAskQuestion = () => {
    if (!questionTitle.trim()) {
      toast.error("Please enter a question title", {
        position: "top-center",
      });
      return;
    }
    
    if (!questionContent.trim()) {
      toast.error("Please enter question details", {
        position: "top-center",
      });
      return;
    }
    
    if (questionTags.length === 0) {
      toast.error("Please select at least one tag", {
        position: "top-center",
      });
      return;
    }
    
    // In a real app, this would submit the question to an API
    toast.success("Your question has been submitted! Experts will answer it soon.", {
      position: "top-center",
    });
    
    // Reset form
    setQuestionTitle("");
    setQuestionContent("");
    setQuestionTags([]);
    
    // Switch back to questions tab
    setActiveTab("questions");
  };
  
  const handleBookSession = (expertId: string) => {
    const expert = mockExperts.find(e => e.id === expertId);
    
    if (expert) {
      toast.success(`Session request sent to ${expert.name}!`, {
        position: "top-center",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Expert Q&A</h1>
          <p className="text-gray-600">Get your financial questions answered by experts</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="experts">Experts</TabsTrigger>
              <TabsTrigger value="ask">Ask Question</TabsTrigger>
            </TabsList>
            
            <Button 
              variant="default" 
              onClick={() => setActiveTab("ask")}
              className="sm:hidden"
            >
              Ask Question
            </Button>
          </div>
          
          <TabsContent value="questions" className="mt-6">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="relative">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`
                      cursor-pointer
                      ${selectedTags.includes(tag) 
                        ? "bg-electric-blue text-white" 
                        : "hover:bg-gray-100"}
                    `}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {mockQuestions.map(question => (
                <QuestionCard 
                  key={question.id}
                  {...question}
                  onClick={() => {}}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="experts" className="mt-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Financial Experts</h2>
              
              <Button variant="outline" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                View Sessions
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {mockExperts.map(expert => (
                <ExpertCard 
                  key={expert.id}
                  {...expert}
                  onClick={() => handleBookSession(expert.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ask" className="mt-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="questionTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Question Title
                  </label>
                  <Input 
                    id="questionTitle"
                    placeholder="e.g., How to start investing in mutual funds?"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="questionDetails" className="block text-sm font-medium text-gray-700 mb-1">
                    Question Details
                  </label>
                  <Textarea 
                    id="questionDetails"
                    placeholder="Provide details about your question to get better answers..."
                    rows={5}
                    value={questionContent}
                    onChange={(e) => setQuestionContent(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (Select up to 3)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <Badge 
                        key={tag}
                        variant={questionTags.includes(tag) ? "default" : "outline"}
                        className={`
                          cursor-pointer
                          ${questionTags.includes(tag) 
                            ? "bg-electric-blue text-white" 
                            : "hover:bg-gray-100"}
                        `}
                        onClick={() => handleQuestionTagSelect(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleAskQuestion}>
                    Submit Question
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default QA;
