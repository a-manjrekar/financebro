
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  answersCount: number;
  likes: number;
  isAnswered?: boolean;
  onClick: () => void;
}

const QuestionCard = ({
  id,
  title,
  content,
  tags,
  authorName,
  authorAvatar,
  createdAt,
  answersCount,
  likes,
  isAnswered = false,
  onClick,
}: QuestionCardProps) => {
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLocalLikes(localLikes + 1);
      setLiked(true);
    } else {
      setLocalLikes(localLikes - 1);
      setLiked(false);
    }
  };
  
  return (
    <Card className="cursor-pointer card-hover" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{title}</h3>
          {isAnswered && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Answered
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-gray-600 line-clamp-2 mb-3">{content}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-pastel-blue text-electric-blue">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <UserAvatar 
            name={authorName} 
            image={authorAvatar} 
            size="sm"
          />
          <span className="ml-2">{authorName}</span>
          <span className="mx-2">•</span>
          <span>{createdAt}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between border-t">
        <div className="flex items-center text-sm text-gray-500">
          <MessageSquare className="w-4 h-4 mr-1" />
          <span>{answersCount} answers</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "text-gray-500",
            liked && "text-electric-blue"
          )}
          onClick={handleLike}
        >
          {liked ? (
            <ThumbsUp className="w-4 h-4 mr-1" />
          ) : (
            <ThumbsUp className="w-4 h-4 mr-1" />
          )}
          <span>{localLikes}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
