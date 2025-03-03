
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberSidebar from "@/components/member/MemberSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Question, MultiEntry } from "@/components/questionnaire/types";
import { QuestionData } from "@/components/questionnaire/QuestionData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Save, Trash2, User, Phone, Pill, UserCog, HeartPulse, Users } from "lucide-react";

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
    return (
      <div className="flex h-screen bg-ice-50/30">
        <MemberSidebar 
          activePage="onboarding"
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
            <p className="text-ice-700">
              {language === 'en' ? 'Loading your personal details...' : 'Cargando sus datos personales...'}
            </p>
          </div>
        </div>
      </div>
    );
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
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Personal' : 'Personal'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="emergency" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Emergency' : 'Emergencia'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="medical" className="flex items-center gap-1">
                  <HeartPulse className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Medical' : 'Médico'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="medications" className="flex items-center gap-1">
                  <Pill className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Medications' : 'Medicamentos'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="doctors" className="flex items-center gap-1">
                  <UserCog className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Doctors' : 'Médicos'}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Contacts' : 'Contactos'}
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-6">
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
              </TabsContent>
              
              <TabsContent value="emergency" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>
                        {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'en' 
                          ? 'People to contact in case of emergency' 
                          : 'Personas a contactar en caso de emergencia'}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddEntry('emergency_contacts', { name: '', relationship: '', phone: '' })}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Add Contact' : 'Añadir Contacto'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {multiEntryData.emergency_contacts?.length > 0 ? (
                      multiEntryData.emergency_contacts.map((contact) => (
                        <div key={contact._id} className="border rounded-md p-4 mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium">
                              {contact.name || (language === 'en' ? 'New Contact' : 'Nuevo Contacto')}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveEntry('emergency_contacts', contact._id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Name' : 'Nombre'}
                              </Label>
                              <Input
                                value={contact.name || ''}
                                onChange={(e) => handleMultiEntryChange('emergency_contacts', contact._id, 'name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Relationship' : 'Relación'}
                              </Label>
                              <Input
                                value={contact.relationship || ''}
                                onChange={(e) => handleMultiEntryChange('emergency_contacts', contact._id, 'relationship', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Phone' : 'Teléfono'}
                              </Label>
                              <Input
                                value={contact.phone || ''}
                                onChange={(e) => handleMultiEntryChange('emergency_contacts', contact._id, 'phone', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        {language === 'en' 
                          ? 'No emergency contacts added yet. Add your first contact using the button above.' 
                          : 'Aún no se han añadido contactos de emergencia. Añada su primer contacto usando el botón de arriba.'}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medical" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>
                        {language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'en' 
                          ? 'Your health conditions and diagnoses' 
                          : 'Sus condiciones de salud y diagnósticos'}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddEntry('medical_conditions', { condition: '', diagnosedYear: '', severity: '', treatment: '' })}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Add Condition' : 'Añadir Condición'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {multiEntryData.medical_conditions?.length > 0 ? (
                      multiEntryData.medical_conditions.map((condition) => (
                        <div key={condition._id} className="border rounded-md p-4 mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium">
                              {condition.condition || (language === 'en' ? 'New Condition' : 'Nueva Condición')}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveEntry('medical_conditions', condition._id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Condition' : 'Condición'}
                              </Label>
                              <Input
                                value={condition.condition || ''}
                                onChange={(e) => handleMultiEntryChange('medical_conditions', condition._id, 'condition', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Year Diagnosed' : 'Año de Diagnóstico'}
                              </Label>
                              <Input
                                value={condition.diagnosedYear || ''}
                                onChange={(e) => handleMultiEntryChange('medical_conditions', condition._id, 'diagnosedYear', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Severity' : 'Gravedad'}
                              </Label>
                              <Input
                                value={condition.severity || ''}
                                onChange={(e) => handleMultiEntryChange('medical_conditions', condition._id, 'severity', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Treatment' : 'Tratamiento'}
                              </Label>
                              <Input
                                value={condition.treatment || ''}
                                onChange={(e) => handleMultiEntryChange('medical_conditions', condition._id, 'treatment', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        {language === 'en' 
                          ? 'No medical conditions added yet.' 
                          : 'Aún no se han añadido condiciones médicas.'}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>
                        {language === 'en' ? 'Allergies' : 'Alergias'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'en' 
                          ? 'Your allergies and adverse reactions' 
                          : 'Sus alergias y reacciones adversas'}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddEntry('allergies', { allergen: '', reaction: '', severity: '' })}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Add Allergy' : 'Añadir Alergia'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {multiEntryData.allergies?.length > 0 ? (
                      multiEntryData.allergies.map((allergy) => (
                        <div key={allergy._id} className="border rounded-md p-4 mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium">
                              {allergy.allergen || (language === 'en' ? 'New Allergy' : 'Nueva Alergia')}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveEntry('allergies', allergy._id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Allergen' : 'Alérgeno'}
                              </Label>
                              <Input
                                value={allergy.allergen || ''}
                                onChange={(e) => handleMultiEntryChange('allergies', allergy._id, 'allergen', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Reaction' : 'Reacción'}
                              </Label>
                              <Input
                                value={allergy.reaction || ''}
                                onChange={(e) => handleMultiEntryChange('allergies', allergy._id, 'reaction', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Severity' : 'Gravedad'}
                              </Label>
                              <Input
                                value={allergy.severity || ''}
                                onChange={(e) => handleMultiEntryChange('allergies', allergy._id, 'severity', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        {language === 'en' 
                          ? 'No allergies added yet.' 
                          : 'Aún no se han añadido alergias.'}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medications" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>
                        {language === 'en' ? 'Medications' : 'Medicamentos'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'en' 
                          ? 'Your current medications and supplements' 
                          : 'Sus medicamentos y suplementos actuales'}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddEntry('medications', { name: '', dosage: '', frequency: '', purpose: '' })}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {multiEntryData.medications?.length > 0 ? (
                      multiEntryData.medications.map((medication) => (
                        <div key={medication._id} className="border rounded-md p-4 mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium">
                              {medication.name || (language === 'en' ? 'New Medication' : 'Nuevo Medicamento')}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveEntry('medications', medication._id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Name' : 'Nombre'}
                              </Label>
                              <Input
                                value={medication.name || ''}
                                onChange={(e) => handleMultiEntryChange('medications', medication._id, 'name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Dosage' : 'Dosis'}
                              </Label>
                              <Input
                                value={medication.dosage || ''}
                                onChange={(e) => handleMultiEntryChange('medications', medication._id, 'dosage', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Frequency' : 'Frecuencia'}
                              </Label>
                              <Input
                                value={medication.frequency || ''}
                                onChange={(e) => handleMultiEntryChange('medications', medication._id, 'frequency', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Purpose' : 'Propósito'}
                              </Label>
                              <Input
                                value={medication.purpose || ''}
                                onChange={(e) => handleMultiEntryChange('medications', medication._id, 'purpose', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        {language === 'en' 
                          ? 'No medications added yet.' 
                          : 'Aún no se han añadido medicamentos.'}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="doctors" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>
                        {language === 'en' ? 'Doctors & Healthcare Providers' : 'Médicos y Proveedores de Salud'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'en' 
                          ? 'Your healthcare team and their contact information' 
                          : 'Su equipo médico y su información de contacto'}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddEntry('doctors', { name: '', specialty: '', phone: '', address: '' })}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Add Doctor' : 'Añadir Médico'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {multiEntryData.doctors?.length > 0 ? (
                      multiEntryData.doctors.map((doctor) => (
                        <div key={doctor._id} className="border rounded-md p-4 mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium">
                              {doctor.name || (language === 'en' ? 'New Doctor' : 'Nuevo Médico')}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveEntry('doctors', doctor._id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Name' : 'Nombre'}
                              </Label>
                              <Input
                                value={doctor.name || ''}
                                onChange={(e) => handleMultiEntryChange('doctors', doctor._id, 'name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Specialty' : 'Especialidad'}
                              </Label>
                              <Input
                                value={doctor.specialty || ''}
                                onChange={(e) => handleMultiEntryChange('doctors', doctor._id, 'specialty', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Phone' : 'Teléfono'}
                              </Label>
                              <Input
                                value={doctor.phone || ''}
                                onChange={(e) => handleMultiEntryChange('doctors', doctor._id, 'phone', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>
                                {language === 'en' ? 'Address' : 'Dirección'}
                              </Label>
                              <Input
                                value={doctor.address || ''}
                                onChange={(e) => handleMultiEntryChange('doctors', doctor._id, 'address', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        {language === 'en' 
                          ? 'No healthcare providers added yet.' 
                          : 'Aún no se han añadido proveedores de salud.'}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contacts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Additional Contacts' : 'Contactos Adicionales'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Other important contacts (not for emergencies)' 
                        : 'Otros contactos importantes (no para emergencias)'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6 text-muted-foreground">
                      {language === 'en' 
                        ? 'This section will be implemented soon.' 
                        : 'Esta sección se implementará pronto.'}
                    </div>
                  </CardContent>
                </Card>
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
