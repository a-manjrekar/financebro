
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronRight, BookOpen, CheckCircle, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Lesson {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  xpReward: number;
}

interface LearningModuleProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
  isLocked?: boolean;
  onLessonSelect: (lessonId: string) => void;
  onModuleStart: () => void;
}

const LearningModule = ({
  id,
  title,
  description,
  progress,
  lessons,
  isLocked = false,
  onLessonSelect,
  onModuleStart,
}: LearningModuleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => {
    if (!isLocked) {
      setIsOpen(!isOpen);
    }
  };
  
  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const totalXP = lessons.reduce((total, lesson) => total + lesson.xpReward, 0);
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 ${
      isLocked ? "opacity-75" : "hover:shadow-md"
    }`}>
      <div 
        className={`p-4 cursor-pointer ${isLocked ? "" : "hover:bg-gray-50"}`}
        onClick={toggleOpen}
      >
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
          </div>
          
          {!isLocked && (
            <Button 
              variant="ghost" 
              size="sm"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                toggleOpen();
              }}
            >
              {isOpen ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </Button>
          )}
        </div>
      </div>
      
      {isOpen && !isLocked && (
        <CardContent className="pt-0 pb-4 px-4 border-t border-gray-100">
          <div className="space-y-3 mt-2">
            {lessons.map((lesson, index) => (
              <div 
                key={lesson.id}
                className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer
                  ${lesson.isCompleted ? "bg-gray-50" : "hover:bg-blue-50"}
                  ${index > 0 && !lessons[index-1].isCompleted && !lesson.isCompleted ? "opacity-60" : ""}
                `}
                onClick={() => {
                  // Only allow selecting a lesson if it's the first one or previous one is completed
                  if (index === 0 || lessons[index-1].isCompleted) {
                    onLessonSelect(lesson.id);
                  }
                }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pastel-blue flex items-center justify-center mr-3">
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
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Total XP: <span className="font-medium">{totalXP}</span>
            </div>
            
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onModuleStart();
              }}
              className="ml-auto"
              size="sm"
            >
              {progress > 0 ? "Continue" : "Start Module"}
              <BookOpen className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default LearningModule;
