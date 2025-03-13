
import React from 'react';
import AdminDashboard from '../AdminDashboard';
import ClientManagement from '@/components/admin/ClientManagement';

const ClientsPage: React.FC = () => {
  return (
    <AdminDashboard initialSection="clients" />
  );
};

export default ClientsPage;
