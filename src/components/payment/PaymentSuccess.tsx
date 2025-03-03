
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { CheckCircle2, Home, FileText, Truck } from "lucide-react";

interface PaymentSuccessProps {
  result: {
    success: boolean;
    orderId: string;
    orderDate: string;
    amount: number;
    last4: string;
  };
  orderData: any;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ result, orderData }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const formattedDate = new Date(result.orderDate).toLocaleDateString(
    language === 'en' ? 'en-US' : 'es-ES',
    { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  );
  
  return (
    <Card className="max-w-3xl mx-auto border-t-4 border-green-500">
      <CardHeader className="text-center">
        <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle className="text-2xl">
          {language === 'en' ? "Payment Successful!" : "¡Pago Exitoso!"}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? "Your order has been placed and payment was processed successfully." 
            : "Tu pedido ha sido realizado y el pago ha sido procesado con éxito."}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="border rounded-lg p-4 bg-ice-50/50">
          <h3 className="font-medium mb-2 text-lg">
            {language === 'en' ? "Order Details" : "Detalles del Pedido"}
          </h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'en' ? "Order ID:" : "ID de Pedido:"}
              </span>
              <span className="font-medium">{result.orderId}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'en' ? "Date:" : "Fecha:"}
              </span>
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'en' ? "Payment Method:" : "Método de Pago:"}
              </span>
              <span>
                {language === 'en' ? "Card ending in " : "Tarjeta terminada en "}
                {result.last4}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'en' ? "Total Amount:" : "Monto Total:"}
              </span>
              <span className="font-bold">€{result.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 border bg-white">
          <h3 className="font-medium mb-3 text-lg">
            {language === 'en' ? "What Happens Next?" : "¿Qué Sucede Ahora?"}
          </h3>
          
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-ice-100 rounded-full h-7 w-7 flex items-center justify-center mt-0.5">
                <span className="text-ice-700 font-medium">1</span>
              </div>
              <div>
                <p className="font-medium">
                  {language === 'en' ? "Order Confirmation Email" : "Email de Confirmación del Pedido"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? "You will receive an order confirmation email with details of your purchase." 
                    : "Recibirás un email de confirmación con los detalles de tu compra."}
                </p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-ice-100 rounded-full h-7 w-7 flex items-center justify-center mt-0.5">
                <span className="text-ice-700 font-medium">2</span>
              </div>
              <div>
                <p className="font-medium">
                  {language === 'en' ? "Order Processing" : "Procesamiento del Pedido"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? "Your order will be processed and prepared for shipping within 1-2 business days." 
                    : "Tu pedido será procesado y preparado para envío en 1-2 días hábiles."}
                </p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-ice-100 rounded-full h-7 w-7 flex items-center justify-center mt-0.5">
                <span className="text-ice-700 font-medium">3</span>
              </div>
              <div>
                <p className="font-medium">
                  {language === 'en' ? "Shipping" : "Envío"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? "Your devices will be shipped to your address. You will receive a tracking number via email." 
                    : "Tus dispositivos serán enviados a tu dirección. Recibirás un número de seguimiento por email."}
                </p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-ice-100 rounded-full h-7 w-7 flex items-center justify-center mt-0.5">
                <span className="text-ice-700 font-medium">4</span>
              </div>
              <div>
                <p className="font-medium">
                  {language === 'en' ? "Device Setup" : "Configuración de Dispositivos"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? "Once you receive your devices, follow the setup instructions in your dashboard." 
                    : "Una vez que recibas tus dispositivos, sigue las instrucciones de configuración en tu panel."}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
        <ButtonCustom onClick={() => navigate("/dashboard")}>
          <Home className="mr-2 h-4 w-4" />
          {language === 'en' ? "Go to Dashboard" : "Ir al Panel"}
        </ButtonCustom>
        
        <ButtonCustom variant="outline" onClick={() => window.print()}>
          <FileText className="mr-2 h-4 w-4" />
          {language === 'en' ? "Print Receipt" : "Imprimir Recibo"}
        </ButtonCustom>
        
        <ButtonCustom variant="outline" onClick={() => navigate("/orders")}>
          <Truck className="mr-2 h-4 w-4" />
          {language === 'en' ? "Track Order" : "Seguir Pedido"}
        </ButtonCustom>
      </CardFooter>
    </Card>
  );
};

export default PaymentSuccess;
