
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import ContactForm from "./ContactForm";
import LiveChatCard from "./LiveChatCard";

const ContactSupport: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <ContactForm />
      </div>
      
      <div className="space-y-4">
        <LiveChatCard />
      </div>
    </div>
  );
};

export default ContactSupport;
