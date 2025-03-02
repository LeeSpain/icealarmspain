
import React from 'react';

const TestComponent: React.FC = () => {
  console.log('TestComponent rendering');
  
  return (
    <div className="p-8 m-8 bg-blue-100 text-center">
      <h1 className="text-2xl font-bold">Test Component</h1>
      <p>If you can see this, React is rendering components correctly.</p>
    </div>
  );
};

export default TestComponent;
