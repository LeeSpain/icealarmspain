
import React, { useState, useEffect } from 'react';

interface DebugInfo {
  environment: string;
  loadingStages: Record<string, boolean>;
  renderingStages: Record<string, boolean>;
  firebaseConfig: {
    available: boolean;
    projectId?: string;
  };
  domStats: {
    rootChildren: number;
    bodyChildren: number;
    rootVisible: boolean;
  };
}

const DebugPanel: React.FC = () => {
  const [info, setInfo] = useState<DebugInfo>({
    environment: import.meta.env.MODE || 'unknown',
    loadingStages: window.loadingStages || {},
    renderingStages: window.renderingStages || {},
    firebaseConfig: {
      available: false
    },
    domStats: {
      rootChildren: 0,
      bodyChildren: 0,
      rootVisible: false
    }
  });
  
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Check if Firebase config is available
    const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    const firebaseProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    
    // Update DOM stats
    const rootElement = document.getElementById('root');
    const rootChildren = rootElement ? rootElement.children.length : 0;
    const bodyChildren = document.body ? document.body.children.length : 0;
    const rootVisible = rootElement ? 
      window.getComputedStyle(rootElement).display !== 'none' : false;
    
    setInfo({
      ...info,
      firebaseConfig: {
        available: !!firebaseApiKey && !!firebaseProjectId,
        projectId: firebaseProjectId
      },
      domStats: {
        rootChildren,
        bodyChildren,
        rootVisible
      }
    });
    
    // Update regularly
    const interval = setInterval(() => {
      setInfo(prev => ({
        ...prev,
        loadingStages: window.loadingStages || {},
        renderingStages: window.renderingStages || {},
        domStats: {
          rootChildren: document.getElementById('root')?.children.length || 0,
          bodyChildren: document.body?.children.length || 0,
          rootVisible: document.getElementById('root') ? 
            window.getComputedStyle(document.getElementById('root')!).display !== 'none' : false
        }
      }));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!visible) {
    return (
      <button 
        onClick={() => setVisible(true)}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          zIndex: 9999,
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '5px 10px',
          cursor: 'pointer'
        }}
      >
        Show Debug
      </button>
    );
  }
  
  return (
    <div className="debug-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <h4>Debug Info</h4>
        <button 
          onClick={() => setVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Hide
        </button>
      </div>
      <pre>
{`Environment: ${info.environment}
Firebase: ${info.firebaseConfig.available ? `Available (${info.firebaseConfig.projectId})` : 'Not configured'}

Loading Stages:
${Object.entries(info.loadingStages)
  .map(([key, value]) => `  ${key}: ${value}`)
  .join('\n')}

Rendering Stages:
${Object.entries(info.renderingStages)
  .map(([key, value]) => `  ${key}: ${value}`)
  .join('\n')}

DOM Stats:
  Root children: ${info.domStats.rootChildren}
  Body children: ${info.domStats.bodyChildren}
  Root visible: ${info.domStats.rootVisible}
`}
      </pre>
    </div>
  );
};

export default DebugPanel;
