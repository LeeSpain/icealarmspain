
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { contactInfo } from "./translations";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const EmailCard: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'en' ? contactInfo.en : contactInfo.es;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Mail className="h-6 w-6 text-ice-600 mt-1" />
          <div>
            <h3 className="font-medium">{content.emailTitle}</h3>
            <p className="text-sm text-muted-foreground">{content.emailDescription}</p>
            <p className="mt-2 font-medium text-ice-600">{content.emailAddress}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailCard;
