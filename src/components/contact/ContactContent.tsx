
import React from "react";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import VisitUsSection from "./VisitUsSection";
import AIGuardianSection from "./AIGuardianSection";

const ContactContent: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-ice-50/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 pt-12">
            <div className="w-24 h-1 bg-gradient-to-r from-ice-400 to-guardian-500 mx-auto rounded-full"></div>
          </div>
          
          <AIGuardianSection />
          <ContactCards />
          <VisitUsSection />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
