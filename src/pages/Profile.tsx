
import { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Wallet, Settings, TrendingUp, LogOut, Edit } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import WalletCard from "@/components/WalletCard";
import { toast } from "sonner";

// Mock user data
const user = {
  name: "Arjun Mehta",
  email: "arjun.mehta@gmail.com",
  joinedDate: "March 2023",
  level: 5,
  xp: 1250,
  coins: 750,
  streak: 7,
  achievements: [
    { id: "1", name: "First Lesson", description: "Complete your first lesson", icon: "🎓", earned: true },
    { id: "2", name: "Week Streak", description: "Maintain a 7-day streak", icon: "🔥", earned: true },
    { id: "3", name: "Quiz Master", description: "Score 100% on 5 quizzes", icon: "🏆", earned: true },
    { id: "4", name: "Portfolio Builder", description: "Create your first fantasy portfolio", icon: "📈", earned: true },
    { id: "5", name: "Community Helper", description: "Answer 10 community questions", icon: "🤝", earned: false },
    { id: "6", name: "Expert Learner", description: "Complete all Finance Basics modules", icon: "🧠", earned: false },
    { id: "7", name: "Market Guru", description: "Win a fantasy contest", icon: "💰", earned: false },
    { id: "8", name: "Knowledge Seeker", description: "Book 3 expert sessions", icon: "👨‍🏫", earned: false },
  ],
  stats: {
    lessonsCompleted: 12,
    quizzesTaken: 8,
    questionsAsked: 3,
    contestsJoined: 2
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleReferral = () => {
    // In a real app, this would open a share dialog
    toast.success("Referral link copied to clipboard!", {
      position: "top-center",
      description: "Share with your friends to earn bonus coins!",
    });
  };
  
  const handleLogout = () => {
    toast.info("Logged out successfully", {
      position: "top-center",
    });
    
    // In a real app, this would clear auth state and redirect
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        <div className="mb-6">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-electric-blue to-mint-green h-32" />
            
            <CardContent className="relative pt-0">
              <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-4">
                <div className="rounded-full border-4 border-white bg-white">
                  <UserAvatar name={user.name} size="lg" />
                </div>
                
                <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left flex-1">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="level-badge">
                  <span className="mr-1">🏆</span>
                  Level {user.level}
                </div>
                <div className="xp-badge">
                  <span className="mr-1">⚡</span>
                  {user.xp} XP
                </div>
                <div className="coin-badge">
                  <span className="mr-1">🪙</span>
                  {user.coins} Coins
                </div>
                <div className="badge bg-orange-100 text-orange-800">
                  <span className="mr-1">🔥</span>
                  {user.streak} day streak
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-electric-blue" />
                    Learning Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold">{user.stats.lessonsCompleted}</div>
                      <div className="text-sm text-gray-500">Lessons Completed</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold">{user.stats.quizzesTaken}</div>
                      <div className="text-sm text-gray-500">Quizzes Taken</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">Learning Progress</h4>
                    <div className="progress-bar">
                      <div className="progress-value" style={{ width: "35%" }} />
                    </div>
                    <div className="text-xs mt-1 text-right">
                      35% of all courses completed
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-electric-blue" />
                    Fantasy Market Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold">{user.stats.contestsJoined}</div>
                      <div className="text-sm text-gray-500">Contests Joined</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-gray-500">Contests Won</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">Best Performance</h4>
                    <div className="text-sm">
                      <span className="text-gray-500">Weekly Market Master:</span>
                      <span className="ml-1 font-medium">5th Place</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Award className="w-5 h-5 mr-2 text-electric-blue" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {user.achievements
                    .filter(a => a.earned)
                    .slice(0, 4)
                    .map(achievement => (
                      <div key={achievement.id} className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <div className="font-medium text-sm">{achievement.name}</div>
                      </div>
                    ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => setActiveTab("achievements")}>
                    View All Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-electric-blue" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {user.achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`rounded-lg p-4 text-center ${
                        achievement.earned 
                          ? "bg-gray-50" 
                          : "bg-gray-100 opacity-50"
                      }`}
                    >
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <div className="font-medium">{achievement.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{achievement.description}</div>
                      {achievement.earned ? (
                        <div className="mt-3 text-xs text-green-600 font-medium">Earned</div>
                      ) : (
                        <div className="mt-3 text-xs text-gray-500 font-medium">Locked</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wallet" className="mt-6">
            <WalletCard 
              coins={user.coins}
              xp={user.xp}
              level={user.level}
              referralBonus={100}
              onReferralClick={handleReferral}
            />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-electric-blue" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>Daily Reminders</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-electric-blue"></div>
                          <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:left-6 transition-all"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>Contest Alerts</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-electric-blue"></div>
                          <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:left-6 transition-all"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>Q&A Responses</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-electric-blue"></div>
                          <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:left-6 transition-all"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-2">Account Information</h3>
                    <div className="space-y-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Email</span>
                        <span>{user.email}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Joined</span>
                        <span>{user.joinedDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 border-red-100">
                      Delete Account
                    </Button>
                  </div>
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

export default Profile;
