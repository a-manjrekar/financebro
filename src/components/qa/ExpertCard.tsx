
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";

interface ExpertCardProps {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  reviewCount: number;
  avatar?: string;
  sessionPrice: number;
  isAvailable?: boolean;
  onClick: () => void;
}

const ExpertCard = ({
  id,
  name,
  title,
  expertise,
  rating,
  reviewCount,
  avatar,
  sessionPrice,
  isAvailable = true,
  onClick,
}: ExpertCardProps) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </span>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return stars;
  };
  
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <UserAvatar 
            name={name} 
            image={avatar}
            size="lg"
          />
          
          <div className="flex-1">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-gray-500 text-sm">{title}</p>
            
            <div className="flex items-center mt-1">
              <div className="flex mr-2">
                {renderStars()}
              </div>
              <span className="text-sm text-gray-500">
                {rating.toFixed(1)} ({reviewCount} reviews)
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {expertise.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-gray-100">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 p-4 flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">Session:</span>
          <span className="ml-1 font-medium">₹{sessionPrice}</span>
        </div>
        
        <Button 
          disabled={!isAvailable}
          onClick={onClick}
        >
          {isAvailable ? "Book Session" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpertCard;
