
import React from "react";
import CommercialHero from "./CommercialHero";
import PartnershipOptions from "./PartnershipOptions";
import ContactCTA from "./ContactCTA";
import { useLanguage } from "@/context/LanguageContext";

const CommercialContent: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="pt-20">
      <CommercialHero language={language} />
      <PartnershipOptions language={language} />
      <ContactCTA language={language} />
    </div>
  );
};

export default CommercialContent;
