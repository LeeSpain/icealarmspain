
import React from 'react';
import PlaceholderSection from './PlaceholderSection';

interface CallCenterSectionProps {
  onAction?: (action: string) => void;
}

const CallCenterSection: React.FC<CallCenterSectionProps> = ({ onAction }) => {
  return (
    <PlaceholderSection
      title="Call Center"
      description="Manage call center operations, agent assignments, and performance metrics."
      onAction={onAction}
    />
  );
};

export default CallCenterSection;
