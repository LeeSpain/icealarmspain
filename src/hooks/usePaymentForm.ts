
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
    phone: "",   // Phone property is initialized
    nie: "",     // NIE property is initialized
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",  // Make sure state is included here
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
    
    // In step 1, we only validate billing info and don't process payment
    if (!formData.email || !formData.phone || !formData.nie || !formData.address.line1 || 
        !formData.address.city || !formData.address.state || !formData.address.postalCode) {
      setError(language === 'en' 
        ? "Please fill in all required billing information fields" 
        : "Por favor, completa todos los campos obligatorios de facturación");
      return;
    }
    
    // Just pass billing info to the next step
    const billingInfo = {
      firstName: formData.name.split(' ')[0] || '',
      lastName: formData.name.split(' ').slice(1).join(' ') || '',
      email: formData.email,
      phone: formData.phone,
      nie: formData.nie,
      address: formData.address.line1 + (formData.address.line2 ? ', ' + formData.address.line2 : ''),
      city: formData.address.city,
      state: formData.address.state,  // This should be passed to the billingInfo
      postalCode: formData.address.postalCode,
      country: formData.address.country
    };
    
    onSuccess(billingInfo);
  };

  return {
    formData,
    isProcessing,
    error,
    handleChange,
    handleSubmit
  };
};
