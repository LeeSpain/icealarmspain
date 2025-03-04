
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ItemsListProps {
  items: any[];
  deviceCount: number;
  membershipType: string;
}

const ItemsList: React.FC<ItemsListProps> = ({ items, deviceCount, membershipType }) => {
  const { language } = useLanguage();
  const hasItems = items && Array.isArray(items) && items.length > 0;
  
  // Get membership type display name
  const getMembershipTypeName = (type: string) => {
    switch (type) {
      case 'individual':
        return language === 'en' ? 'Individual' : 'Individual';
      case 'couple':
        return language === 'en' ? 'Couple' : 'Pareja';
      case 'family':
        return language === 'en' ? 'Family' : 'Familia';
      case 'caregiver':
        return language === 'en' ? 'Caregiver' : 'Cuidador';
      default:
        return language === 'en' ? 'Individual' : 'Individual';
    }
  };

  // Ensure we have valid numbers for display
  const ensureNumber = (value: any): number => {
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn(`Invalid number value: ${value}, type: ${typeof value}`);
      return 0;
    }
    return value;
  };
  
  return (
    <>
      <div>
        <h3 className="font-medium mb-2 flex items-center">
          <Users className="mr-2 h-4 w-4 text-ice-500" />
          {language === 'en' ? "Membership Type" : "Tipo de Membresía"}:
          <span className="ml-2 text-ice-600">{getMembershipTypeName(membershipType)}</span>
        </h3>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-medium mb-2">
          {language === 'en' ? "Items" : "Artículos"} ({deviceCount || 0})
        </h3>
        <ul className="space-y-2">
          {hasItems ? (
            items.map((item, index) => (
              <li key={index} className="flex justify-between text-sm py-1">
                <span>{item.name} {item.quantity > 1 ? `(${item.quantity}x)` : ''}</span>
                <span>€{(ensureNumber(item.price) * ensureNumber(item.quantity)).toFixed(2)}</span>
              </li>
            ))
          ) : (
            <li className="text-sm text-muted-foreground">
              {language === 'en' ? "No items in cart" : "No hay artículos en el carrito"}
            </li>
          )}
        </ul>
      </div>
      
      <Separator />
    </>
  );
};

export default ItemsList;
