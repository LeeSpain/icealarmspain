
import React from "react";
import { Users, Info } from "lucide-react";

interface MembershipType {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface MembershipTypeSelectorProps {
  membershipTypes: MembershipType[];
  selectedType: string;
  onSelect: (typeId: string) => void;
  language: string;
}

const MembershipTypeSelector: React.FC<MembershipTypeSelectorProps> = ({
  membershipTypes,
  selectedType,
  onSelect,
  language,
}) => {
  return (
    <div className="max-w-6xl mx-auto mb-12">
      <h2 className="text-2xl font-semibold mb-8 flex items-center text-ice-600">
        <Users className="mr-3" />
        {language === 'en' ? "What Type of Account Do You Need?" : "¿Qué Tipo de Cuenta Necesita?"}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {membershipTypes.map(type => (
          <div 
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`
              p-6 rounded-lg border cursor-pointer transition-all
              flex flex-col items-center text-center
              ${selectedType === type.id 
                ? 'border-orange-300 bg-orange-50/50 shadow-sm' 
                : 'border-gray-200 bg-white hover:border-orange-200'
              }
            `}
          >
            {type.icon}
            <span className="font-medium text-lg mt-3">{type.title}</span>
            <span className="text-sm text-muted-foreground mt-1">{type.subtitle}</span>
          </div>
        ))}
      </div>
      
      <div className="text-sm text-muted-foreground flex items-start mb-8">
        <Info size={16} className="mr-2 flex-shrink-0 mt-0.5 text-ice-600" />
        <p>
          {language === 'en' 
            ? "Select your account type first. After completing your purchase, you'll be able to set up access for additional people in your membership." 
            : "Seleccione primero su tipo de cuenta. Después de completar su compra, podrá configurar el acceso para personas adicionales en su membresía."}
        </p>
      </div>
    </div>
  );
};

export default MembershipTypeSelector;
