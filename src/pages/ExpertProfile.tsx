
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import UserAvatar from "@/components/UserAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Star, Briefcase, GraduationCap, Award, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const mockExperts = {
  "1": {
    id: "1",
    name: "Neha Sharma",
    title: "Certified Financial Planner",
    expertise: ["Mutual Funds", "Tax Planning", "Retirement"],
    education: [
      "MBA in Finance, IIM Bangalore",
      "Certified Financial Planner (CFP)"
    ],
    experience: [
      "10+ years in wealth management",
      "Former VP at HDFC Mutual Fund",
      "Financial advisor to 500+ clients"
    ],
    achievements: [
      "Wealth Manager of the Year 2022",
      "Published author of 'Smart Money Moves'"
    ],
    bio: "Neha has been helping individuals achieve their financial goals for over a decade. Her expertise in tax planning and retirement strategies has helped clients optimize their portfolios and secure their financial future.",
    sessions: [
      { title: "Retirement Planning Basics", duration: "45 mins", price: 1500 },
      { title: "Tax-Saving Investment Strategies", duration: "60 mins", price: 2000 },
      { title: "Portfolio Review", duration: "30 mins", price: 1200 }
    ],
    articles: [
      { title: "5 Tax-Saving Investments for Salaried Professionals", date: "May 15, 2023" },
      { title: "How to Plan Your Retirement in Your 30s", date: "Feb 3, 2023" },
      { title: "Understanding Mutual Fund Expense Ratios", date: "Dec 12, 2022" }
    ],
    reviews: [
      { id: "r1", user: "Amit Patel", rating: 5, comment: "Neha's advice on tax planning saved me over ₹50,000 this year!", date: "3 months ago" },
      { id: "r2", user: "Priya Desai", rating: 4, comment: "Very knowledgeable about retirement planning. Gave me a clear roadmap.", date: "5 months ago" },
      { id: "r3", user: "Rajesh Sharma", rating: 5, comment: "Extremely professional and insightful. Worth every rupee.", date: "6 months ago" }
    ],
    rating: 4.9,
    reviewCount: 124,
    sessionPrice: 1500,
    isAvailable: true,
  },
  "2": {
    id: "2",
    name: "Rajiv Kumar",
    title: "Stock Market Analyst",
    expertise: ["Equity Research", "Technical Analysis", "IPOs"],
    education: [
      "CFA Level 3",
      "B.Tech in Computer Science, IIT Delhi"
    ],
    experience: [
      "15+ years in equity research",
      "Head of Research at Motilal Oswal",
      "TV commentator on CNBC Awaaz"
    ],
    achievements: [
      "Predicted major market movements in 2020 and 2021",
      "Developed proprietary stock screening algorithm"
    ],
    bio: "Rajiv specializes in technical analysis and has a proven track record of identifying multibagger stocks. His analytical approach combines fundamental analysis with technical indicators to identify high-potential investments.",
    sessions: [
      { title: "Technical Analysis Masterclass", duration: "90 mins", price: 3000 },
      { title: "IPO Evaluation Strategy", duration: "60 mins", price: 2000 },
      { title: "Stock Portfolio Review", duration: "45 mins", price: 1800 }
    ],
    articles: [
      { title: "Understanding P/E Ratios: Beyond the Numbers", date: "Jun 20, 2023" },
      { title: "Top 5 Technical Indicators for Retail Investors", date: "Apr 11, 2023" },
      { title: "How to Evaluate an IPO", date: "Jan 5, 2023" }
    ],
    reviews: [
      { id: "r1", user: "Vikram Joshi", rating: 5, comment: "Rajiv's technical analysis session was eye-opening. Completely changed my approach to trading.", date: "2 months ago" },
      { id: "r2", user: "Sneha Gupta", rating: 4, comment: "Great insights on IPOs. Helped me avoid some poor investments.", date: "4 months ago" },
      { id: "r3", user: "Karan Mehta", rating: 5, comment: "Worth every penny! His stock picks have given me 30% returns in 6 months.", date: "7 months ago" }
    ],
    rating: 4.7,
    reviewCount: 98,
    sessionPrice: 2000,
    isAvailable: true,
  },
  "3": {
    id: "3",
    name: "Preeti Gupta",
    title: "Tax & Investment Advisor",
    expertise: ["Tax Saving", "Portfolio Management", "Wealth Creation"],
    education: [
      "Chartered Accountant (CA)",
      "Master's in Taxation, Delhi University"
    ],
    experience: [
      "12+ years in tax advisory",
      "Partner at PwC Tax Division",
      "Tax consultant for startups and HNIs"
    ],
    achievements: [
      "Featured in Economic Times as a top tax advisor",
      "Speaker at multiple finance conferences"
    ],
    bio: "Preeti is a tax expert with a focus on helping individuals and small businesses optimize their tax strategies while building wealth. Her holistic approach combines tax efficiency with sound investment principles.",
    sessions: [
      { title: "Personal Tax Planning", duration: "60 mins", price: 2500 },
      { title: "Investment Strategy for Tax Efficiency", duration: "45 mins", price: 1800 },
      { title: "Business Tax Consultation", duration: "90 mins", price: 3500 }
    ],
    articles: [
      { title: "New Tax Regime vs Old: What's Best for You", date: "Jul 2, 2023" },
      { title: "Tax-Efficient Investment Vehicles for 2023", date: "Mar 15, 2023" },
      { title: "Year-End Tax Saving Strategies", date: "Dec 5, 2022" }
    ],
    reviews: [
      { id: "r1", user: "Ananya Kapoor", rating: 5, comment: "Preeti's tax planning advice was invaluable. Clear and practical.", date: "1 month ago" },
      { id: "r2", user: "Rohan Singhania", rating: 5, comment: "Excellent insights on tax-efficient investing. Highly recommended.", date: "3 months ago" },
      { id: "r3", user: "Meera Reddy", rating: 4, comment: "Very knowledgeable about both personal and business taxation.", date: "5 months ago" }
    ],
    rating: 4.8,
    reviewCount: 156,
    sessionPrice: 1800,
    isAvailable: false,
  }
};

const ExpertProfile = () => {
  const { expertId } = useParams();
  const navigate = useNavigate();
  
  const expert = mockExperts[expertId as keyof typeof mockExperts];
  
  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        <main className="container max-w-5xl mx-auto p-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/qa")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experts
          </Button>
          <div className="flex flex-col items-center justify-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">Expert Not Found</h2>
            <p className="text-gray-500 mb-4">The expert you're looking for doesn't exist or is no longer available.</p>
            <Button onClick={() => navigate("/qa")}>View All Experts</Button>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </span>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return stars;
  };
  
  const handleBookSession = (sessionTitle: string) => {
    toast.success(`Session request for "${sessionTitle}" sent to ${expert.name}!`, {
      position: "top-center",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/qa")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Experts
        </Button>
        
        <div className="bg-white rounded-lg border shadow-sm mb-6 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <UserAvatar 
              name={expert.name} 
              size="lg"
            />
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{expert.name}</h1>
              <p className="text-gray-600">{expert.title}</p>
              
              <div className="flex items-center mt-2">
                <div className="flex mr-2">
                  {renderStars(expert.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {expert.rating.toFixed(1)} ({expert.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {expert.expertise.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-gray-100">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button disabled={!expert.isAvailable}>
                {expert.isAvailable ? "Book Session" : "Unavailable"}
              </Button>
              <div className="text-sm text-center mt-2">
                From ₹{expert.sessionPrice} per session
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-3">About</h2>
              <p className="text-gray-700">{expert.bio}</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="background" className="mb-8">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="background" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-electric-blue" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {expert.education.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-sm">• {item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-electric-blue" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {expert.experience.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-sm">• {item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {expert.achievements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-sm">• {item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">Recent Articles</h3>
              <div className="space-y-3">
                {expert.articles.map((article, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">{article.title}</h4>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sessions" className="mt-6">
            <div className="space-y-4">
              {expert.sessions.map((session, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-bold text-lg">{session.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{session.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="mr-4">
                          <span className="text-lg font-bold">₹{session.price}</span>
                        </div>
                        <Button 
                          disabled={!expert.isAvailable}
                          onClick={() => handleBookSession(session.title)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="mb-4">
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(expert.rating)}
                  </div>
                  <span className="font-bold">{expert.rating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-1">({expert.reviewCount} reviews)</span>
                </div>
                
                <Button variant="outline" size="sm">
                  Write a Review
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {expert.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium">{review.user}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    
                    <div className="flex mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={i + review.rating} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ExpertProfile;
