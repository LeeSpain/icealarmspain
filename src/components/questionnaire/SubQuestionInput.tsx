
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SubQuestion } from "./types";

interface SubQuestionInputProps {
  questionId: string;
  subQuestion: SubQuestion;
  language: string;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  entryId?: string;
}

const SubQuestionInput: React.FC<SubQuestionInputProps> = ({
  questionId,
  subQuestion,
  language,
  value,
  onChange,
  entryId = "",
}) => {
  const inputId = entryId 
    ? `${entryId}_${subQuestion.id}`
    : `${questionId}_${subQuestion.id}`;

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>
        {language === "en" ? subQuestion.questionEn : subQuestion.questionEs}
        {subQuestion.required && " *"}
      </Label>

      {subQuestion.type === "text" && (
        <Input
          id={inputId}
          type="text"
          value={value as string || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            language === "en"
              ? `Enter ${subQuestion.questionEn.toLowerCase()}`
              : `Ingrese ${subQuestion.questionEs.toLowerCase()}`
          }
        />
      )}

      {subQuestion.type === "email" && (
        <Input
          id={inputId}
          type="email"
          value={value as string || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            language === "en" ? "Enter email" : "Ingrese correo"
          }
        />
      )}

      {subQuestion.type === "phone" && (
        <Input
          id={inputId}
          type="tel"
          value={value as string || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            language === "en"
              ? "Enter phone number"
              : "Ingrese número de teléfono"
          }
        />
      )}

      {subQuestion.type === "textarea" && (
        <Textarea
          id={inputId}
          value={value as string || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            language === "en" ? "Enter details" : "Ingrese detalles"
          }
        />
      )}

      {subQuestion.type === "boolean" && (
        <div className="flex gap-4">
          <Button
            variant={value === true ? "secondary" : "outline"}
            onClick={() => onChange(true)}
          >
            {language === "en" ? "Yes" : "Sí"}
          </Button>
          <Button
            variant={value === false ? "secondary" : "outline"}
            onClick={() => onChange(false)}
          >
            {language === "en" ? "No" : "No"}
          </Button>
        </div>
      )}

      {subQuestion.type === "select" && subQuestion.options && (
        <select
          id={inputId}
          className="w-full p-2 border rounded"
          value={value as string || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">
            {language === "en" ? "Select..." : "Seleccionar..."}
          </option>
          {subQuestion.options.map((option) => (
            <option key={option.id} value={option.value}>
              {language === "en" ? option.textEn : option.textEs}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SubQuestionInput;
