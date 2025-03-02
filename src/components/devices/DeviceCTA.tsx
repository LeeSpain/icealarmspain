
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface DeviceCTAProps {
  language: string;
}

const DeviceCTA: React.FC<DeviceCTAProps> = ({ language }) => {
  return (
    <section className="py-16 bg-ice-600 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          {language === 'en' 
            ? "Ready to experience peace of mind?" 
            : "¿Listo para experimentar tranquilidad?"}
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          {language === 'en'
            ? "Join thousands of satisfied customers who trust ICE Alarm España for their health monitoring needs."
            : "Únase a miles de clientes satisfechos que confían en ICE Alarm España para sus necesidades de monitoreo de salud."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/join">
            <ButtonCustom variant="secondary" size="lg">
              {language === 'en' ? "Shop Now" : "Comprar Ahora"}
            </ButtonCustom>
          </Link>
          <Link to="/demo">
            <ButtonCustom variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
              {language === 'en' ? "Request Demo" : "Solicitar Demo"}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeviceCTA;
