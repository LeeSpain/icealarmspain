
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Simple header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold">Ice Guardian Alert</div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/products" className="hover:underline">Products</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Simple footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ice Guardian Alert. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
