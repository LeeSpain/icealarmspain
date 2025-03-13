
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  // Direct access function
  const handleDirectAccess = (path: string) => {
    // Create a minimal user object to store
    const devUser = {
      uid: `dev-user-${Date.now()}`,
      id: `dev-user-${Date.now()}`,
      email: `dev@example.com`,
      name: 'Dev User',
      displayName: 'Dev User',
      role: path === '/admin' ? 'admin' : (path === '/call-center' ? 'callcenter' : 'member'),
      status: 'active',
      profileCompleted: true,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    // Store the user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(devUser));
    localStorage.setItem('userRole', devUser.role);
    localStorage.setItem('forceDevMode', 'true');
    
    console.log("Direct access activated for:", path);
    
    // Close the menu
    onClose();
    
    // Navigate directly to the requested dashboard
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      <div className="pt-20 pb-6 px-4 space-y-6">
        <NavLinks onClick={onClose} />
        
        {/* Quick Access Section */}
        <div className="py-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Access</h3>
          <div className="space-y-2">
            <div 
              onClick={() => handleDirectAccess('/admin')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              Admin Dashboard
            </div>
            <div 
              onClick={() => handleDirectAccess('/call-center')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              Call Center
            </div>
            <div 
              onClick={() => handleDirectAccess('/dashboard')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              Member Dashboard
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <LanguageSwitcher />
          <AuthButtons isMobile onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
