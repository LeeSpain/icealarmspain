
import React, { useState } from 'react';
import { getEnvironmentDiagnostics } from '@/utils/environment';

interface DeploymentDebuggerProps {
  visible?: boolean;
}

const DeploymentDebugger: React.FC<DeploymentDebuggerProps> = ({ visible = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const diagnostics = getEnvironmentDiagnostics();

  if (!visible && !isExpanded) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-amber-100 border border-amber-200 text-amber-900 px-3 py-1 rounded-md text-sm font-medium shadow-sm hover:bg-amber-200"
        >
          Debug Info
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-md border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Deployment Diagnostics</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Environment:</span>
              <span>{diagnostics.environment}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Development:</span>
              <span>{diagnostics.isDevelopment ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Production:</span>
              <span>{diagnostics.isProduction ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Firebase Config:</span>
              <span className={diagnostics.hasValidFirebaseConfig ? 'text-green-600' : 'text-red-600'}>
                {diagnostics.hasValidFirebaseConfig ? 'Valid' : 'Invalid/Missing'}
              </span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <details className="text-xs">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                Technical Details
              </summary>
              <pre className="mt-2 bg-gray-50 p-2 rounded-md overflow-auto max-h-40">
                {JSON.stringify(diagnostics, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentDebugger;
