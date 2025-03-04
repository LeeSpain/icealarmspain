
import { useState } from "react";
import { BillingInfo } from "../types/checkout.types";

export const useBillingInfo = () => {
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    nie: ""
  });
  
  return {
    billingInfo,
    setBillingInfo
  };
};
