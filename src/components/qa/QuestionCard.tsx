
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MessageSquare, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuestionCardProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
  authorName: string;
  createdAt: string;
  answersCount: number;
  likes: number;
  isAnswered: boolean;
  onClick: () => void;
}

const QuestionCard = ({
  id,
  title,
  content,
  tags,
  authorName,
  createdAt,
  answersCount,
  likes,
  isAnswered,
  onClick,
}: QuestionCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/qa/question/${id}`);
  };
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 rounded p-1 mb-1">
              <ThumbsUp className="h-4 w-4 text-gray-500" />
            </div>
            <span className="text-sm font-medium">{likes}</span>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {content}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-gray-100">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <span className="mr-3">By {authorName}</span>
                <Calendar className="h-3 w-3 mr-1" />
                <span>{createdAt}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>{answersCount} {answersCount === 1 ? 'answer' : 'answers'}</span>
                </div>
                
                {isAnswered && (
                  <Badge className="bg-green-600">
                    Answered
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
