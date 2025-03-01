
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>Last updated: June 1, 2024</p>
              
              <h2>1. Introduction</h2>
              <p>
                ICE Alarm España ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our health monitoring services and devices.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, postal address, phone number, date of birth, and emergency contact information.</li>
                <li><strong>Health Data:</strong> Information collected through our devices such as glucose levels, medication schedules, and emergency alerts.</li>
                <li><strong>Device Information:</strong> Information about the devices you use to access our services, including hardware models and operating systems.</li>
                <li><strong>Usage Data:</strong> Information about how you use our services and interact with our devices.</li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Monitor and respond to health emergencies</li>
                <li>Send notifications and alerts related to your health</li>
                <li>Communicate with you about your account and our services</li>
                <li>Analyze usage patterns to improve our devices and services</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2>4. Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li><strong>Emergency Services:</strong> In case of a health emergency, we may share your information with emergency responders.</li>
                <li><strong>Family Members:</strong> With your consent, we may share your health data with designated family members or caregivers.</li>
                <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf.</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety.</li>
              </ul>
              
              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
              </p>
              
              <h2>6. Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul>
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
              </ul>
              
              <h2>7. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 16. We do not knowingly collect personal information from children under 16.
              </p>
              
              <h2>8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              
              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                ICE Alarm España<br />
                Email: privacy@icealarespana.com<br />
                Phone: +34 951 123 456<br />
                Address: Calle Ejemplo 123, 29001 Málaga, Spain
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
