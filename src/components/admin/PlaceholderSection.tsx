
import React from 'react';
import { FileText, Settings, AlertTriangle } from 'lucide-react';

export interface PlaceholderSectionProps {
  title: string;
  description: string;
  section?: string;
  onAction?: (action: string) => void;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ 
  title, 
  description, 
  section,
  onAction 
}) => {
  // Trigger an action when component loads
  React.useEffect(() => {
    if (onAction) {
      onAction(`Viewed ${title} section`);
    }
  }, [title, onAction]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-ice-100 p-4 rounded-full">
            <Settings className="h-12 w-12 text-ice-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">{title}</h1>
        <p className="text-center text-gray-600 mb-6">{description}</p>
        
        <div className="bg-ice-50 border border-ice-100 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
            <p className="text-sm text-gray-700">
              This section is currently in development. Full functionality will be available in the next update.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-6 w-full max-w-lg">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-ice-500 mr-2" />
              <h3 className="font-medium text-gray-800">Coming Features</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 pl-2">
              <li>Comprehensive management dashboard</li>
              <li>Real-time data visualization</li>
              <li>Advanced filtering and searching</li>
              <li>Export and reporting capabilities</li>
              <li>Batch operations and automation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderSection;
