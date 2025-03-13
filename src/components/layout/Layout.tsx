
import React from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";

// Layout component to wrap content with Navbar and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
};

// Create a separate Footer component export
Layout.Footer = Footer;

export default Layout;
