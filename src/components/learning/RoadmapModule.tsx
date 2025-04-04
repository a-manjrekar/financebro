
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, CheckCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Lesson {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  xpReward: number;
}

interface RoadmapModuleProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
  isLocked?: boolean;
  onStart: (moduleId: string) => void;
}

const RoadmapModule = ({
  id,
  title,
  description,
  progress,
  lessons,
  isLocked = false,
  onStart,
}: RoadmapModuleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  
  const handleStartModule = () => {
    if (isLocked) return;
    onStart(id);
    navigate(`/learn/module/${id}`);
  };
  
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLocked) {
      setIsExpanded(!isExpanded);
    }
  };
  
  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 ${
        isLocked ? "opacity-75" : "cursor-pointer hover:shadow-md"
      }`}
      onClick={toggleExpand}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-bold text-lg">{title}</h3>
              {isLocked && <Lock className="w-4 h-4 ml-2 text-gray-500" />}
            </div>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            
            {!isLocked && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">
                    {completedLessons}/{lessons.length} lessons completed
                  </span>
                  <span className="text-xs font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-electric-blue h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            
            {isExpanded && !isLocked && (
              <div className="mt-4 space-y-3">
                {lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id} 
                    className="border rounded-lg p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-pastel-blue flex items-center justify-center mr-3">
                        {lesson.isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{lesson.title}</h4>
                        <p className="text-xs text-gray-500">{lesson.description}</p>
                      </div>
                    </div>
                    <Badge className="ml-2 bg-pastel-green text-black">+{lesson.xpReward} XP</Badge>
                  </div>
                ))}
                
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartModule();
                  }}
                  className="w-full mt-3"
                  disabled={isLocked}
                >
                  {progress > 0 ? "Continue Learning" : "Start Module"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
          
          {!isExpanded && !isLocked && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleStartModule();
              }}
              disabled={isLocked}
            >
              {progress > 0 ? "Continue" : "Start"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapModule;
