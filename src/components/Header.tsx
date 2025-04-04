
import { Bell, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";

interface HeaderProps {
  xp?: number;
  streak?: number;
  level?: number;
}

const Header = ({ xp = 1250, streak = 7, level = 5 }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-electric-blue">FinFun</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center mr-2">
            <div className="mr-4 text-sm">
              <span className="xp-badge mr-2">
                <span className="mr-1">⚡</span>
                {xp} XP
              </span>
              <span className="level-badge">
                <span className="mr-1">🏆</span>
                Level {level}
              </span>
            </div>
            <div className="font-medium text-sm">
              🔥 {streak} day streak
            </div>
          </div>
          
          <Link to="/wallet">
            <Button variant="outline" size="icon" className="rounded-full">
              <Wallet className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/notifications">
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>
          
          <Link to="/profile">
            <UserAvatar />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
