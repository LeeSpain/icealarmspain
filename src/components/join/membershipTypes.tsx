
import React from "react";
import { User, Home, Heart, UserCog } from "lucide-react";

export interface MembershipType {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export const getMembershipTypes = (language: string): MembershipType[] => [
  {
    id: "individual",
    icon: <User className="h-8 w-8 text-orange-500" />,
    title: language === 'en' ? "Individual" : "Individual",
    subtitle: language === 'en' ? "For a single person" : "Para una persona"
  },
  {
    id: "couple",
    icon: <Heart className="h-8 w-8 text-orange-500" />,
    title: language === 'en' ? "Couple" : "Pareja",
    subtitle: language === 'en' ? "For partners or spouses" : "Para parejas o cónyuges"
  },
  {
    id: "family",
    icon: <Home className="h-8 w-8 text-orange-500" />,
    title: language === 'en' ? "Family" : "Familia",
    subtitle: language === 'en' ? "For family members" : "Para miembros de la familia"
  },
  {
    id: "caregiver",
    icon: <UserCog className="h-8 w-8 text-orange-500" />,
    title: language === 'en' ? "Caregiver" : "Cuidador",
    subtitle: language === 'en' ? "For caregivers" : "Para cuidadores"
  }
];
