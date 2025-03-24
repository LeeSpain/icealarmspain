
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = language === 'en' ? "Name is required" : "El nombre es obligatorio";
    }
    
    if (!email.trim()) {
      newErrors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = language === 'en' ? "Invalid email format" : "Formato de correo electrónico inválido";
    }
    
    if (!subject.trim()) {
      newErrors.subject = language === 'en' ? "Subject is required" : "El asunto es obligatorio";
    }
    
    if (!message.trim()) {
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
        name,
        email,
        subject,
        message,
        user_id: user?.id,
        status: 'pending'
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: language === 'en' ? "Message Sent" : "Mensaje Enviado",
        description: language === 'en' 
          ? "Thank you for your message. We'll respond within 24 hours." 
          : "Gracias por su mensaje. Responderemos dentro de las 24 horas.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-guardian-100 flex items-center justify-center">
          <Mail className="h-6 w-6 text-guardian-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">{language === 'en' ? 'Your Name' : 'Su Nombre'}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={language === 'en' ? 'Enter your name' : 'Ingrese su nombre'}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <Label htmlFor="email">{language === 'en' ? 'Email Address' : 'Dirección de Correo'}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === 'en' ? 'Enter your email' : 'Ingrese su correo'}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <Label htmlFor="subject">{language === 'en' ? 'Subject' : 'Asunto'}</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={language === 'en' ? 'What is this regarding?' : '¿De qué se trata?'}
            className={errors.subject ? "border-red-500" : ""}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>
        
        <div>
          <Label htmlFor="message">{language === 'en' ? 'Message' : 'Mensaje'}</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={language === 'en' ? 'How can we help you?' : '¿Cómo podemos ayudarte?'}
            rows={5}
            className={errors.message ? "border-red-500" : ""}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-guardian-500 hover:bg-guardian-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            {language === 'en' ? 'Sending...' : 'Enviando...'}
          </span>
        ) : (
          language === 'en' ? 'Send Message' : 'Enviar Mensaje'
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
