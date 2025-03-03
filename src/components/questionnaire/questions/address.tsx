
import React from "react";
import { Question } from "../types";
import { Home } from "lucide-react";

export const addressQuestions: Question[] = [
  {
    id: "address",
    titleEn: "Primary Address",
    titleEs: "Dirección Principal",
    descriptionEn: "Your home address information",
    descriptionEs: "Información de su domicilio",
    icon: <Home className="h-5 w-5" />,
    subQuestions: [
      {
        id: "street",
        questionEn: "Street Address",
        questionEs: "Dirección",
        type: "text",
        required: true,
      },
      {
        id: "city",
        questionEn: "City",
        questionEs: "Ciudad",
        type: "text",
        required: true,
      },
      {
        id: "province",
        questionEn: "Province",
        questionEs: "Provincia",
        type: "text",
        required: true,
      },
      {
        id: "postalCode",
        questionEn: "Postal Code",
        questionEs: "Código Postal",
        type: "text",
        required: true,
      },
    ],
  },
  {
    id: "postalAddress",
    titleEn: "Postal Address (if different)",
    titleEs: "Dirección Postal (si es diferente)",
    descriptionEn: "Your alternative mailing address",
    descriptionEs: "Su dirección postal alternativa",
    icon: <Home className="h-5 w-5" />,
    subQuestions: [
      {
        id: "sameAsHome",
        questionEn: "Same as Home Address?",
        questionEs: "¿Igual que la Dirección Principal?",
        type: "boolean",
        required: true,
      },
      {
        id: "postalStreet",
        questionEn: "Street Address",
        questionEs: "Dirección",
        type: "text",
      },
      {
        id: "postalCity",
        questionEn: "City",
        questionEs: "Ciudad",
        type: "text",
      },
      {
        id: "postalProvince",
        questionEn: "Province",
        questionEs: "Provincia",
        type: "text",
      },
      {
        id: "postalCode",
        questionEn: "Postal Code",
        questionEs: "Código Postal",
        type: "text",
      },
    ],
  },
];
