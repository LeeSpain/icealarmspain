
import React from "react";
import ContactSupport from "./contact-support/ContactSupport";

// This is a wrapper component that re-exports the refactored ContactSupport
// to maintain backward compatibility
const ContactSupportWrapper: React.FC = () => {
  return <ContactSupport />;
};

export default ContactSupportWrapper;
