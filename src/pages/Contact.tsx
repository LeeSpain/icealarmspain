
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MailIcon, PhoneIcon, MapPinIcon, CheckCircle } from "lucide-react";

const Contact: React.FC = () => {
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
              {language === 'en' ? 'Contact Us' : 'Contáctenos'}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-subtle flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-ice-100 flex items-center justify-center mb-4">
                  <PhoneIcon className="h-6 w-6 text-ice-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{language === 'en' ? 'Call Us' : 'Llámenos'}</h3>
                <p className="text-muted-foreground">+34 951 123 456</p>
                <p className="text-muted-foreground text-sm mt-2">
                  {language === 'en' ? 'Mon-Fri, 9:00-19:00' : 'Lun-Vie, 9:00-19:00'}
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-subtle flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-guardian-100 flex items-center justify-center mb-4">
                  <MailIcon className="h-6 w-6 text-guardian-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{language === 'en' ? 'Email Us' : 'Envíenos un Email'}</h3>
                <p className="text-muted-foreground">info@icealarespana.com</p>
                <p className="text-muted-foreground text-sm mt-2">
                  {language === 'en' ? 'We respond within 24 hours' : 'Respondemos en 24 horas'}
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-subtle flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-ice-100 flex items-center justify-center mb-4">
                  <MapPinIcon className="h-6 w-6 text-ice-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{language === 'en' ? 'Visit Us' : 'Visítenos'}</h3>
                <p className="text-muted-foreground">Calle Ejemplo 123</p>
                <p className="text-muted-foreground">29001 Málaga, Spain</p>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">
                {language === 'en' ? 'Send Us a Message' : 'Envíenos un Mensaje'}
              </h2>
              
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Thank You!' : '¡Gracias!'}
                  </h3>
                  <p className="text-center max-w-md">
                    {language === 'en'
                      ? 'Your message has been sent successfully. We will get back to you as soon as possible.'
                      : 'Su mensaje ha sido enviado con éxito. Nos pondremos en contacto con usted lo antes posible.'}
                  </p>
                  <Button 
                    className="mt-6"
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
                        {language === 'en' ? 'Full Name' : 'Nombre Completo'}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={language === 'en' ? 'John Doe' : 'Juan Pérez'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        {language === 'en' ? 'Email Address' : 'Correo Electrónico'}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email@example.com"
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
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium">
                        {language === 'en' ? 'Subject' : 'Asunto'}
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder={language === 'en' ? 'Product Inquiry' : 'Consulta sobre producto'}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      {language === 'en' ? 'Message' : 'Mensaje'}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder={language === 'en' ? 'How can we help you?' : '¿Cómo podemos ayudarle?'}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={formSubmitting}
                  >
                    {formSubmitting 
                      ? (language === 'en' ? 'Sending...' : 'Enviando...') 
                      : (language === 'en' ? 'Send Message' : 'Enviar Mensaje')}
                  </Button>
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
