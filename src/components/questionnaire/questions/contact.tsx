
import React from "react";
import { Question } from "../types";
import { Phone, UserPlus } from "lucide-react";

export const contactQuestions: Question[] = [
  {
    id: "phoneNumbers",
    titleEn: "Phone Numbers",
    titleEs: "Números de Teléfono",
    descriptionEn: "Your contact phone numbers",
    descriptionEs: "Sus números de teléfono de contacto",
    icon: <Phone className="h-5 w-5" />,
    subQuestions: [
      {
        id: "mobilePhone",
        questionEn: "Mobile Phone",
        questionEs: "Teléfono Móvil",
        type: "phone",
        required: true,
      },
      {
        id: "homePhone",
        questionEn: "Home Phone",
        questionEs: "Teléfono Fijo",
        type: "phone",
      },
    ],
    allowMultiple: true,
  },
  {
    id: "emergencyContacts",
    titleEn: "Emergency Contacts",
    titleEs: "Contactos de Emergencia",
    descriptionEn: "People to contact in case of emergency",
    descriptionEs: "Personas a contactar en caso de emergencia",
    icon: <UserPlus className="h-5 w-5" />,
    subQuestions: [
      {
        id: "contactName",
        questionEn: "Contact Name",
        questionEs: "Nombre del Contacto",
        type: "text",
        required: true,
      },
      {
        id: "relationship",
        questionEn: "Relationship",
        questionEs: "Relación",
        type: "text",
        required: true,
      },
      {
        id: "contactPhone",
        questionEn: "Phone Number",
        questionEs: "Número de Teléfono",
        type: "phone",
        required: true,
      },
      {
        id: "alternatePhone",
        questionEn: "Alternate Phone",
        questionEs: "Teléfono Alternativo",
        type: "phone",
      },
      {
        id: "contactEmail",
        questionEn: "Email",
        questionEs: "Correo Electrónico",
        type: "email",
      },
    ],
    allowMultiple: true,
  },
];
