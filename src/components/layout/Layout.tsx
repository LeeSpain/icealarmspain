
import React from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";

// Layout component to wrap content with Navbar and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  console.log("Layout component rendering");
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
