
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import WalletCard from "@/components/WalletCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, ArrowUpRight, ArrowDownLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Mock transaction data
const transactions = [
  { id: "1", type: "earn", title: "Completed Stock Market Quiz", amount: 50, timestamp: "2h ago" },
  { id: "2", type: "spend", title: "Expert Q&A Session", amount: 200, timestamp: "1d ago" },
  { id: "3", type: "earn", title: "7-Day Streak Reward", amount: 70, timestamp: "1d ago" },
  { id: "4", type: "earn", title: "Completed Finance Basics Module", amount: 100, timestamp: "3d ago" },
  { id: "5", type: "earn", title: "Referral Bonus", amount: 100, timestamp: "1w ago" },
  { id: "6", type: "spend", title: "Contest Entry Fee", amount: 50, timestamp: "1w ago" },
];

const rewards = [
  { id: "1", title: "Daily Login", description: "Log in every day to earn coins", amount: 10, frequency: "Daily", isAvailable: true },
  { id: "2", title: "Complete Quiz", description: "Earn coins for each quiz completion", amount: 25, frequency: "Per quiz", isAvailable: true },
  { id: "3", title: "7-Day Streak", description: "Maintain a 7-day login streak", amount: 70, frequency: "Weekly", isAvailable: false },
  { id: "4", title: "Share on Social", description: "Share your progress on social media", amount: 30, frequency: "One-time", isAvailable: true },
];

const Wallet = () => {
  const handleReferral = () => {
    // In a real app, this would open a share dialog
    toast.success("Referral link copied to clipboard!", {
      position: "top-center",
      description: "Share with your friends to earn bonus coins!",
    });
  };
  
  const handleClaimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    
    if (reward) {
      if (reward.isAvailable) {
        toast.success(`Claimed ${reward.amount} coins!`, {
          position: "top-center",
        });
      } else {
        toast.info("This reward is not available yet", {
          position: "top-center",
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Your Wallet</h1>
          <p className="text-gray-600">Track your earnings and spending</p>
        </div>
        
        <div className="mb-6">
          <WalletCard 
            coins={750}
            xp={1250}
            level={5}
            referralBonus={100}
            onReferralClick={handleReferral}
          />
        </div>
        
        <Tabs defaultValue="transactions" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="rewards">Earn Coins</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {transactions.map(transaction => (
                    <div key={transaction.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          transaction.type === "earn" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {transaction.type === "earn" ? (
                            <ArrowDownLeft className={`w-5 h-5 text-green-600`} />
                          ) : (
                            <ArrowUpRight className={`w-5 h-5 text-red-600`} />
                          )}
                        </div>
                        
                        <div>
                          <div className="font-medium">{transaction.title}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {transaction.timestamp}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`font-bold ${
                        transaction.type === "earn" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "earn" ? "+" : "-"}{transaction.amount} coins
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewards" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ways to Earn Coins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {rewards.map(reward => (
                    <div key={reward.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{reward.title}</h3>
                          <p className="text-sm text-gray-600 mb-1">{reward.description}</p>
                          <div className="text-xs text-gray-500">
                            {reward.frequency}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-green-600">+{reward.amount} coins</div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={!reward.isAvailable}
                            className="mt-2"
                            onClick={() => handleClaimReward(reward.id)}
                          >
                            {reward.isAvailable ? (
                              <>
                                Claim Now
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </>
                            ) : (
                              "Not Available"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Wallet;
