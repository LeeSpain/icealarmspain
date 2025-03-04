
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentDetails } from "@/types/payment";

interface BillingInformationSectionProps {
  formData: PaymentDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isNewCustomer: boolean;
}

const BillingInformationSection: React.FC<BillingInformationSectionProps> = ({
  formData,
  handleChange,
  isNewCustomer
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {language === 'en' ? "Billing Information" : "Información de Facturación"}
      </h3>
      
      {!isNewCustomer && (
        <div className="space-y-2">
          <Label htmlFor="email">
            {language === 'en' ? "Email" : "Correo Electrónico"} *
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
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">
            {language === 'en' ? "Phone Number" : "Número de Teléfono"} *
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder={language === 'en' ? "Phone number" : "Número de teléfono"}
            required
            autoComplete="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nie">
            {language === 'en' ? "NIE Number" : "Número NIE"} *
          </Label>
          <Input
            id="nie"
            name="nie"
            value={formData.nie || ""}
            onChange={handleChange}
            placeholder={language === 'en' ? "X0000000A" : "X0000000A"}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address.line1">
          {language === 'en' ? "Address Line 1" : "Dirección Línea 1"} *
        </Label>
        <Input
          id="address.line1"
          name="address.line1"
          value={formData.address.line1}
          onChange={handleChange}
          placeholder={language === 'en' ? "Street address" : "Dirección"}
          required
          autoComplete="address-line1"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address.line2">
          {language === 'en' ? "Address Line 2 (Optional)" : "Dirección Línea 2 (Opcional)"}
        </Label>
        <Input
          id="address.line2"
          name="address.line2"
          value={formData.address.line2}
          onChange={handleChange}
          placeholder={language === 'en' ? "Apartment, suite, etc." : "Apartamento, suite, etc."}
          autoComplete="address-line2"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address.city">
            {language === 'en' ? "City" : "Ciudad"} *
          </Label>
          <Input
            id="address.city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder={language === 'en' ? "City" : "Ciudad"}
            required
            autoComplete="address-level2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address.state">
            {language === 'en' ? "Province" : "Provincia"} *
          </Label>
          <Input
            id="address.state"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            placeholder={language === 'en' ? "Province" : "Provincia"}
            required
            autoComplete="address-level1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address.postalCode">
            {language === 'en' ? "Postal Code" : "Código Postal"} *
          </Label>
          <Input
            id="address.postalCode"
            name="address.postalCode"
            value={formData.address.postalCode}
            onChange={handleChange}
            placeholder={language === 'en' ? "Postal code" : "Código postal"}
            required
            autoComplete="postal-code"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address.country">
            {language === 'en' ? "Country" : "País"} *
          </Label>
          <Input
            id="address.country"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            placeholder={language === 'en' ? "Country" : "País"}
            required
            autoComplete="country-name"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingInformationSection;
