
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/UserAvatar";
import { ChevronUp, MessageSquare, Calendar, ThumbsUp, Award } from "lucide-react";
import { toast } from "sonner";

interface Answer {
  id: string;
  content: string;
  authorName: string;
  authorImage?: string;
  isExpert?: boolean;
  createdAt: string;
  likes: number;
  isAccepted?: boolean;
}

interface QuestionDetailProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
  authorName: string;
  authorImage?: string;
  createdAt: string;
  answersCount: number;
  likes: number;
  isAnswered: boolean;
  answers: Answer[];
  onLike: (id: string) => void;
  onAcceptAnswer: (questionId: string, answerId: string) => void;
}

const QuestionDetail = ({
  id,
  title,
  content,
  tags,
  authorName,
  authorImage,
  createdAt,
  answersCount,
  likes,
  isAnswered,
  answers,
  onLike,
  onAcceptAnswer,
}: QuestionDetailProps) => {
  const [newAnswer, setNewAnswer] = useState("");
  
  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) {
      toast.error("Please enter your answer", {
        position: "top-center",
      });
      return;
    }
    
    toast.success("Your answer has been submitted!", {
      position: "top-center",
    });
    
    setNewAnswer("");
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col"
              onClick={() => onLike(id)}
            >
              <ChevronUp className="w-6 h-6" />
              <span className="text-sm font-medium">{likes}</span>
            </Button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="mr-4">Asked {createdAt}</span>
              
              <MessageSquare className="w-4 h-4 mr-1" />
              <span>
                {answersCount} {answersCount === 1 ? "answer" : "answers"}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-gray-100">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="prose max-w-none mb-4">
              <p>{content}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserAvatar name={authorName} image={authorImage} size="sm" />
                <span className="ml-2 text-sm font-medium">{authorName}</span>
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
      
      {answers.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            {answersCount} {answersCount === 1 ? "Answer" : "Answers"}
          </h2>
          
          <div className="space-y-4">
            {answers.map((answer) => (
              <Card key={answer.id} className={`${
                answer.isAccepted ? "border-green-500 border-2" : ""
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex flex-col"
                        onClick={() => {}}
                      >
                        <ChevronUp className="w-6 h-6" />
                        <span className="text-sm font-medium">{answer.likes}</span>
                      </Button>
                      
                      {!answer.isAccepted && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-800 mt-2"
                          onClick={() => onAcceptAnswer(id, answer.id)}
                        >
                          <Award className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="prose max-w-none mb-4">
                        <p>{answer.content}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <UserAvatar name={answer.authorName} image={answer.authorImage} size="sm" />
                          <div className="ml-2">
                            <div className="flex items-center">
                              <span className="text-sm font-medium">{answer.authorName}</span>
                              {answer.isExpert && (
                                <Badge className="ml-2 bg-electric-blue">Expert</Badge>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">{answer.createdAt}</div>
                          </div>
                        </div>
                        
                        {answer.isAccepted && (
                          <Badge className="bg-green-600 flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            Accepted Answer
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Your Answer</h2>
        
        <Textarea
          placeholder="Write your answer here..."
          rows={6}
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="mb-4"
        />
        
        <Button onClick={handleSubmitAnswer}>
          Post Your Answer
        </Button>
      </div>
    </div>
  );
};

export default QuestionDetail;
