
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const Terms: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>Last updated: June 1, 2024</p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using ICE Alarm España's services, website, and devices (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
              </p>
              
              <h2>2. Description of Services</h2>
              <p>
                ICE Alarm España provides health monitoring and emergency response services through various devices and a digital platform. Our Services include but are not limited to SOS pendants, medical dispensers, glucose monitors, and AI-powered monitoring.
              </p>
              
              <h2>3. User Accounts</h2>
              <p>
                To use certain features of our Services, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
              
              <h2>4. Device Purchase and Subscription</h2>
              <p>
                Our Services involve the purchase of physical devices and subscription to monitoring services. All purchases are subject to our pricing plans and payment terms. Subscription fees are billed in advance on a monthly basis and are non-refundable.
              </p>
              
              <h2>5. Use of Services</h2>
              <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul>
                <li>Use the Services in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of the Services</li>
                <li>Interfere with or disrupt the integrity or performance of the Services</li>
                <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Services</li>
              </ul>
              
              <h2>6. Health Monitoring and Emergencies</h2>
              <p>
                While our Services provide health monitoring and emergency response capabilities, they are not a substitute for professional medical advice, diagnosis, or treatment. In case of a medical emergency, you should always contact emergency services directly.
              </p>
              
              <h2>7. Privacy and Data</h2>
              <p>
                Your use of our Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              
              <h2>8. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Services, including but not limited to text, graphics, logos, icons, and software, are the exclusive property of ICE Alarm España and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              
              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, ICE Alarm España shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or in connection with the Services.
              </p>
              
              <h2>10. Termination</h2>
              <p>
                We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              
              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website.
              </p>
              
              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Spain, without regard to its conflict of law provisions.
              </p>
              
              <h2>13. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                ICE Alarm España<br />
                Email: legal@icealarespana.com<br />
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

export default Terms;
