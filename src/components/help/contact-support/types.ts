
export interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}

export interface ContactCategory {
  value: string;
  label: string;
}

export interface ContactInfoContent {
  title: string;
  description: string;
  nameLabel: string;
  emailLabel: string;
  categoryLabel: string;
  messageLabel: string;
  submitButton: string;
  submittingButton: string;
  phoneTitle: string;
  phoneDescription: string;
  phoneNumber: string;
  emailTitle: string;
  emailDescription: string;
  emailAddress: string;
  chatTitle: string;
  chatDescription: string;
  chatButton: string;
  categories: ContactCategory[];
}

export interface ContactInfoTranslations {
  en: ContactInfoContent;
  es: ContactInfoContent;
}
