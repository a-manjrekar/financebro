
import { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Award, Bell, Check, Clock, MessageCircle, Trash2, Trophy } from "lucide-react";
import { toast } from "sonner";

// Mock notifications data
const initialNotifications = [
  { 
    id: "1", 
    type: "achievement", 
    title: "New Achievement Unlocked!", 
    message: "You've earned the 'First Lesson' achievement!", 
    timestamp: "10 minutes ago",
    isRead: false,
  },
  { 
    id: "2", 
    type: "reminder", 
    title: "Continue Your Learning", 
    message: "You're on a 7-day streak! Keep it going by completing today's lesson.", 
    timestamp: "2 hours ago",
    isRead: false,
  },
  { 
    id: "3", 
    type: "qa", 
    title: "Your Question Has Been Answered", 
    message: "Neha Sharma has responded to your question about mutual funds.", 
    timestamp: "1 day ago",
    isRead: true,
  },
  { 
    id: "4", 
    type: "reward", 
    title: "You've Earned Coins!", 
    message: "You've earned 50 coins for completing the Stock Market Basics quiz.", 
    timestamp: "2 days ago",
    isRead: true,
  },
  { 
    id: "5", 
    type: "contest", 
    title: "Contest Results", 
    message: "The 'Daily Stock Challenge' has ended. You placed 5th out of 156 participants!", 
    timestamp: "1 week ago",
    isRead: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Award className="w-5 h-5 text-purple-500" />;
      case "reminder":
        return <Clock className="w-5 h-5 text-electric-blue" />;
      case "qa":
        return <MessageCircle className="w-5 h-5 text-mint-green" />;
      case "reward":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "contest":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
    
    toast.success("All notifications marked as read", {
      position: "top-center"
    });
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
    
    toast.success("All notifications cleared", {
      position: "top-center"
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, isRead: true } 
        : notification
    ));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-2xl mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAllNotifications}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
        
        {notifications.length > 0 ? (
          <div className="bg-white rounded-lg border shadow-sm divide-y">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-4 ${notification.isRead ? "" : "bg-blue-50"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className={`font-bold ${notification.isRead ? "" : "text-electric-blue"}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {notification.timestamp}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Notifications</h3>
            <p className="text-gray-500">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Notifications;
