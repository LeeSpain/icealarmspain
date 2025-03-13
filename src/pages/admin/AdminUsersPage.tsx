
import React from 'react';
import AdminDashboard from '../AdminDashboard';
import AdminUsersManagement from '@/components/admin/AdminUsersManagement';

const AdminUsersPage: React.FC = () => {
  return (
    <AdminDashboard initialSection="admin-users" />
  );
};

export default AdminUsersPage;
