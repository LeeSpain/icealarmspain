
import React, { useEffect, useState } from "react";
import { getUserEmailLogs } from "@/services/emailService";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

const EmailLogs: React.FC = () => {
  const { language } = useLanguage();
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await getUserEmailLogs();
      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error("Error fetching email logs:", error);
      setError(language === 'en' 
        ? "Failed to load email logs. Please try again." 
        : "Error al cargar los registros de correo electrónico. Por favor, inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-ice-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-md">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchLogs} 
          className="mt-2 px-4 py-2 bg-ice-600 text-white rounded hover:bg-ice-700"
        >
          {language === 'en' ? "Try Again" : "Intentar de nuevo"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {language === 'en' ? "Email Communication Logs" : "Registros de Comunicación por Correo"}
        </h2>
        <button 
          onClick={fetchLogs} 
          className="px-4 py-2 bg-ice-600 text-white rounded hover:bg-ice-700"
        >
          {language === 'en' ? "Refresh" : "Actualizar"}
        </button>
      </div>
      
      {logs.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-8 rounded-md text-center">
          <p className="text-gray-600">
            {language === 'en' 
              ? "No email logs found." 
              : "No se encontraron registros de correo."}
          </p>
        </div>
      ) : (
        <Table>
          <TableCaption>
            {language === 'en' 
              ? "Email communication history" 
              : "Historial de comunicación por correo"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'en' ? "Date" : "Fecha"}</TableHead>
              <TableHead>{language === 'en' ? "Recipient" : "Destinatario"}</TableHead>
              <TableHead>{language === 'en' ? "Subject" : "Asunto"}</TableHead>
              <TableHead>{language === 'en' ? "Type" : "Tipo"}</TableHead>
              <TableHead>{language === 'en' ? "Status" : "Estado"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{format(new Date(log.created_at), 'PPp')}</TableCell>
                <TableCell>{log.recipient}</TableCell>
                <TableCell>{log.subject}</TableCell>
                <TableCell>
                  <Badge variant={log.email_type === 'welcome' ? "secondary" : "default"}>
                    {log.email_type === 'welcome' 
                      ? (language === 'en' ? "Welcome" : "Bienvenida") 
                      : log.email_type === 'notification' 
                        ? (language === 'en' ? "Notification" : "Notificación")
                        : (language === 'en' ? "General" : "General")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={log.status === 'sent' ? "outline" : "destructive"}>
                    {log.status === 'sent' 
                      ? (language === 'en' ? "Sent" : "Enviado") 
                      : (language === 'en' ? "Failed" : "Fallido")}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default EmailLogs;
