
import React, { useState } from "react";
import { useAuth } from "@/context/auth";
import { ToastContainer } from "react-toastify";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PillIcon, Clock, Calendar, Plus, Check, AlertCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardMedicationsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const { language } = useLanguage();
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="medications"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 w-full">
          <ToastContainer />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'en' ? 'Medications' : 'Medicamentos'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage your medications and view your schedule' 
                : 'Gestione sus medicamentos y vea su horario'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  {language === 'en' ? 'Next Medication' : 'Próximo Medicamento'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <PillIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Metformin 500mg</p>
                      <p className="text-sm text-muted-foreground">2 pills with meal</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {language === 'en' ? 'Time' : 'Hora'}
                    </p>
                    <p className="text-sm">2:00 PM <span className="text-xs text-muted-foreground">
                      (in 35 minutes)
                    </span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-500" />
                  {language === 'en' ? 'Today\'s Schedule' : 'Horario de Hoy'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Total Doses' : 'Dosis Totales'}
                  </span>
                  <span className="text-sm">6 {language === 'en' ? 'doses' : 'dosis'}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Completed' : 'Completadas'}
                  </span>
                  <span className="text-sm">3/6</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PillIcon className="w-5 h-5 mr-2 text-purple-500" />
                  {language === 'en' ? 'Medication Stats' : 'Estadísticas de Medicamentos'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Adherence' : 'Adherencia'}
                  </span>
                  <span className="text-sm">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '96%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'This Week' : 'Esta Semana'}
                  </span>
                  <span className="inline-flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      {language === 'en' ? 'On track' : 'En camino'}
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="schedule" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="schedule">
                  {language === 'en' ? 'Schedule' : 'Horario'}
                </TabsTrigger>
                <TabsTrigger value="medications">
                  {language === 'en' ? 'Medications' : 'Medicamentos'}
                </TabsTrigger>
                <TabsTrigger value="history">
                  {language === 'en' ? 'History' : 'Historial'}
                </TabsTrigger>
              </TabsList>
              
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
              </Button>
            </div>
            
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {language === 'en' ? 'Today\'s Schedule' : 'Horario de Hoy'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {language === 'en' ? 'MORNING' : 'MAÑANA'}
                      </h3>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center bg-green-50">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Lisinopril 10mg
                            </h4>
                            <p className="text-sm text-muted-foreground">1 pill</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">8:00 AM</p>
                          <p className="text-xs text-green-600">
                            {language === 'en' ? 'Taken' : 'Tomado'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center bg-green-50">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Metformin 500mg
                            </h4>
                            <p className="text-sm text-muted-foreground">2 pills with breakfast</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">8:00 AM</p>
                          <p className="text-xs text-green-600">
                            {language === 'en' ? 'Taken' : 'Tomado'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {language === 'en' ? 'AFTERNOON' : 'TARDE'}
                      </h3>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center bg-green-50">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Vitamin D3 1000IU
                            </h4>
                            <p className="text-sm text-muted-foreground">1 pill with lunch</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">12:00 PM</p>
                          <p className="text-xs text-green-600">
                            {language === 'en' ? 'Taken' : 'Tomado'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center bg-blue-50">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Clock className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Metformin 500mg
                            </h4>
                            <p className="text-sm text-muted-foreground">2 pills with meal</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">2:00 PM</p>
                          <p className="text-xs text-blue-600">
                            {language === 'en' ? 'Due soon' : 'Próximamente'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {language === 'en' ? 'EVENING' : 'NOCHE'}
                      </h3>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <HelpCircle className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Atorvastatin 20mg
                            </h4>
                            <p className="text-sm text-muted-foreground">1 pill at bedtime</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">9:00 PM</p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Upcoming' : 'Próximo'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <HelpCircle className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Metformin 500mg
                            </h4>
                            <p className="text-sm text-muted-foreground">2 pills with dinner</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">7:00 PM</p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Upcoming' : 'Próximo'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PillIcon className="h-5 w-5 mr-2" />
                    {language === 'en' ? 'My Medications' : 'Mis Medicamentos'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-lg">Metformin 500mg</h3>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' ? 'For diabetes type 2' : 'Para diabetes tipo 2'}
                            </p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {language === 'en' ? 'Active' : 'Activo'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Dosage' : 'Dosis'}
                            </p>
                            <p>2 pills, three times daily</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Prescription' : 'Receta'}
                            </p>
                            <p>Dr. Martinez - 10/05/2023</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Schedule' : 'Horario'}
                            </p>
                            <p>8:00 AM, 2:00 PM, 7:00 PM</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Refill Date' : 'Fecha de Recarga'}
                            </p>
                            <p>11/15/2023</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-lg">Lisinopril 10mg</h3>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' ? 'For blood pressure' : 'Para la presión arterial'}
                            </p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {language === 'en' ? 'Active' : 'Activo'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Dosage' : 'Dosis'}
                            </p>
                            <p>1 pill, once daily</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Prescription' : 'Receta'}
                            </p>
                            <p>Dr. Martinez - 10/05/2023</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Schedule' : 'Horario'}
                            </p>
                            <p>8:00 AM</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Refill Date' : 'Fecha de Recarga'}
                            </p>
                            <p>11/20/2023</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-lg">Atorvastatin 20mg</h3>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' ? 'For cholesterol' : 'Para el colesterol'}
                            </p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {language === 'en' ? 'Active' : 'Activo'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Dosage' : 'Dosis'}
                            </p>
                            <p>1 pill, once daily at bedtime</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Prescription' : 'Receta'}
                            </p>
                            <p>Dr. Martinez - 10/05/2023</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Schedule' : 'Horario'}
                            </p>
                            <p>9:00 PM</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {language === 'en' ? 'Refill Date' : 'Fecha de Recarga'}
                            </p>
                            <p>11/25/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {language === 'en' ? 'Medication History' : 'Historial de Medicamentos'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        {language === 'en' 
                          ? 'Medication adherence chart will appear here' 
                          : 'El gráfico de adherencia a medicamentos aparecerá aquí'}
                      </p>
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
