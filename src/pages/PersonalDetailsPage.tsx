
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberSidebar from "@/components/member/MemberSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { MultiEntry } from "@/components/questionnaire/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalTab from "@/components/personal-details/PersonalTab";
import EmergencyContactsTab from "@/components/personal-details/EmergencyContactsTab";
import MedicalConditionsTab from "@/components/personal-details/MedicalConditionsTab";
import MedicationsTab from "@/components/personal-details/MedicationsTab";
import DoctorsTab from "@/components/personal-details/DoctorsTab";
import ContactsTab from "@/components/personal-details/ContactsTab";
import LoadingState from "@/components/personal-details/LoadingState";
import { Save } from "lucide-react";

const PersonalDetailsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State for form data related to questionnaire answers
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [multiEntryData, setMultiEntryData] = useState<Record<string, MultiEntry[]>>({});
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user's questionnaire data (simulated for now)
  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    // For now, we'll simulate some delay and pre-populated data
    setTimeout(() => {
      const mockData = {
        name: user?.name || "John Doe",
        email: user?.email || "john.doe@example.com",
        phone: "+34 612 345 678",
        address: "Calle Mayor 123, Madrid, Spain",
        dateOfBirth: "1975-05-12",
        language: user?.language || "en",
        emergency_contacts: [
          { _id: "ec1", name: "Jane Doe", relationship: "Spouse", phone: "+34 612 987 654" },
          { _id: "ec2", name: "Robert Smith", relationship: "Son", phone: "+34 612 876 543" }
        ],
        medications: [
          { _id: "med1", name: "Metformin", dosage: "500mg", frequency: "Twice daily", purpose: "Diabetes" },
          { _id: "med2", name: "Lisinopril", dosage: "10mg", frequency: "Once daily", purpose: "Blood Pressure" }
        ],
        medical_conditions: [
          { _id: "mc1", condition: "Type 2 Diabetes", diagnosedYear: "2015", severity: "Moderate", treatment: "Medication and diet" },
          { _id: "mc2", condition: "Hypertension", diagnosedYear: "2018", severity: "Mild", treatment: "Medication" }
        ],
        allergies: [
          { _id: "al1", allergen: "Penicillin", reaction: "Rash", severity: "Moderate" }
        ],
        doctors: [
          { _id: "doc1", name: "Dr. Maria Garcia", specialty: "Primary Care", phone: "+34 912 345 678", address: "Centro Médico San Juan, Madrid" }
        ]
      };
      
      // Split data between regular fields and multi-entry fields
      const regular: Record<string, any> = {};
      const multiEntry: Record<string, MultiEntry[]> = {};
      
      Object.entries(mockData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          multiEntry[key] = value;
        } else {
          regular[key] = value;
        }
      });
      
      setFormData(regular);
      setMultiEntryData(multiEntry);
      setIsLoading(false);
    }, 1000);
  }, [user]);
  
  // Handle input changes for regular form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle adding a new empty entry to a multi-entry field
  const handleAddEntry = (field: string, template: object) => {
    const newEntry = { 
      ...template, 
      _id: `${field}-${Date.now()}` 
    };
    
    setMultiEntryData({
      ...multiEntryData,
      [field]: [...(multiEntryData[field] || []), newEntry]
    });
  };
  
  // Handle removing an entry from a multi-entry field
  const handleRemoveEntry = (field: string, entryId: string) => {
    setMultiEntryData({
      ...multiEntryData,
      [field]: multiEntryData[field].filter(entry => entry._id !== entryId)
    });
  };
  
  // Handle input changes for multi-entry fields
  const handleMultiEntryChange = (field: string, entryId: string, key: string, value: string) => {
    setMultiEntryData({
      ...multiEntryData,
      [field]: multiEntryData[field].map(entry => 
        entry._id === entryId ? { ...entry, [key]: value } : entry
      )
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save this data to your backend
    console.log("Saving data:", { ...formData, ...multiEntryData });
    
    toast.success(
      language === 'en' 
        ? "Personal details updated successfully!" 
        : "¡Datos personales actualizados con éxito!"
    );
  };
  
  if (isLoading) {
    return <LoadingState sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} language={language} />;
  }
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="onboarding"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Personal Details' : 'Datos Personales'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'View and manage all your personal and medical information' 
                : 'Ver y gestionar toda su información personal y médica'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <TabsTrigger value="personal" className="flex items-center gap-1">
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Personal' : 'Personal'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="emergency" className="flex items-center gap-1">
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Emergency' : 'Emergencia'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="medical" className="flex items-center gap-1">
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Medical' : 'Médico'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="medications" className="flex items-center gap-1">
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Medications' : 'Medicamentos'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="doctors" className="flex items-center gap-1">
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Doctors' : 'Médicos'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-1">
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Contacts' : 'Contactos'}
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <PersonalTab 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  language={language} 
                />
              </TabsContent>
              
              <TabsContent value="emergency">
                <EmergencyContactsTab 
                  contacts={multiEntryData.emergency_contacts || []}
                  onAddContact={() => handleAddEntry('emergency_contacts', { name: '', relationship: '', phone: '' })}
                  onRemoveContact={(id) => handleRemoveEntry('emergency_contacts', id)}
                  onContactChange={handleMultiEntryChange}
                  language={language}
                />
              </TabsContent>
              
              <TabsContent value="medical">
                <MedicalConditionsTab 
                  conditions={multiEntryData.medical_conditions || []}
                  allergies={multiEntryData.allergies || []}
                  onAddCondition={() => handleAddEntry('medical_conditions', { condition: '', diagnosedYear: '', severity: '', treatment: '' })}
                  onRemoveCondition={(id) => handleRemoveEntry('medical_conditions', id)}
                  onConditionChange={handleMultiEntryChange}
                  onAddAllergy={() => handleAddEntry('allergies', { allergen: '', reaction: '', severity: '' })}
                  onRemoveAllergy={(id) => handleRemoveEntry('allergies', id)}
                  onAllergyChange={handleMultiEntryChange}
                  language={language}
                />
              </TabsContent>
              
              <TabsContent value="medications">
                <MedicationsTab 
                  medications={multiEntryData.medications || []}
                  onAddMedication={() => handleAddEntry('medications', { name: '', dosage: '', frequency: '', purpose: '' })}
                  onRemoveMedication={(id) => handleRemoveEntry('medications', id)}
                  onMedicationChange={handleMultiEntryChange}
                  language={language}
                />
              </TabsContent>
              
              <TabsContent value="doctors">
                <DoctorsTab 
                  doctors={multiEntryData.doctors || []}
                  onAddDoctor={() => handleAddEntry('doctors', { name: '', specialty: '', phone: '', address: '' })}
                  onRemoveDoctor={(id) => handleRemoveEntry('doctors', id)}
                  onDoctorChange={handleMultiEntryChange}
                  language={language}
                />
              </TabsContent>
              
              <TabsContent value="contacts">
                <ContactsTab language={language} />
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 flex justify-end">
              <Button type="submit" className="bg-ice-600 hover:bg-ice-700">
                <Save className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Save All Changes' : 'Guardar Todos los Cambios'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
