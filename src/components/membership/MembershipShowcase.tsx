
import React from "react";
import { User, Home, Heart, UserCog, Package, Shield, Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { getMembershipTypes } from "@/components/join/membershipTypes";

const MembershipShowcase: React.FC = () => {
  const { language } = useLanguage();
  const membershipTypes = getMembershipTypes(language);
  
  const planFeatures = {
    individual: language === 'en' 
      ? ["Single user access", "24/7 emergency support", "One device included", "AI-powered health monitoring", "Monthly health reports"] 
      : ["Acceso de usuario único", "Soporte de emergencia 24/7", "Un dispositivo incluido", "Monitoreo de salud con IA", "Informes mensuales de salud"],
    couple: language === 'en' 
      ? ["Two user accounts", "10% discount on monthly fees", "Shared emergency contacts", "Synchronized alerts", "Family dashboard access"] 
      : ["Dos cuentas de usuario", "10% de descuento en cuotas mensuales", "Contactos de emergencia compartidos", "Alertas sincronizadas", "Acceso al panel familiar"],
    family: language === 'en' 
      ? ["Up to 4 user accounts", "20% discount on monthly fees", "Family emergency response", "Care coordination tools", "Family health tracking"] 
      : ["Hasta 4 cuentas de usuario", "20% de descuento en cuotas mensuales", "Respuesta familiar de emergencia", "Herramientas de coordinación", "Seguimiento de salud familiar"],
    caregiver: language === 'en' 
      ? ["Professional account access", "Multiple client management", "Advanced reporting features", "Priority emergency support", "Care scheduling tools"] 
      : ["Acceso a cuenta profesional", "Gestión de múltiples clientes", "Funciones avanzadas de informes", "Soporte prioritario", "Herramientas de programación"]
  };

  return (
    <section id="memberships" className="py-16 bg-gradient-to-b from-ice-50/30 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
            <Package size={16} className="mr-2" />
            {language === 'en' ? 'MEMBERSHIP OPTIONS' : 'OPCIONES DE MEMBRESÍA'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            {language === 'en' ? "Choose Your Membership Type" : "Elija Su Tipo de Membresía"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en' 
              ? "Select the membership plan that best suits your needs. We offer flexible options for individuals, couples, families, and professional caregivers." 
              : "Seleccione el plan de membresía que mejor se adapte a sus necesidades. Ofrecemos opciones flexibles para individuos, parejas, familias y cuidadores profesionales."}
          </p>
          
          <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm flex items-start max-w-xl mx-auto">
            <Shield size={18} className="text-ice-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              {language === 'en' 
                ? "All membership types include 24/7 emergency monitoring, access to our AI Guardian, and maintenance support for your devices."
                : "Todos los tipos de membresía incluyen monitoreo de emergencia 24/7, acceso a nuestro Guardián IA y soporte de mantenimiento para sus dispositivos."}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {membershipTypes.map((type, index) => (
            <div 
              key={type.id}
              className="flex flex-col bg-white border border-ice-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="p-6 bg-gradient-to-br from-ice-50 to-white flex flex-col items-center text-center border-b border-ice-100">
                <div className="p-3 bg-white rounded-full shadow-sm mb-4">
                  {type.icon}
                </div>
                <h3 className="text-xl font-semibold mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.subtitle}</p>
                
                <div className="mt-4 text-ice-600 font-semibold">
                  {type.id === 'individual' ? '€24.99' : 
                   type.id === 'couple' ? '€44.99' : 
                   type.id === 'family' ? '€69.99' : '€34.99'}
                  <span className="text-sm font-normal text-muted-foreground"> / {language === 'en' ? 'month' : 'mes'}</span>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <h4 className="font-medium mb-3 text-sm text-ice-600">
                  {language === 'en' ? "Includes:" : "Incluye:"}
                </h4>
                <ul className="space-y-2 mb-6">
                  {planFeatures[type.id as keyof typeof planFeatures].map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <div className="bg-green-50 rounded-full p-0.5 flex-shrink-0 mt-0.5 mr-2">
                        <Check size={14} className="text-green-500" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <Link to="/join" className="w-full">
                  <ButtonCustom 
                    variant={type.id === 'individual' ? 'primary' : 'outline'} 
                    className="w-full group"
                  >
                    {language === 'en' ? "Select Plan" : "Seleccionar Plan"}
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            {language === 'en'
              ? "All plans include a 30-day money-back guarantee. You can upgrade, downgrade, or cancel your subscription at any time."
              : "Todos los planes incluyen una garantía de devolución de dinero de 30 días. Puede actualizar, degradar o cancelar su suscripción en cualquier momento."}
          </p>
          
          <Link to="/join">
            <ButtonCustom variant="primary" size="lg" className="mt-4">
              {language === 'en' ? "Join Ice Guardian Today" : "Únase a Ice Guardian Hoy"}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembershipShowcase;
