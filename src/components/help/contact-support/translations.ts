
import { ContactInfoTranslations } from "./types";

export const contactInfo: ContactInfoTranslations = {
  en: {
    title: "Contact Support",
    description: "Get help from our support team. We typically respond within 24 hours.",
    nameLabel: "Your Name",
    emailLabel: "Email Address",
    categoryLabel: "Category",
    messageLabel: "Your Message",
    submitButton: "Send Message",
    submittingButton: "Sending...",
    phoneTitle: "Phone Support",
    phoneDescription: "Available Monday to Friday, 9AM to 6PM CET",
    phoneNumber: "+34 900 123 456",
    emailTitle: "Email Support",
    emailDescription: "For non-urgent inquiries",
    emailAddress: "support@icealarm.es",
    chatTitle: "Live Chat",
    chatDescription: "Chat with our support team in real-time",
    chatButton: "Start Chat",
    categories: [
      { value: "account", label: "Account Issues" },
      { value: "device", label: "Device Problems" },
      { value: "billing", label: "Billing & Payments" },
      { value: "technical", label: "Technical Support" },
      { value: "other", label: "Other" }
    ]
  },
  es: {
    title: "Contactar Soporte",
    description: "Obtenga ayuda de nuestro equipo de soporte. Típicamente respondemos dentro de 24 horas.",
    nameLabel: "Su Nombre",
    emailLabel: "Dirección de Correo",
    categoryLabel: "Categoría",
    messageLabel: "Su Mensaje",
    submitButton: "Enviar Mensaje",
    submittingButton: "Enviando...",
    phoneTitle: "Soporte Telefónico",
    phoneDescription: "Disponible de lunes a viernes, 9AM a 6PM CET",
    phoneNumber: "+34 900 123 456",
    emailTitle: "Soporte por Correo",
    emailDescription: "Para consultas no urgentes",
    emailAddress: "soporte@icealarm.es",
    chatTitle: "Chat en Vivo",
    chatDescription: "Chatea con nuestro equipo de soporte en tiempo real",
    chatButton: "Iniciar Chat",
    categories: [
      { value: "account", label: "Problemas de Cuenta" },
      { value: "device", label: "Problemas de Dispositivo" },
      { value: "billing", label: "Facturación y Pagos" },
      { value: "technical", label: "Soporte Técnico" },
      { value: "other", label: "Otro" }
    ]
  }
};
