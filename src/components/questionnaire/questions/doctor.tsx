
import React from "react";
import { Question } from "../types";
import { UserCircle } from "lucide-react";

export const doctorQuestions: Question = {
  id: "doctorInformation",
  titleEn: "Doctor Information",
  titleEs: "Información del Médico",
  descriptionEn: "Your primary healthcare providers",
  descriptionEs: "Sus proveedores de atención médica primaria",
  icon: <UserCircle className="h-5 w-5" />,
  subQuestions: [
    {
      id: "doctorName",
      questionEn: "Doctor's Name",
      questionEs: "Nombre del Médico",
      type: "text",
      required: true,
    },
    {
      id: "doctorSpecialty",
      questionEn: "Specialty",
      questionEs: "Especialidad",
      type: "text",
    },
    {
      id: "doctorPhone",
      questionEn: "Doctor's Phone",
      questionEs: "Teléfono del Médico",
      type: "phone",
      required: true,
    },
    {
      id: "doctorAddress",
      questionEn: "Doctor's Address/Clinic Name",
      questionEs: "Dirección del Médico/Nombre de la Clínica",
      type: "text",
    },
  ],
  allowMultiple: true,
};
