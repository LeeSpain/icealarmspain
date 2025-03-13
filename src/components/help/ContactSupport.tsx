import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

const ContactSupport: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      toast.error(
        language === 'en' 
          ? "Please fill in all fields" 
          : "Por favor complete todos los campos"
      );
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(
        language === 'en' 
          ? "Your message has been sent. Our support team will get back to you shortly." 
          : "Su mensaje ha sido enviado. Nuestro equipo de soporte se pondrá en contacto con usted en breve."
      );
      
      setFormData({
        name: "",
        email: "",
        category: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const contactInfo = {
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
  
  const content = language === 'en' ? contactInfo.en : contactInfo.es;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{content.title}</CardTitle>
            <CardDescription>{content.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{content.nameLabel}</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={content.nameLabel}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{content.emailLabel}</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={content.emailLabel}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">{content.categoryLabel}</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder={content.categoryLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {content.categories.map((category, index) => (
                      <SelectItem key={index} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{content.messageLabel}</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={content.messageLabel}
                  rows={5}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? content.submittingButton : content.submitButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <MessageSquare className="h-6 w-6 text-ice-600 mt-1" />
              <div>
                <h3 className="font-medium">{content.chatTitle}</h3>
                <p className="text-sm text-muted-foreground">{content.chatDescription}</p>
                <Button 
                  variant="outline" 
                  className="mt-2 w-full border-ice-600 text-ice-600 hover:bg-ice-50"
                  onClick={() => {
                    // Would implement chat functionality 
                    toast.info(
                      language === 'en' 
                        ? "Chat feature coming soon!" 
                        : "¡Función de chat próximamente!"
                    );
                  }}
                >
                  {content.chatButton}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactSupport;
