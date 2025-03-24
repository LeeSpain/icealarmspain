
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ContactFormData } from "./types";
import { contactInfo } from "./translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value
    });
    
    // Clear error for category field
    if (errors.category) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.category;
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = language === 'en' ? "Name is required" : "El nombre es obligatorio";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? "Invalid email format" : "Formato de correo electrónico inválido";
    }
    
    if (!formData.category) {
      newErrors.category = language === 'en' ? "Category is required" : "La categoría es obligatoria";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = language === 'en' ? "Message is required" : "El mensaje es obligatorio";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        subject: formData.category,
        message: formData.message,
        user_id: user?.id,
        status: 'pending'
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: language === 'en' ? "Message Sent" : "Mensaje Enviado",
        description: language === 'en' 
          ? "Your message has been sent. Our support team will get back to you shortly." 
          : "Su mensaje ha sido enviado. Nuestro equipo de soporte se pondrá en contacto con usted en breve.",
      });
      
      setFormData({
        name: "",
        email: "",
        category: "",
        message: ""
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en' 
          ? "There was a problem sending your message. Please try again." 
          : "Hubo un problema al enviar su mensaje. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const content = language === 'en' ? contactInfo.en : contactInfo.es;
  
  return (
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
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">{content.categoryLabel}</Label>
            <Select
              value={formData.category}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
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
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
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
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                {content.submittingButton}
              </span>
            ) : content.submitButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
