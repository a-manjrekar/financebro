
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, ChevronRight, XCircle } from "lucide-react";
import { toast } from "sonner";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  image?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedOptionId === currentQuestion?.correctOptionId;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const handleOptionSelect = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOptionId(optionId);
    }
  };
  
  const handleSubmit = () => {
    if (!selectedOptionId) return;
    
    setIsSubmitted(true);
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! +10 XP", {
        position: "top-center",
      });
    }
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    }
  };
  
  if (!currentQuestion) return null;
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
          <div className="text-sm font-medium">
            Score: {score}/{questions.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            className="bg-electric-blue h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-lg font-medium">{currentQuestion.question}</div>
        
        {currentQuestion.image && (
          <div className="flex justify-center my-4">
            <img 
              src={currentQuestion.image} 
              alt="Question illustration" 
              className="rounded-lg max-h-40 object-contain"
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option) => (
            <div
              key={option.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedOptionId === option.id
                  ? isSubmitted
                    ? option.id === currentQuestion.correctOptionId
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-electric-blue bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex items-center justify-between">
                <span>{option.text}</span>
                
                {isSubmitted && selectedOptionId === option.id && (
                  <>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {isSubmitted && (
          <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50" : "bg-amber-50"} mt-4`}>
            <div className="flex items-start">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
              )}
              <div>
                <p className="font-medium">{isCorrect ? "Correct!" : "Not quite right"}</p>
                <p className="text-sm mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className="w-full"
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="w-full">
            {isLastQuestion ? "Finish Quiz" : "Next Question"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Quiz;
