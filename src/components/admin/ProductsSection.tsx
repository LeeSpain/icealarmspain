
import React from 'react';
import PlaceholderSection from './PlaceholderSection';

interface ProductsSectionProps {
  onAction?: (action: string) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ onAction }) => {
  return (
    <PlaceholderSection
      title="Products Management"
      description="Manage product catalog, pricing, and inventory levels."
      onAction={onAction}
    />
  );
};

export default ProductsSection;
