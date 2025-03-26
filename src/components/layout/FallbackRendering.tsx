
import React, { useEffect, useState } from 'react';

interface Props {
  fallbackTimeout?: number;
}

const FallbackRendering: React.FC<Props> = ({ fallbackTimeout = 10000 }) => {
  const [showFallback, setShowFallback] = useState(false);
  
  useEffect(() => {
    // Show fallback content if the app hasn't rendered properly after timeout
    const timer = setTimeout(() => {
      const appContent = document.querySelector('.App');
      const rootElement = document.getElementById('root');
      
      if (!appContent || (rootElement && rootElement.children.length <= 1)) {
        setShowFallback(true);
        console.error('Rendering fallback content due to slow or failed app initialization');
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
    </div>
  );
};

export default FallbackRendering;
