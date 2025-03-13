
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, User, Home, Activity, PillIcon, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const QuestionnairePage: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("personal");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-ice-600" />
            <CardTitle>{language === 'en' ? 'Personal Questionnaire' : 'Cuestionario Personal'}</CardTitle>
          </div>
          <CardDescription>
            {language === 'en' 
              ? 'Complete this questionnaire to help us personalize your care experience.' 
              : 'Complete este cuestionario para ayudarnos a personalizar su experiencia de atención.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="personal" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Personal' : 'Personal'}</span>
              </TabsTrigger>
              <TabsTrigger value="address" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Address' : 'Dirección'}</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Health' : 'Salud'}</span>
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center gap-1">
                <PillIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Medications' : 'Medicamentos'}</span>
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Lifestyle' : 'Estilo de Vida'}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">
                  {language === 'en' ? 'Personal Information' : 'Información Personal'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{language === 'en' ? 'Full Name' : 'Nombre Completo'}</Label>
                      <Input id="fullName" defaultValue="Elena Martinez" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dob">{language === 'en' ? 'Date of Birth' : 'Fecha de Nacimiento'}</Label>
                      <Input id="dob" type="date" defaultValue="1965-07-15" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nationalId">{language === 'en' ? 'National ID / NIE' : 'DNI / NIE'}</Label>
                      <Input id="nationalId" defaultValue="X1234567Z" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{language === 'en' ? 'Phone Number' : 'Número de Teléfono'}</Label>
                      <Input id="phone" defaultValue="+34 612 345 678" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{language === 'en' ? 'Email' : 'Correo Electrónico'}</Label>
                      <Input id="email" type="email" defaultValue="elena@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">{language === 'en' ? 'Preferred Language' : 'Idioma Preferido'}</Label>
                      <select id="language" className="w-full p-2 border rounded-md">
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button onClick={() => setActiveTab("address")}>
                    {language === 'en' ? 'Next: Address' : 'Siguiente: Dirección'}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="address">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">
                  {language === 'en' ? 'Address Information' : 'Información de Dirección'}
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="street">{language === 'en' ? 'Street Address' : 'Dirección'}</Label>
                    <Input id="street" defaultValue="Calle Serrano 123" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">{language === 'en' ? 'City' : 'Ciudad'}</Label>
                      <Input id="city" defaultValue="Madrid" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">{language === 'en' ? 'Postal Code' : 'Código Postal'}</Label>
                      <Input id="postalCode" defaultValue="28006" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="province">{language === 'en' ? 'Province' : 'Provincia'}</Label>
                      <Input id="province" defaultValue="Madrid" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("personal")}>
                    {language === 'en' ? 'Back' : 'Atrás'}
                  </Button>
                  <Button onClick={() => setActiveTab("health")}>
                    {language === 'en' ? 'Next: Health' : 'Siguiente: Salud'}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="health">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">
                  {language === 'en' ? 'Health Information' : 'Información de Salud'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">{language === 'en' ? 'Blood Type' : 'Grupo Sanguíneo'}</Label>
                      <select id="bloodType" className="w-full p-2 border rounded-md">
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="conditions">{language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'}</Label>
                      <textarea
                        id="conditions"
                        className="w-full p-2 border rounded-md min-h-[100px]"
                        defaultValue="Diabetes Type 2, Hypertension"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="allergies">{language === 'en' ? 'Allergies' : 'Alergias'}</Label>
                      <textarea
                        id="allergies"
                        className="w-full p-2 border rounded-md min-h-[100px]"
                        defaultValue="Penicillin"
                      ></textarea>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Mobility Status' : 'Estado de Movilidad'}</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <input type="radio" id="mobility-independent" name="mobility" defaultChecked />
                          <Label htmlFor="mobility-independent">
                            {language === 'en' ? 'Independent' : 'Independiente'}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="mobility-cane" name="mobility" />
                          <Label htmlFor="mobility-cane">
                            {language === 'en' ? 'Uses Cane' : 'Usa Bastón'}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="mobility-walker" name="mobility" />
                          <Label htmlFor="mobility-walker">
                            {language === 'en' ? 'Uses Walker' : 'Usa Andador'}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="mobility-wheelchair" name="mobility" />
                          <Label htmlFor="mobility-wheelchair">
                            {language === 'en' ? 'Wheelchair' : 'Silla de Ruedas'}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("address")}>
                    {language === 'en' ? 'Back' : 'Atrás'}
                  </Button>
                  <Button onClick={() => setActiveTab("medications")}>
                    {language === 'en' ? 'Next: Medications' : 'Siguiente: Medicamentos'}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medications">
              {/* Medications tab content */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">
                  {language === 'en' ? 'Medication Information' : 'Información de Medicamentos'}
                </h3>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">
                    {language === 'en' ? 'Current Medications' : 'Medicamentos Actuales'}
                  </h4>
                  
                  {/* Mock medication entries */}
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <div className="font-medium">Metformin</div>
                        <div className="text-sm bg-ice-100 text-ice-800 px-2 py-0.5 rounded">
                          {language === 'en' ? 'Active' : 'Activo'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">500mg, twice daily</div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <div className="font-medium">Lisinopril</div>
                        <div className="text-sm bg-ice-100 text-ice-800 px-2 py-0.5 rounded">
                          {language === 'en' ? 'Active' : 'Activo'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">10mg, once daily</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-4">
                    {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("health")}>
                    {language === 'en' ? 'Back' : 'Atrás'}
                  </Button>
                  <Button onClick={() => setActiveTab("lifestyle")}>
                    {language === 'en' ? 'Next: Lifestyle' : 'Siguiente: Estilo de Vida'}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="lifestyle">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">
                  {language === 'en' ? 'Lifestyle Information' : 'Información de Estilo de Vida'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Living Situation' : 'Situación de Vivienda'}</Label>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <input type="radio" id="living-alone" name="living" defaultChecked />
                          <Label htmlFor="living-alone">
                            {language === 'en' ? 'Lives Alone' : 'Vive Solo'}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="living-partner" name="living" />
                          <Label htmlFor="living-partner">
                            {language === 'en' ? 'Lives with Partner' : 'Vive con Pareja'}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="living-family" name="living" />
                          <Label htmlFor="living-family">
                            {language === 'en' ? 'Lives with Family' : 'Vive con Familia'}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="living-caregiver" name="living" />
                          <Label htmlFor="living-caregiver">
                            {language === 'en' ? 'Lives with Caregiver' : 'Vive con Cuidador'}
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Diet Restrictions' : 'Restricciones Dietéticas'}</Label>
                      <textarea
                        className="w-full p-2 border rounded-md min-h-[100px]"
                        defaultValue="Low sodium, diabetic diet"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Activity Level' : 'Nivel de Actividad'}</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <input type="radio" id="activity-sedentary" name="activity" defaultChecked />
                          <Label htmlFor="activity-sedentary">
                            {language === 'en' ? 'Sedentary' : 'Sedentario'}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="activity-light" name="activity" />
                          <Label htmlFor="activity-light">
                            {language === 'en' ? 'Light' : 'Ligero'}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="activity-moderate" name="activity" />
                          <Label htmlFor="activity-moderate">
                            {language === 'en' ? 'Moderate' : 'Moderado'}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="activity-active" name="activity" />
                          <Label htmlFor="activity-active">
                            {language === 'en' ? 'Active' : 'Activo'}
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Hobbies & Interests' : 'Pasatiempos e Intereses'}</Label>
                      <textarea
                        className="w-full p-2 border rounded-md min-h-[100px]"
                        defaultValue="Reading, gardening, playing cards"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("medications")}>
                    {language === 'en' ? 'Back' : 'Atrás'}
                  </Button>
                  <Button>
                    {language === 'en' ? 'Submit Questionnaire' : 'Enviar Cuestionario'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionnairePage;
