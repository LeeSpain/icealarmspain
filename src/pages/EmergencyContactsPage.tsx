
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from '@/components/common/PageHeader';
import LoadingState from "@/components/emergency-contacts/LoadingState";
import EmergencyContactsTabs from "@/components/emergency-contacts/EmergencyContactsTabs";
import { useEmergencyContactsManager } from "@/hooks/useEmergencyContactsManager";

const EmergencyContactsPage: React.FC = () => {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const {
    contacts,
    isLoading,
    selectedContactId,
    setSelectedContactId,
    lastTestResult,
    testInProgress,
    handleAddContact,
    handleUpdateContact,
    handleDeleteContact,
    handleTestAlert
  } = useEmergencyContactsManager();

  // If user is not authenticated, show a loading state until auth is checked
  if (!isAuthenticated) {
    return (
      <LoadingState message={language === 'en' ? 'Checking authentication...' : 'Verificando autenticación...'} />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title={language === 'en' ? "Emergency Contacts" : "Contactos de Emergencia"}
            subtitle={language === 'en' 
              ? "Manage your emergency contacts and test the alert system."
              : "Gestiona tus contactos de emergencia y prueba el sistema de alertas."}
          />
          
          <div className="mt-8">
            <EmergencyContactsTabs 
              contacts={contacts}
              isLoading={isLoading}
              selectedContactId={selectedContactId}
              onSelectContact={setSelectedContactId}
              lastTestResult={lastTestResult}
              testInProgress={testInProgress}
              onAddContact={handleAddContact}
              onUpdateContact={handleUpdateContact}
              onDeleteContact={handleDeleteContact}
              onTestAlert={handleTestAlert}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmergencyContactsPage;
