
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Question } from "./types";

interface QuestionCardProps {
  question: Question;
  language: string;
  children: React.ReactNode;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  language,
  children
}) => {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          {question.icon}
          <CardTitle>
            {language === "en"
              ? question.titleEn
              : question.titleEs}
          </CardTitle>
        </div>
        <CardDescription>
          {language === "en"
            ? question.descriptionEn
            : question.descriptionEs}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
