
import React, { useEffect, useState } from 'react';

const EnhancedDebug = () => {
  const [domInfo, setDomInfo] = useState({
    rootExists: false,
    appExists: false,
    bodyChildCount: 0,
    rootChildCount: 0
  });
  
  useEffect(() => {
    console.log("EnhancedDebug component mounted");
    
    // Gather DOM information
    const gatherInfo = () => {
      const root = document.getElementById('root');
      const app = document.querySelector('.App');
      
      setDomInfo({
        rootExists: !!root,
        appExists: !!app,
        bodyChildCount: document.body?.children.length || 0,
        rootChildCount: root?.children.length || 0
      });
    };
    
    // Initial check
    gatherInfo();
    
    // Set up periodic checks
    const interval = setInterval(gatherInfo, 1000);
    
    // Clean up on unmount
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed bottom-0 right-0 bg-black bg-opacity-80 text-white p-4 z-50 font-mono text-sm">
      <h3 className="font-bold mb-2">Rendering Diagnostics</h3>
      <ul>
        <li>Root element: {domInfo.rootExists ? '✅' : '❌'}</li>
        <li>App component: {domInfo.appExists ? '✅' : '❌'}</li>
        <li>Body children: {domInfo.bodyChildCount}</li>
        <li>Root children: {domInfo.rootChildCount}</li>
      </ul>
      <div className="mt-3">
        <button 
          onClick={() => window.location.reload()} 
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Reload
        </button>
        <button 
          onClick={() => document.body.innerHTML = '<div class="p-4"><h1>Manual Recovery</h1><p>The app has been reset to recover from a rendering issue.</p><button onclick="window.location.reload()" class="px-3 py-1 bg-blue-500 text-white rounded">Try Again</button></div>'} 
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Emergency Reset
        </button>
      </div>
    </div>
  );
};

export default EnhancedDebug;
