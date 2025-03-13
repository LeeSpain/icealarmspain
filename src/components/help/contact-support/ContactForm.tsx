
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
import { toast } from "react-toastify";

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
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
  );
};

export default ContactForm;
