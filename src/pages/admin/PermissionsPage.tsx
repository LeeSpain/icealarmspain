
import React from 'react';
import AdminDashboard from '../AdminDashboard';
import PermissionsManagement from '@/components/admin/PermissionsManagement';

const PermissionsPage: React.FC = () => {
  return (
    <AdminDashboard initialSection="permissions" />
  );
};

export default PermissionsPage;
