
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: language === 'en' ? "Message sent!" : "¡Mensaje enviado!",
        description: language === 'en' 
          ? "We'll get back to you as soon as possible." 
          : "Nos pondremos en contacto contigo lo antes posible.",
        variant: "default",
      });
      
      // Reset form after success
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: "general"
      });
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              {language === 'en' ? "Contact Us" : "Contáctanos"}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="glass-panel p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-ice-100 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-ice-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? "Call Us" : "Llámanos"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'en' 
                    ? "We're available 24/7 for emergencies" 
                    : "Estamos disponibles 24/7 para emergencias"}
                </p>
                <a href="tel:+34900123456" className="text-ice-600 font-medium hover:underline">
                  +34 900 123 456
                </a>
              </div>
              
              <div className="glass-panel p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-guardian-100 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-guardian-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? "Email Us" : "Envíanos un Email"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'en' 
                    ? "We usually respond within 24 hours" 
                    : "Normalmente respondemos en 24 horas"}
                </p>
                <a href="mailto:info@icealarm.es" className="text-guardian-600 font-medium hover:underline">
                  info@icealarm.es
                </a>
              </div>
              
              <div className="glass-panel p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? "Visit Us" : "Visítanos"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'en' 
                    ? "Our headquarters in Marbella" 
                    : "Nuestra sede en Marbella"}
                </p>
                <address className="not-italic text-sm">
                  Avenida Ricardo Soriano 72<br />
                  Marbella, 29601<br />
                  Málaga, España
                </address>
              </div>
            </div>
            
            <div className="glass-panel p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {language === 'en' ? "Send Us a Message" : "Envíanos un Mensaje"}
              </h2>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    {language === 'en' ? "Message Sent!" : "¡Mensaje Enviado!"}
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    {language === 'en' 
                      ? "Thank you for reaching out. We'll get back to you as soon as possible." 
                      : "Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {language === 'en' ? "Your Name" : "Tu Nombre"}*
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {language === 'en' ? "Email Address" : "Correo Electrónico"}*
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        {language === 'en' ? "Phone Number" : "Número de Teléfono"}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        {language === 'en' ? "Subject" : "Asunto"}*
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-400"
                      >
                        <option value="general">
                          {language === 'en' ? "General Inquiry" : "Consulta General"}
                        </option>
                        <option value="sales">
                          {language === 'en' ? "Sales" : "Ventas"}
                        </option>
                        <option value="support">
                          {language === 'en' ? "Technical Support" : "Soporte Técnico"}
                        </option>
                        <option value="billing">
                          {language === 'en' ? "Billing" : "Facturación"}
                        </option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {language === 'en' ? "Your Message" : "Tu Mensaje"}*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-400"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <ButtonCustom type="submit" className="w-full md:w-auto" isLoading={isSubmitting}>
                      <Send className="mr-2 h-4 w-4" />
                      {language === 'en' ? "Send Message" : "Enviar Mensaje"}
                    </ButtonCustom>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
