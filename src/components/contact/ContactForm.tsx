
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    // Simulate form submission with a delay
    setTimeout(() => {
      toast({
        title: language === 'en' ? "Message Sent!" : "¡Mensaje Enviado!",
        description: language === 'en' 
          ? "Thank you for contacting us. We'll respond shortly." 
          : "Gracias por contactarnos. Responderemos en breve.",
      });
      setFormSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="glass-panel p-8 md:p-10 relative overflow-hidden mb-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-ice-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-guardian-50 rounded-full -ml-24 -mb-24 opacity-50"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-semibold mb-6 font-playfair">
          {language === 'en' ? 'Send Us a Message' : 'Envíenos un Mensaje'}
        </h2>
        
        {formSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 font-playfair">
              {language === 'en' ? 'Thank You!' : '¡Gracias!'}
            </h3>
            <p className="text-center max-w-md text-lg mb-6">
              {language === 'en'
                ? 'Your message has been sent successfully. We will get back to you as soon as possible.'
                : 'Su mensaje ha sido enviado con éxito. Nos pondremos en contacto con usted lo antes posible.'}
            </p>
            <Button 
              className="px-6 py-2"
              onClick={() => setFormSubmitted(false)}
            >
              {language === 'en' ? 'Send Another Message' : 'Enviar Otro Mensaje'}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  {language === 'en' ? 'Full Name' : 'Nombre Completo'} *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={language === 'en' ? 'John Doe' : 'Juan Pérez'}
                  className="transition-all duration-300 focus:border-ice-400"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  {language === 'en' ? 'Email Address' : 'Correo Electrónico'} *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@example.com"
                  className="transition-all duration-300 focus:border-ice-400"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 XXX XXX XXX"
                  className="transition-all duration-300 focus:border-ice-400"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  {language === 'en' ? 'Subject' : 'Asunto'} *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={language === 'en' ? 'Product Inquiry' : 'Consulta sobre producto'}
                  className="transition-all duration-300 focus:border-ice-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                {language === 'en' ? 'Message' : 'Mensaje'} *
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={language === 'en' ? 'How can we help you?' : '¿Cómo podemos ayudarle?'}
                className="transition-all duration-300 focus:border-ice-400"
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full md:w-auto px-8 py-2 bg-gradient-to-r from-ice-500 to-guardian-500 hover:from-ice-600 hover:to-guardian-600 transition-all duration-300"
                disabled={formSubmitting}
              >
                {formSubmitting 
                  ? (language === 'en' ? 'Sending...' : 'Enviando...') 
                  : (language === 'en' ? 'Send Message' : 'Enviar Mensaje')}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
