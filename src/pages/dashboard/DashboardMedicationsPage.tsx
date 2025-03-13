
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PillIcon, Plus, Clock, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock medication data
const mockMedications = [
  {
    id: "1",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    time: "8:00, 20:00",
    withFood: true,
    startDate: "2023-01-15",
    endDate: null,
    notes: "Take with meals to reduce stomach upset",
    prescription: {
      doctor: "Dr. Garcia",
      refills: 2,
      lastRefill: "2023-06-10"
    }
  },
  {
    id: "2",
    name: "Atorvastatin",
    dosage: "10mg",
    frequency: "Once daily",
    time: "20:00",
    withFood: false,
    startDate: "2023-02-20",
    endDate: null,
    notes: "Take in the evening",
    prescription: {
      doctor: "Dr. Garcia",
      refills: 1,
      lastRefill: "2023-06-10"
    }
  },
  {
    id: "3",
    name: "Lisinopril",
    dosage: "5mg",
    frequency: "Once daily",
    time: "8:00",
    withFood: false,
    startDate: "2023-03-05",
    endDate: null,
    notes: "Take in the morning",
    prescription: {
      doctor: "Dr. Martinez",
      refills: 3,
      lastRefill: "2023-05-15"
    }
  }
];

const DashboardMedicationsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("current");
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="medications"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-ice-800 mb-2 flex items-center">
                <PillIcon className="h-7 w-7 mr-2 text-ice-600" />
                {language === 'en' ? 'Medications' : 'Medicamentos'}
              </h1>
              <p className="text-ice-700">
                {language === 'en' 
                  ? 'Manage your medications and schedules' 
                  : 'Gestiona tus medicamentos y horarios'}
              </p>
            </div>
            
            <Button className="bg-ice-600 hover:bg-ice-700">
              <Plus className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Next Dose' : 'Próxima Dosis'}
                  </p>
                  <p className="text-xl font-semibold">
                    {language === 'en' ? 'Metformin at 8:00 PM' : 'Metformina a las 20:00'}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Today\'s Doses' : 'Dosis de Hoy'}
                  </p>
                  <p className="text-xl font-semibold">5 / 6</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Refills Needed' : 'Recargas Necesarias'}
                  </p>
                  <p className="text-xl font-semibold">2</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-white border mb-6 p-0 h-auto">
              <TabsTrigger 
                value="current" 
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                {language === 'en' ? 'Current Medications' : 'Medicamentos Actuales'}
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                {language === 'en' ? 'Medication History' : 'Historial de Medicamentos'}
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                {language === 'en' ? 'Daily Schedule' : 'Horario Diario'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Current Medications' : 'Medicamentos Actuales'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMedications.map(med => (
                      <div key={med.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{med.name}</h3>
                          <span className="bg-ice-100 text-ice-800 text-xs px-2 py-1 rounded">
                            {med.dosage}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {language === 'en' ? 'Frequency' : 'Frecuencia'}
                            </p>
                            <p className="text-sm">{med.frequency}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {language === 'en' ? 'Time' : 'Hora'}
                            </p>
                            <p className="text-sm">{med.time}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {language === 'en' ? 'With Food' : 'Con Comida'}
                            </p>
                            <p className="text-sm">
                              {med.withFood 
                                ? (language === 'en' ? 'Yes' : 'Sí') 
                                : (language === 'en' ? 'No' : 'No')}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {language === 'en' ? 'Doctor' : 'Médico'}
                            </p>
                            <p className="text-sm">{med.prescription.doctor}</p>
                          </div>
                        </div>
                        
                        {med.notes && (
                          <div className="border-t pt-2 mt-2">
                            <p className="text-xs text-muted-foreground mb-1">
                              {language === 'en' ? 'Notes' : 'Notas'}
                            </p>
                            <p className="text-sm">{med.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Medication History' : 'Historial de Medicamentos'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    {language === 'en' 
                      ? 'No past medications found' 
                      : 'No se encontraron medicamentos pasados'}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Daily Medication Schedule' : 'Horario Diario de Medicamentos'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="bg-ice-100 text-ice-800 px-3 py-1.5 rounded-full font-medium mr-3">
                          8:00 AM
                        </div>
                        <div>
                          <h4 className="font-medium">Metformin 500mg, Lisinopril 5mg</h4>
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' ? 'Take with breakfast' : 'Tomar con el desayuno'}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Button variant="outline" size="sm" className="mr-2">
                          {language === 'en' ? 'Taken' : 'Tomado'}
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          {language === 'en' ? 'Skip' : 'Omitir'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="bg-ice-100 text-ice-800 px-3 py-1.5 rounded-full font-medium mr-3">
                          8:00 PM
                        </div>
                        <div>
                          <h4 className="font-medium">Metformin 500mg, Atorvastatin 10mg</h4>
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' ? 'Take with dinner' : 'Tomar con la cena'}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Button variant="outline" size="sm" className="mr-2">
                          {language === 'en' ? 'Taken' : 'Tomado'}
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          {language === 'en' ? 'Skip' : 'Omitir'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardMedicationsPage;
