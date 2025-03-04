
import React from "react";
import { Users, DollarSign, Briefcase, Building, HeartPulse, Shield } from "lucide-react";

interface PartnershipOptionsProps {
  language: string;
}

const PartnershipOptions: React.FC<PartnershipOptionsProps> = ({ language }) => {
  const partnershipTypes = [
    {
      icon: <Building className="w-10 h-10 text-ice-600" />,
      title: language === 'en' ? 'Healthcare Providers' : 'Proveedores de Salud',
      description: language === 'en'
        ? 'Integrate our AI Guardian system with your healthcare services to provide enhanced monitoring for patients.'
        : 'Integre nuestro sistema AI Guardian con sus servicios de salud para proporcionar un monitoreo mejorado para pacientes.'
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-guardian-600" />,
      title: language === 'en' ? 'Residential Care Facilities' : 'Residencias Asistenciales',
      description: language === 'en'
        ? 'Implement our solution in your care homes to enhance resident safety and monitoring capabilities.'
        : 'Implemente nuestra solución en sus residencias para mejorar la seguridad y las capacidades de monitoreo de los residentes.'
    },
    {
      icon: <Users className="w-10 h-10 text-ice-600" />,
      title: language === 'en' ? 'Insurance Providers' : 'Proveedores de Seguros',
      description: language === 'en'
        ? 'Offer ICE Alarm services as part of your insurance packages to provide additional value to your customers.'
        : 'Ofrezca servicios de ICE Alarm como parte de sus paquetes de seguro para proporcionar valor adicional a sus clientes.'
    },
    {
      icon: <DollarSign className="w-10 h-10 text-guardian-600" />,
      title: language === 'en' ? 'White Label Solutions' : 'Soluciones de Marca Blanca',
      description: language === 'en'
        ? 'License our technology to offer under your own brand, with customization options to fit your business needs.'
        : 'Licencie nuestra tecnología para ofrecerla bajo su propia marca, con opciones de personalización para adaptarse a las necesidades de su negocio.'
    },
    {
      icon: <Briefcase className="w-10 h-10 text-ice-600" />,
      title: language === 'en' ? 'Distribution Partners' : 'Socios de Distribución',
      description: language === 'en'
        ? 'Become an authorized distributor of ICE Alarm products and services across Spain and Europe.'
        : 'Conviértase en un distribuidor autorizado de productos y servicios de ICE Alarm en España y Europa.'
    },
    {
      icon: <Shield className="w-10 h-10 text-guardian-600" />,
      title: language === 'en' ? 'Technology Integration' : 'Integración Tecnológica',
      description: language === 'en'
        ? 'Connect your existing systems with our API to enhance your services with our AI-powered health monitoring.'
        : 'Conecte sus sistemas existentes con nuestra API para mejorar sus servicios con nuestro monitoreo de salud impulsado por IA.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {language === 'en' ? 'Partnership Opportunities' : 'Oportunidades de Colaboración'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'en'
              ? 'Discover ways to collaborate with ICE Alarm España and grow your business with our innovative health monitoring solutions.'
              : 'Descubra formas de colaborar con ICE Alarm España y haga crecer su negocio con nuestras innovadoras soluciones de monitoreo de salud.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnershipTypes.map((type, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 p-3 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-sm inline-block">
                {type.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
              <p className="text-muted-foreground">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipOptions;
