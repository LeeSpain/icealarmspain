import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ResponsiveImage from "@/components/ui/responsive-image";
import { showErrorToast } from "@/utils/error-handler";
import PageHeader from "@/components/common/PageHeader";

const ProductDetail: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState({
    isVisible: false,
    title: '',
    message: '',
    variant: 'default' as 'default' | 'destructive' | 'success'
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const handleReserveClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      try {
        // Simulate success/error with 70% success rate
        if (Math.random() > 0.3) {
          // Success scenario
          setModalState({
            isVisible: true,
            title: language === 'en' ? "Device Reserved!" : "¡Dispositivo Reservado!",
            message: language === 'en' 
              ? "Thank you for reserving the device. Our team will contact you shortly to arrange delivery." 
              : "Gracias por reservar el dispositivo. Nuestro equipo se pondrá en contacto con usted en breve para organizar la entrega.",
            variant: "default", 
          });
        } else {
          // Error scenario - simulate an error
          throw new Error(language === 'en' 
            ? "There was an error processing your reservation" 
            : "Hubo un error al procesar su reserva");
        }
      } catch (error) {
        showErrorToast(error, language === 'en' ? "Reservation Error" : "Error de Reserva");
        
        setModalState({
          isVisible: true,
          title: language === 'en' ? "Reservation Failed" : "Reserva Fallida",
          message: language === 'en' 
            ? "We're sorry, but there was an error processing your reservation. Please try again later." 
            : "Lo sentimos, pero hubo un error al procesar su reserva. Por favor, inténtelo de nuevo más tarde.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <LoadingSpinner 
          fullPage 
          message={language === 'en' ? "Loading product details..." : "Cargando detalles del producto..."}
        />
      </div>
    );
  }

  return (
    <>
      <PageHeader 
        title={language === 'en' ? "Product Details" : "Detalles del Producto"} 
        subtitle={language === 'en' 
          ? "Detailed information about this product" 
          : "Información detallada sobre este producto"} 
      />
      
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold" tabIndex={0}>
              {language === 'en' ? "ICE Guardian SOS Pendant" : "Colgante SOS ICE Guardian"}
            </h1>
            
            <ResponsiveImage 
              src="/placeholder.svg" 
              alt={language === 'en' ? "ICE Guardian SOS Pendant" : "Colgante SOS ICE Guardian"}
              aspectRatio="4/3"
              className="rounded-lg border"
              fallback="/public/placeholder.svg"
            />
            
            <div className="prose max-w-none" tabIndex={0}>
              <p>
                {language === 'en' 
                  ? "The ICE Guardian SOS Pendant is a lightweight, waterproof emergency response device that provides 24/7 monitoring and one-touch emergency calling."
                  : "El Colgante SOS ICE Guardian es un dispositivo de respuesta de emergencia ligero e impermeable que proporciona monitoreo las 24 horas y llamadas de emergencia con un solo toque."}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button 
                onClick={handleReserveClick} 
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    {language === 'en' ? "Reserving..." : "Reservando..."}
                  </>
                ) : (
                  language === 'en' ? "Reserve Device" : "Reservar Dispositivo"
                )}
              </Button>
              
              <Button variant="outline" className="flex-1">
                {language === 'en' ? "Technical Specifications" : "Especificaciones Técnicas"}
              </Button>
            </div>
          </div>
          
          <div className="space-y-6 bg-slate-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold" tabIndex={0}>
              {language === 'en' ? "Quick Features" : "Características Principales"}
            </h2>
            
            <ul className="space-y-2 list-disc pl-5">
              <li>{language === 'en' ? "24/7 Emergency Monitoring" : "Monitoreo de Emergencia 24/7"}</li>
              <li>{language === 'en' ? "Water Resistant Design" : "Diseño Resistente al Agua"}</li>
              <li>{language === 'en' ? "GPS Location Tracking" : "Seguimiento de Ubicación GPS"}</li>
              <li>{language === 'en' ? "7-day Battery Life" : "Batería de 7 días"}</li>
              <li>{language === 'en' ? "One-Touch SOS Button" : "Botón SOS de Un Toque"}</li>
            </ul>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-2" tabIndex={0}>
                {language === 'en' ? "Contact Support" : "Contactar con Soporte"}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'en' 
                  ? "Have questions about this device? Our support team is here to help."
                  : "¿Tiene preguntas sobre este dispositivo? Nuestro equipo de soporte está aquí para ayudar."}
              </p>
              <Button variant="outline" className="w-full">
                {language === 'en' ? "Contact Support" : "Contactar Soporte"}
              </Button>
            </div>
          </div>
        </div>
        
        <Modal 
          isVisible={modalState.isVisible}
          title={modalState.title}
          message={modalState.message}
          variant={modalState.variant}
          onClose={() => setModalState(prev => ({ ...prev, isVisible: false }))}
        />
      </div>
    </>
  );
};

export default ProductDetail;
