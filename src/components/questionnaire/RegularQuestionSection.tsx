
import React from "react";
import SubQuestionInput from "./SubQuestionInput";
import { Question } from "./types";

interface RegularQuestionSectionProps {
  question: Question;
  answers: { [key: string]: any };
  language: string;
  onAnswerChange: (subQuestionId: string, value: string | boolean) => void;
}

const RegularQuestionSection: React.FC<RegularQuestionSectionProps> = ({
  question,
  answers,
  language,
  onAnswerChange,
}) => {
  return (
    <div className="space-y-6">
      {question.subQuestions.map((subQuestion) => {
        // For postal address, only show additional fields if sameAsHome is false
        if (
          question.id === "postalAddress" &&
          subQuestion.id !== "sameAsHome" &&
          answers[`postalAddress_sameAsHome`] === true
        ) {
          return null;
        }

        // For allergies & medical conditions, only show details if the condition is true
        if (
          (question.id === "allergies" &&
            subQuestion.id === "allergyDetails" &&
            answers[`allergies_hasAllergies`] !== true) ||
          (question.id === "medicalConditions" &&
            subQuestion.id === "conditionDetails" &&
            answers[`medicalConditions_hasMedicalConditions`] !== true)
        ) {
          return null;
        }

        return (
          <SubQuestionInput
            key={subQuestion.id}
            questionId={question.id}
            subQuestion={subQuestion}
            language={language}
            value={answers[`${question.id}_${subQuestion.id}`] || ""}
            onChange={(value) => onAnswerChange(subQuestion.id, value)}
          />
        );
      })}
    </div>
  );
};

export default RegularQuestionSection;
