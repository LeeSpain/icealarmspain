
import React, { Suspense } from 'react';
import './App.css';
import BasicDebug from './components/debug/BasicDebug';

function App() {
  console.log("App rendering - debugging blank screen");
  return (
    <div className="App bg-white">
      <BasicDebug />
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-black">Hello World</h1>
      </div>
    </div>
  );
}

export default App;
