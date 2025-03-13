
import React from 'react';
import AdminDashboard from '../AdminDashboard';
import UserManagement from '@/components/admin/user-management/UserManagement';

const UserManagementPage: React.FC = () => {
  return (
    <AdminDashboard initialSection="users" />
  );
};

export default UserManagementPage;
