
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, ShoppingCart, AlertCircle, CheckCircle2 } from "lucide-react";
import { payment } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  name: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface PaymentFormProps {
  amount: number;
  items: any[];
  onSuccess: (paymentResult: any) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, items, onSuccess, onCancel }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    name: user?.name || "",
    email: user?.email || "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "España",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof PaymentDetails] as object,
          [child]: value,
        },
      }));
    } else {
      // Format card number with spaces
      if (name === "cardNumber") {
        // Remove non-digit characters
        const digits = value.replace(/\D/g, "");
        // Add a space after every 4 digits
        const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
        // Limit to 19 characters (16 digits + 3 spaces)
        const limited = formatted.slice(0, 19);
        setFormData((prev) => ({ ...prev, [name]: limited }));
      } 
      // Format expiry date with slash
      else if (name === "expiryDate") {
        // Remove non-digit characters
        const digits = value.replace(/\D/g, "");
        // Add a slash after first 2 digits
        let formatted = digits;
        if (digits.length > 2) {
          formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
        }
        // Limit to 5 characters (MM/YY)
        const limited = formatted.slice(0, 5);
        setFormData((prev) => ({ ...prev, [name]: limited }));
      }
      // Format CVC (limit to 3-4 digits)
      else if (name === "cvc") {
        const digits = value.replace(/\D/g, "").slice(0, 4);
        setFormData((prev) => ({ ...prev, [name]: digits }));
      }
      else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
    
    // Clear error when user types
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    
    try {
      // Process payment
      const paymentResult = await payment.processPayment({
        amount,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvc: formData.cvc,
        name: formData.name,
        items,
        userId: user?.id,
        email: formData.email,
        address: formData.address
      });
      
      // Show success notification
      toast({
        title: language === 'en' ? "Payment Successful" : "Pago Exitoso",
        description: language === 'en' 
          ? `Your payment of €${amount.toFixed(2)} has been processed successfully.` 
          : `Tu pago de €${amount.toFixed(2)} ha sido procesado con éxito.`,
        variant: "default",
      });
      
      // Call onSuccess callback with payment result
      onSuccess(paymentResult);
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : String(err));
      
      // Show error notification
      toast({
        title: language === 'en' ? "Payment Failed" : "Pago Fallido",
        description: err instanceof Error ? err.message : String(err),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-ice-600" />
          {language === 'en' ? "Payment Details" : "Detalles de Pago"}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? "Enter your payment information to complete your purchase" 
            : "Ingresa tu información de pago para completar tu compra"}
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {language === 'en' ? "Card Information" : "Información de Tarjeta"}
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">
                {language === 'en' ? "Card Number" : "Número de Tarjeta"}
              </Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                required
                autoComplete="cc-number"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">
                  {language === 'en' ? "Expiry Date" : "Fecha de Expiración"}
                </Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                  autoComplete="cc-exp"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">
                  {language === 'en' ? "CVC" : "CVC"}
                </Label>
                <Input
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="123"
                  required
                  autoComplete="cc-csc"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">
                {language === 'en' ? "Cardholder Name" : "Nombre del Titular"}
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={language === 'en' ? "Full Name" : "Nombre Completo"}
                required
                autoComplete="cc-name"
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {language === 'en' ? "Billing Information" : "Información de Facturación"}
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                {language === 'en' ? "Email" : "Correo Electrónico"}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address.line1">
                {language === 'en' ? "Address Line 1" : "Dirección Línea 1"}
              </Label>
              <Input
                id="address.line1"
                name="address.line1"
                value={formData.address.line1}
                onChange={handleChange}
                placeholder={language === 'en' ? "Street address" : "Dirección"}
                required
                autoComplete="address-line1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address.line2">
                {language === 'en' ? "Address Line 2 (Optional)" : "Dirección Línea 2 (Opcional)"}
              </Label>
              <Input
                id="address.line2"
                name="address.line2"
                value={formData.address.line2}
                onChange={handleChange}
                placeholder={language === 'en' ? "Apartment, suite, etc." : "Apartamento, suite, etc."}
                autoComplete="address-line2"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.city">
                  {language === 'en' ? "City" : "Ciudad"}
                </Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder={language === 'en' ? "City" : "Ciudad"}
                  required
                  autoComplete="address-level2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.state">
                  {language === 'en' ? "Province" : "Provincia"}
                </Label>
                <Input
                  id="address.state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  placeholder={language === 'en' ? "Province" : "Provincia"}
                  required
                  autoComplete="address-level1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.postalCode">
                  {language === 'en' ? "Postal Code" : "Código Postal"}
                </Label>
                <Input
                  id="address.postalCode"
                  name="address.postalCode"
                  value={formData.address.postalCode}
                  onChange={handleChange}
                  placeholder={language === 'en' ? "Postal code" : "Código postal"}
                  required
                  autoComplete="postal-code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.country">
                  {language === 'en' ? "Country" : "País"}
                </Label>
                <Input
                  id="address.country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  placeholder={language === 'en' ? "Country" : "País"}
                  required
                  autoComplete="country-name"
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-ice-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">
                {language === 'en' ? "Total Amount:" : "Monto Total:"}
              </span>
              <span className="text-lg font-bold">€{amount.toFixed(2)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {language === 'en' 
                ? "This amount includes taxes and shipping fees" 
                : "Este monto incluye impuestos y gastos de envío"}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <ButtonCustom 
            type="button"
            variant="outline" 
            onClick={onCancel}
            disabled={isProcessing}
          >
            {language === 'en' ? "Cancel" : "Cancelar"}
          </ButtonCustom>
          
          <ButtonCustom 
            type="submit" 
            isLoading={isProcessing}
            disabled={isProcessing}
          >
            {!isProcessing && (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {language === 'en' ? "Complete Payment" : "Completar Pago"}
              </>
            )}
            {isProcessing && (
              language === 'en' ? "Processing..." : "Procesando..."
            )}
          </ButtonCustom>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PaymentForm;
