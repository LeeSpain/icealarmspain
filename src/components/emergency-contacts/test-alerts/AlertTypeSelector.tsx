
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Shield, HeartPulse, Activity, AlertTriangle } from 'lucide-react';
import { AlertType } from '../types';

interface AlertTypeSelectorProps {
  selectedAlertType: AlertType;
  onAlertTypeChange: (value: string) => void;
}

const AlertTypeSelector: React.FC<AlertTypeSelectorProps> = ({
  selectedAlertType,
  onAlertTypeChange,
}) => {
  const { language } = useLanguage();

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">
        {language === 'en' ? 'Alert Type' : 'Tipo de Alerta'}
      </h3>
      <RadioGroup 
        defaultValue="emergency" 
        value={selectedAlertType}
        onValueChange={onAlertTypeChange}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="emergency" id="emergency" />
          <Label htmlFor="emergency" className="flex items-center cursor-pointer">
            <Shield className="h-5 w-5 mr-2 text-red-500" />
            {language === 'en' ? 'Emergency' : 'Emergencia'}
          </Label>
        </div>
        <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="medical" id="medical" />
          <Label htmlFor="medical" className="flex items-center cursor-pointer">
            <HeartPulse className="h-5 w-5 mr-2 text-pink-500" />
            {language === 'en' ? 'Medical' : 'Médica'}
          </Label>
        </div>
        <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="activity" id="activity" />
          <Label htmlFor="activity" className="flex items-center cursor-pointer">
            <Activity className="h-5 w-5 mr-2 text-blue-500" />
            {language === 'en' ? 'Activity' : 'Actividad'}
          </Label>
        </div>
        <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all" className="flex items-center cursor-pointer">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            {language === 'en' ? 'All Types' : 'Todos los Tipos'}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default AlertTypeSelector;
