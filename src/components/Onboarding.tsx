
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Target, TrendingUp, Coins, BookOpen, Award } from "lucide-react";

const goals = [
  { 
    id: "basics", 
    icon: BookOpen, 
    title: "Learn the Basics", 
    description: "Understand financial concepts & terminology" 
  },
  { 
    id: "stocks", 
    icon: TrendingUp, 
    title: "Start Investing", 
    description: "Learn to analyze & invest in stocks" 
  },
  { 
    id: "wealth", 
    icon: Coins, 
    title: "Build Wealth", 
    description: "Create a diversified investment portfolio" 
  },
  { 
    id: "expert", 
    icon: Award, 
    title: "Become an Expert", 
    description: "Master advanced investment strategies" 
  },
];

const levels = [
  { id: "beginner", title: "Beginner", description: "I'm new to finance" },
  { id: "intermediate", title: "Intermediate", description: "I know the basics" },
  { id: "advanced", title: "Advanced", description: "I have some experience" },
];

type AvatarOption = {
  id: string;
  emoji: string;
  color: string;
};

const avatarOptions: AvatarOption[] = [
  { id: "a1", emoji: "🧑", color: "bg-pastel-blue" },
  { id: "a2", emoji: "👩", color: "bg-pastel-green" },
  { id: "a3", emoji: "👨", color: "bg-pastel-yellow" },
  { id: "a4", emoji: "👧", color: "bg-pastel-purple" },
  { id: "a5", emoji: "👦", color: "bg-pastel-pink" },
];

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [activeTab, setActiveTab] = useState("goal");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  
  const handleNextStep = () => {
    if (activeTab === "goal" && selectedGoal) {
      setActiveTab("level");
    } else if (activeTab === "level" && selectedLevel) {
      setActiveTab("avatar");
    } else if (activeTab === "avatar" && selectedAvatar) {
      onComplete();
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pastel-blue via-white to-pastel-green py-8 px-4">
      <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-electric-blue">
            Welcome to FinFun
          </CardTitle>
          <CardDescription>
            Let's personalize your learning journey
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="goal">Goal</TabsTrigger>
            <TabsTrigger value="level">Level</TabsTrigger>
            <TabsTrigger value="avatar">Avatar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="goal">
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Target className="w-5 h-5 mr-2 text-electric-blue" />
                What's your financial goal?
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedGoal === goal.id
                        ? "border-electric-blue bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedGoal(goal.id)}
                  >
                    <div className="flex items-start">
                      <div className="bg-pastel-blue p-2 rounded-md mr-3">
                        <goal.icon className="w-5 h-5 text-electric-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <p className="text-sm text-gray-500">{goal.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="level">
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">What's your experience level?</h3>
              <div className="grid grid-cols-1 gap-3">
                {levels.map((level) => (
                  <div
                    key={level.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedLevel === level.id
                        ? "border-electric-blue bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedLevel(level.id)}
                  >
                    <h4 className="font-medium">{level.title}</h4>
                    <p className="text-sm text-gray-500">{level.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="avatar">
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Choose your avatar</h3>
              <div className="flex justify-center gap-3 py-4">
                {avatarOptions.map((avatar) => (
                  <div
                    key={avatar.id}
                    className={`flex items-center justify-center w-16 h-16 rounded-full cursor-pointer text-2xl ${avatar.color} ${
                      selectedAvatar === avatar.id
                        ? "ring-4 ring-electric-blue"
                        : ""
                    }`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    {avatar.emoji}
                  </div>
                ))}
              </div>
            </CardContent>
          </TabsContent>
          
          <CardFooter>
            <Button 
              onClick={handleNextStep}
              disabled={
                (activeTab === "goal" && !selectedGoal) ||
                (activeTab === "level" && !selectedLevel) ||
                (activeTab === "avatar" && !selectedAvatar)
              }
              className="w-full"
            >
              {activeTab === "avatar" ? "Get Started" : "Continue"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
};

export default Onboarding;
