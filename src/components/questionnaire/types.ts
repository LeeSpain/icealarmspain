
export interface QuestionOption {
  id: string;
  textEn: string;
  textEs: string;
  value: string;
}

export interface SubQuestion {
  id: string;
  questionEn: string;
  questionEs: string;
  options?: QuestionOption[];
  type: "text" | "select" | "boolean" | "textarea" | "phone" | "email";
  required?: boolean;
}

export interface Question {
  id: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  icon: React.ReactNode;
  subQuestions: SubQuestion[];
  allowMultiple?: boolean;
}

export type MultiEntry = {
  [key: string]: string;
  _id: string; // Unique identifier for each entry
};
