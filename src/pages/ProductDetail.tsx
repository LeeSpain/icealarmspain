
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ButtonCustom } from "@/components/ui/button-custom";
import { CheckCircle, ShoppingCart, CreditCard, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProductData {
  id: string;
  name: {
    en: string;
    es: string;
  };
  price: number;
  monthlyPrice: number;
  image: string;
  features: {
    en: string[];
    es: string[];
  };
  description: {
    en: string;
    es: string;
  };
  technicalSpecs: {
    en: {
      [key: string]: string;
    };
    es: {
      [key: string]: string;
    };
  };
  faqs: {
    en: {
      question: string;
      answer: string;
    }[];
    es: {
      question: string;
      answer: string;
    }[];
  };
}

const products: ProductData[] = [
  {
    id: "sos",
    name: {
      en: "SOS Pendant",
      es: "Colgante SOS"
    },
    price: 110.00,
    monthlyPrice: 24.99,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    features: {
      en: [
        "One-touch emergency call",
        "GPS tracking",
        "Fall detection sensors",
        "Custom emergency routing",
        "AI wellness check-ins",
        "Waterproof design",
        "Long battery life"
      ],
      es: [
        "Llamada de emergencia con un toque",
        "Seguimiento GPS",
        "Sensores de detección de caídas",
        "Enrutamiento personalizado",
        "Revisiones de bienestar con IA",
        "Diseño impermeable",
        "Larga duración de batería"
      ]
    },
    description: {
      en: "Immediate emergency response with just one touch. Our advanced pendant provides around-the-clock protection with built-in fall detection and GPS tracking. The SOS Pendant connects directly to our professional call center and AI Guardian system, ensuring help arrives quickly when you need it most. Waterproof and long-lasting battery make it perfect for everyday wear.",
      es: "Respuesta inmediata a emergencias con un solo toque. Nuestro colgante avanzado proporciona protección las 24 horas con detección de caídas y seguimiento GPS. El Colgante SOS se conecta directamente a nuestro centro de llamadas profesional y sistema Guardian de IA, asegurando que la ayuda llegue rápidamente cuando más la necesita. Impermeable y con batería de larga duración, es perfecto para uso diario."
    },
    technicalSpecs: {
      en: {
        "Dimensions": "4.5 x 3.2 x 1.5 cm",
        "Weight": "35g",
        "Battery Life": "Up to 7 days",
        "Charging": "Wireless charging dock",
        "Waterproof": "IP67 rated",
        "Connectivity": "4G LTE, Bluetooth 5.0",
        "Location": "GPS, GLONASS, Galileo"
      },
      es: {
        "Dimensiones": "4.5 x 3.2 x 1.5 cm",
        "Peso": "35g",
        "Duración de batería": "Hasta 7 días",
        "Carga": "Base de carga inalámbrica",
        "Impermeable": "Clasificación IP67",
        "Conectividad": "4G LTE, Bluetooth 5.0",
        "Ubicación": "GPS, GLONASS, Galileo"
      }
    },
    faqs: {
      en: [
        {
          question: "How do I set up the SOS Pendant?",
          answer: "Setting up is simple. After unboxing, place the pendant on the charging dock until fully charged. Download our app, create an account, and follow the on-screen instructions to connect your pendant. Our support team can guide you through the process remotely if needed."
        },
        {
          question: "What happens when I press the SOS button?",
          answer: "When you press the SOS button, an alert is immediately sent to our 24/7 monitoring center. The operator will try to speak with you through the pendant. If you don't respond, or if you confirm an emergency, the operator will dispatch appropriate help and notify your emergency contacts."
        },
        {
          question: "Is the pendant waterproof?",
          answer: "Yes, the SOS Pendant is IP67 rated, meaning it's protected against dust and can withstand water immersion up to 1 meter for 30 minutes. You can wear it while showering or washing your hands, but we don't recommend swimming with it."
        }
      ],
      es: [
        {
          question: "¿Cómo configuro el Colgante SOS?",
          answer: "La configuración es simple. Después de desembalar, coloque el colgante en la base de carga hasta que esté completamente cargado. Descargue nuestra aplicación, cree una cuenta y siga las instrucciones en pantalla para conectar su colgante. Nuestro equipo de soporte puede guiarlo a través del proceso de forma remota si es necesario."
        },
        {
          question: "¿Qué sucede cuando presiono el botón SOS?",
          answer: "Cuando presiona el botón SOS, se envía inmediatamente una alerta a nuestro centro de monitoreo 24/7. El operador intentará hablar con usted a través del colgante. Si no responde, o si confirma una emergencia, el operador enviará la ayuda adecuada y notificará a sus contactos de emergencia."
        },
        {
          question: "¿El colgante es impermeable?",
          answer: "Sí, el Colgante SOS tiene clasificación IP67, lo que significa que está protegido contra el polvo y puede soportar inmersión en agua hasta 1 metro durante 30 minutos. Puede usarlo mientras se ducha o se lava las manos, pero no recomendamos nadar con él."
        }
      ]
    }
  },
  {
    id: "dispenser",
    name: {
      en: "Medical Dispenser",
      es: "Dispensador Médico"
    },
    price: 249.99,
    monthlyPrice: 24.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    features: {
      en: [
        "Automated pill dispensing",
        "Missed dose notifications",
        "AI-powered reminders",
        "Escalation protocols",
        "Medication adherence tracking",
        "Multiple medication compartments",
        "Tamper-proof design"
      ],
      es: [
        "Dispensación automática de píldoras",
        "Notificaciones de dosis olvidadas",
        "Recordatorios potenciados por IA",
        "Protocolos de escalada",
        "Seguimiento de adherencia",
        "Múltiples compartimentos para medicamentos",
        "Diseño a prueba de manipulaciones"
      ]
    },
    description: {
      en: "Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking. The dispenser can hold up to 28 days of medication in separate, secure compartments. It connects to our AI Guardian system to monitor adherence, send reminders, and alert caregivers or emergency services if doses are missed repeatedly.",
      es: "Nunca vuelva a olvidar una dosis. Nuestro Dispensador Médico inteligente proporciona gestión automatizada de medicamentos con recordatorios inteligentes y seguimiento de adherencia. El dispensador puede contener hasta 28 días de medicación en compartimentos separados y seguros. Se conecta a nuestro sistema Guardian de IA para monitorear la adherencia, enviar recordatorios y alertar a cuidadores o servicios de emergencia si se omiten dosis repetidamente."
    },
    technicalSpecs: {
      en: {
        "Dimensions": "22 x 18 x 8 cm",
        "Weight": "950g",
        "Capacity": "28 days, up to 4 doses per day",
        "Power": "AC adapter with 72-hour backup battery",
        "Connectivity": "Wi-Fi, Bluetooth, 4G LTE (optional)",
        "Display": "3.5\" color touchscreen",
        "Alarms": "Visual, audio, and remote notification"
      },
      es: {
        "Dimensiones": "22 x 18 x 8 cm",
        "Peso": "950g",
        "Capacidad": "28 días, hasta 4 dosis diarias",
        "Alimentación": "Adaptador CA con batería de respaldo de 72 horas",
        "Conectividad": "Wi-Fi, Bluetooth, 4G LTE (opcional)",
        "Pantalla": "Táctil a color de 3.5\"",
        "Alarmas": "Notificación visual, auditiva y remota"
      }
    },
    faqs: {
      en: [
        {
          question: "How do I fill the Medical Dispenser?",
          answer: "The dispenser has a secure, easy-to-access filling system. Unlock the dispenser with your personal code, and the system will guide you through filling each compartment according to your medication schedule. Our support team can also send a healthcare professional to help with initial setup and refills."
        },
        {
          question: "What happens if I miss a dose?",
          answer: "If a dose is missed, the dispenser will send visual and audio reminders. If you still don't take the medication, the system will send alerts to your designated contacts and to our monitoring center. For critical medications, our team can follow up with a wellness check."
        },
        {
          question: "Can the dispenser handle different medication schedules?",
          answer: "Yes, the Medical Dispenser can manage complex medication schedules including different medications at different times of day, medications taken every other day, or weekly medications. All scheduling is managed through our user-friendly app."
        }
      ],
      es: [
        {
          question: "¿Cómo lleno el Dispensador Médico?",
          answer: "El dispensador tiene un sistema de llenado seguro y de fácil acceso. Desbloquee el dispensador con su código personal, y el sistema lo guiará para llenar cada compartimento según su horario de medicación. Nuestro equipo de soporte también puede enviar a un profesional de la salud para ayudar con la configuración inicial y las recargas."
        },
        {
          question: "¿Qué sucede si omito una dosis?",
          answer: "Si se omite una dosis, el dispensador enviará recordatorios visuales y auditivos. Si aún no toma la medicación, el sistema enviará alertas a sus contactos designados y a nuestro centro de monitoreo. Para medicamentos críticos, nuestro equipo puede realizar un seguimiento con una verificación de bienestar."
        },
        {
          question: "¿Puede el dispensador manejar diferentes horarios de medicación?",
          answer: "Sí, el Dispensador Médico puede gestionar horarios de medicación complejos, incluidos diferentes medicamentos en diferentes momentos del día, medicamentos tomados en días alternos o medicamentos semanales. Toda la programación se gestiona a través de nuestra aplicación fácil de usar."
        }
      ]
    }
  },
  {
    id: "glucose",
    name: {
      en: "Glucose Monitor",
      es: "Monitor de Glucosa"
    },
    price: 149.99,
    monthlyPrice: 24.99,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    features: {
      en: [
        "Continuous glucose monitoring",
        "AI trend analysis",
        "Immediate alerts",
        "Emergency response",
        "Dietary recommendations",
        "Smartphone integration",
        "Data sharing with healthcare providers"
      ],
      es: [
        "Monitoreo continuo de glucosa",
        "Análisis de tendencias con IA",
        "Alertas inmediatas",
        "Respuesta de emergencia",
        "Recomendaciones dietéticas",
        "Integración con smartphone",
        "Compartir datos con proveedores de salud"
      ]
    },
    description: {
      en: "Real-time glucose monitoring with AI-powered analysis. Our Glucose Monitor provides continuous readings and alerts for concerning levels, with personalized recommendations for better health. The system learns your patterns over time to provide increasingly accurate predictions and preemptive warnings. Seamlessly integrates with our AI Guardian system for comprehensive health monitoring.",
      es: "Monitoreo de glucosa en tiempo real con análisis impulsado por IA. Nuestro Monitor de Glucosa proporciona lecturas continuas y alertas para niveles preocupantes, con recomendaciones personalizadas para una mejor salud. El sistema aprende sus patrones a lo largo del tiempo para proporcionar predicciones cada vez más precisas y advertencias preventivas. Se integra perfectamente con nuestro sistema Guardian de IA para un monitoreo integral de la salud."
    },
    technicalSpecs: {
      en: {
        "Sensor Life": "14 days per sensor",
        "Reading Frequency": "Every 5 minutes",
        "Range": "40-500 mg/dL",
        "Accuracy": "±9% MARD",
        "Warmup Time": "1 hour",
        "Water Resistance": "IP27 (sensor), IP67 (transmitter)",
        "Connectivity": "Bluetooth 5.0, NFC"
      },
      es: {
        "Vida útil del sensor": "14 días por sensor",
        "Frecuencia de lectura": "Cada 5 minutos",
        "Rango": "40-500 mg/dL",
        "Precisión": "±9% MARD",
        "Tiempo de calentamiento": "1 hora",
        "Resistencia al agua": "IP27 (sensor), IP67 (transmisor)",
        "Conectividad": "Bluetooth 5.0, NFC"
      }
    },
    faqs: {
      en: [
        {
          question: "How do I apply the sensor?",
          answer: "The sensor is applied to the back of your upper arm using the included applicator. It's a simple, nearly painless process that takes just a few seconds. Our app provides step-by-step instructions, or you can schedule a video call with our support team to guide you through your first application."
        },
        {
          question: "How accurate are the readings?",
          answer: "Our Glucose Monitor has a Mean Absolute Relative Difference (MARD) of ±9%, which is considered highly accurate for continuous glucose monitoring systems. While not a replacement for traditional blood glucose meters in all cases, it provides reliable trend information and alerts."
        },
        {
          question: "What happens if my glucose levels become dangerous?",
          answer: "If your glucose readings fall outside your safe range, you'll receive immediate alerts on your smartphone and connected devices. For severe events, our AI Guardian system can notify your emergency contacts and our 24/7 monitoring center, which will contact you to assess the situation and can dispatch emergency services if necessary."
        }
      ],
      es: [
        {
          question: "¿Cómo aplico el sensor?",
          answer: "El sensor se aplica en la parte posterior del brazo superior usando el aplicador incluido. Es un proceso simple, casi indoloro, que toma solo unos segundos. Nuestra aplicación proporciona instrucciones paso a paso, o puede programar una videollamada con nuestro equipo de soporte para guiarlo durante su primera aplicación."
        },
        {
          question: "¿Qué tan precisas son las lecturas?",
          answer: "Nuestro Monitor de Glucosa tiene una Diferencia Relativa Absoluta Media (MARD) de ±9%, lo que se considera altamente preciso para sistemas de monitoreo continuo de glucosa. Si bien no reemplaza los medidores tradicionales de glucosa en sangre en todos los casos, proporciona información confiable sobre tendencias y alertas."
        },
        {
          question: "¿Qué sucede si mis niveles de glucosa se vuelven peligrosos?",
          answer: "Si sus lecturas de glucosa caen fuera de su rango seguro, recibirá alertas inmediatas en su smartphone y dispositivos conectados. Para eventos graves, nuestro sistema Guardian de IA puede notificar a sus contactos de emergencia y a nuestro centro de monitoreo 24/7, que se comunicará con usted para evaluar la situación y puede enviar servicios de emergencia si es necesario."
        }
      ]
    }
  }
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      toast({
        title: language === 'en' ? "Added to cart!" : "¡Añadido al carrito!",
        description: language === 'en' 
          ? `${product.name[language === 'en' ? 'en' : 'es']} has been added to your cart.` 
          : `${product.name[language === 'en' ? 'en' : 'es']} ha sido añadido a tu carrito.`,
        variant: "default",
      });
    }, 1000);
  };

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-28 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">
              {language === 'en' ? "Product Not Found" : "Producto No Encontrado"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {language === 'en' 
                ? "The product you're looking for doesn't exist or has been removed." 
                : "El producto que estás buscando no existe o ha sido eliminado."}
            </p>
            <Link to="/products">
              <ButtonCustom>
                {language === 'en' ? "Back to Products" : "Volver a Productos"}
              </ButtonCustom>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <Link to="/products" className="inline-flex items-center text-ice-600 hover:text-ice-700 mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            {language === 'en' ? "Back to Products" : "Volver a Productos"}
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={`${product.image}?w=800&h=600&fit=crop&crop=entropy&auto=compress`} 
                alt={product.name[language === 'en' ? 'en' : 'es']}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold">
                {product.name[language === 'en' ? 'en' : 'es']}
              </h1>
              
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-orange-600">
                  €{product.price.toFixed(2)}
                </span>
                <span className="ml-4 text-sm text-orange-700">
                  + €{product.monthlyPrice.toFixed(2)} {language === 'en' ? "monthly" : "mensual"}
                </span>
              </div>
              
              <p className="text-muted-foreground">
                {product.description[language === 'en' ? 'en' : 'es']}
              </p>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-4">
                  {language === 'en' ? "Key Features" : "Características Principales"}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features[language === 'en' ? 'en' : 'es'].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4 pt-6">
                <ButtonCustom 
                  className="w-full md:w-auto mr-4"
                  onClick={handleAddToCart}
                  isLoading={isAddingToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {language === 'en' ? "Add to Cart" : "Añadir al Carrito"}
                </ButtonCustom>
                
                <Link to="/join">
                  <ButtonCustom variant="outline" className="w-full md:w-auto">
                    <CreditCard className="mr-2 h-5 w-5" />
                    {language === 'en' ? "Buy Now" : "Comprar Ahora"}
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <div className="border-b border-gray-200 mb-8">
              <div className="flex space-x-8">
                <button
                  className={`py-4 px-2 border-b-2 font-medium ${
                    activeTab === "description"
                      ? "border-ice-600 text-ice-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  {language === 'en' ? "Technical Specifications" : "Especificaciones Técnicas"}
                </button>
                <button
                  className={`py-4 px-2 border-b-2 font-medium ${
                    activeTab === "faq"
                      ? "border-ice-600 text-ice-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("faq")}
                >
                  {language === 'en' ? "FAQ" : "Preguntas Frecuentes"}
                </button>
              </div>
            </div>
            
            {activeTab === "description" && (
              <div className="glass-panel p-6">
                <h2 className="text-xl font-bold mb-6">
                  {language === 'en' ? "Technical Specifications" : "Especificaciones Técnicas"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {Object.entries(product.technicalSpecs[language === 'en' ? 'en' : 'es']).map(([key, value]) => (
                    <div key={key} className="pb-3 border-b border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "faq" && (
              <div className="glass-panel p-6">
                <h2 className="text-xl font-bold mb-6">
                  {language === 'en' ? "Frequently Asked Questions" : "Preguntas Frecuentes"}
                </h2>
                <div className="space-y-6">
                  {product.faqs[language === 'en' ? 'en' : 'es'].map((faq, idx) => (
                    <div key={idx} className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                      <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">
                {language === 'en' ? "Complete Your Health Monitoring System" : "Complete Su Sistema de Monitoreo de Salud"}
              </h2>
              <p className="text-muted-foreground mt-2">
                {language === 'en' 
                  ? "Our devices work best together as an integrated ecosystem." 
                  : "Nuestros dispositivos funcionan mejor juntos como un ecosistema integrado."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(p => p.id !== product.id)
                .map(relatedProduct => (
                  <Link 
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="glass-panel p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
                  >
                    <div className="h-40 w-40 overflow-hidden rounded-lg mb-4">
                      <img 
                        src={`${relatedProduct.image}?w=300&h=300&fit=crop&crop=entropy&auto=compress`} 
                        alt={relatedProduct.name[language === 'en' ? 'en' : 'es']}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-medium mb-2">
                      {relatedProduct.name[language === 'en' ? 'en' : 'es']}
                    </h3>
                    <p className="text-orange-600 font-bold">
                      €{relatedProduct.price.toFixed(2)}
                    </p>
                    <p className="text-sm mt-2 mb-4 text-muted-foreground line-clamp-3">
                      {relatedProduct.description[language === 'en' ? 'en' : 'es']}
                    </p>
                    <ButtonCustom variant="outline" size="sm" className="mt-auto">
                      {language === 'en' ? "View Details" : "Ver Detalles"}
                    </ButtonCustom>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
