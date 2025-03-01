
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Check, Shield } from "lucide-react";

interface PlanOptionProps {
  title: string;
  price: string;
  features: string[];
  cta: string;
  isRecommended?: boolean;
  onClick: () => void;
}

const PlanOption: React.FC<PlanOptionProps> = ({ 
  title, 
  price, 
  features, 
  cta, 
  isRecommended = false,
  onClick
}) => {
  return (
    <div className={`glass-panel p-6 flex flex-col ${
      isRecommended ? 'border-2 border-ice-500 relative' : ''
    }`}>
      {isRecommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-ice-500 text-white px-4 py-1 rounded-full text-xs font-bold">
          Recommended
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-4">{price}</p>
      
      <ul className="mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start mb-3">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <ButtonCustom 
        variant={isRecommended ? "primary" : "outline"} 
        className="mt-auto w-full"
        onClick={onClick}
      >
        {cta}
      </ButtonCustom>
    </div>
  );
};

const Join: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  
  const handleSignupSuccess = () => {
    // Redirect to dashboard or home after successful signup
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  const plans = {
    en: [
      {
        title: "Basic",
        price: "€24.99/month",
        features: [
          "Single device of your choice",
          "24/7 emergency monitoring",
          "Basic AI insights",
          "Mobile app access",
          "Email support"
        ],
        cta: "Choose Basic"
      },
      {
        title: "Premium",
        price: "€44.99/month",
        features: [
          "Two devices of your choice",
          "24/7 emergency monitoring",
          "Advanced AI insights",
          "Mobile and web app access",
          "Priority support",
          "Health trend analysis",
          "Family dashboard access"
        ],
        cta: "Choose Premium",
        isRecommended: true
      },
      {
        title: "Complete",
        price: "€59.99/month",
        features: [
          "All three devices included",
          "24/7 emergency monitoring",
          "Premium AI insights",
          "Mobile and web app access",
          "Priority 24/7 support",
          "Health trend analysis",
          "Family dashboard access",
          "Quarterly health consultations",
          "Free device replacements"
        ],
        cta: "Choose Complete"
      }
    ],
    es: [
      {
        title: "Básico",
        price: "€24.99/mes",
        features: [
          "Un dispositivo a su elección",
          "Monitoreo de emergencia 24/7",
          "Análisis básicos de IA",
          "Acceso a la aplicación móvil",
          "Soporte por correo electrónico"
        ],
        cta: "Elegir Básico"
      },
      {
        title: "Premium",
        price: "€44.99/mes",
        features: [
          "Dos dispositivos a su elección",
          "Monitoreo de emergencia 24/7",
          "Análisis avanzados de IA",
          "Acceso a aplicación móvil y web",
          "Soporte prioritario",
          "Análisis de tendencias de salud",
          "Acceso al panel familiar"
        ],
        cta: "Elegir Premium",
        isRecommended: true
      },
      {
        title: "Completo",
        price: "€59.99/mes",
        features: [
          "Los tres dispositivos incluidos",
          "Monitoreo de emergencia 24/7",
          "Análisis premium de IA",
          "Acceso a aplicación móvil y web",
          "Soporte prioritario 24/7",
          "Análisis de tendencias de salud",
          "Acceso al panel familiar",
          "Consultas de salud trimestrales",
          "Reemplazos gratuitos de dispositivos"
        ],
        cta: "Elegir Completo"
      }
    ]
  };
  
  const handlePlanSelection = () => {
    setShowSignup(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 py-12">
          {showSignup ? (
            <div className="max-w-md mx-auto glass-panel p-8">
              <h1 className="text-2xl font-bold mb-6 text-center">
                {language === 'en' ? "Create Your Account" : "Crea Tu Cuenta"}
              </h1>
              <p className="text-muted-foreground mb-8 text-center">
                {language === 'en' 
                  ? "Sign up to start your health monitoring journey with ICE Alarm España." 
                  : "Regístrate para comenzar tu viaje de monitoreo de salud con ICE Alarm España."}
              </p>
              
              <AuthForm mode="signup" onSuccess={handleSignupSuccess} />
            </div>
          ) : (
            <>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
                  <Shield size={16} className="mr-2" />
                  {language === 'en' ? 'MEMBERSHIP PLANS' : 'PLANES DE MEMBRESÍA'}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  {language === 'en' ? "Join ICE Alarm España Today" : "Únase a ICE Alarm España Hoy"}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {language === 'en' 
                    ? "Choose the plan that fits your needs and start protecting your health with our AI-powered monitoring system." 
                    : "Elija el plan que se adapte a sus necesidades y comience a proteger su salud con nuestro sistema de monitoreo impulsado por IA."}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                {plans[language === 'en' ? 'en' : 'es'].map((plan, index) => (
                  <PlanOption
                    key={index}
                    title={plan.title}
                    price={plan.price}
                    features={plan.features}
                    cta={plan.cta}
                    isRecommended={plan.isRecommended}
                    onClick={handlePlanSelection}
                  />
                ))}
              </div>
              
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'en' ? "All Plans Include" : "Todos los Planes Incluyen"}
                </h2>
                <div className="glass-panel p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(language === 'en' ? [
                    "No long-term contracts",
                    "Cancel anytime",
                    "Free shipping on all devices",
                    "Software updates included",
                    "Multilingual support",
                    "30-day money-back guarantee",
                    "No hidden fees",
                    "Technical support"
                  ] : [
                    "Sin contratos a largo plazo",
                    "Cancele en cualquier momento",
                    "Envío gratuito en todos los dispositivos",
                    "Actualizaciones de software incluidas",
                    "Soporte multilingüe",
                    "Garantía de devolución de 30 días",
                    "Sin tarifas ocultas",
                    "Soporte técnico"
                  ]).map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
