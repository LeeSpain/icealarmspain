
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { payment } from "@/firebase";
import { PaymentDetails } from "@/types/payment";

export const usePaymentForm = (
  amount: number,
  items: any[],
  onSuccess: (paymentResult: any) => void,
  isNewCustomer = false
) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { user, signUp } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
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
          ...(prev[parent as keyof PaymentDetails] as object),
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
      let userId = user?.uid;
      let userEmail = user?.email;
      
      // If this is a new customer and we need to create an account
      if (isNewCustomer && !user) {
        if (!formData.password || formData.password.length < 6) {
          throw new Error(language === 'en' 
            ? "Please create a password (minimum 6 characters)" 
            : "Por favor, crea una contraseña (mínimo 6 caracteres)");
        }
        
        try {
          // Create user account
          const newUser = await signUp(formData.email, formData.password);
          userId = newUser.uid;
          userEmail = newUser.email;
          
          toast({
            title: language === 'en' ? "Account Created" : "Cuenta Creada",
            description: language === 'en' 
              ? "Your account was created successfully!" 
              : "¡Tu cuenta ha sido creada con éxito!",
            variant: "default",
          });
        } catch (signupError) {
          console.error("Error creating account:", signupError);
          throw new Error(language === 'en'
            ? "Failed to create account. Please try again."
            : "Error al crear la cuenta. Por favor, inténtalo de nuevo.");
        }
      }
      
      // Process payment
      const paymentResult = await payment.processPayment({
        amount,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvc: formData.cvc,
        name: formData.name,
        items,
        userId: userId,
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

  return {
    formData,
    isProcessing,
    error,
    handleChange,
    handleSubmit
  };
};
