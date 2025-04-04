
import { Calendar, Clock, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ContestCardProps {
  id: string;
  title: string;
  description: string;
  startTime: string;
  duration: string;
  entryFee: number;
  prizePool: number;
  participants: number;
  maxParticipants: number;
  isFeatured?: boolean;
  isJoined?: boolean;
  onJoin: () => void;
}

const ContestCard = ({
  id,
  title,
  description,
  startTime,
  duration,
  entryFee,
  prizePool,
  participants,
  maxParticipants,
  isFeatured = false,
  isJoined = false,
  onJoin,
}: ContestCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/fantasy/contest/${id}`);
  };
  
  return (
    <Card className={cn(
      "overflow-hidden card-hover cursor-pointer",
      isFeatured && "border-electric-blue"
    )}
    onClick={handleCardClick}
    >
      {isFeatured && (
        <div className="bg-electric-blue text-white text-xs font-medium py-1 px-4 text-center">
          Featured Contest
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-gray-500 mb-3">{description}</p>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span>{startTime}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
              <span className="font-medium text-green-600">₹{prizePool.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-500" />
              <span>{participants}/{maxParticipants}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-electric-blue h-2 rounded-full"
                style={{ width: `${(participants / maxParticipants) * 100}%` }}
              />
            </div>
            <div className="text-xs mt-1 text-right font-medium">
              {maxParticipants - participants} spots left
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 p-4 flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">Entry:</span>
          <span className="ml-1 font-medium">
            {entryFee > 0 ? `₹${entryFee}` : 'Free'}
          </span>
        </div>
        
        <Button 
          variant={isJoined ? "outline" : "default"}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onJoin();
          }}
        >
          {isJoined ? "Joined" : "Join Contest"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContestCard;
