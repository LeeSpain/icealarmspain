
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Handle escape key to close menu
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    // Add outside click handler
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };
    
    // Focus trap
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleTabKey);
    
    // Lock body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Focus first element when opened
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [isOpen]);
  
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
    <div 
      className="fixed inset-0 z-50 bg-white md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      ref={menuRef}
    >
      <div className="relative h-full overflow-auto">
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-700"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="pt-20 pb-6 px-4 space-y-6">
          <NavLinks onClick={onClose} />
          
          {/* Quick Access Section */}
          <div className="py-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Access</h3>
            <div className="space-y-2">
              <div 
                onClick={() => handleDirectAccess('/admin')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDirectAccess('/admin');
                  }
                }}
              >
                Admin Dashboard
              </div>
              <div 
                onClick={() => handleDirectAccess('/call-center')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDirectAccess('/call-center');
                  }
                }}
              >
                Call Center
              </div>
              <div 
                onClick={() => handleDirectAccess('/dashboard')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDirectAccess('/dashboard');
                  }
                }}
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
    </div>
  );
};

export default MobileMenu;
