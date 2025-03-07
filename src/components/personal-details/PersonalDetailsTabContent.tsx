
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { Input } from "@/components/ui/input";

interface PersonalDetailsTabContentProps {
  editMode: boolean;
  questionnaireData: any;
}

const PersonalDetailsTabContent: React.FC<PersonalDetailsTabContentProps> = ({ 
  editMode,
  questionnaireData
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  if (!questionnaireData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">
              {language === 'en'
                ? 'No personal information available. Please complete the questionnaire.'
                : 'No hay información personal disponible. Por favor complete el cuestionario.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Extract personal info from questionnaire data
  const personalInfo = questionnaireData.personal || {};
  const addressInfo = questionnaireData.address || {};
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg border-b pb-2">
              {language === 'en' ? 'Basic Information' : 'Información Básica'}
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <InfoField 
                label={language === 'en' ? 'Full Name' : 'Nombre Completo'}
                value={personalInfo.fullName || user?.name || '-'}
                editMode={editMode}
              />
              
              <InfoField 
                label={language === 'en' ? 'Date of Birth' : 'Fecha de Nacimiento'}
                value={personalInfo.dob || '-'}
                editMode={editMode}
              />
              
              <InfoField 
                label={language === 'en' ? 'Gender' : 'Género'}
                value={personalInfo.gender || '-'}
                editMode={editMode}
              />
              
              <InfoField 
                label={language === 'en' ? 'National ID' : 'DNI/NIE'}
                value={personalInfo.nationalId || '-'}
                editMode={editMode}
              />
              
              <InfoField 
                label={language === 'en' ? 'Blood Type' : 'Tipo de Sangre'}
                value={personalInfo.bloodType || '-'}
                editMode={editMode}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg border-b pb-2">
              {language === 'en' ? 'Contact & Address' : 'Contacto y Dirección'}
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <InfoField 
                label={language === 'en' ? 'Email' : 'Correo Electrónico'}
                value={user?.email || '-'}
                editMode={editMode}
              />
              
              <InfoField 
                label={language === 'en' ? 'Phone' : 'Teléfono'}
                value={personalInfo.phone || '-'}
                editMode={editMode}
              />
              
              <InfoField 
                label={language === 'en' ? 'Address' : 'Dirección'}
                value={`${addressInfo.street || ''}, ${addressInfo.city || ''}`}
                editMode={editMode}
              />
              
              <InfoField 
                label={language === 'en' ? 'Postal Code' : 'Código Postal'}
                value={addressInfo.postalCode || '-'}
                editMode={editMode}
              />
              
              <InfoField 
                label={language === 'en' ? 'Province' : 'Provincia'}
                value={addressInfo.province || '-'}
                editMode={editMode}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface InfoFieldProps {
  label: string;
  value: string;
  editMode: boolean;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, editMode }) => {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      {editMode ? (
        <input 
          type="text" 
          defaultValue={value} 
          className="w-full p-2 border rounded-md bg-[#FEC6A1] text-white placeholder:text-white/70" 
        />
      ) : (
        <div className="p-2 bg-gray-50 rounded-md border">{value}</div>
      )}
    </div>
  );
};

export default PersonalDetailsTabContent;
