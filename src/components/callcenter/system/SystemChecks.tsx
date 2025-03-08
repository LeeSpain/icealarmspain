
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SystemChecks = () => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<{system: string, status: string}[]>([]);
  
  const runCheck = () => {
    setRunning(true);
    setResults([]);
    
    // Mock system check
    setTimeout(() => {
      setResults([
        { system: "Client Database", status: "Operational" },
        { system: "Device Monitoring", status: "Operational" },
        { system: "Alert System", status: "Operational" },
        { system: "Chat Service", status: "Operational" },
        { system: "SOS Alert Service", status: "Operational" },
        { system: "Medical Dispenser Monitoring", status: "Operational" },
        { system: "Glucose Monitor Readings", status: "Operational" }
      ]);
      setRunning(false);
      toast.success("All systems operational");
    }, 2000);
  };
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">System Health Check</h2>
            <button 
              onClick={runCheck}
              disabled={running}
              className="px-4 py-2 bg-ice-600 text-white rounded hover:bg-ice-700 disabled:opacity-50 flex items-center"
            >
              {running ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running Check...
                </>
              ) : "Run System Check"}
            </button>
          </div>
          
          {results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      System
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.system}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : running ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
              <p className="text-ice-700">Running system checks...</p>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Click "Run System Check" to verify all systems are operational
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemChecks;
