
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const VideoTutorials: React.FC = () => {
  const { language } = useLanguage();
  
  const tutorials = {
    en: [
      {
        title: "Getting Started with ICE Alarm",
        description: "A complete walkthrough of setting up your ICE Alarm account and dashboard.",
        videoId: "dQw4w9WgXcQ", // Placeholder - would be replaced with actual videos
        duration: "5:32"
      },
      {
        title: "SOS Pendant Setup Guide",
        description: "How to set up and use your SOS Pendant for emergency situations.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "4:18"
      },
      {
        title: "Glucose Monitor Calibration",
        description: "Step-by-step instructions for calibrating your glucose monitor for accurate readings.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "7:45"
      },
      {
        title: "Managing Health Metrics",
        description: "Learn how to track, analyze and share your health metrics with healthcare providers.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "6:10"
      },
      {
        title: "Using the AI Guardian",
        description: "Get the most out of your AI Guardian assistant for health monitoring and advice.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "3:55"
      },
      {
        title: "Setting Up Emergency Contacts",
        description: "Add and manage your emergency contacts for quick access during emergencies.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "2:40"
      }
    ],
    es: [
      {
        title: "Comenzando con ICE Alarm",
        description: "Una guía completa para configurar su cuenta y panel de ICE Alarm.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "5:32"
      },
      {
        title: "Guía de Configuración del Colgante SOS",
        description: "Cómo configurar y usar su Colgante SOS para situaciones de emergencia.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "4:18"
      },
      {
        title: "Calibración del Monitor de Glucosa",
        description: "Instrucciones paso a paso para calibrar su monitor de glucosa para lecturas precisas.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "7:45"
      },
      {
        title: "Gestión de Métricas de Salud",
        description: "Aprenda a rastrear, analizar y compartir sus métricas de salud con proveedores de atención médica.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "6:10"
      },
      {
        title: "Uso del Guardian AI",
        description: "Aproveche al máximo su asistente Guardian AI para el monitoreo y consejos de salud.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "3:55"
      },
      {
        title: "Configuración de Contactos de Emergencia",
        description: "Añada y gestione sus contactos de emergencia para acceso rápido durante emergencias.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        duration: "2:40"
      }
    ]
  };
  
  const currentTutorials = language === 'en' ? tutorials.en : tutorials.es;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {currentTutorials.map((tutorial, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="relative">
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${tutorial.videoId}?modestbranding=1&rel=0`}
                title={tutorial.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-lg w-full h-full object-cover"
              ></iframe>
            </AspectRatio>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
              {tutorial.duration}
            </div>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{tutorial.title}</CardTitle>
            <CardDescription>{tutorial.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default VideoTutorials;
