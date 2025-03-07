
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, MapPin, Stethoscope, Clock } from "lucide-react";
import { useAuth } from "@/context/auth";

interface PersonalDetailsTabContentProps {
  editMode: boolean;
}

const PersonalDetailsTabContent: React.FC<PersonalDetailsTabContentProps> = ({ editMode }) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Retrieve data from local storage (simulating database)
  const [formData, setFormData] = useState(() => {
    const savedQuestionnaire = localStorage.getItem('userQuestionnaire');
    if (savedQuestionnaire) {
      const parsedData = JSON.parse(savedQuestionnaire);
      // Extract personal information from the questionnaire data
      return {
        name: parsedData.personal_fullName || user?.name || "",
        email: parsedData.personal_email || user?.email || "",
        phone: parsedData.personal_phone || "",
        dob: parsedData.personal_dob || "",
        nie: parsedData.personal_nie || "",
        passport: parsedData.personal_passport || "",
        address: parsedData.address_fullAddress || "",
        bloodType: parsedData.health_bloodType || "",
        allergies: parsedData.health_allergies || "",
        medicalConditions: parsedData.health_conditions || "",
        notes: parsedData.additional_notes || ""
      };
    }
    
    return {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      dob: "",
      nie: "",
      passport: "",
      address: "",
      bloodType: "",
      allergies: "",
      medicalConditions: "",
      notes: ""
    };
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-ice-500" />
            <CardTitle>
              {language === 'en' ? 'Basic Information' : 'Información Básica'}
            </CardTitle>
          </div>
          <CardDescription>
            {language === 'en' 
              ? 'Your personal identification details' 
              : 'Tus datos de identificación personal'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                {language === 'en' ? 'Full Name' : 'Nombre Completo'}
              </Label>
              {editMode ? (
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.name || "-"}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                {language === 'en' ? 'Email Address' : 'Correo Electrónico'}
              </Label>
              {editMode ? (
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.email || "-"}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
              </Label>
              {editMode ? (
                <Input 
                  id="phone" 
                  name="phone"
                  value={formData.phone} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.phone || "-"}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dob">
                {language === 'en' ? 'Date of Birth' : 'Fecha de Nacimiento'}
              </Label>
              {editMode ? (
                <Input 
                  id="dob" 
                  name="dob"
                  type="date"
                  value={formData.dob} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.dob || "-"}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nie">
                {language === 'en' ? 'NIE Number' : 'Número NIE'}
              </Label>
              {editMode ? (
                <Input 
                  id="nie" 
                  name="nie"
                  value={formData.nie} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.nie || "-"}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="passport">
                {language === 'en' ? 'Passport Number' : 'Número de Pasaporte'}
              </Label>
              {editMode ? (
                <Input 
                  id="passport" 
                  name="passport"
                  value={formData.passport} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.passport || "-"}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-ice-500" />
            <CardTitle>
              {language === 'en' ? 'Contact & Address' : 'Contacto y Dirección'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">
                {language === 'en' ? 'Full Address' : 'Dirección Completa'}
              </Label>
              {editMode ? (
                <Textarea 
                  id="address" 
                  name="address"
                  rows={3}
                  value={formData.address} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50 min-h-[80px]">
                  {formData.address || "-"}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-ice-500" />
            <CardTitle>
              {language === 'en' ? 'Medical Information' : 'Información Médica'}
            </CardTitle>
          </div>
          <CardDescription>
            {language === 'en' 
              ? 'Important health details for emergency responders' 
              : 'Detalles de salud importantes para servicios de emergencia'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bloodType">
                {language === 'en' ? 'Blood Type' : 'Grupo Sanguíneo'}
              </Label>
              {editMode ? (
                <Input 
                  id="bloodType" 
                  name="bloodType"
                  value={formData.bloodType} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.bloodType || "-"}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="allergies">
                {language === 'en' ? 'Allergies' : 'Alergias'}
              </Label>
              {editMode ? (
                <Input 
                  id="allergies" 
                  name="allergies"
                  value={formData.allergies} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.allergies || "-"}</div>
              )}
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="medicalConditions">
                {language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'}
              </Label>
              {editMode ? (
                <Textarea 
                  id="medicalConditions" 
                  name="medicalConditions"
                  rows={3}
                  value={formData.medicalConditions} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50 min-h-[80px]">
                  {formData.medicalConditions || "-"}
                </div>
              )}
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="notes">
                {language === 'en' ? 'Additional Notes' : 'Notas Adicionales'}
              </Label>
              {editMode ? (
                <Textarea 
                  id="notes" 
                  name="notes"
                  rows={3}
                  value={formData.notes} 
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50 min-h-[80px]">
                  {formData.notes || "-"}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDetailsTabContent;
