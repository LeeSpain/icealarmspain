
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface DeviceRegistrationFormProps {
  deviceType: string;
}

const DeviceRegistrationForm: React.FC<DeviceRegistrationFormProps> = ({ deviceType }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    notes: "",
    enableAlerts: true,
    alertRecipients: "primary"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      enableAlerts: checked
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const content = {
    en: {
      nameLabel: "Device Name",
      namePlaceholder: `My ${deviceType.charAt(0).toUpperCase() + deviceType.slice(1).replace(/-/g, ' ')}`,
      locationLabel: "Device Location",
      locationPlaceholder: "Living Room, Bedroom, etc.",
      notesLabel: "Additional Notes (Optional)",
      notesPlaceholder: "Any special instructions or information about this device",
      alertsLabel: "Enable Emergency Alerts",
      recipientsLabel: "Alert Recipients",
      recipients: [
        { value: "primary", label: "Primary Contact Only" },
        { value: "all", label: "All Emergency Contacts" },
        { value: "custom", label: "Custom Selection" }
      ]
    },
    es: {
      nameLabel: "Nombre del Dispositivo",
      namePlaceholder: `Mi ${deviceType.charAt(0).toUpperCase() + deviceType.slice(1).replace(/-/g, ' ')}`,
      locationLabel: "Ubicación del Dispositivo",
      locationPlaceholder: "Sala de estar, Dormitorio, etc.",
      notesLabel: "Notas Adicionales (Opcional)",
      notesPlaceholder: "Cualquier instrucción especial o información sobre este dispositivo",
      alertsLabel: "Habilitar Alertas de Emergencia",
      recipientsLabel: "Destinatarios de Alertas",
      recipients: [
        { value: "primary", label: "Solo Contacto Principal" },
        { value: "all", label: "Todos los Contactos de Emergencia" },
        { value: "custom", label: "Selección Personalizada" }
      ]
    }
  };
  
  const ct = language === 'en' ? content.en : content.es;
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="device-name">{ct.nameLabel}</Label>
        <Input
          id="device-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={ct.namePlaceholder}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="device-location">{ct.locationLabel}</Label>
        <Input
          id="device-location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder={ct.locationPlaceholder}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="device-notes">{ct.notesLabel}</Label>
        <Textarea
          id="device-notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder={ct.notesPlaceholder}
          rows={3}
        />
      </div>
      
      <div className="flex items-center justify-between py-2">
        <Label htmlFor="enable-alerts" className="cursor-pointer">
          {ct.alertsLabel}
        </Label>
        <Switch
          id="enable-alerts"
          checked={formData.enableAlerts}
          onCheckedChange={handleSwitchChange}
        />
      </div>
      
      {formData.enableAlerts && (
        <div className="space-y-2">
          <Label htmlFor="alert-recipients">{ct.recipientsLabel}</Label>
          <Select
            value={formData.alertRecipients}
            onValueChange={(value) => handleSelectChange("alertRecipients", value)}
          >
            <SelectTrigger id="alert-recipients">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ct.recipients.map((recipient, index) => (
                <SelectItem key={index} value={recipient.value}>
                  {recipient.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default DeviceRegistrationForm;
