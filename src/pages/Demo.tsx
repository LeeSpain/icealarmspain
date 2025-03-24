import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const Demo: React.FC = () => {
  const { language } = useLanguage();
  
  // Replace t() with direct translation logic
  const getTranslation = (key: string): string => {
    // Simple translation function
    return language === 'en' ? key : `ES: ${key}`;
  };

  return (
    <div>
      <h1>{getTranslation("Demo Page")}</h1>
      <p>{getTranslation("This is a demo page.")}</p>
    </div>
  );
};

export default Demo;
