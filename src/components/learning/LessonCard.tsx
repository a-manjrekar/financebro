
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Book, CheckCircle, PlayCircle, FileText } from "lucide-react";

type LessonType = "video" | "article" | "interactive";

interface LessonCardProps {
  title: string;
  description: string;
  type: LessonType;
  duration: number;
  xpReward: number;
  isCompleted?: boolean;
  onClick: () => void;
}

const LessonCard = ({
  title,
  description,
  type,
  duration,
  xpReward,
  isCompleted = false,
  onClick,
}: LessonCardProps) => {
  const getLessonIcon = () => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-5 h-5 text-electric-blue" />;
      case "article":
        return <FileText className="w-5 h-5 text-electric-blue" />;
      case "interactive":
        return <Book className="w-5 h-5 text-electric-blue" />;
      default:
        return <Book className="w-5 h-5 text-electric-blue" />;
    }
  };
  
  const getTypeLabel = () => {
    switch (type) {
      case "video":
        return "Video Lesson";
      case "article":
        return "Reading";
      case "interactive":
        return "Interactive";
      default:
        return "Lesson";
    }
  };
  
  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer card-hover",
        isCompleted ? "bg-gray-50" : "bg-white"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-md">
            {getLessonIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={cn(
                "font-medium",
                isCompleted && "text-gray-500"
              )}>
                {title}
              </h3>
              
              {isCompleted && (
                <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
              )}
            </div>
            
            <p className="text-sm text-gray-500 mt-1">{description}</p>
            
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <span className="mr-3">{getTypeLabel()}</span>
              <span className="mr-3">{duration} min</span>
              <span className="text-electric-blue font-medium">+{xpReward} XP</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
