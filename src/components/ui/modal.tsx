
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  variant?: 'default' | 'destructive' | 'success';
}

export const Modal: React.FC<ModalProps> = ({ 
  isVisible, 
  title, 
  message, 
  onClose,
  variant = 'default'
}) => {
  if (!isVisible) return null;

  // Set colors based on variant
  const headerClasses = {
    default: 'bg-blue-100 text-blue-800',
    destructive: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800'
  }[variant];

  const iconClasses = {
    default: 'text-blue-500',
    destructive: 'text-red-500',
    success: 'text-green-500'
  }[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
        <div className={`px-6 py-4 flex justify-between items-center ${headerClasses}`}>
          <h3 className="font-semibold text-lg">{title}</h3>
          <button 
            onClick={onClose}
            className={`${iconClasses} hover:bg-opacity-20 hover:bg-gray-200 p-1 rounded-full`}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-gray-700">{message}</p>
        </div>
        
        <div className="px-6 py-3 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
