
import React from 'react';

export interface CallCenterSectionProps {
  onAction?: (action: string) => void;
}

declare const CallCenterSection: React.FC<CallCenterSectionProps>;
export default CallCenterSection;
