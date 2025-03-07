
import { ReactNode } from 'react';

export interface ClientOnboardingProps {
  onAction?: (action: string) => void;
}

declare const ClientOnboarding: React.FC<ClientOnboardingProps>;
export default ClientOnboarding;
