
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
import { ArrowLeft, ArrowRight, Brain, CheckCircle } from "lucide-react";

// Define the steps for the questionnaire
const TOTAL_STEPS = 5;

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
    fullName: user?.name || '',
    age: '',
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
    relationship: '',
    medicalConditions: '',
    medications: '',
    allergies: '',
    mobilityIssues: '',
    livingArrangement: 'alone',
    primaryLanguage: language === 'en' ? 'english' : 'spanish',
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
            language === 'en' ? 'Arthritis' : 'Artritis'
          ]);
        } else if (currentStep === 4) {
          setAiSuggestions([
            language === 'en' ? 'Metformin' : 'Metformina',
            language === 'en' ? 'Lisinopril' : 'Lisinopril',
            language === 'en' ? 'Atorvastatin' : 'Atorvastatina'
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
      ? 'Profile information saved successfully!' 
      : '¡Información del perfil guardada con éxito!');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {language === 'en' ? 'Personal Information' : 'Información Personal'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">
                  {language === 'en' ? 'Full Name' : 'Nombre Completo'}
                </Label>
                <Input 
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your full name' : 'Ingrese su nombre completo'}
                />
              </div>
              
              <div>
                <Label htmlFor="age">
                  {language === 'en' ? 'Age' : 'Edad'}
                </Label>
                <Input 
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your age' : 'Ingrese su edad'}
                />
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">
                  {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                </Label>
                <Input 
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your phone number' : 'Ingrese su número de teléfono'}
                />
              </div>
              
              <div>
                <Label htmlFor="primaryLanguage">
                  {language === 'en' ? 'Primary Language' : 'Idioma Principal'}
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
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {language === 'en' ? 'Address Information' : 'Información de Dirección'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">
                  {language === 'en' ? 'Street Address' : 'Dirección'}
                </Label>
                <Input 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your street address' : 'Ingrese su dirección'}
                />
              </div>
              
              <div>
                <Label htmlFor="city">
                  {language === 'en' ? 'City' : 'Ciudad'}
                </Label>
                <Input 
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your city' : 'Ingrese su ciudad'}
                />
              </div>
              
              <div>
                <Label htmlFor="postalCode">
                  {language === 'en' ? 'Postal Code' : 'Código Postal'}
                </Label>
                <Input 
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your postal code' : 'Ingrese su código postal'}
                />
              </div>
              
              <div>
                <Label htmlFor="livingArrangement">
                  {language === 'en' ? 'Living Arrangement' : 'Arreglo de Vivienda'}
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
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {language === 'en' ? 'Medical Information' : 'Información Médica'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="medicalConditions">
                  {language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'}
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
                <Label htmlFor="allergies">
                  {language === 'en' ? 'Allergies' : 'Alergias'}
                </Label>
                <Input 
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'List any allergies you have' 
                    : 'Enumere cualquier alergia que tenga'}
                />
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
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {language === 'en' ? 'Medications' : 'Medicamentos'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="medications">
                  {language === 'en' ? 'Current Medications' : 'Medicamentos Actuales'}
                </Label>
                <Textarea 
                  id="medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'List all medications you are taking' 
                    : 'Enumere todos los medicamentos que está tomando'}
                  className="min-h-24"
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
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {language === 'en' ? 'Emergency Contact' : 'Contacto de Emergencia'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="emergencyContact">
                  {language === 'en' ? 'Emergency Contact Name' : 'Nombre de Contacto de Emergencia'}
                </Label>
                <Input 
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'Name of emergency contact' 
                    : 'Nombre del contacto de emergencia'}
                />
              </div>
              
              <div>
                <Label htmlFor="emergencyPhone">
                  {language === 'en' ? 'Emergency Contact Phone' : 'Teléfono del Contacto de Emergencia'}
                </Label>
                <Input 
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'Phone number of emergency contact' 
                    : 'Número de teléfono del contacto de emergencia'}
                />
              </div>
              
              <div>
                <Label htmlFor="relationship">
                  {language === 'en' ? 'Relationship' : 'Relación'}
                </Label>
                <Input 
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? 'Relationship to emergency contact' 
                    : 'Relación con el contacto de emergencia'}
                />
              </div>
              
              <div>
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
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-grow flex flex-col items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg border-ice-100">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                {language === 'en' 
                  ? 'Complete Your Profile' 
                  : 'Completa Tu Perfil'}
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
