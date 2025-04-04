
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name?: string;
  image?: string;
  size?: "sm" | "md" | "lg";
}

const UserAvatar = ({ 
  name = "User",
  image = "/placeholder.svg",
  size = "md" 
}: UserAvatarProps) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8";
      case "md":
        return "h-10 w-10";
      case "lg":
        return "h-16 w-16";
      default:
        return "h-10 w-10";
    }
  };
  
  const getFallbackSize = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "md":
        return "text-sm";
      case "lg":
        return "text-lg";
      default:
        return "text-sm";
    }
  };
  
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
  
  return (
    <Avatar className={getSize()}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className={`bg-electric-blue text-white ${getFallbackSize()}`}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
