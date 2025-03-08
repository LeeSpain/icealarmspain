
import React from 'react';

export interface PlaceholderSectionProps {
  title: string;
  description: string;
  onAction: (action: string) => void;
}

declare const PlaceholderSection: React.FC<PlaceholderSectionProps>;

export default PlaceholderSection;
