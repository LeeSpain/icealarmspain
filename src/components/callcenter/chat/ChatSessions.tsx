
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserCircle, MessageCircle, Circle } from "lucide-react";
import { ChatSession } from "./types";

interface ChatSessionsProps {
  sessions: ChatSession[];
  selectedSession: ChatSession | null;
  onSelectSession: (session: ChatSession) => void;
}

const ChatSessions: React.FC<ChatSessionsProps> = ({
  sessions,
  selectedSession,
  onSelectSession
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSessions = sessions.filter(session => 
    session.memberName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Chat Sessions
        </CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-auto px-3 pt-0 pb-3">
        {filteredSessions.length > 0 ? (
          <div className="space-y-2">
            {filteredSessions.map((session) => (
              <Button
                key={session.id}
                variant="ghost"
                className={`w-full justify-start px-3 py-2 h-auto ${
                  selectedSession?.id === session.id 
                    ? 'bg-muted' 
                    : ''
                }`}
                onClick={() => onSelectSession(session)}
              >
                <div className="flex items-center w-full">
                  <div className="relative flex-shrink-0">
                    <UserCircle className="h-9 w-9 text-muted-foreground" />
                    <Circle 
                      className={`absolute bottom-0 right-0 h-3 w-3 ${
                        session.online ? 'text-green-500' : 'text-gray-400'
                      } fill-current`} 
                    />
                  </div>
                  <div className="ml-3 text-left flex-grow overflow-hidden">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-medium truncate">
                        {session.memberName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(session.lastMessage).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">
                      {session.lastMessagePreview}
                    </p>
                    
                    {session.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full mt-1">
                        {session.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <MessageCircle className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No chat sessions found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatSessions;
