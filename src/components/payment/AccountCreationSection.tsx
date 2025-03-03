
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { PaymentDetails } from "@/types/payment";

interface AccountCreationSectionProps {
  formData: PaymentDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountCreationSection: React.FC<AccountCreationSectionProps> = ({
  formData,
  handleChange
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center">
        <User className="mr-2 h-5 w-5 text-ice-600" />
        {language === 'en' ? "Create Your Account" : "Crea Tu Cuenta"}
      </h3>
      <div className="space-y-2">
        <Label htmlFor="email">
          {language === 'en' ? "Email" : "Correo Electrónico"}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">
          {language === 'en' ? "Create Password" : "Crear Contraseña"}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          minLength={6}
          autoComplete="new-password"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'en' 
            ? "Minimum 6 characters. You'll use this to access your dashboard later." 
            : "Mínimo 6 caracteres. Usarás esto para acceder a tu panel más tarde."}
        </p>
      </div>
    </div>
  );
};

export default AccountCreationSection;
