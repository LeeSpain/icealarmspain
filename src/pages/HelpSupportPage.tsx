
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Book, MessageSquare, Phone, FileText, Send, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// FAQ data
const faqData = [
  {
    question: {
      en: "How do I set up my new device?",
      es: "¿Cómo configuro mi nuevo dispositivo?"
    },
    answer: {
      en: "To set up a new device, go to the Dashboard and click on 'Explore Products', then select your device and follow the step-by-step setup guide.",
      es: "Para configurar un nuevo dispositivo, ve al Panel de Control y haz clic en 'Explorar Productos', luego selecciona tu dispositivo y sigue la guía de configuración paso a paso."
    }
  },
  {
    question: {
      en: "What should I do if my device is not working?",
      es: "¿Qué debo hacer si mi dispositivo no funciona?"
    },
    answer: {
      en: "If your device is not working, try to reboot it first by pressing the power button for 10 seconds. If the issue persists, check the battery level and connectivity. For further assistance, contact our support team.",
      es: "Si tu dispositivo no funciona, intenta reiniciarlo primero presionando el botón de encendido durante 10 segundos. Si el problema persiste, verifica el nivel de batería y la conectividad. Para más ayuda, contacta a nuestro equipo de soporte."
    }
  },
  {
    question: {
      en: "How do I update my emergency contacts?",
      es: "¿Cómo actualizo mis contactos de emergencia?"
    },
    answer: {
      en: "To update your emergency contacts, go to your Profile page, scroll down to the Emergency Contact section, and click on Edit. Add or remove contacts as needed and save your changes.",
      es: "Para actualizar tus contactos de emergencia, ve a tu página de Perfil, desplázate hacia abajo hasta la sección de Contacto de Emergencia y haz clic en Editar. Añade o elimina contactos según sea necesario y guarda tus cambios."
    }
  },
  {
    question: {
      en: "How accurate is the fall detection?",
      es: "¿Qué tan precisa es la detección de caídas?"
    },
    answer: {
      en: "Our fall detection technology has an accuracy rate of over 95%. The system uses multiple sensors and AI algorithms to distinguish between normal movements and actual falls to minimize false alarms.",
      es: "Nuestra tecnología de detección de caídas tiene una tasa de precisión superior al 95%. El sistema utiliza múltiples sensores y algoritmos de IA para distinguir entre movimientos normales y caídas reales para minimizar las falsas alarmas."
    }
  },
  {
    question: {
      en: "Can I use the SOS Pendant in the shower?",
      es: "¿Puedo usar el Colgante SOS en la ducha?"
    },
    answer: {
      en: "Yes, the SOS Pendant is water-resistant with an IP67 rating, which means it can be worn in the shower and is protected against temporary immersion in water up to 1 meter for 30 minutes.",
      es: "Sí, el Colgante SOS es resistente al agua con clasificación IP67, lo que significa que se puede usar en la ducha y está protegido contra la inmersión temporal en agua de hasta 1 metro durante 30 minutos."
    }
  }
];

const HelpSupportPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      language === 'en' 
        ? "Your message has been sent! We'll respond shortly." 
        : "¡Tu mensaje ha sido enviado! Responderemos pronto."
    );
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  const filteredFaqs = searchQuery 
    ? faqData.filter(faq => 
        faq.question[language === 'en' ? 'en' : 'es'].toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer[language === 'en' ? 'en' : 'es'].toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData;
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="help"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Help & Support' : 'Ayuda y Soporte'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Find answers to your questions or contact our support team' 
                : 'Encuentra respuestas a tus preguntas o contacta a nuestro equipo de soporte'}
            </p>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder={language === 'en' ? "Search for help..." : "Buscar ayuda..."} 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Book className="h-10 w-10 text-ice-500 mb-4" />
                <h3 className="font-medium text-lg mb-2">
                  {language === 'en' ? 'User Guides' : 'Guías de Usuario'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'en' 
                    ? 'Access detailed instructions for all our products' 
                    : 'Accede a instrucciones detalladas para todos nuestros productos'}
                </p>
                <Button variant="outline">
                  {language === 'en' ? 'Browse Guides' : 'Explorar Guías'}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <MessageSquare className="h-10 w-10 text-ice-500 mb-4" />
                <h3 className="font-medium text-lg mb-2">
                  {language === 'en' ? 'Live Chat' : 'Chat en Vivo'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'en' 
                    ? 'Chat with our support team in real-time' 
                    : 'Chatea con nuestro equipo de soporte en tiempo real'}
                </p>
                <Button className="bg-ice-600 hover:bg-ice-700">
                  {language === 'en' ? 'Start Chat' : 'Iniciar Chat'}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Phone className="h-10 w-10 text-ice-500 mb-4" />
                <h3 className="font-medium text-lg mb-2">
                  {language === 'en' ? 'Phone Support' : 'Soporte Telefónico'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'en' 
                    ? 'Speak with our customer service' 
                    : 'Habla con nuestro servicio al cliente'}
                </p>
                <Button variant="outline">
                  {language === 'en' ? '+34 900 123 456' : '+34 900 123 456'}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Quick answers to common questions' 
                      : 'Respuestas rápidas a preguntas comunes'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {filteredFaqs.length > 0 ? (
                      filteredFaqs.map((faq, index) => (
                        <div key={index} className="border-b pb-4 last:border-0">
                          <h3 className="font-medium text-lg mb-2">
                            {faq.question[language === 'en' ? 'en' : 'es']}
                          </h3>
                          <p className="text-muted-foreground">
                            {faq.answer[language === 'en' ? 'en' : 'es']}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          {language === 'en' 
                            ? 'No results found. Try a different search term.' 
                            : 'No se encontraron resultados. Intenta con un término de búsqueda diferente.'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Contact Us' : 'Contáctanos'}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Send us a message and we\'ll respond soon' 
                      : 'Envíanos un mensaje y responderemos pronto'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Input 
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        placeholder={language === 'en' ? "Your name" : "Tu nombre"}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Input 
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        placeholder={language === 'en' ? "Your email" : "Tu email"}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Input 
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        placeholder={language === 'en' ? "Subject" : "Asunto"}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Textarea 
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        placeholder={language === 'en' ? "Your message" : "Tu mensaje"}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-ice-600 hover:bg-ice-700">
                      <Send className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Send Message' : 'Enviar Mensaje'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
