
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();
  
  // Try to get auth context, but handle the case when it's not available
  let updateProfile = null;
  let user = null;
  
  try {
    // Dynamically import and use auth only if the component is mounted within AuthProvider
    const { useAuth } = require('@/context/AuthContext');
    try {
      const auth = useAuth();
      user = auth?.user;
      updateProfile = auth?.updateProfile;
    } catch (error) {
      console.log("Auth context not available in LanguageSwitcher, using local storage only");
    }
  } catch (error) {
    console.log("Auth module could not be imported in LanguageSwitcher");
  }
  
  const handleLanguageChange = async (newLanguage: 'en' | 'es') => {
    // Update the language context
    setLanguage(newLanguage);
    
    // If user is authenticated and updateProfile is available, store language preference in their profile
    if (user && updateProfile) {
      try {
        await updateProfile({ language: newLanguage });
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
