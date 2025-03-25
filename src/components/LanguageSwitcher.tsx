
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth'; // Updated to use the new auth implementation

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();
  const { user, updateUserProfile } = useAuth();
  
  const handleLanguageChange = async (newLanguage: 'en' | 'es') => {
    // Update the language context
    setLanguage(newLanguage);
    
    // If user is authenticated, store language preference in their profile
    if (user) {
      try {
        await updateUserProfile(user.displayName || '');
        // We don't update language directly in profile as our auth implementation
        // doesn't directly support this yet - this is handled via local storage
      } catch (error) {
        console.error('Error updating language preference:', error);
      }
    }
  };
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Globe size={16} className="text-muted-foreground" />
      <div className="flex text-sm font-medium">
        <button
          onClick={() => handleLanguageChange('en')}
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
          onClick={() => handleLanguageChange('es')}
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
