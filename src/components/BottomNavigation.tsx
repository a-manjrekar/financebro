
import { Home, BookOpen, TrendingUp, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Learn", path: "/learn" },
    { icon: TrendingUp, label: "Fantasy", path: "/fantasy" },
    { icon: MessageCircle, label: "Q&A", path: "/qa" },
    { icon: User, label: "Profile", path: "/profile" },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-2 px-6 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={cn(
                "flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-colors",
                isActive 
                  ? "text-electric-blue" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "animate-bounce-in")} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
