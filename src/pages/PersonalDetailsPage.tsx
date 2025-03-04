import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from '@/components/common/PageHeader';
import PersonalInfoForm from "@/components/personal-details/PersonalInfoForm";
import AddressForm from "@/components/personal-details/AddressForm";
import MedicalInfoForm from "@/components/personal-details/MedicalInfoForm";
import EmergencyContactsForm from "@/components/personal-details/EmergencyContactsForm";

const PersonalDetailsPage: React.FC = () => {
  const { language } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-ice-50/30">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title={language === 'en' ? "Personal Details" : "Datos Personales"}
            subtitle={language === 'en' 
              ? "Manage your personal information for emergency services."
              : "Gestiona tu información personal para los servicios de emergencia."}
          />
          
          <Card className="mt-8">
            <Tabs defaultValue={activeTab} className="flex flex-col h-full">
              <TabsList className="flex-none">
                <TabsTrigger value="personal">{language === 'en' ? "Personal Info" : "Información Personal"}</TabsTrigger>
                <TabsTrigger value="address">{language === 'en' ? "Address" : "Dirección"}</TabsTrigger>
                <TabsTrigger value="medical">{language === 'en' ? "Medical Info" : "Información Médica"}</TabsTrigger>
                <TabsTrigger value="emergency">{language === 'en' ? "Emergency Contacts" : "Contactos de Emergencia"}</TabsTrigger>
              </TabsList>
              <CardContent className="flex-grow p-6">
                <TabsContent value="personal">
                  <PersonalInfoForm />
                </TabsContent>
                <TabsContent value="address">
                  <AddressForm />
                </TabsContent>
                <TabsContent value="medical">
                  <MedicalInfoForm />
                </TabsContent>
                <TabsContent value="emergency">
                  <EmergencyContactsForm />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default PersonalDetailsPage;
