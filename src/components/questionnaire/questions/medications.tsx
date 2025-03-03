
import React from "react";
import { Question } from "../types";
import { Pill } from "lucide-react";

export const medicationQuestions: Question = {
  id: "medications",
  titleEn: "Current Medications",
  titleEs: "Medicamentos Actuales",
  descriptionEn: "Medications you are currently taking",
  descriptionEs: "Medicamentos que está tomando actualmente",
  icon: <Pill className="h-5 w-5" />,
  subQuestions: [
    {
      id: "medicationName",
      questionEn: "Medication Name",
      questionEs: "Nombre del Medicamento",
      type: "text",
      required: true,
    },
    {
      id: "dosage",
      questionEn: "Dosage",
      questionEs: "Dosis",
      type: "text",
      required: true,
    },
    {
      id: "frequency",
      questionEn: "Frequency",
      questionEs: "Frecuencia",
      type: "text",
      required: true,
    },
    {
      id: "purpose",
      questionEn: "Purpose",
      questionEs: "Propósito",
      type: "text",
    },
  ],
  allowMultiple: true,
};
