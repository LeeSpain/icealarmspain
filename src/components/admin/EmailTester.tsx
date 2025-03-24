
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendNotificationEmail } from "@/services/emailService";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const EmailTester: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email.trim() || !title.trim() || !message.trim()) {
      toast({
        title: language === 'en' ? "Validation Error" : "Error de Validación",
        description: language === 'en' 
          ? "Please fill in all fields" 
          : "Por favor, complete todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      const { error } = await sendNotificationEmail(email, title, message);
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? "Email Sent" : "Correo Enviado",
        description: language === 'en' 
          ? `Test notification sent to ${email}` 
          : `Notificación de prueba enviada a ${email}`,
      });
      
      // Clear form
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Error sending test email:", error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en' 
          ? "Failed to send test email. Please try again." 
          : "No se pudo enviar el correo de prueba. Inténtelo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? "Test Email Notifications" : "Probar Notificaciones por Correo"}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? "Send a test notification email to any email address" 
            : "Enviar un correo de notificación de prueba a cualquier dirección de correo"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              {language === 'en' ? "Recipient Email" : "Correo del Destinatario"}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'en' ? "Enter email address" : "Ingrese dirección de correo"}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">
              {language === 'en' ? "Notification Title" : "Título de la Notificación"}
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={language === 'en' ? "Enter notification title" : "Ingrese título de la notificación"}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">
              {language === 'en' ? "Message" : "Mensaje"}
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={language === 'en' 
                ? "Enter notification message" 
                : "Ingrese mensaje de la notificación"}
              rows={5}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === 'en' ? "Sending..." : "Enviando..."}
              </>
            ) : (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                {language === 'en' ? "Send Test Notification" : "Enviar Notificación de Prueba"}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailTester;
