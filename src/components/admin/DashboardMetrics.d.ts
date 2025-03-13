
import React from 'react';

export interface DashboardMetricsProps {
  data?: {
    onAction?: (action: string) => void;
  };
}

declare const DashboardMetrics: React.FC<DashboardMetricsProps>;
export default DashboardMetrics;
