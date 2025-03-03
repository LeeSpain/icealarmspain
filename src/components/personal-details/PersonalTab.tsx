
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalTabProps {
  formData: Record<string, any>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  language: string;
}

const PersonalTab: React.FC<PersonalTabProps> = ({ 
  formData, 
  handleInputChange, 
  language 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Basic Information' : 'Información Básica'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Your personal identification details' 
            : 'Sus datos de identificación personal'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {language === 'en' ? 'Full Name' : 'Nombre Completo'}
            </Label>
            <Input 
              id="name" 
              name="name"
              value={formData.name || ''} 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">
              {language === 'en' ? 'Email Address' : 'Correo Electrónico'}
            </Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              value={formData.email || ''} 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">
              {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
            </Label>
            <Input 
              id="phone" 
              name="phone"
              value={formData.phone || ''} 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">
              {language === 'en' ? 'Date of Birth' : 'Fecha de Nacimiento'}
            </Label>
            <Input 
              id="dateOfBirth" 
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ''} 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">
              {language === 'en' ? 'Address' : 'Dirección'}
            </Label>
            <Input 
              id="address" 
              name="address"
              value={formData.address || ''} 
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalTab;
