
import React from "react";
import { Question } from "../types";
import { FileText } from "lucide-react";

export const additionalQuestions: Question = {
  id: "additionalInfo",
  titleEn: "Additional Information",
  titleEs: "Información Adicional",
  descriptionEn: "Any other information you'd like to provide",
  descriptionEs: "Cualquier otra información que desee proporcionar",
  icon: <FileText className="h-5 w-5" />,
  subQuestions: [
    {
      id: "preferredHospital",
      questionEn: "Preferred Hospital",
      questionEs: "Hospital Preferido",
      type: "text",
    },
    {
      id: "bloodType",
      questionEn: "Blood Type",
      questionEs: "Tipo de Sangre",
      type: "select",
      options: [
        { id: "aPositive", textEn: "A+", textEs: "A+", value: "A+" },
        { id: "aNegative", textEn: "A-", textEs: "A-", value: "A-" },
        { id: "bPositive", textEn: "B+", textEs: "B+", value: "B+" },
        { id: "bNegative", textEn: "B-", textEs: "B-", value: "B-" },
        { id: "abPositive", textEn: "AB+", textEs: "AB+", value: "AB+" },
        { id: "abNegative", textEn: "AB-", textEs: "AB-", value: "AB-" },
        { id: "oPositive", textEn: "O+", textEs: "O+", value: "O+" },
        { id: "oNegative", textEn: "O-", textEs: "O-", value: "O-" },
        { id: "unknown", textEn: "Unknown", textEs: "Desconocido", value: "unknown" },
      ],
    },
    {
      id: "additionalNotes",
      questionEn: "Additional Notes or Special Instructions",
      questionEs: "Notas Adicionales o Instrucciones Especiales",
      type: "textarea",
    },
  ],
};
