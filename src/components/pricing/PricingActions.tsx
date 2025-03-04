
import React from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

interface PricingActionsProps {
  language: string;
}

const PricingActions: React.FC<PricingActionsProps> = ({ language }) => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link to="/products">
            <ButtonCustom variant="outline" size="lg">
              {language === 'en' ? "View Device Information" : "Ver Información de Dispositivos"}
            </ButtonCustom>
          </Link>
          <Link to="/join">
            <ButtonCustom variant="primary" size="lg">
              {language === 'en' ? "Get Started Today" : "Comience Hoy"}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingActions;
