
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Home, Mail, Shield, UserCog, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfilePage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Mock profile data
  const [formData, setFormData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+34 612 345 678",
    address: "Calle Mayor 123, Madrid, Spain",
    emergency_contact: "Jane Doe (+34 612 987 654)",
    language_preference: language === 'en' ? "English" : "Español"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      language === 'en' 
        ? "Profile information updated!" 
        : "¡Información de perfil actualizada!"
    );
  };
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="profile"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Profile Settings' : 'Configuración del Perfil'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Manage your account information and preferences' 
                : 'Gestiona la información y preferencias de tu cuenta'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Personal Information' : 'Información Personal'}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Update your personal details and contact information' 
                      : 'Actualiza tus datos personales e información de contacto'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {language === 'en' ? 'Full Name' : 'Nombre Completo'}
                        </Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={formData.name} 
                          onChange={handleChange}
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
                          value={formData.email} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                        </Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={formData.phone} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">
                          {language === 'en' ? 'Address' : 'Dirección'}
                        </Label>
                        <Input 
                          id="address" 
                          name="address"
                          value={formData.address} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergency_contact">
                          {language === 'en' ? 'Emergency Contact' : 'Contacto de Emergencia'}
                        </Label>
                        <Input 
                          id="emergency_contact" 
                          name="emergency_contact"
                          value={formData.emergency_contact} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="language_preference">
                          {language === 'en' ? 'Language Preference' : 'Preferencia de Idioma'}
                        </Label>
                        <Input 
                          id="language_preference" 
                          name="language_preference"
                          value={formData.language_preference} 
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-ice-600 hover:bg-ice-700">
                        {language === 'en' ? 'Save Changes' : 'Guardar Cambios'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <UserCog className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Account Settings' : 'Configuración de Cuenta'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Key size={18} className="text-ice-500" />
                    <div>
                      <h3 className="font-medium text-sm">
                        {language === 'en' ? 'Change Password' : 'Cambiar Contraseña'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' 
                          ? 'Update your account password' 
                          : 'Actualiza la contraseña de tu cuenta'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-ice-500" />
                    <div>
                      <h3 className="font-medium text-sm">
                        {language === 'en' ? 'Email Notifications' : 'Notificaciones por Email'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' 
                          ? 'Manage your email preferences' 
                          : 'Administra tus preferencias de email'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-ice-500" />
                    <div>
                      <h3 className="font-medium text-sm">
                        {language === 'en' ? 'SMS Notifications' : 'Notificaciones SMS'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' 
                          ? 'Manage your SMS preferences' 
                          : 'Administra tus preferencias de SMS'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Privacy & Security' : 'Privacidad y Seguridad'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Key size={18} className="text-ice-500" />
                    <div>
                      <h3 className="font-medium text-sm">
                        {language === 'en' ? 'Two-Factor Authentication' : 'Autenticación de Dos Factores'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' 
                          ? 'Add an extra layer of security' 
                          : 'Añade una capa extra de seguridad'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Home size={18} className="text-ice-500" />
                    <div>
                      <h3 className="font-medium text-sm">
                        {language === 'en' ? 'Devices & Sessions' : 'Dispositivos y Sesiones'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' 
                          ? 'Manage devices logged in to your account' 
                          : 'Administra los dispositivos conectados a tu cuenta'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-ice-500" />
                    <div>
                      <h3 className="font-medium text-sm">
                        {language === 'en' ? 'Privacy Settings' : 'Configuración de Privacidad'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' 
                          ? 'Control how your data is used' 
                          : 'Controla cómo se usa tu información'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
