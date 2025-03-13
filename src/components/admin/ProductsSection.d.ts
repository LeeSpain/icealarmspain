
import React from 'react';

export interface ProductsSectionProps {
  onAction?: (action: string) => void;
}

declare const ProductsSection: React.FC<ProductsSectionProps>;
export default ProductsSection;
