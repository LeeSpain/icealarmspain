
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real implementation, this would send the form data to a server
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    } catch (error) {
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
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">{language === 'en' ? 'Email Address' : 'Dirección de Correo'}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === 'en' ? 'Enter your email' : 'Ingrese su correo'}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="subject">{language === 'en' ? 'Subject' : 'Asunto'}</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={language === 'en' ? 'What is this regarding?' : '¿De qué se trata?'}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="message">{language === 'en' ? 'Message' : 'Mensaje'}</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={language === 'en' ? 'How can we help you?' : '¿Cómo podemos ayudarte?'}
            rows={5}
            required
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-guardian-500 hover:bg-guardian-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <span className="animate-spin mr-2">⏳</span>
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
