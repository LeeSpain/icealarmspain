
import React from "react";
import { Question } from "../types";
import { User } from "lucide-react";

export const personalQuestions: Question = {
  id: "personal",
  titleEn: "Personal Information",
  titleEs: "Información Personal",
  descriptionEn: "Basic personal details",
  descriptionEs: "Datos personales básicos",
  icon: <User className="h-5 w-5" />,
  subQuestions: [
    {
      id: "fullName",
      questionEn: "Full Name",
      questionEs: "Nombre Completo",
      type: "text",
      required: true,
    },
    {
      id: "dob",
      questionEn: "Date of Birth",
      questionEs: "Fecha de Nacimiento",
      type: "text",
      required: true,
    },
    {
      id: "nie",
      questionEn: "NIE Number (Spanish Foreigner ID)",
      questionEs: "Número NIE (Identificación de Extranjero)",
      type: "text",
      required: true,
    },
    {
      id: "passport",
      questionEn: "Passport Number",
      questionEs: "Número de Pasaporte",
      type: "text",
      required: true,
    },
    {
      id: "email",
      questionEn: "Email Address",
      questionEs: "Correo Electrónico",
      type: "email",
      required: true,
    },
  ],
};
