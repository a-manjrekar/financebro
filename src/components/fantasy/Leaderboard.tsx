
import UserAvatar from "@/components/UserAvatar";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar?: string;
  points: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
}

const Leaderboard = ({ 
  entries, 
  title = "Leaderboard"
}: LeaderboardProps) => {
  const getTrophyColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-700";
      default:
        return "text-gray-300";
    }
  };
  
  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      
      <div className="divide-y">
        {entries.map((entry) => (
          <div 
            key={entry.id}
            className={cn(
              "p-4 flex items-center justify-between transition-colors",
              entry.isCurrentUser ? "bg-blue-50" : "hover:bg-gray-50"
            )}
          >
            <div className="flex items-center">
              <div className="w-10 text-center mr-3">
                {entry.rank <= 3 ? (
                  <Trophy className={`w-5 h-5 mx-auto ${getTrophyColor(entry.rank)}`} />
                ) : (
                  <span className="text-gray-500 font-medium">{entry.rank}</span>
                )}
              </div>
              
              <UserAvatar 
                name={entry.name} 
                image={entry.avatar} 
                size="sm"
              />
              
              <span className={cn(
                "ml-3 font-medium",
                entry.isCurrentUser && "text-electric-blue"
              )}>
                {entry.name}
                {entry.isCurrentUser && " (You)"}
              </span>
            </div>
            
            <div className="font-bold">
              {entry.points.toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
