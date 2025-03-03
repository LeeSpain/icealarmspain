
import React from "react";
import { Question } from "../types";
import { AlertCircle, Heart } from "lucide-react";

export const healthQuestions: Question[] = [
  {
    id: "allergies",
    titleEn: "Allergies",
    titleEs: "Alergias",
    descriptionEn: "Information about your allergies",
    descriptionEs: "Información sobre sus alergias",
    icon: <AlertCircle className="h-5 w-5" />,
    subQuestions: [
      {
        id: "hasAllergies",
        questionEn: "Do you have any allergies?",
        questionEs: "¿Tiene alguna alergia?",
        type: "boolean",
        required: true,
      },
      {
        id: "allergyDetails",
        questionEn: "Please list your allergies and reactions",
        questionEs: "Por favor, liste sus alergias y reacciones",
        type: "textarea",
      },
    ],
  },
  {
    id: "medicalConditions",
    titleEn: "Medical Conditions",
    titleEs: "Condiciones Médicas",
    descriptionEn: "Information about your health conditions",
    descriptionEs: "Información sobre sus condiciones de salud",
    icon: <Heart className="h-5 w-5" />,
    subQuestions: [
      {
        id: "hasMedicalConditions",
        questionEn: "Do you have any medical conditions?",
        questionEs: "¿Tiene alguna condición médica?",
        type: "boolean",
        required: true,
      },
      {
        id: "conditionDetails",
        questionEn: "Please describe your medical conditions",
        questionEs: "Por favor, describa sus condiciones médicas",
        type: "textarea",
      },
    ],
  },
];
