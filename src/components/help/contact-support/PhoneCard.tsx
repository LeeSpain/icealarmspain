
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { contactInfo } from "./translations";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

const PhoneCard: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'en' ? contactInfo.en : contactInfo.es;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Phone className="h-6 w-6 text-guardian-600 mt-1" />
          <div>
            <h3 className="font-medium">{content.phoneTitle}</h3>
            <p className="text-sm text-muted-foreground">{content.phoneDescription}</p>
            <p className="mt-2 font-medium text-guardian-600">{content.phoneNumber}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhoneCard;
