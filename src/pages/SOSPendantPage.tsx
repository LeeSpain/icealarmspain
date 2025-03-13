
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, BellRing, ArrowLeft, Check, Battery, Wifi, Heart, Clock, Video, MessageSquare, Phone } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SOSPendantPage: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testimonials = [
    {
      name: language === 'en' ? "Maria Garcia" : "María García",
      age: "78",
      quote: language === 'en' 
        ? "The SOS pendant has given me back my independence. My children were worried about me living alone, but now they know I can get help if I need it." 
        : "El colgante SOS me ha devuelto mi independencia. Mis hijos estaban preocupados por mí viviendo sola, pero ahora saben que puedo obtener ayuda si la necesito.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: language === 'en' ? "John Roberts" : "Juan Roberto",
      age: "82",
      quote: language === 'en'
        ? "After my fall last year, my daughter insisted I get the SOS pendant. It detected my fall when I slipped in the bathroom and called for help immediately."
        : "Después de mi caída el año pasado, mi hija insistió en que obtuviera el colgante SOS. Detectó mi caída cuando resbalé en el baño y llamó para pedir ayuda de inmediato.",
      image: "https://randomuser.me/api/portraits/men/72.jpg"
    }
  ];

  const faqItems = [
    {
      question: language === 'en' ? "How does the fall detection work?" : "¿Cómo funciona la detección de caídas?",
      answer: language === 'en' 
        ? "The SOS Pendant uses advanced accelerometer technology to detect sudden movements consistent with falls. When a fall is detected, it initiates a 30-second countdown with an audible alert. If you're okay, you can cancel the alert. If not, it automatically contacts our monitoring center." 
        : "El Colgante SOS utiliza tecnología avanzada de acelerómetro para detectar movimientos repentinos consistentes con caídas. Cuando se detecta una caída, inicia una cuenta regresiva de 30 segundos con una alerta audible. Si estás bien, puedes cancelar la alerta. Si no, automáticamente contacta a nuestro centro de monitoreo."
    },
    {
      question: language === 'en' ? "Is the SOS Pendant waterproof?" : "¿El Colgante SOS es resistente al agua?",
      answer: language === 'en'
        ? "Yes, the SOS Pendant is rated IP67 water-resistant, which means it can be submerged in up to 1 meter of fresh water for up to 30 minutes. This makes it safe to wear while showering." 
        : "Sí, el Colgante SOS tiene clasificación IP67 resistente al agua, lo que significa que puede sumergirse en hasta 1 metro de agua dulce por hasta 30 minutos. Esto lo hace seguro para usar mientras te duchas."
    },
    {
      question: language === 'en' ? "How long does the battery last?" : "¿Cuánto dura la batería?",
      answer: language === 'en'
        ? "The SOS Pendant's battery lasts up to 7 days on a single charge with normal use. The device will alert you when the battery is running low, and recharging takes approximately 2 hours." 
        : "La batería del Colgante SOS dura hasta 7 días con una sola carga con uso normal. El dispositivo te alertará cuando la batería esté baja, y la recarga toma aproximadamente 2 horas."
    },
    {
      question: language === 'en' ? "How far can I go from my home with the SOS Pendant?" : "¿Qué tan lejos puedo ir de mi casa con el Colgante SOS?",
      answer: language === 'en'
        ? "The SOS Pendant works anywhere with cellular coverage. It uses 4G LTE networks to communicate with our monitoring center, so you can use it at home, in your garden, while shopping, or traveling." 
        : "El Colgante SOS funciona en cualquier lugar con cobertura celular. Utiliza redes 4G LTE para comunicarse con nuestro centro de monitoreo, por lo que puedes usarlo en casa, en tu jardín, mientras compras o viajas."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="mb-8 flex items-center">
            <Link to="/products">
              <ButtonCustom variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Back to Products' : 'Volver a Productos'}
              </ButtonCustom>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {language === 'en' 
                  ? 'Immediate emergency response with just one touch. Our advanced pendant provides around-the-clock protection with built-in fall detection and GPS tracking.' 
                  : 'Respuesta inmediata a emergencias con un solo toque. Nuestro colgante avanzado proporciona protección las 24 horas con detección de caídas y seguimiento GPS.'}
              </p>
              
              <Card className="mb-6 bg-gradient-to-br from-orange-50 to-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-500" />
                    {language === 'en' ? 'Key Features' : 'Características Principales'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(language === 'en' 
                      ? [
                          "One-touch emergency call",
                          "GPS tracking",
                          "Fall detection sensors",
                          "Custom emergency routing",
                          "AI wellness check-ins",
                          "Two-way voice communication",
                          "Water-resistant design",
                          "Long battery life (up to 7 days)"
                        ] 
                      : [
                          "Llamada de emergencia con un toque",
                          "Seguimiento GPS",
                          "Sensores de detección de caídas",
                          "Enrutamiento personalizado",
                          "Revisiones de bienestar con IA",
                          "Comunicación de voz bidireccional",
                          "Diseño resistente al agua",
                          "Batería de larga duración (hasta 7 días)"
                        ]
                    ).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="rounded-full bg-green-500 p-1 flex-shrink-0 mt-1 mr-2">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join">
                  <ButtonCustom>
                    {language === 'en' ? 'Subscribe Now' : 'Suscribirse Ahora'}
                  </ButtonCustom>
                </Link>
                <Link to="/contact">
                  <ButtonCustom variant="outline">
                    {language === 'en' ? 'Contact Us' : 'Contáctenos'}
                  </ButtonCustom>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
                <div className="relative">
                  <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                    {language === 'en' ? 'Popular' : 'Popular'}
                  </div>
                  <img 
                    src="/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png" 
                    alt="SOS Pendant" 
                    className="w-full h-auto object-contain rounded mb-4"
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
                    </h3>
                    <div className="flex items-center mt-1">
                      <BellRing className="w-4 h-4 text-orange-500 mr-1" />
                      <span className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Emergency Device' : 'Dispositivo de Emergencia'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">€110.00</div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'en' ? 'or €24.99/month' : 'o €24.99/mes'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Information Tabs */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="w-full flex justify-center mb-6">
                <TabsTrigger value="specifications">
                  {language === 'en' ? 'Technical Specifications' : 'Especificaciones Técnicas'}
                </TabsTrigger>
                <TabsTrigger value="how-it-works">
                  {language === 'en' ? 'How It Works' : 'Cómo Funciona'}
                </TabsTrigger>
                <TabsTrigger value="testimonials">
                  {language === 'en' ? 'Testimonials' : 'Testimonios'}
                </TabsTrigger>
                <TabsTrigger value="faq">
                  {language === 'en' ? 'FAQ' : 'Preguntas Frecuentes'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications">
                <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Technical Specifications' : 'Especificaciones Técnicas'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {language === 'en' ? 'Dimensions' : 'Dimensiones'}
                        </h4>
                        <p>4.5 × 3.2 × 1.2 cm</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {language === 'en' ? 'Weight' : 'Peso'}
                        </h4>
                        <p>35g</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {language === 'en' ? 'Battery Life' : 'Duración de la Batería'}
                        </h4>
                        <p>{language === 'en' ? 'Up to 7 days' : 'Hasta 7 días'}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {language === 'en' ? 'Charging Time' : 'Tiempo de Carga'}
                        </h4>
                        <p>{language === 'en' ? 'Approximately 2 hours' : 'Aproximadamente 2 horas'}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {language === 'en' ? 'Water Resistance' : 'Resistencia al Agua'}
                        </h4>
                        <p>{language === 'en' ? 'IP67 (water resistant)' : 'IP67 (resistente al agua)'}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {language === 'en' ? 'Connectivity' : 'Conectividad'}
                        </h4>
                        <p>{language === 'en' ? '4G LTE & Bluetooth' : '4G LTE y Bluetooth'}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {language === 'en' ? 'GPS Accuracy' : 'Precisión GPS'}
                        </h4>
                        <p>{language === 'en' ? 'Within 5 meters' : 'Dentro de 5 metros'}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {language === 'en' ? 'Included in Package' : 'Incluido en el Paquete'}
                        </h4>
                        <p>{language === 'en' ? 'SOS Pendant, charging dock, lanyard, belt clip, user manual' : 'Colgante SOS, base de carga, cordón, clip para cinturón, manual de usuario'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="how-it-works">
                <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'How the SOS Pendant Works' : 'Cómo Funciona el Colgante SOS'}
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <BellRing className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {language === 'en' ? 'Emergency Button' : 'Botón de Emergencia'}
                        </h4>
                        <p className="text-muted-foreground">
                          {language === 'en' 
                            ? 'Press and hold the SOS button for 3 seconds to activate an emergency call to our 24/7 monitoring center.' 
                            : 'Mantén presionado el botón SOS durante 3 segundos para activar una llamada de emergencia a nuestro centro de monitoreo 24/7.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Check className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {language === 'en' ? 'Fall Detection' : 'Detección de Caídas'}
                        </h4>
                        <p className="text-muted-foreground">
                          {language === 'en' 
                            ? "The built-in accelerometer automatically detects falls. If a fall is detected, the pendant initiates a 30-second countdown before calling for help, allowing you to cancel if it\'s a false alarm." 
                            : 'El acelerómetro incorporado detecta automáticamente caídas. Si se detecta una caída, el colgante inicia una cuenta regresiva de 30 segundos antes de llamar para pedir ayuda, permitiéndote cancelar si es una falsa alarma.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Wifi className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {language === 'en' ? 'GPS Tracking' : 'Seguimiento GPS'}
                        </h4>
                        <p className="text-muted-foreground">
                          {language === 'en' 
                            ? 'The pendant transmits your precise location to our monitoring center and authorized contacts during an emergency.' 
                            : 'El colgante transmite tu ubicación precisa a nuestro centro de monitoreo y contactos autorizados durante una emergencia.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <MessageSquare className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {language === 'en' ? 'Two-Way Communication' : 'Comunicación Bidireccional'}
                        </h4>
                        <p className="text-muted-foreground">
                          {language === 'en' 
                            ? 'The built-in speaker and microphone allow for clear two-way communication with our monitoring center during emergencies.' 
                            : 'El altavoz y micrófono incorporados permiten una comunicación bidireccional clara con nuestro centro de monitoreo durante emergencias.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-red-100 p-3 rounded-full mr-4">
                        <Battery className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {language === 'en' ? 'Battery Alerts' : 'Alertas de Batería'}
                        </h4>
                        <p className="text-muted-foreground">
                          {language === 'en' 
                            ? 'Receive alerts when the battery is running low. The pendant also sends notifications to our monitoring center if the battery reaches critically low levels.' 
                            : 'Recibe alertas cuando la batería está baja. El colgante también envía notificaciones a nuestro centro de monitoreo si la batería alcanza niveles críticamente bajos.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="testimonials">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-semibold text-center mb-8">
                    {language === 'en' ? 'What Our Customers Say' : 'Lo Que Dicen Nuestros Clientes'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                      <Card key={index} className="bg-white">
                        <CardContent className="pt-6">
                          <div className="flex items-start mb-4">
                            <div className="relative mr-4">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full">
                                <Heart className="h-3 w-3 text-white" />
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium">{testimonial.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {language === 'en' ? `Age: ${testimonial.age}` : `Edad: ${testimonial.age}`}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq">
                <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
                  <h3 className="text-xl font-semibold mb-6">
                    {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
                  </h3>
                  
                  <div className="space-y-6">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium mb-2 flex items-center">
                          <span className="bg-orange-100 p-1 rounded-full mr-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                          </span>
                          {item.question}
                        </h4>
                        <p className="text-muted-foreground pl-8">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {language === 'en' ? 'Ready to Experience Peace of Mind?' : '¿Listo para Experimentar Tranquilidad?'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {language === 'en' 
              ? 'Join thousands of satisfied customers who rely on our SOS Pendant for emergency assistance and peace of mind.' 
              : 'Únete a miles de clientes satisfechos que confían en nuestro Colgante SOS para asistencia de emergencia y tranquilidad.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <ButtonCustom size="lg">
                {language === 'en' ? 'Subscribe Now' : 'Suscribirse Ahora'}
              </ButtonCustom>
            </Link>
            <Link to="/contact">
              <ButtonCustom variant="outline" size="lg" className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Schedule a Demo' : 'Programar una Demostración'}
              </ButtonCustom>
            </Link>
            <Link to="/devices">
              <ButtonCustom variant="ghost" size="lg" className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                {language === 'en' ? 'View Tutorial' : 'Ver Tutorial'}
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SOSPendantPage;
