
import React from "react";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Chat {
  id: number;
  clientName: string;
  message: string;
  time: string;
  unread: boolean;
}

interface UnreadMessagesSectionProps {
  chats: Chat[];
  handleViewAll: (section: string) => void;
}

const UnreadMessagesSection: React.FC<UnreadMessagesSectionProps> = ({ 
  chats, 
  handleViewAll 
}) => {
  if (chats.length === 0) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xs font-semibold flex items-center">
          <MessageCircle className="h-3 w-3 mr-1 text-blue-500" />
          Unread Messages
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleViewAll("chat")}
          className="text-xs h-5 px-1"
        >
          <ArrowUpRight className="h-3 w-3" />
        </Button>
      </div>
      <div className="space-y-1">
        {chats.map(chat => (
          <div 
            key={chat.id}
            className="p-2 bg-blue-50 rounded-md text-xs border-l-2 border-blue-500"
          >
            <div className="flex justify-between">
              <span className="font-medium">{chat.clientName}</span>
              <span className="text-[10px] text-gray-500">{chat.time}</span>
            </div>
            <p className="mt-1 text-gray-600 text-xs line-clamp-1">{chat.message}</p>
            <div className="flex justify-end mt-1">
              <Button 
                size="sm" 
                className="h-5 text-[10px] px-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => handleViewAll("chat")}
              >
                Reply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnreadMessagesSection;
