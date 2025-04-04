
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Zap, Award, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletCardProps {
  coins: number;
  xp: number;
  level: number;
  referralBonus: number;
  onReferralClick: () => void;
}

const WalletCard = ({
  coins,
  xp,
  level,
  referralBonus,
  onReferralClick,
}: WalletCardProps) => {
  return (
    <Card className="bg-white shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-center">Your Wallet</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-pastel-yellow rounded-lg p-4 text-center">
            <div className="flex flex-col items-center">
              <Coins className="w-8 h-8 text-yellow-600 mb-2" />
              <span className="text-lg font-bold">{coins}</span>
              <span className="text-sm text-gray-600">Coins</span>
            </div>
          </div>
          
          <div className="bg-pastel-blue rounded-lg p-4 text-center">
            <div className="flex flex-col items-center">
              <Zap className="w-8 h-8 text-electric-blue mb-2" />
              <span className="text-lg font-bold">{xp}</span>
              <span className="text-sm text-gray-600">XP</span>
            </div>
          </div>
          
          <div className="bg-pastel-purple rounded-lg p-4 text-center">
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-lg font-bold">{level}</span>
              <span className="text-sm text-gray-600">Level</span>
            </div>
          </div>
          
          <div className="bg-pastel-green rounded-lg p-4 text-center">
            <div className="flex flex-col items-center">
              <Share2 className="w-8 h-8 text-mint-green mb-2" />
              <span className="text-lg font-bold">₹{referralBonus}</span>
              <span className="text-sm text-gray-600">Referral Bonus</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            onClick={onReferralClick}
            className="w-full"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Refer & Earn
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
