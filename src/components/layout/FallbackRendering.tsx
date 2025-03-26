
import React, { useEffect, useState } from 'react';

interface Props {
  fallbackTimeout?: number;
}

const FallbackRendering: React.FC<Props> = ({ fallbackTimeout = 10000 }) => {
  const [showFallback, setShowFallback] = useState(false);
  
  useEffect(() => {
    console.log("FallbackRendering component mounted, setting timeout", fallbackTimeout);
    
    // Show fallback content if the app hasn't rendered properly after timeout
    const timer = setTimeout(() => {
      // Check if app has meaningful content
      const appContent = document.querySelector('.App');
      const rootElement = document.getElementById('root');
      
      console.log("FallbackRendering timeout reached, checking content", {
        appContentFound: !!appContent,
        rootElementFound: !!rootElement,
        rootChildrenCount: rootElement ? rootElement.children.length : 0,
        appContentChildren: appContent ? appContent.children.length : 0,
        isReactInitialized: !!(window as any).renderingStages?.rootCreated,
        appLoaded: !!(window as any).appLoaded
      });
      
      // Only show fallback if all these conditions suggest the app hasn't rendered
      const appNotRendered = (
        !appContent || 
        !rootElement || 
        rootElement.children.length === 0 || 
        (appContent && appContent.children.length === 0) ||
        document.body.innerHTML.includes('Loading application content...')
      );
      
      // Check if the app has explicitly marked itself as loaded
      const appExplicitlyLoaded = (window as any).appLoaded === true || 
                                 (window as any).renderingStages?.appRendered === true;
      
      // Only show fallback if app is clearly not rendered AND not explicitly marked as loaded
      if (appNotRendered && !appExplicitlyLoaded) {
        console.error('Rendering fallback content due to slow or failed app initialization');
        setShowFallback(true);
      } else {
        console.log('App appears to be loaded correctly, not showing fallback');
      }
    }, fallbackTimeout);
    
    return () => clearTimeout(timer);
  }, [fallbackTimeout]);
  
  if (!showFallback) {
    return null;
  }
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>Ice Guardian Alert</h1>
      <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
        We're experiencing difficulties loading the application content.
      </p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Troubleshooting:</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>Check your internet connection</li>
          <li>Try disabling browser extensions</li>
          <li>Clear your browser cache</li>
          <li>Try a different browser</li>
        </ul>
      </div>
      
      <button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Refresh Page
      </button>
      
      {/* Additional technical details for debugging */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid #eaeaea', paddingTop: '1rem', width: '100%', maxWidth: '500px' }}>
        <h4>Debug Info</h4>
        <button 
          onClick={() => {
            const debugPanel = document.querySelector('.debug-panel');
            if (debugPanel) {
              (debugPanel as HTMLElement).style.display = 'block';
            }
          }}
          style={{
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            marginBottom: '10px'
          }}
        >
          Show Debug Panel
        </button>
        <div style={{ fontSize: '12px', fontFamily: 'monospace', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          <p>App Start: {(window as any).appStarted ? 'Yes' : 'No'}</p>
          <p>App Loaded: {(window as any).appLoaded ? 'Yes' : 'No'}</p>
          <p>React Initialized: {(window as any).renderingStages?.rootCreated ? 'Yes' : 'No'}</p>
          <p>App Rendered: {(window as any).renderingStages?.appRendered ? 'Yes' : 'No'}</p>
          <p>DOM Root Found: {document.getElementById('root') ? 'Yes' : 'No'}</p>
          <p>DOM Root Children: {document.getElementById('root')?.children.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default FallbackRendering;
