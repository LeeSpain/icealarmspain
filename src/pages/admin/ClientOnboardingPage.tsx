
import React from 'react';
import AdminDashboard from '../AdminDashboard';
import ClientOnboarding from '@/components/admin/ClientOnboarding';

const ClientOnboardingPage: React.FC = () => {
  return (
    <AdminDashboard initialSection="client-onboarding" />
  );
};

export default ClientOnboardingPage;
