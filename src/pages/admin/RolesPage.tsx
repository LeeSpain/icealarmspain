
import React from 'react';
import AdminDashboard from '../AdminDashboard';
import RolesManagement from '@/components/admin/RolesManagement';

const RolesPage: React.FC = () => {
  return (
    <AdminDashboard initialSection="roles" />
  );
};

export default RolesPage;
