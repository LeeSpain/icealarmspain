
import React from "react";
import NavbarContainer from "./navbar/NavbarContainer";

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm">
      <NavbarContainer />
    </header>
  );
};

export default Navbar;
