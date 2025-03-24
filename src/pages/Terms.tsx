import React from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/context/LanguageContext";

const Terms: React.FC = () => {
  const { language } = useLanguage();
  
  // Replace t() usage
  const pageTitle = language === 'en' ? 'Terms of Service' : 'Términos de Servicio';

  return (
    <Layout>
      <title>{`ICE Alarm - ${pageTitle}`}</title>
      <meta
        name="description"
        content={
          language === 'en'
            ? "Read the terms and conditions for using ICE Alarm's services."
            : "Lee los términos y condiciones para usar los servicios de ICE Alarm."
        }
      />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">{pageTitle}</h1>
        
        <div className="prose max-w-none">
          {language === 'en' ? (
            <>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using ICE Alarm, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
              
              <h2>2. Description of Service</h2>
              <p>
                ICE Alarm provides health monitoring and emergency response services.
                We offer various devices and subscription plans to meet your needs.
              </p>
              
              <h2>3. User Responsibilities</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account
                and for all activities that occur under your account.
              </p>
              
              <h2>4. Payment and Subscription</h2>
              <p>
                Subscription fees are billed in advance and are non-refundable.
                You can cancel your subscription at any time.
              </p>
              
              <h2>5. Limitation of Liability</h2>
              <p>
                ICE Alarm is not liable for any direct, indirect, incidental, or consequential
                damages resulting from the use of our services.
              </p>
              
              <h2>6. Governing Law</h2>
              <p>
                These Terms of Service are governed by the laws of Spain.
              </p>
            </>
          ) : (
            <>
              <h2>1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar ICE Alarm, aceptas estar sujeto a estos Términos de Servicio.
                Si no estás de acuerdo con estos términos, por favor no utilices nuestros servicios.
              </p>
              
              <h2>2. Descripción del Servicio</h2>
              <p>
                ICE Alarm proporciona servicios de monitoreo de salud y respuesta de emergencia.
                Ofrecemos varios dispositivos y planes de suscripción para satisfacer tus necesidades.
              </p>
              
              <h2>3. Responsabilidades del Usuario</h2>
              <p>
                Eres responsable de mantener la confidencialidad de tu cuenta
                y de todas las actividades que ocurran bajo tu cuenta.
              </p>
              
              <h2>4. Pago y Suscripción</h2>
              <p>
                Las tarifas de suscripción se facturan por adelantado y no son reembolsables.
                Puedes cancelar tu suscripción en cualquier momento.
              </p>
              
              <h2>5. Limitación de Responsabilidad</h2>
              <p>
                ICE Alarm no es responsable de ningún daño directo, indirecto, incidental o consecuente
                que resulte del uso de nuestros servicios.
              </p>
              
              <h2>6. Ley Aplicable</h2>
              <p>
                Estos Términos de Servicio se rigen por las leyes de España.
              </p>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Terms;
