import React from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";

const Privacy: React.FC = () => {
  const { language } = useLanguage();
  
  // Replace t() usage
  const pageTitle = language === 'en' ? 'Privacy Policy' : 'Política de Privacidad';

  return (
    <Layout>
      <Helmet>
        <title>ICE Alarm - {pageTitle}</title>
        <meta 
          name="description" 
          content={language === 'en' 
            ? "ICE Alarm España privacy policy. Learn how we collect, use, and protect your personal information."
            : "Política de privacidad de ICE Alarm España. Conozca cómo recopilamos, utilizamos y protegemos su información personal."
          } 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {pageTitle}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          {language === 'en' ? (
            <>
              <h2>Introduction</h2>
              <p>
                At ICE Alarm España, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our emergency response and health monitoring services.
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to us when you register for our services, express interest in obtaining information about us or our products, or otherwise contact us.
              </p>
              <p>
                The personal information we collect may include:
              </p>
              <ul>
                <li>Name, email address, phone number, and mailing address</li>
                <li>Health information relevant to emergency response</li>
                <li>Emergency contact information</li>
                <li>Billing and payment information</li>
                <li>Device location data (when using our emergency services)</li>
              </ul>
              
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, operate, and maintain our services</li>
                <li>Respond to emergencies and coordinate with emergency services</li>
                <li>Improve, personalize, and expand our services</li>
                <li>Understand and analyze how you use our services</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you about our services, updates, and other information</li>
                <li>Process your transactions and manage your account</li>
                <li>Find and prevent fraud</li>
              </ul>
              
              <h2>Sharing Your Information</h2>
              <p>
                We may share your information with:
              </p>
              <ul>
                <li>Emergency services and healthcare providers in the event of an emergency</li>
                <li>Your designated emergency contacts</li>
                <li>Service providers who perform services on our behalf</li>
                <li>Legal and regulatory authorities, as required by applicable law</li>
              </ul>
              
              <h2>Data Security</h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
              </p>
              
              <h2>Your Rights</h2>
              <p>
                Under the General Data Protection Regulation (GDPR) and other applicable data protection laws, you have certain rights regarding your personal data, including:
              </p>
              <ul>
                <li>Right to access your personal data</li>
                <li>Right to rectify inaccurate personal data</li>
                <li>Right to erasure of your personal data</li>
                <li>Right to restrict processing of your personal data</li>
                <li>Right to data portability</li>
                <li>Right to object to processing of your personal data</li>
              </ul>
              
              <h2>Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p>
                ICE Alarm España<br />
                Email: privacy@icealarm.es<br />
                Phone: +34 900 123 456<br />
                Address: Calle Principal 123, 28001 Madrid, Spain
              </p>
            </>
          ) : (
            <>
              <h2>Introducción</h2>
              <p>
                En ICE Alarm España, nos tomamos su privacidad muy en serio. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos su información cuando visita nuestro sitio web o utiliza nuestros servicios de respuesta a emergencias y monitoreo de salud.
              </p>
              
              <h2>Información que Recopilamos</h2>
              <p>
                Recopilamos información personal que usted nos proporciona voluntariamente cuando se registra para nuestros servicios, expresa interés en obtener información sobre nosotros o nuestros productos, o se pone en contacto con nosotros.
              </p>
              <p>
                La información personal que recopilamos puede incluir:
              </p>
              <ul>
                <li>Nombre, dirección de correo electrónico, número de teléfono y dirección postal</li>
                <li>Información de salud relevante para la respuesta a emergencias</li>
                <li>Información de contactos de emergencia</li>
                <li>Información de facturación y pago</li>
                <li>Datos de ubicación del dispositivo (cuando utiliza nuestros servicios de emergencia)</li>
              </ul>
              
              <h2>Cómo Utilizamos su Información</h2>
              <p>
                Utilizamos la información que recopilamos para:
              </p>
              <ul>
                <li>Proporcionar, operar y mantener nuestros servicios</li>
                <li>Responder a emergencias y coordinar con los servicios de emergencia</li>
                <li>Mejorar, personalizar y ampliar nuestros servicios</li>
                <li>Entender y analizar cómo utiliza nuestros servicios</li>
                <li>Desarrollar nuevos productos, servicios, características y funcionalidades</li>
                <li>Comunicarnos con usted sobre nuestros servicios, actualizaciones y otra información</li>
                <li>Procesar sus transacciones y gestionar su cuenta</li>
                <li>Detectar y prevenir fraudes</li>
              </ul>
              
              <h2>Compartiendo su Información</h2>
              <p>
                Podemos compartir su información con:
              </p>
              <ul>
                <li>Servicios de emergencia y proveedores de atención médica en caso de emergencia</li>
                <li>Sus contactos de emergencia designados</li>
                <li>Proveedores de servicios que realizan servicios en nuestro nombre</li>
                <li>Autoridades legales y reguladoras, según lo requiera la ley aplicable</li>
              </ul>
              
              <h2>Seguridad de Datos</h2>
              <p>
                Hemos implementado medidas de seguridad técnicas y organizativas apropiadas diseñadas para proteger la seguridad de cualquier información personal que procesamos. Sin embargo, recuerde también que no podemos garantizar que Internet sea 100% seguro.
              </p>
              
              <h2>Sus Derechos</h2>
              <p>
                Bajo el Reglamento General de Protección de Datos (RGPD) y otras leyes de protección de datos aplicables, tiene ciertos derechos con respecto a sus datos personales, incluyendo:
              </p>
              <ul>
                <li>Derecho a acceder a sus datos personales</li>
                <li>Derecho a rectificar datos personales inexactos</li>
                <li>Derecho a la supresión de sus datos personales</li>
                <li>Derecho a restringir el procesamiento de sus datos personales</li>
                <li>Derecho a la portabilidad de datos</li>
                <li>Derecho a oponerse al procesamiento de sus datos personales</li>
              </ul>
              
              <h2>Contáctenos</h2>
              <p>
                Si tiene preguntas o comentarios sobre esta Política de Privacidad, contáctenos en:
              </p>
              <p>
                ICE Alarm España<br />
                Correo electrónico: privacidad@icealarm.es<br />
                Teléfono: +34 900 123 456<br />
                Dirección: Calle Principal 123, 28001 Madrid, España
              </p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
