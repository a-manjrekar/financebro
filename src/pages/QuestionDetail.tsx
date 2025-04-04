
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import QuestionDetailComponent from "@/components/qa/QuestionDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { toast } from "sonner";

// Mock questions data with answers
const mockQuestions = {
  "1": {
    id: "1",
    title: "What's the difference between mutual funds and ETFs?",
    content: "I'm new to investing and confused about the differences between mutual funds and ETFs. Could someone explain the key differences, advantages, and disadvantages of each? I'm particularly interested in understanding the fee structures, tax implications, and which might be better for a long-term investor.",
    tags: ["Mutual Funds", "ETFs", "Basics"],
    authorName: "Rahul Singh",
    createdAt: "2 hours ago",
    answersCount: 3,
    likes: 12,
    isAnswered: true,
    answers: [
      {
        id: "a1",
        content: "Great question! Here are the key differences:\n\n**Mutual Funds**:\n- Traded once per day at NAV after market close\n- Often have higher expense ratios compared to ETFs\n- May have minimum investment amounts\n- Actively managed options available\n- May distribute capital gains to all investors\n\n**ETFs**:\n- Trade throughout the day like stocks\n- Generally have lower expense ratios\n- No minimum investment beyond one share\n- Mostly track indexes (passive)\n- More tax-efficient structure\n\nFor long-term investors, both can work well. ETFs might have a slight edge on costs and tax efficiency, but a good actively managed mutual fund could outperform in certain market conditions.",
        authorName: "Anjali Kapoor",
        isExpert: true,
        createdAt: "1 hour ago",
        likes: 8,
        isAccepted: true
      },
      {
        id: "a2",
        content: "To add to the above answer, in the Indian context, there are other considerations:\n\n1. **Availability**: India has more mutual fund options than ETFs currently.\n\n2. **Liquidity**: Some Indian ETFs have low trading volumes, which can lead to wider bid-ask spreads.\n\n3. **SIP convenience**: Mutual funds make it easy to set up Systematic Investment Plans, which is harder with ETFs.\n\n4. **Tracking error**: Some Indian ETFs have higher tracking errors due to market inefficiencies.\n\nIf you're just starting out, regularly investing small amounts, mutual funds might be more convenient. If you're making larger lump-sum investments and are cost-conscious, ETFs might be better.",
        authorName: "Vikram Malhotra",
        createdAt: "45 minutes ago",
        likes: 5,
        isAccepted: false
      },
      {
        id: "a3",
        content: "I started with mutual funds but have mostly switched to ETFs because of the lower expense ratios. For example, I was paying 1.5% in a large-cap mutual fund, but similar exposure through an ETF costs just 0.2%. Over decades, that difference compounds significantly!",
        authorName: "Priya Sharma",
        createdAt: "30 minutes ago",
        likes: 3,
        isAccepted: false
      }
    ]
  },
  "2": {
    id: "2",
    title: "How to analyze company financial statements?",
    content: "I want to learn how to analyze balance sheets and income statements of companies before investing. What are the key metrics I should focus on? Are there any tools or resources that can help me with this analysis? I've tried looking at company reports but find them overwhelming with all the numbers and jargon.",
    tags: ["Stock Analysis", "Financial Statements"],
    authorName: "Priya Desai",
    createdAt: "1 day ago",
    answersCount: 5,
    likes: 24,
    isAnswered: true,
    answers: [
      {
        id: "a1",
        content: "Financial statement analysis can be daunting at first, but focusing on a few key metrics can make it more approachable. Here are the essential ones:\n\n**Income Statement**:\n- Revenue growth rate (year-over-year)\n- Gross margin, operating margin, and net margin\n- Earnings per share (EPS) growth\n\n**Balance Sheet**:\n- Debt-to-equity ratio\n- Current ratio (current assets / current liabilities)\n- Return on equity (ROE) and return on assets (ROA)\n\n**Cash Flow Statement**:\n- Operating cash flow vs. net income\n- Free cash flow growth\n- Capital expenditure trends\n\nFor Indian companies, tools like Screener.in, Trendlyne, and Tickertape can help you view these metrics in a more digestible format. Start with a simple comparative analysis across quarters and years, looking for trends rather than absolute numbers.",
        authorName: "Deepak Shenoy",
        isExpert: true,
        createdAt: "22 hours ago",
        likes: 15,
        isAccepted: true
      },
      {
        id: "a2",
        content: "I'd recommend starting with the annual reports of companies in sectors you understand well. Look at 5-year trends rather than just the latest numbers. For example, has the debt been increasing while margins are decreasing? That's a red flag. Consistent growth in both top line (revenue) and bottom line (profit) along with stable or improving margins is a good sign.",
        authorName: "Rajesh Kumar",
        createdAt: "18 hours ago",
        likes: 8,
        isAccepted: false
      },
      {
        id: "a3",
        content: "As a beginner, I found value investing books really helpful. 'The Intelligent Investor' by Benjamin Graham and 'Financial Statement Analysis' by Martin Fridson are good starting points. Also, many brokers now offer simplified financial analysis tools as part of their platforms.",
        authorName: "Amit Singh",
        createdAt: "14 hours ago",
        likes: 6,
        isAccepted: false
      },
      {
        id: "a4",
        content: "Don't forget to look at peer comparisons. A company's metrics might look good in isolation, but comparing them to industry averages and direct competitors gives much more context. For Indian markets, I use Moneycontrol's comparison tools for this.",
        authorName: "Neha Gupta",
        createdAt: "10 hours ago",
        likes: 5,
        isAccepted: false
      },
      {
        id: "a5",
        content: "I've found that reading concalls (conference call transcripts) gives insights that pure numbers don't. Management's tone, their focus areas, and how they respond to analyst questions can tell you a lot about the company's future direction.",
        authorName: "Karan Mehta",
        createdAt: "6 hours ago",
        likes: 4,
        isAccepted: false
      }
    ]
  },
  "3": {
    id: "3",
    title: "Is SIP better than lump sum investment?",
    content: "I have 2 lakhs to invest. Should I invest it all at once or divide it into monthly SIPs? What are the pros and cons of both approaches?",
    tags: ["SIP", "Mutual Funds", "Strategy"],
    authorName: "Ananya Kapoor",
    createdAt: "3 days ago",
    answersCount: 7,
    likes: 31,
    isAnswered: false,
    answers: [
      {
        id: "a1",
        content: "Both approaches have their merits, and the choice depends on market conditions and your risk tolerance.\n\n**Lump Sum Pros**:\n- Full amount is invested immediately, capturing full growth potential\n- Better in clearly bullish markets or when valuations are attractive\n- No timing decisions needed after initial investment\n\n**Lump Sum Cons**:\n- Higher short-term risk if market drops right after investment\n- Psychological stress if investment temporarily loses value\n\n**SIP Pros**:\n- Reduces timing risk through rupee cost averaging\n- Psychologically easier to handle market volatility\n- Builds disciplined investing habit\n\n**SIP Cons**:\n- May underperform lump sum in steadily rising markets\n- Money waiting to be invested doesn't earn market returns\n\nWith ₹2 lakhs, a middle path might work: invest ₹1 lakh as lump sum if market valuations seem reasonable, and spread the other ₹1 lakh over 4-6 monthly SIPs of ₹16,667-₹25,000 each.",
        authorName: "Vivek Bajaj",
        isExpert: true,
        createdAt: "2 days ago",
        likes: 18,
        isAccepted: false
      },
      {
        id: "a2",
        content: "Historically, lump sum investments have outperformed SIPs in about 60-65% of time periods in the Indian market over the long term. However, that doesn't necessarily mean it's right for your situation. If this ₹2 lakh is a significant portion of your total investment corpus, SIP might be better for managing risk.",
        authorName: "Shweta Jain",
        createdAt: "2 days ago",
        likes: 12,
        isAccepted: false
      },
      // More answers would be here
    ]
  },
  "4": {
    id: "4",
    title: "How to start investing with 10,000 rupees?",
    content: "I'm a college student with 10,000 rupees saved up. What's the best way to start investing this amount? Looking for low-risk options.",
    tags: ["Beginner", "Small Capital"],
    authorName: "Vikram Joshi",
    createdAt: "1 week ago",
    answersCount: 12,
    likes: 45,
    isAnswered: true,
    answers: [
      // Answers would be here
    ]
  }
};

const QuestionDetail = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  
  const question = mockQuestions[questionId as keyof typeof mockQuestions];
  
  const handleLikeQuestion = (id: string) => {
    toast.success("Question upvoted!", {
      position: "top-center",
    });
  };
  
  const handleAcceptAnswer = (questionId: string, answerId: string) => {
    toast.success("Answer marked as accepted!", {
      position: "top-center",
    });
  };
  
  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        <main className="container max-w-5xl mx-auto p-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/qa")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Questions
          </Button>
          <div className="flex flex-col items-center justify-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">Question Not Found</h2>
            <p className="text-gray-500 mb-4">The question you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/qa")}>View All Questions</Button>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/qa")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Questions
        </Button>
        
        <QuestionDetailComponent 
          {...question}
          onLike={handleLikeQuestion}
          onAcceptAnswer={handleAcceptAnswer}
        />
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default QuestionDetail;
