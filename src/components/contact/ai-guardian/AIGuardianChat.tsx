
import React from "react";
import { GuardianProvider } from "./GuardianContext";
import Header from "./Header";
import ChatCard from "./ChatCard";
import ActionButtons from "./ActionButtons";

const AIGuardianChat: React.FC = () => {
  return (
    <div className="mb-16 max-w-4xl mx-auto">
      <GuardianProvider>
        <Header />
        <ChatCard />
        <ActionButtons />
      </GuardianProvider>
    </div>
  );
};

export default AIGuardianChat;
