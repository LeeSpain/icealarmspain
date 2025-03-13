
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ClipboardList, Save } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface PersonalDetailsTabContentProps {
  editMode: boolean;
  questionnaireData: any;
  onSave?: (data: any) => void;
}

const PersonalDetailsTabContent: React.FC<PersonalDetailsTabContentProps> = ({ 
  editMode,
  questionnaireData,
  onSave
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [localQuestionnaireData, setLocalQuestionnaireData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  
  // Try to get questionnaire data from localStorage if not provided via props
  useEffect(() => {
    if (!questionnaireData) {
      const savedData = localStorage.getItem('userQuestionnaire');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setLocalQuestionnaireData(parsedData);
          initializeFormData(parsedData);
        } catch (error) {
          console.error("Error parsing questionnaire data:", error);
        }
      }
    } else {
      initializeFormData(questionnaireData);
    }
  }, [questionnaireData]);

  const initializeFormData = (data: any) => {
    const personal = data?.personal || {};
    const address = data?.address || {};
    
    setFormData({
      fullName: personal.fullName || user?.name || '',
      dob: personal.dob || '',
      gender: personal.gender || '',
      nationalId: personal.nationalId || '',
      bloodType: personal.bloodType || '',
      phone: personal.phone || '',
      email: user?.email || '',
      street: address.street || '',
      city: address.city || '',
      postalCode: address.postalCode || '',
      province: address.province || ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    // Create updated questionnaire data structure
    const updatedData = localQuestionnaireData || questionnaireData || {};
    
    if (!updatedData.personal) updatedData.personal = {};
    if (!updatedData.address) updatedData.address = {};
    
    // Update personal info
    updatedData.personal.fullName = formData.fullName;
    updatedData.personal.dob = formData.dob;
    updatedData.personal.gender = formData.gender;
    updatedData.personal.nationalId = formData.nationalId;
    updatedData.personal.bloodType = formData.bloodType;
    updatedData.personal.phone = formData.phone;
    
    // Update address info
    updatedData.address.street = formData.street;
    updatedData.address.city = formData.city;
    updatedData.address.postalCode = formData.postalCode;
    updatedData.address.province = formData.province;
    
    // Save to localStorage
    localStorage.setItem('userQuestionnaire', JSON.stringify(updatedData));
    
    // Notify parent component if needed
    if (onSave) {
      onSave(updatedData);
    }
    
    toast({
      title: language === 'en' ? "Personal details updated" : "Datos personales actualizados",
      description: language === 'en' 
        ? "Your personal information has been saved successfully." 
        : "Tu información personal ha sido guardada con éxito."
    });
  };

  const dataToUse = questionnaireData || localQuestionnaireData;
  
  if (!dataToUse && !editMode) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              {language === 'en'
                ? 'No personal information available. Please complete the questionnaire or add your details.'
                : 'No hay información personal disponible. Por favor complete el cuestionario o añada sus datos.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard/questionnaire')}
                className="flex items-center gap-2"
              >
                <ClipboardList className="h-4 w-4" />
                {language === 'en' 
                  ? 'Complete Questionnaire' 
                  : 'Completar Cuestionario'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
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
                value={formData.fullName || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('fullName', value)}
              />
              
              <InfoField 
                label={language === 'en' ? 'Date of Birth' : 'Fecha de Nacimiento'}
                value={formData.dob || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('dob', value)}
                type="date"
              />
              
              <InfoField 
                label={language === 'en' ? 'Gender' : 'Género'}
                value={formData.gender || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('gender', value)}
                type="select"
                options={[
                  { value: 'male', label: language === 'en' ? 'Male' : 'Masculino' },
                  { value: 'female', label: language === 'en' ? 'Female' : 'Femenino' },
                  { value: 'other', label: language === 'en' ? 'Other' : 'Otro' },
                  { value: 'prefer_not_to_say', label: language === 'en' ? 'Prefer not to say' : 'Prefiero no decirlo' }
                ]}
              />
              
              <InfoField 
                label={language === 'en' ? 'National ID' : 'DNI/NIE'}
                value={formData.nationalId || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('nationalId', value)}
              />
              
              <InfoField 
                label={language === 'en' ? 'Blood Type' : 'Tipo de Sangre'}
                value={formData.bloodType || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('bloodType', value)}
                type="select"
                options={[
                  { value: 'A+', label: 'A+' },
                  { value: 'A-', label: 'A-' },
                  { value: 'B+', label: 'B+' },
                  { value: 'B-', label: 'B-' },
                  { value: 'AB+', label: 'AB+' },
                  { value: 'AB-', label: 'AB-' },
                  { value: 'O+', label: 'O+' },
                  { value: 'O-', label: 'O-' },
                  { value: 'unknown', label: language === 'en' ? 'Unknown' : 'Desconocido' }
                ]}
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
                value={formData.email || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('email', value)}
                type="email"
              />
              
              <InfoField 
                label={language === 'en' ? 'Phone' : 'Teléfono'}
                value={formData.phone || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('phone', value)}
                type="tel"
              />
              
              <InfoField 
                label={language === 'en' ? 'Street Address' : 'Dirección'}
                value={formData.street || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('street', value)}
              />
              
              <InfoField 
                label={language === 'en' ? 'City' : 'Ciudad'}
                value={formData.city || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('city', value)}
              />
              
              <InfoField 
                label={language === 'en' ? 'Postal Code' : 'Código Postal'}
                value={formData.postalCode || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('postalCode', value)}
              />
              
              <InfoField 
                label={language === 'en' ? 'Province' : 'Provincia'}
                value={formData.province || ''}
                editMode={editMode}
                onChange={(value) => handleInputChange('province', value)}
              />
            </div>
          </div>
        </div>
        
        {editMode && (
          <div className="mt-6 flex justify-end">
            <Button 
              className="flex items-center gap-2 bg-ice-600 hover:bg-ice-700"
              onClick={handleSaveChanges}
            >
              <Save size={16} />
              {language === 'en' ? 'Save Information' : 'Guardar Información'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface InfoFieldProps {
  label: string;
  value: string;
  editMode: boolean;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'date' | 'select';
  options?: Array<{value: string, label: string}>;
}

const InfoField: React.FC<InfoFieldProps> = ({ 
  label, 
  value, 
  editMode, 
  onChange, 
  type = 'text',
  options = []
}) => {
  if (editMode) {
    if (type === 'select') {
      return (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">{label}</div>
          <select 
            value={value} 
            onChange={(e) => onChange && onChange(e.target.value)} 
            className="w-full p-2 border rounded-md text-ice-800 focus:border-ice-500 focus:ring focus:ring-ice-200 focus:ring-opacity-50"
          >
            <option value="">{label}...</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }
    
    return (
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <Input 
          type={type} 
          value={value} 
          onChange={(e) => onChange && onChange(e.target.value)} 
          className="w-full focus:border-ice-500 focus:ring focus:ring-ice-200 focus:ring-opacity-50" 
        />
      </div>
    );
  }
  
  // Display mode - not editing
  let displayValue = value;
  
  // Format the display value for select fields
  if (type === 'select' && options.length > 0) {
    const option = options.find(opt => opt.value === value);
    if (option) {
      displayValue = option.label;
    }
  }
  
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="p-2 bg-gray-50 rounded-md border text-gray-700">{displayValue || '-'}</div>
    </div>
  );
};

export default PersonalDetailsTabContent;
