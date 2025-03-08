
import React from "react";
import { GuardianProvider } from "./GuardianContext";
import Header from "./Header";
import ChatCard from "./ChatCard";
import ActionButtons from "./ActionButtons";

const AIGuardianChat: React.FC = () => {
  return (
    <div className="mb-16">
      <GuardianProvider>
        <div className="space-y-4">
          <Header />
          <ChatCard />
          <ActionButtons />
        </div>
      </GuardianProvider>
    </div>
  );
};

export default AIGuardianChat;
