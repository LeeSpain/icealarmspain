
import { ReactNode } from 'react';

export interface SectionRendererProps {
  activeSection: string;
  dashboardData: any;
  onActivityAdded: (type: string, description: string) => void;
}

declare const SectionRenderer: React.FC<SectionRendererProps>;
export default SectionRenderer;
