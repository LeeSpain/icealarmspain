import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProductDetail: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({
    isVisible: false,
    title: '',
    message: '',
    variant: 'default'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReserveClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (Math.random() > 0.3) {
        // Success scenario
        setModalState({
          isVisible: true,
          title: language === 'en' ? "Device Reserved!" : "¡Dispositivo Reservado!",
          message: language === 'en' 
            ? "Thank you for reserving the device. Our team will contact you shortly to arrange delivery." 
            : "Gracias por reservar el dispositivo. Nuestro equipo se pondrá en contacto con usted en breve para organizar la entrega.",
          variant: "default", // Changed from "success" to "default"
        });
      } else {
        // Error scenario
        setModalState({
          isVisible: true,
          title: language === 'en' ? "Reservation Failed" : "Reserva Fallida",
          message: language === 'en' 
            ? "We're sorry, but there was an error processing your reservation. Please try again later." 
            : "Lo sentimos, pero hubo un error al procesar su reserva. Por favor, inténtelo de nuevo más tarde.",
          variant: "destructive", // Changed from "error" to "destructive"
        });
      }
    }, 1500);
  };

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>This is the product detail page.</p>
      
      <Button onClick={handleReserveClick} disabled={isSubmitting}>
        {isSubmitting
          ? (language === 'en' ? "Reserving..." : "Reservando...")
          : (language === 'en' ? "Reserve Device" : "Reservar Dispositivo")}
      </Button>
      
      <Modal 
        isVisible={modalState.isVisible}
        title={modalState.title}
        message={modalState.message}
        variant={modalState.variant}
        onClose={() => setModalState(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default ProductDetail;
