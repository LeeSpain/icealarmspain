import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MailIcon, PhoneIcon, MapPinIcon, CheckCircle, Shield, Sparkles } from "lucide-react";

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
      <main className="flex-grow">
        {/* Hero Section - aligned with other pages */}
        <section 
          id="contact-hero" 
          className="relative pt-32 pb-24 overflow-hidden"
        >
          {/* Enhanced Background Elements - matching other hero sections */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
          <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full border border-ice-200/50 -z-10 animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full border border-guardian-200/50 -z-10 animate-float" style={{ animationDelay: "2s" }}></div>
          
          {/* Decorative accent lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/50 to-transparent -z-10"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/30 to-transparent -z-10"></div>
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-6 animate-slide-down">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
                  <Shield size={16} className="mr-2" />
                  <span className="relative">
                    {language === 'en' ? 'Get in Touch' : 'Contáctenos'}
                    <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
                  </span>
                </div>
                
                {/* Enhanced headline with professional styling */}
                <div className="relative mb-12">
                  {/* Decorative elements behind the headline */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair mx-auto max-w-4xl relative">
                    <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                      {language === 'en' 
                        ? 'Contact Us' 
                        : 'Contáctenos'}
                    </span>
                    
                    {/* Accent decorations */}
                    <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
                  </h1>
                  
                  {/* Decorative elements after the headline */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
                </div>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-6">
                  {language === 'en' 
                    ? 'Our multilingual team is ready to assist you. Reach out to us with any questions about our services.' 
                    : 'Nuestro equipo multilingüe está listo para ayudarte. Contáctanos con cualquier pregunta sobre nuestros servicios.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Bottom Decorative Wave - like other pages */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
              <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>
        
        <div className="bg-gradient-to-b from-white to-ice-50/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 pt-12">
                <div className="w-24 h-1 bg-gradient-to-r from-ice-400 to-guardian-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Contact cards - keep existing content */}
                <div className="glass-panel p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="h-16 w-16 rounded-full bg-ice-100 flex items-center justify-center mb-4">
                    <PhoneIcon className="h-8 w-8 text-ice-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{language === 'en' ? 'Call Us' : 'Llámenos'}</h3>
                  <p className="text-lg text-muted-foreground">+34 951 123 456</p>
                  <p className="text-muted-foreground mt-2">
                    {language === 'en' ? 'Mon-Fri, 9:00-19:00' : 'Lun-Vie, 9:00-19:00'}
                  </p>
                  <div className="mt-4 text-sm">
                    {language === 'en' 
                      ? 'English and Spanish support available' 
                      : 'Soporte disponible en español e inglés'}
                  </div>
                </div>
                
                <div className="glass-panel p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="h-16 w-16 rounded-full bg-guardian-100 flex items-center justify-center mb-4">
                    <MailIcon className="h-8 w-8 text-guardian-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{language === 'en' ? 'Email Us' : 'Envíenos un Email'}</h3>
                  <p className="text-lg text-muted-foreground">info@icealarespana.com</p>
                  <p className="text-muted-foreground mt-2">
                    {language === 'en' ? 'We respond within 24 hours' : 'Respondemos en 24 horas'}
                  </p>
                  <div className="mt-4 text-sm">
                    {language === 'en' 
                      ? 'For both general inquiries and support' 
                      : 'Para consultas generales y soporte'}
                  </div>
                </div>
                
                <div className="glass-panel p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="h-16 w-16 rounded-full bg-ice-100 flex items-center justify-center mb-4">
                    <MapPinIcon className="h-8 w-8 text-ice-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{language === 'en' ? 'Visit Us' : 'Visítenos'}</h3>
                  <p className="text-lg text-muted-foreground">Calle Ejemplo 123</p>
                  <p className="text-muted-foreground">29001 Málaga, Spain</p>
                  <div className="mt-4 text-sm">
                    {language === 'en' 
                      ? 'By appointment only' 
                      : 'Solo con cita previa'}
                  </div>
                </div>
              </div>
              
              {/* Contact form - keep existing functionality */}
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
