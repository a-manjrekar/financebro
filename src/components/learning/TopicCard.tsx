
import { Card } from "@/components/ui/card";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  progress: number;
  isLocked?: boolean;
  isCompleted?: boolean;
  onClick: () => void;
}

const TopicCard = ({
  title,
  description,
  icon,
  bgColor,
  progress,
  isLocked = false,
  isCompleted = false,
  onClick,
}: TopicCardProps) => {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden cursor-pointer card-hover group",
        isLocked && "opacity-75"
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent to-white/40 pointer-events-none" />
      
      <div className={cn("p-5", bgColor)}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
          
          <div className="relative flex items-center justify-center w-12 h-12 text-2xl">
            {icon}
            
            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                <Lock className="w-5 h-5 text-white" />
              </div>
            )}
            
            {isCompleted && (
              <div className="absolute -right-1 -top-1 bg-green-500 text-white rounded-full p-1">
                <Check className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>
        
        {!isCompleted && !isLocked && (
          <div className="mt-4">
            <div className="progress-bar">
              <div 
                className="progress-value transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs mt-1 text-right font-medium">
              {progress}% complete
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TopicCard;
