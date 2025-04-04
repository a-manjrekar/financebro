
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Trophy, Users, ArrowLeft, Info, User, Landmark, Award } from "lucide-react";
import StockSearch from "@/components/fantasy/StockSearch";
import Leaderboard from "@/components/fantasy/Leaderboard";
import { toast } from "sonner";

const mockContestDetails = {
  "1": {
    id: "1",
    title: "Daily Stock Challenge",
    description: "Build the best portfolio for maximum 24-hour returns. This contest runs daily and is perfect for beginners and experts alike. Select your stocks wisely to maximize returns within a short timeframe.",
    startTime: "Today, 10:00 AM",
    endTime: "Tomorrow, 10:00 AM",
    duration: "24 hours",
    entryFee: 0,
    prizePool: 1000,
    participants: 156,
    maxParticipants: 200,
    rules: [
      "Each participant gets ₹100,000 in virtual cash to invest",
      "Must select at least 3 different stocks",
      "Maximum 10 stocks allowed in portfolio",
      "Cannot exceed 30% allocation in any single stock",
      "Rankings are based on total portfolio value at contest end"
    ],
    prizes: [
      { rank: "1st", reward: "₹500 + 5000 XP" },
      { rank: "2nd", reward: "₹300 + 3000 XP" },
      { rank: "3rd", reward: "₹200 + 2000 XP" },
      { rank: "4th-10th", reward: "1000 XP" }
    ],
    isFeatured: true,
    isJoined: false,
  },
  "2": {
    id: "2",
    title: "Weekly Market Master",
    description: "7-day contest for the highest portfolio returns. This weekly challenge tests your ability to build and manage a portfolio over a longer period. Adapt to market changes and outperform other participants.",
    startTime: "Monday, 9:30 AM",
    endTime: "Sunday, 9:30 AM",
    duration: "7 days",
    entryFee: 50,
    prizePool: 5000,
    participants: 89,
    maxParticipants: 100,
    rules: [
      "Each participant gets ₹500,000 in virtual cash to invest",
      "Must select at least 5 different stocks",
      "Maximum 15 stocks allowed in portfolio",
      "Cannot exceed 20% allocation in any single stock",
      "Portfolio rebalancing allowed once per day",
      "Rankings are based on total portfolio value at contest end"
    ],
    prizes: [
      { rank: "1st", reward: "₹2000 + 10000 XP" },
      { rank: "2nd", reward: "₹1000 + 7000 XP" },
      { rank: "3rd", reward: "₹500 + 5000 XP" },
      { rank: "4th-10th", reward: "₹250 + 2000 XP" },
      { rank: "11th-20th", reward: "1000 XP" }
    ],
    isFeatured: false,
    isJoined: true,
  },
  "3": {
    id: "3",
    title: "Beginner's Challenge",
    description: "Perfect for new investors to practice portfolio building. This contest has simple rules and no entry fee, making it ideal for those just starting their investment journey.",
    startTime: "Tomorrow, 10:00 AM",
    endTime: "Friday, 10:00 AM",
    duration: "3 days",
    entryFee: 0,
    prizePool: 500,
    participants: 45,
    maxParticipants: 150,
    rules: [
      "Each participant gets ₹50,000 in virtual cash to invest",
      "Must select at least 2 different stocks",
      "Maximum 5 stocks allowed in portfolio",
      "Cannot exceed 40% allocation in any single stock",
      "Rankings are based on total portfolio value at contest end"
    ],
    prizes: [
      { rank: "1st", reward: "₹300 + 3000 XP" },
      { rank: "2nd", reward: "₹150 + 2000 XP" },
      { rank: "3rd", reward: "₹50 + 1000 XP" },
      { rank: "4th-10th", reward: "500 XP" }
    ],
    isFeatured: false,
    isJoined: false,
  }
};

const mockLeaderboardEntries = [
  { id: "1", rank: 1, name: "Ravi Kumar", points: 12450 },
  { id: "2", rank: 2, name: "Priya Sharma", points: 11320 },
  { id: "3", rank: 3, name: "Amit Singh", points: 10890 },
  { id: "4", rank: 4, name: "Neha Gupta", points: 9760 },
  { id: "5", rank: 5, name: "Vikram Joshi", points: 9120, isCurrentUser: true },
  { id: "6", rank: 6, name: "Ananya Patel", points: 8540 },
  { id: "7", rank: 7, name: "Rajesh Khanna", points: 7980 },
  { id: "8", rank: 8, name: "Pooja Verma", points: 7650 },
  { id: "9", rank: 9, name: "Suresh Reddy", points: 7210 },
  { id: "10", rank: 10, name: "Deepika Mehra", points: 6890 },
];

const ContestDetail = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const contest = mockContestDetails[contestId as keyof typeof mockContestDetails];
  
  if (!contest) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        <main className="container max-w-5xl mx-auto p-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/fantasy")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contests
          </Button>
          <div className="flex flex-col items-center justify-center py-12">
            <Info className="w-12 h-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">Contest Not Found</h2>
            <p className="text-gray-500 mb-4">The contest you're looking for doesn't exist or has ended.</p>
            <Button onClick={() => navigate("/fantasy")}>View All Contests</Button>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }
  
  const handleJoinContest = () => {
    if (contest.isJoined) {
      toast.info("You've already joined this contest!", {
        position: "top-center"
      });
    } else {
      toast.success(`Successfully joined "${contest.title}"!`, {
        position: "top-center"
      });
      setActiveTab("portfolio");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/fantasy")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Contests
        </Button>
        
        <div className="bg-white rounded-lg border shadow-sm mb-6">
          <div className={`p-1 ${contest.isFeatured ? "bg-electric-blue" : "hidden"}`}>
            {contest.isFeatured && (
              <div className="text-white text-xs text-center font-medium py-1">
                Featured Contest
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{contest.title}</h1>
                <p className="text-gray-600 mt-1">{contest.description}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button 
                  size="lg"
                  onClick={handleJoinContest}
                  disabled={contest.isJoined}
                >
                  {contest.isJoined ? "Joined" : "Join Contest"}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Start Time</span>
                </div>
                <div className="font-medium">{contest.startTime}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">Duration</span>
                </div>
                <div className="font-medium">{contest.duration}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                  <span className="text-sm">Prize Pool</span>
                </div>
                <div className="font-medium text-green-600">₹{contest.prizePool.toLocaleString()}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">Participants</span>
                </div>
                <div className="font-medium">{contest.participants}/{contest.maxParticipants}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Entry Fee: </span>
                <span className="ml-1 font-medium">
                  {contest.entryFee > 0 ? `₹${contest.entryFee}` : 'Free'}
                </span>
              </div>
              
              <div>
                <Badge className="bg-electric-blue">
                  {contest.participants >= contest.maxParticipants * 0.9 
                    ? "Filling Fast!" 
                    : `${contest.maxParticipants - contest.participants} spots left`}
                </Badge>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-electric-blue h-2 rounded-full"
                style={{ width: `${(contest.participants / contest.maxParticipants) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Contest Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {contest.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-electric-blue text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Prize Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contest.prizes.map((prize, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <div className="font-medium">{prize.rank}</div>
                        <div className="font-bold text-green-600">{prize.reward}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 bg-pastel-blue p-4 rounded-lg">
              <div className="flex items-start">
                <Landmark className="w-6 h-6 mr-3 mt-1" />
                <div>
                  <h3 className="font-bold">How It Works</h3>
                  <p className="text-sm mt-1">
                    Join this contest to build your virtual stock portfolio. Your performance will be measured against other participants, and winners will receive cash prizes and XP based on their final ranking. This is a risk-free way to practice your investment skills and learn from the market!
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Build Your Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-pastel-blue p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Available Cash</div>
                    <div className="text-xl font-bold">₹100,000</div>
                  </div>
                  <div className="bg-pastel-green p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Portfolio Value</div>
                    <div className="text-xl font-bold">₹0</div>
                  </div>
                </div>
                
                <StockSearch onSelectStock={() => {}} />
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-700 mb-2">Your portfolio is empty</h4>
              <p className="text-gray-500 mb-4">
                Search for stocks above and add them to your portfolio
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard entries={mockLeaderboardEntries} title={contest.title} />
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ContestDetail;
