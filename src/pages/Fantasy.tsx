
import { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContestCard from "@/components/fantasy/ContestCard";
import StockSearch from "@/components/fantasy/StockSearch";
import Leaderboard from "@/components/fantasy/Leaderboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TrendingUp, TrendingDown, Info, ShoppingCart, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
const mockContests = [
  {
    id: "1",
    title: "Daily Stock Challenge",
    description: "Build the best portfolio for maximum 24-hour returns",
    startTime: "Today, 10:00 AM",
    duration: "24 hours",
    entryFee: 0,
    prizePool: 1000,
    participants: 156,
    maxParticipants: 200,
    isFeatured: true,
    isJoined: false,
  },
  {
    id: "2",
    title: "Weekly Market Master",
    description: "7-day contest for the highest portfolio returns",
    startTime: "Monday, 9:30 AM",
    duration: "7 days",
    entryFee: 50,
    prizePool: 5000,
    participants: 89,
    maxParticipants: 100,
    isFeatured: false,
    isJoined: true,
  },
  {
    id: "3",
    title: "Beginner's Challenge",
    description: "Perfect for new investors to practice portfolio building",
    startTime: "Tomorrow, 10:00 AM",
    duration: "3 days",
    entryFee: 0,
    prizePool: 500,
    participants: 45,
    maxParticipants: 150,
    isFeatured: false,
    isJoined: false,
  },
];

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

interface PortfolioStock {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  quantity: number;
}

const Fantasy = () => {
  const [activeTab, setActiveTab] = useState("contests");
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>([]);
  const [virtualCash, setVirtualCash] = useState(100000);
  
  const handleJoinContest = (contestId: string) => {
    // Find the contest that was clicked
    const contest = mockContests.find(c => c.id === contestId);
    
    if (contest) {
      if (contest.isJoined) {
        toast.info("You've already joined this contest!", {
          position: "top-center"
        });
      } else {
        // Simulate joining the contest
        toast.success(`Successfully joined "${contest.title}"!`, {
          position: "top-center"
        });
        
        // This would update the contest status in a real app
        // Here we're just redirecting to the portfolio tab
        setActiveTab("portfolio");
      }
    }
  };
  
  const handleSelectStock = (stock: any) => {
    // Check if the stock is already in the portfolio
    const existingStock = portfolio.find(s => s.id === stock.id);
    
    if (existingStock) {
      toast.info("This stock is already in your portfolio. You can adjust its quantity.", {
        position: "top-center"
      });
    } else {
      // Add the stock to portfolio with a default quantity of 1
      const newStock = { ...stock, quantity: 1 };
      setPortfolio([...portfolio, newStock]);
      
      // Deduct the stock price from virtual cash
      setVirtualCash(prev => prev - stock.price);
      
      toast.success(`Added ${stock.name} to your portfolio!`, {
        position: "top-center"
      });
    }
  };
  
  const handleRemoveStock = (stockId: string) => {
    // Find the stock to remove
    const stockToRemove = portfolio.find(s => s.id === stockId);
    
    if (stockToRemove) {
      // Return the value to virtual cash
      const valueToReturn = stockToRemove.price * stockToRemove.quantity;
      setVirtualCash(prev => prev + valueToReturn);
      
      // Remove the stock from portfolio
      setPortfolio(portfolio.filter(s => s.id !== stockId));
      
      toast.success(`Removed ${stockToRemove.name} from your portfolio!`, {
        position: "top-center"
      });
    }
  };
  
  const handleUpdateQuantity = (stockId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveStock(stockId);
      return;
    }
    
    setPortfolio(portfolio.map(stock => {
      if (stock.id === stockId) {
        // Calculate cash difference
        const oldValue = stock.price * stock.quantity;
        const newValue = stock.price * newQuantity;
        const difference = oldValue - newValue;
        
        // Update virtual cash
        setVirtualCash(prev => prev + difference);
        
        return { ...stock, quantity: newQuantity };
      }
      return stock;
    }));
  };
  
  const getTotalPortfolioValue = () => {
    return portfolio.reduce((total, stock) => total + (stock.price * stock.quantity), 0);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Fantasy Stock Market</h1>
          <p className="text-gray-600">Practice investing without risking real money</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="contests">Contests</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contests" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockContests.map(contest => (
                <ContestCard 
                  key={contest.id}
                  {...contest}
                  onJoin={() => handleJoinContest(contest.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio" className="mt-6">
            <div className="mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Fantasy Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-pastel-blue p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Available Cash</div>
                      <div className="text-xl font-bold">₹{virtualCash.toLocaleString()}</div>
                    </div>
                    <div className="bg-pastel-green p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Portfolio Value</div>
                      <div className="text-xl font-bold">₹{getTotalPortfolioValue().toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <StockSearch onSelectStock={handleSelectStock} />
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Your Stocks</h3>
              
              {portfolio.length > 0 ? (
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  <div className="divide-y">
                    {portfolio.map(stock => (
                      <div key={stock.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-bold">{stock.name}</h4>
                              <Badge className="ml-2 bg-gray-100 text-gray-700">
                                {stock.ticker}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm mt-1">
                              <span className="font-medium">₹{stock.price.toLocaleString()}</span>
                              <span className={`ml-2 flex items-center ${
                                stock.change >= 0 ? "text-green-600" : "text-red-600"
                              }`}>
                                {stock.change >= 0 ? (
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                )}
                                {stock.change >= 0 ? "+" : ""}{stock.change}%
                              </span>
                            </div>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveStock(stock.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div className="flex items-center">
                            <ShoppingCart className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm">Quantity:</span>
                            <div className="flex items-center ml-2">
                              <button 
                                className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                                onClick={() => handleUpdateQuantity(stock.id, stock.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="mx-2 font-medium">{stock.quantity}</span>
                              <button 
                                className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                                onClick={() => handleUpdateQuantity(stock.id, stock.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-sm font-medium">
                            Total: ₹{(stock.price * stock.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Your portfolio is empty</h4>
                  <p className="text-gray-500 mb-4">
                    Search for stocks above and add them to your portfolio
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard entries={mockLeaderboardEntries} title="Weekly Market Master" />
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Fantasy;
