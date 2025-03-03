
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import { ArrowLeft, ArrowRight, Brain, CheckCircle, User, Home, Hearts, PlusSquare, Phone, FileText, Passport } from "lucide-react";

// Define the steps for the questionnaire
const TOTAL_STEPS = 6;

const OnboardingQuestionnaire: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: user?.name || '',
    age: '',
    dateOfBirth: '',
    phoneNumber: '',
    alternativePhone: '',
    email: user?.email || '',
    primaryLanguage: language === 'en' ? 'english' : 'spanish',
    nationality: '',
    
    // Spanish Specific Documentation
    nieNumber: '',
    passportNumber: '',
    
    // Address Information
    address: '',
    city: '',
    postalCode: '',
    province: '',
    livingArrangement: 'alone',
    
    // Mailing Address (if different)
    hasDifferentMailingAddress: 'no',
    mailingAddress: '',
    mailingCity: '',
    mailingPostalCode: '',
    mailingProvince: '',
    
    // Medical Information
    medicalConditions: '',
    medications: '',
    allergies: '',
    bloodType: '',
    mobilityIssues: '',
    visionIssues: '',
    hearingIssues: '',
    
    // Emergency Contact 1
    emergencyContact1Name: '',
    emergencyContact1Phone: '',
    emergencyContact1Relationship: '',
    emergencyContact1HasKeys: 'no',
    
    // Emergency Contact 2
    emergencyContact2Name: '',
    emergencyContact2Phone: '',
    emergencyContact2Relationship: '',
    emergencyContact2HasKeys: 'no',
    
    // Partner Information
    hasPartner: 'no',
    partnerName: '',
    partnerPhone: '',
    
    // Healthcare Information
    doctorName: '',
    doctorPhone: '',
    hospital: '',
    healthInsurance: '',
    healthInsuranceNumber: '',
    
    // Additional Notes
    additionalNotes: ''
  });
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Switch to AI-assisted mode
  const toggleAIMode = () => {
    if (!isUsingAI) {
      setIsUsingAI(true);
      // Simulate AI loading
      setAiLoading(true);
      setTimeout(() => {
        setAiLoading(false);
        // Mock AI suggestions based on current step
        if (currentStep === 3) {
          setAiSuggestions([
            language === 'en' ? 'Hypertension' : 'Hipertensión',
            language === 'en' ? 'Type 2 Diabetes' : 'Diabetes Tipo 2',
            language === 'en' ? 'Arthritis' : 'Artritis',
            language === 'en' ? 'Asthma' : 'Asma',
            language === 'en' ? 'COPD' : 'EPOC'
          ]);
        } else if (currentStep === 4) {
          setAiSuggestions([
            language === 'en' ? 'Metformin' : 'Metformina',
            language === 'en' ? 'Lisinopril' : 'Lisinopril',
            language === 'en' ? 'Atorvastatin' : 'Atorvastatina',
            language === 'en' ? 'Salbutamol' : 'Salbutamol',
            language === 'en' ? 'Paracetamol' : 'Paracetamol'
          ]);
        } else {
          setAiSuggestions([]);
        }
      }, 2000);
    } else {
      setIsUsingAI(false);
      setAiSuggestions([]);
    }
  };
  
  // Handle navigation between steps
  const goToNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      setAiSuggestions([]);
      setIsUsingAI(false);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setAiSuggestions([]);
      setIsUsingAI(false);
    }
  };
  
  // Submit the form
  const handleSubmit = () => {
    // Here you would normally save the data to your backend
    toast.success(language === 'en' 
      ? 'Personal details saved successfully!' 
      : '¡Datos personales guardados con éxito!');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  // Get step icon
  const getStepIcon = () => {
    switch (currentStep) {
      case 1: return <User className="h-6 w-6 text-ice-600" />;
      case 2: return <Home className="h-6 w-6 text-ice-600" />;
      case 3: return <PlusSquare className="h-6 w-6 text-ice-600" />;
      case 4: return <Hearts className="h-6 w-6 text-ice-600" />;
      case 5: return <Phone className="h-6 w-6 text-ice-600" />;
      case 6: return <FileText className="h-6 w-6 text-ice-600" />;
      default: return <User className="h-6 w-6 text-ice-600" />;
    }
  };
  
  // Get step title
  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return language === 'en' ? 'Personal Information' : 'Información Personal';
      case 2: return language === 'en' ? 'Address Information' : 'Información de Dirección';
      case 3: return language === 'en' ? 'Medical Information' : 'Información Médica';
      case 4: return language === 'en' ? 'Medications & Allergies' : 'Medicamentos y Alergias';
      case 5: return language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia';
      case 6: return language === 'en' ? 'Healthcare Information' : 'Información Sanitaria';
      default: return '';
    }
  };
  
  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              {getStepIcon()}
              <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">
                  {language === 'en' ? 'Full Name' : 'Nombre Completo'} *
                </Label>
                <Input 
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your full name' : 'Ingrese su nombre completo'}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="dateOfBirth">
                  {language === 'en' ? 'Date of Birth' : 'Fecha de Nacimiento'} *
                </Label>
                <Input 
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">
                  {language === 'en' ? 'Primary Phone Number' : 'Número de Teléfono Principal'} *
                </Label>
                <Input 
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder={language === 'en' ? '+34 612 345 678' : '+34 612 345 678'}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="alternativePhone">
                  {language === 'en' ? 'Alternative Phone Number' : 'Número de Teléfono Alternativo'}
                </Label>
                <Input 
                  id="alternativePhone"
                  name="alternativePhone"
                  value={formData.alternativePhone}
                  onChange={handleChange}
                  placeholder={language === 'en' ? '+34 612 345 678' : '+34 612 345 678'}
                />
              </div>
              
              <div>
                <Label htmlFor="email">
                  {language === 'en' ? 'Email Address' : 'Correo Electrónico'} *
                </Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'your.email@example.com' : 'su.correo@ejemplo.com'}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="primaryLanguage">
                  {language === 'en' ? 'Primary Language' : 'Idioma Principal'} *
                </Label>
                <Select 
                  value={formData.primaryLanguage} 
                  onValueChange={(value) => handleSelectChange('primaryLanguage', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">
                      {language === 'en' ? 'English' : 'Inglés'}
                    </SelectItem>
                    <SelectItem value="spanish">
                      {language === 'en' ? 'Spanish' : 'Español'}
                    </SelectItem>
                    <SelectItem value="german">
                      {language === 'en' ? 'German' : 'Alemán'}
                    </SelectItem>
                    <SelectItem value="french">
                      {language === 'en' ? 'French' : 'Francés'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="nationality">
                  {language === 'en' ? 'Nationality' : 'Nacionalidad'} *
                </Label>
                <Input 
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your nationality' : 'Ingrese su nacionalidad'}
                  required
                />
              </div>
            </div>
            
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Passport className="h-5 w-5 text-ice-600" />
                <h3 className="text-lg font-medium">
                  {language === 'en' ? 'Spanish Documentation' : 'Documentación Española'}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nieNumber">
                    {language === 'en' ? 'NIE Number' : 'Número de NIE'}
                  </Label>
                  <Input 
                    id="nieNumber"
                    name="nieNumber"
                    value={formData.nieNumber}
                    onChange={handleChange}
                    placeholder={language === 'en' ? 'e.g. X-1234567-Z' : 'ej. X-1234567-Z'}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'en' 
                      ? 'The NIE is your Spanish foreigner identification number' 
                      : 'El NIE es su número de identificación de extranjero español'}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="passportNumber">
                    {language === 'en' ? 'Passport Number' : 'Número de Pasaporte'}
                  </Label>
                  <Input 
                    id="passportNumber"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    placeholder={language === 'en' ? 'Enter your passport number' : 'Ingrese su número de pasaporte'}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              {getStepIcon()}
              <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address">
                  {language === 'en' ? 'Street Address' : 'Dirección'} *
                </Label>
                <Input 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your street address' : 'Ingrese su dirección'}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="city">
                  {language === 'en' ? 'City' : 'Ciudad'} *
                </Label>
                <Input 
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your city' : 'Ingrese su ciudad'}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="postalCode">
                  {language === 'en' ? 'Postal Code' : 'Código Postal'} *
                </Label>
                <Input 
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your postal code' : 'Ingrese su código postal'}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="province">
                  {language === 'en' ? 'Province' : 'Provincia'} *
                </Label>
                <Input 
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your province' : 'Ingrese su provincia'}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="livingArrangement">
                  {language === 'en' ? 'Living Arrangement' : 'Arreglo de Vivienda'} *
                </Label>
                <Select 
                  value={formData.livingArrangement} 
                  onValueChange={(value) => handleSelectChange('livingArrangement', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alone">
                      {language === 'en' ? 'Living Alone' : 'Vivo Solo/a'}
                    </SelectItem>
                    <SelectItem value="withPartner">
                      {language === 'en' ? 'With Partner/Spouse' : 'Con Pareja/Cónyuge'}
                    </SelectItem>
                    <SelectItem value="withFamily">
                      {language === 'en' ? 'With Family' : 'Con Familia'}
                    </SelectItem>
                    <SelectItem value="assistedLiving">
                      {language === 'en' ? 'Assisted Living Facility' : 'Residencia Asistida'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Label htmlFor="hasDifferentMailingAddress" className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="hasDifferentMailingAddress"
                    checked={formData.hasDifferentMailingAddress === 'yes'}
                    onChange={(e) => handleSelectChange('hasDifferentMailingAddress', e.target.checked ? 'yes' : 'no')}
                    className="rounded border-gray-300"
                  />
                  <span>
                    {language === 'en' 
                      ? 'I have a different mailing address' 
                      : 'Tengo una dirección postal diferente'}
                  </span>
                </Label>
              </div>
              
              {formData.hasDifferentMailingAddress === 'yes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="mailingAddress">
                      {language === 'en' ? 'Mailing Address' : 'Dirección Postal'}
                    </Label>
                    <Input 
                      id="mailingAddress"
                      name="mailingAddress"
                      value={formData.mailingAddress}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Enter your mailing address' : 'Ingrese su dirección postal'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mailingCity">
                      {language === 'en' ? 'City' : 'Ciudad'}
                    </Label>
                    <Input 
                      id="mailingCity"
                      name="mailingCity"
                      value={formData.mailingCity}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Enter city' : 'Ingrese ciudad'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mailingPostalCode">
                      {language === 'en' ? 'Postal Code' : 'Código Postal'}
                    </Label>
                    <Input 
                      id="mailingPostalCode"
                      name="mailingPostalCode"
                      value={formData.mailingPostalCode}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Enter postal code' : 'Ingrese código postal'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mailingProvince">
                      {language === 'en' ? 'Province' : 'Provincia'}
                    </Label>
                    <Input 
                      id="mailingProvince"
                      name="mailingProvince"
                      value={formData.mailingProvince}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Enter province' : 'Ingrese provincia'}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              {getStepIcon()}
              <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="medicalConditions">
                  {language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'} *
                </Label>
                <Textarea 
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'List any medical conditions you have' 
                    : 'Enumere cualquier condición médica que tenga'}
                  className="min-h-24"
                  required
                />
                
                {isUsingAI && aiLoading && (
                  <div className="mt-2 text-ice-600 text-sm animate-pulse">
                    {language === 'en' 
                      ? 'AI is analyzing common medical conditions...' 
                      : 'La IA está analizando condiciones médicas comunes...'}
                  </div>
                )}
                
                {isUsingAI && !aiLoading && aiSuggestions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">
                      {language === 'en' ? 'AI Suggestions:' : 'Sugerencias de IA:'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 bg-ice-100 text-ice-700 rounded-full text-sm hover:bg-ice-200"
                          onClick={() => {
                            const newValue = formData.medicalConditions 
                              ? `${formData.medicalConditions}, ${suggestion}` 
                              : suggestion;
                            setFormData(prev => ({ ...prev, medicalConditions: newValue }));
                          }}
                        >
                          + {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="bloodType">
                  {language === 'en' ? 'Blood Type' : 'Grupo Sanguíneo'}
                </Label>
                <Select 
                  value={formData.bloodType} 
                  onValueChange={(value) => handleSelectChange('bloodType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select your blood type' : 'Seleccione su grupo sanguíneo'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="unknown">
                      {language === 'en' ? 'Unknown' : 'Desconocido'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="mobilityIssues">
                  {language === 'en' ? 'Mobility Issues' : 'Problemas de Movilidad'}
                </Label>
                <Input 
                  id="mobilityIssues"
                  name="mobilityIssues"
                  value={formData.mobilityIssues}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'Describe any mobility issues' 
                    : 'Describa cualquier problema de movilidad'}
                />
              </div>
              
              <div>
                <Label htmlFor="visionIssues">
                  {language === 'en' ? 'Vision Issues' : 'Problemas de Visión'}
                </Label>
                <Input 
                  id="visionIssues"
                  name="visionIssues"
                  value={formData.visionIssues}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'Describe any vision issues' 
                    : 'Describa cualquier problema de visión'}
                />
              </div>
              
              <div>
                <Label htmlFor="hearingIssues">
                  {language === 'en' ? 'Hearing Issues' : 'Problemas de Audición'}
                </Label>
                <Input 
                  id="hearingIssues"
                  name="hearingIssues"
                  value={formData.hearingIssues}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'Describe any hearing issues' 
                    : 'Describa cualquier problema de audición'}
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              {getStepIcon()}
              <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="medications">
                  {language === 'en' ? 'Current Medications' : 'Medicamentos Actuales'} *
                </Label>
                <Textarea 
                  id="medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'List all medications you are taking with dosage' 
                    : 'Enumere todos los medicamentos que está tomando con la dosis'}
                  className="min-h-24"
                  required
                />
                
                {isUsingAI && aiLoading && (
                  <div className="mt-2 text-ice-600 text-sm animate-pulse">
                    {language === 'en' 
                      ? 'AI is analyzing common medications...' 
                      : 'La IA está analizando medicamentos comunes...'}
                  </div>
                )}
                
                {isUsingAI && !aiLoading && aiSuggestions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">
                      {language === 'en' ? 'AI Suggestions:' : 'Sugerencias de IA:'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 bg-ice-100 text-ice-700 rounded-full text-sm hover:bg-ice-200"
                          onClick={() => {
                            const newValue = formData.medications 
                              ? `${formData.medications}, ${suggestion}` 
                              : suggestion;
                            setFormData(prev => ({ ...prev, medications: newValue }));
                          }}
                        >
                          + {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="allergies">
                  {language === 'en' ? 'Allergies' : 'Alergias'}
                </Label>
                <Textarea 
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'List any allergies you have (medications, food, etc.)' 
                    : 'Enumere cualquier alergia que tenga (medicamentos, alimentos, etc.)'}
                  className="min-h-16"
                />
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              {getStepIcon()}
              <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
            </div>
            
            <div className="border p-4 rounded-md bg-ice-50/30 mb-6">
              <h3 className="font-medium mb-3">
                {language === 'en' ? 'Primary Emergency Contact' : 'Contacto de Emergencia Principal'} *
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact1Name">
                    {language === 'en' ? 'Full Name' : 'Nombre Completo'} *
                  </Label>
                  <Input 
                    id="emergencyContact1Name"
                    name="emergencyContact1Name"
                    value={formData.emergencyContact1Name}
                    onChange={handleChange}
                    placeholder={language === 'en' 
                      ? 'Emergency contact name' 
                      : 'Nombre del contacto de emergencia'}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergencyContact1Phone">
                    {language === 'en' ? 'Phone Number' : 'Número de Teléfono'} *
                  </Label>
                  <Input 
                    id="emergencyContact1Phone"
                    name="emergencyContact1Phone"
                    value={formData.emergencyContact1Phone}
                    onChange={handleChange}
                    placeholder={language === 'en' ? '+34 612 345 678' : '+34 612 345 678'}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergencyContact1Relationship">
                    {language === 'en' ? 'Relationship' : 'Relación'} *
                  </Label>
                  <Input 
                    id="emergencyContact1Relationship"
                    name="emergencyContact1Relationship"
                    value={formData.emergencyContact1Relationship}
                    onChange={handleChange}
                    placeholder={language === 'en' 
                      ? 'e.g. Son, Daughter, Friend' 
                      : 'ej. Hijo, Hija, Amigo'}
                    required
                  />
                </div>
                
                <div>
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.emergencyContact1HasKeys === 'yes'}
                      onChange={(e) => handleSelectChange('emergencyContact1HasKeys', e.target.checked ? 'yes' : 'no')}
                      className="rounded border-gray-300"
                    />
                    <span>
                      {language === 'en' 
                        ? 'This person has keys to my home' 
                        : 'Esta persona tiene llaves de mi casa'}
                    </span>
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="border p-4 rounded-md mb-6">
              <h3 className="font-medium mb-3">
                {language === 'en' ? 'Secondary Emergency Contact' : 'Contacto de Emergencia Secundario'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact2Name">
                    {language === 'en' ? 'Full Name' : 'Nombre Completo'}
                  </Label>
                  <Input 
                    id="emergencyContact2Name"
                    name="emergencyContact2Name"
                    value={formData.emergencyContact2Name}
                    onChange={handleChange}
                    placeholder={language === 'en' 
                      ? 'Emergency contact name' 
                      : 'Nombre del contacto de emergencia'}
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergencyContact2Phone">
                    {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                  </Label>
                  <Input 
                    id="emergencyContact2Phone"
                    name="emergencyContact2Phone"
                    value={formData.emergencyContact2Phone}
                    onChange={handleChange}
                    placeholder={language === 'en' ? '+34 612 345 678' : '+34 612 345 678'}
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergencyContact2Relationship">
                    {language === 'en' ? 'Relationship' : 'Relación'}
                  </Label>
                  <Input 
                    id="emergencyContact2Relationship"
                    name="emergencyContact2Relationship"
                    value={formData.emergencyContact2Relationship}
                    onChange={handleChange}
                    placeholder={language === 'en' 
                      ? 'e.g. Son, Daughter, Friend' 
                      : 'ej. Hijo, Hija, Amigo'}
                  />
                </div>
                
                <div>
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.emergencyContact2HasKeys === 'yes'}
                      onChange={(e) => handleSelectChange('emergencyContact2HasKeys', e.target.checked ? 'yes' : 'no')}
                      className="rounded border-gray-300"
                    />
                    <span>
                      {language === 'en' 
                        ? 'This person has keys to my home' 
                        : 'Esta persona tiene llaves de mi casa'}
                    </span>
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <Label className="flex items-center gap-2 cursor-pointer mb-4">
                <input 
                  type="checkbox" 
                  checked={formData.hasPartner === 'yes'}
                  onChange={(e) => handleSelectChange('hasPartner', e.target.checked ? 'yes' : 'no')}
                  className="rounded border-gray-300"
                />
                <span>
                  {language === 'en' 
                    ? 'I have a partner/spouse living with me' 
                    : 'Tengo una pareja/cónyuge que vive conmigo'}
                </span>
              </Label>
              
              {formData.hasPartner === 'yes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="partnerName">
                      {language === 'en' ? 'Partner Full Name' : 'Nombre Completo de la Pareja'}
                    </Label>
                    <Input 
                      id="partnerName"
                      name="partnerName"
                      value={formData.partnerName}
                      onChange={handleChange}
                      placeholder={language === 'en' 
                        ? 'Enter partner name' 
                        : 'Ingrese nombre de la pareja'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="partnerPhone">
                      {language === 'en' ? 'Partner Phone Number' : 'Número de Teléfono de la Pareja'}
                    </Label>
                    <Input 
                      id="partnerPhone"
                      name="partnerPhone"
                      value={formData.partnerPhone}
                      onChange={handleChange}
                      placeholder={language === 'en' ? '+34 612 345 678' : '+34 612 345 678'}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              {getStepIcon()}
              <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="doctorName">
                  {language === 'en' ? 'Primary Doctor Name' : 'Nombre del Médico Principal'}
                </Label>
                <Input 
                  id="doctorName"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'Enter your doctor\'s name' 
                    : 'Ingrese el nombre de su médico'}
                />
              </div>
              
              <div>
                <Label htmlFor="doctorPhone">
                  {language === 'en' ? 'Doctor Phone Number' : 'Número de Teléfono del Médico'}
                </Label>
                <Input 
                  id="doctorPhone"
                  name="doctorPhone"
                  value={formData.doctorPhone}
                  onChange={handleChange}
                  placeholder={language === 'en' ? '+34 612 345 678' : '+34 612 345 678'}
                />
              </div>
              
              <div>
                <Label htmlFor="hospital">
                  {language === 'en' ? 'Preferred Hospital' : 'Hospital Preferido'}
                </Label>
                <Input 
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'Enter preferred hospital' 
                    : 'Ingrese hospital preferido'}
                />
              </div>
              
              <div>
                <Label htmlFor="healthInsurance">
                  {language === 'en' ? 'Health Insurance Provider' : 'Proveedor de Seguro de Salud'}
                </Label>
                <Input 
                  id="healthInsurance"
                  name="healthInsurance"
                  value={formData.healthInsurance}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'e.g. ASISA, Sanitas, Adeslas' 
                    : 'ej. ASISA, Sanitas, Adeslas'}
                />
              </div>
              
              <div>
                <Label htmlFor="healthInsuranceNumber">
                  {language === 'en' ? 'Health Insurance Number' : 'Número de Seguro de Salud'}
                </Label>
                <Input 
                  id="healthInsuranceNumber"
                  name="healthInsuranceNumber"
                  value={formData.healthInsuranceNumber}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'Enter your insurance number' 
                    : 'Ingrese su número de seguro'}
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Label htmlFor="additionalNotes">
                {language === 'en' ? 'Additional Notes' : 'Notas Adicionales'}
              </Label>
              <Textarea 
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder={language === 'en' 
                  ? 'Any additional information that might be helpful in an emergency' 
                  : 'Cualquier información adicional que pueda ser útil en una emergencia'}
                className="min-h-24"
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-grow flex flex-col items-center justify-center">
        <Card className="w-full max-w-3xl shadow-lg border-ice-100">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                {language === 'en' 
                  ? 'Your Personal Details' 
                  : 'Tus Datos Personales'}
              </h1>
              
              <Button 
                variant="outline" 
                size="sm" 
                className={`flex items-center gap-2 ${isUsingAI ? 'bg-ice-100 text-ice-700' : ''}`}
                onClick={toggleAIMode}
              >
                <Brain size={16} />
                {language === 'en' ? 'AI Assist' : 'Asistencia IA'}
              </Button>
            </div>
            
            {/* Progress bar */}
            <div className="mb-8">
              <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>
                  {language === 'en' ? 'Step' : 'Paso'} {currentStep} {language === 'en' ? 'of' : 'de'} {TOTAL_STEPS}
                </span>
                <span>
                  {Math.round((currentStep / TOTAL_STEPS) * 100)}%
                </span>
              </div>
            </div>
            
            {/* Step content */}
            {renderStepContent()}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                {language === 'en' ? 'Previous' : 'Anterior'}
              </Button>
              
              {currentStep < TOTAL_STEPS ? (
                <Button 
                  onClick={goToNextStep}
                  className="flex items-center gap-2 bg-ice-600 hover:bg-ice-700"
                >
                  {language === 'en' ? 'Next' : 'Siguiente'}
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-ice-600 hover:bg-ice-700"
                >
                  <CheckCircle size={16} />
                  {language === 'en' ? 'Complete Profile' : 'Completar Perfil'}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
