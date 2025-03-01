
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Globe size={16} className="text-muted-foreground" />
      <div className="flex text-sm font-medium">
        <button
          onClick={() => setLanguage('en')}
          className={cn(
            "px-2 py-1 rounded-l-md transition-colors",
            language === 'en' 
              ? "bg-ice-500 text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={cn(
            "px-2 py-1 rounded-r-md transition-colors",
            language === 'es' 
              ? "bg-ice-500 text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          ES
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
