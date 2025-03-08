
import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    console.log("App component mounted");
    
    // Add additional debugging
    const rootElement = document.getElementById('root');
    console.log("Root element:", rootElement);
    
    const bodyElement = document.body;
    console.log("Body styles:", {
      backgroundColor: window.getComputedStyle(bodyElement).backgroundColor,
      color: window.getComputedStyle(bodyElement).color
    });
  }, []);
  
  return (
    <div className="min-h-screen w-full p-4">
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Hello World</h1>
      </div>
    </div>
  );
}

export default App;
