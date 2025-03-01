
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Check, Info, Star, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const PRODUCTS = {
  "sos-pendant": {
    id: "sos-pendant",
    nameEn: "SOS Pendant",
    nameEs: "Colgante SOS",
    price: 110.00,
    monthlyPrice: 24.99,
    rating: 4.9,
    reviewCount: 128,
    features: {
      en: [
        "One-touch emergency call",
        "GPS tracking",
        "Fall detection sensors",
        "Custom emergency routing",
        "AI wellness check-ins",
        "Water-resistant design",
        "Long-lasting battery life",
        "Comfortable, lightweight design"
      ],
      es: [
        "Llamada de emergencia con un toque",
        "Seguimiento GPS",
        "Sensores de detección de caídas",
        "Enrutamiento personalizado",
        "Revisiones de bienestar con IA",
        "Diseño resistente al agua",
        "Batería de larga duración",
        "Diseño cómodo y ligero"
      ]
    },
    description: {
      en: "The ICE SOS Pendant provides immediate emergency response with just one touch. Our advanced pendant offers around-the-clock protection with built-in fall detection and GPS tracking, ensuring help is always at hand when you need it most. Perfect for seniors, individuals with health concerns, or anyone wanting extra security.",
      es: "El Colgante SOS de ICE proporciona respuesta inmediata a emergencias con un solo toque. Nuestro colgante avanzado ofrece protección las 24 horas con detección de caídas y seguimiento GPS incorporados, asegurando que la ayuda esté siempre disponible cuando más la necesite. Perfecto para personas mayores, personas con problemas de salud o cualquiera que desee seguridad adicional."
    },
    techSpecs: {
      en: [
        "Dimensions: 45mm x 32mm x 12mm",
        "Weight: 35g",
        "Battery life: Up to 7 days",
        "Water resistance: IP67",
        "Connectivity: 4G LTE, Bluetooth 5.0",
        "GPS accuracy: Within 3 meters",
        "Fall detection sensitivity: Adjustable",
        "Emergency button: Recessed to prevent accidental activation"
      ],
      es: [
        "Dimensiones: 45mm x 32mm x 12mm",
        "Peso: 35g",
        "Duración de la batería: Hasta 7 días",
        "Resistencia al agua: IP67",
        "Conectividad: 4G LTE, Bluetooth 5.0",
        "Precisión GPS: Dentro de 3 metros",
        "Sensibilidad de detección de caídas: Ajustable",
        "Botón de emergencia: Empotrado para evitar activación accidental"
      ]
    },
    colors: ["Black", "White", "Silver"],
    images: [
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516399677247-f48bf3f35a2e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503235930437-8c713a84969c?w=800&h=600&fit=crop"
    ]
  },
  
  "medical-dispenser": {
    id: "medical-dispenser",
    nameEn: "Medical Dispenser",
    nameEs: "Dispensador Médico",
    price: 249.99,
    monthlyPrice: 24.99,
    rating: 4.8,
    reviewCount: 97,
    features: {
      en: [
        "Automated pill dispensing",
        "Missed dose notifications",
        "AI-powered reminders",
        "Escalation protocols",
        "Medication adherence tracking",
        "Tamper-proof locking system",
        "Up to 28-day capacity",
        "Easy-to-use interface"
      ],
      es: [
        "Dispensación automática de píldoras",
        "Notificaciones de dosis olvidadas",
        "Recordatorios potenciados por IA",
        "Protocolos de escalada",
        "Seguimiento de adherencia",
        "Sistema de bloqueo a prueba de manipulaciones",
        "Capacidad de hasta 28 días",
        "Interfaz fácil de usar"
      ]
    },
    description: {
      en: "Never miss a dose again with the ICE Medical Dispenser. Our smart dispenser provides automated medication management with intelligent reminders and adherence tracking. The tamper-proof system ensures medications are taken at the right time and in the correct dosage, providing peace of mind for users and caregivers alike.",
      es: "Nunca vuelva a olvidar una dosis con el Dispensador Médico ICE. Nuestro dispensador inteligente proporciona gestión automatizada de medicamentos con recordatorios inteligentes y seguimiento de adherencia. El sistema a prueba de manipulaciones asegura que los medicamentos se tomen en el momento adecuado y en la dosis correcta, proporcionando tranquilidad tanto a usuarios como a cuidadores."
    },
    techSpecs: {
      en: [
        "Dimensions: 220mm x 150mm x 100mm",
        "Weight: 850g (without medications)",
        "Power: AC adapter with 72-hour backup battery",
        "Capacity: Up to 28 days of medication (4 doses per day)",
        "Connectivity: Wi-Fi, 4G LTE (optional)",
        "Alarms: Visual, audible, and remote notifications",
        "Dispensing accuracy: 99.9%",
        "Security: Biometric or PIN-code locking system"
      ],
      es: [
        "Dimensiones: 220mm x 150mm x 100mm",
        "Peso: 850g (sin medicamentos)",
        "Alimentación: Adaptador CA con batería de respaldo de 72 horas",
        "Capacidad: Hasta 28 días de medicación (4 dosis por día)",
        "Conectividad: Wi-Fi, 4G LTE (opcional)",
        "Alarmas: Notificaciones visuales, audibles y remotas",
        "Precisión de dispensación: 99.9%",
        "Seguridad: Sistema de bloqueo biométrico o con código PIN"
      ]
    },
    colors: ["White", "Light Gray", "Titanium"],
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555633514-abcee6ab92e1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&h=600&fit=crop"
    ]
  },
  
  "glucose-monitor": {
    id: "glucose-monitor",
    nameEn: "Glucose Monitor",
    nameEs: "Monitor de Glucosa",
    price: 149.99,
    monthlyPrice: 24.99,
    rating: 4.7,
    reviewCount: 84,
    features: {
      en: [
        "Continuous glucose monitoring",
        "AI trend analysis",
        "Immediate alerts",
        "Emergency response",
        "Dietary recommendations",
        "14-day sensor life",
        "Waterproof design",
        "Smartphone integration"
      ],
      es: [
        "Monitoreo continuo de glucosa",
        "Análisis de tendencias con IA",
        "Alertas inmediatas",
        "Respuesta de emergencia",
        "Recomendaciones dietéticas",
        "Sensor con vida útil de 14 días",
        "Diseño impermeable",
        "Integración con smartphone"
      ]
    },
    description: {
      en: "The ICE Glucose Monitor provides real-time glucose monitoring with AI-powered analysis. Receive immediate alerts for concerning levels and personalized recommendations for better health. Our discreet, comfortable sensor provides continuous monitoring without the need for frequent finger pricks, helping you maintain optimal glucose levels with minimal effort.",
      es: "El Monitor de Glucosa ICE proporciona monitoreo de glucosa en tiempo real con análisis impulsado por IA. Reciba alertas inmediatas para niveles preocupantes y recomendaciones personalizadas para una mejor salud. Nuestro sensor discreto y cómodo proporciona monitoreo continuo sin necesidad de pinchazos frecuentes en los dedos, ayudándole a mantener niveles óptimos de glucosa con un esfuerzo mínimo."
    },
    techSpecs: {
      en: [
        "Sensor dimensions: 35mm x 6mm",
        "Transmitter dimensions: 40mm x 33mm x 10mm",
        "Sensor life: Up to 14 days",
        "Water resistance: IP28 (2.4 meters for 30 minutes)",
        "Warm-up time: 1 hour",
        "Glucose range: 40-400 mg/dL",
        "Reading frequency: Every 5 minutes",
        "Data storage: 90 days of glucose data"
      ],
      es: [
        "Dimensiones del sensor: 35mm x 6mm",
        "Dimensiones del transmisor: 40mm x 33mm x 10mm",
        "Vida útil del sensor: Hasta 14 días",
        "Resistencia al agua: IP28 (2.4 metros durante 30 minutos)",
        "Tiempo de calentamiento: 1 hora",
        "Rango de glucosa: 40-400 mg/dL",
        "Frecuencia de lectura: Cada 5 minutos",
        "Almacenamiento de datos: 90 días de datos de glucosa"
      ]
    },
    colors: ["White", "Clear"],
    images: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588534510807-86dfce5d452e?w=800&h=600&fit=crop"
    ]
  }
};

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  const product = productId ? PRODUCTS[productId as keyof typeof PRODUCTS] : null;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {language === 'en' ? 'Product Not Found' : 'Producto No Encontrado'}
            </h1>
            <p className="mb-6">
              {language === 'en' 
                ? 'The product you are looking for does not exist or has been removed.' 
                : 'El producto que buscas no existe o ha sido eliminado.'}
            </p>
            <Link to="/products">
              <ButtonCustom>
                {language === 'en' ? 'Browse Products' : 'Ver Productos'}
              </ButtonCustom>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleAddToCart = () => {
    toast({
      title: language === 'en' ? 'Added to cart!' : '¡Añadido al carrito!',
      description: language === 'en' 
        ? `${product.nameEn} x${quantity} added to your cart.` 
        : `${product.nameEs} x${quantity} añadido a tu carrito.`,
    });
  };
  
  const productName = language === 'en' ? product.nameEn : product.nameEs;
  const productDescription = language === 'en' ? product.description.en : product.description.es;
  const productFeatures = language === 'en' ? product.features.en : product.features.es;
  const productTechSpecs = language === 'en' ? product.techSpecs.en : product.techSpecs.es;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <nav className="mb-8">
            <ol className="flex items-center text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:underline">{t('nav.home')}</Link>
              </li>
              <span className="mx-2">/</span>
              <li>
                <Link to="/products" className="hover:underline">{language === 'en' ? 'Products' : 'Productos'}</Link>
              </li>
              <span className="mx-2">/</span>
              <li className="font-medium text-foreground">{productName}</li>
            </ol>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={product.images[currentImageIndex]} 
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button 
                  onClick={handlePrevImage}
                  className="w-10 h-10 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button 
                  onClick={handleNextImage}
                  className="w-10 h-10 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      idx === currentImageIndex ? "bg-ice-500" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                  {language === 'en' ? 'In Stock' : 'En Stock'}
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      size={16} 
                      fill={idx < Math.floor(product.rating) ? "currentColor" : "none"} 
                    />
                  ))}
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{productName}</h1>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-ice-600">€{product.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground mb-1">
                  + €{product.monthlyPrice.toFixed(2)} {language === 'en' ? 'monthly' : 'mensual'}
                </span>
              </div>
              
              <p className="text-muted-foreground mb-8">{productDescription}</p>
              
              <div className="mb-8">
                <h3 className="font-semibold mb-3">
                  {language === 'en' ? 'Key Features' : 'Características Clave'}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {productFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold mb-3">
                  {language === 'en' ? 'Available Colors' : 'Colores Disponibles'}
                </h3>
                <div className="flex gap-2 mb-4">
                  {product.colors.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <button 
                        className={`w-8 h-8 rounded-full border ${idx === 0 ? 'border-ice-500 ring-2 ring-ice-200' : 'border-gray-200'}`}
                        style={{ 
                          backgroundColor: color.toLowerCase() === 'white' 
                            ? 'white' 
                            : color.toLowerCase() === 'black' 
                              ? 'black'
                              : color.toLowerCase() === 'silver' || color.toLowerCase() === 'light gray' || color.toLowerCase() === 'titanium'
                                ? '#D3D3D3'
                                : color.toLowerCase() === 'clear'
                                  ? 'transparent'
                                  : color 
                        }}
                      />
                      <span className="text-xs mt-1">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mb-8">
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-l-md hover:bg-gray-50"
                  >
                    -
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-200">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-r-md hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                
                <ButtonCustom className="flex-1 flex items-center justify-center gap-2" onClick={handleAddToCart}>
                  <ShoppingCart size={18} />
                  {language === 'en' ? 'Add to Cart' : 'Añadir al Carrito'}
                </ButtonCustom>
                
                <ButtonCustom variant="outline" className="w-10 h-10 flex items-center justify-center p-0">
                  <Heart size={18} />
                </ButtonCustom>
              </div>
              
              <div className="p-4 bg-ice-50 rounded-lg border border-ice-100 flex items-start gap-3">
                <Shield className="text-ice-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-ice-800">
                    {language === 'en' ? 'ICE Guardian Protection' : 'Protección ICE Guardian'}
                  </h4>
                  <p className="text-sm text-ice-600">
                    {language === 'en'
                      ? 'This device includes 24/7 emergency monitoring and support through our AI Guardian platform.'
                      : 'Este dispositivo incluye monitoreo de emergencia y soporte 24/7 a través de nuestra plataforma AI Guardian.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              {language === 'en' ? 'Technical Specifications' : 'Especificaciones Técnicas'}
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {productTechSpecs.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2 pb-4 border-b border-gray-100">
                    <Info size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
