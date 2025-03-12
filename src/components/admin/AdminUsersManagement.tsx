import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminUserWithPermissions } from './AdminUsersManagement.d';

const mockUsers: AdminUserWithPermissions[] = [
  {
    id: "1",
    uid: "1",
    name: "Admin User",
    displayName: "Admin User",
    email: "admin@icealarm.es",
    role: "admin",
    status: "active",
    permissions: ["all"],
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    profileCompleted: true
  },
  {
    id: "2",
    uid: "2",
    name: "Support Agent",
    displayName: "Support Agent",
    email: "support@icealarm.es",
    role: "support",
    status: "active",
    permissions: ["support", "view"],
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    profileCompleted: true
  },
  {
    id: "3",
    uid: "3",
    name: "Regular User",
    displayName: "Regular User",
    email: "user@icealarm.es",
    role: "member",
    status: "pending",
    permissions: ["basic"],
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    profileCompleted: false
  }
];

const AdminUsersManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUserWithPermissions[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<AdminUserWithPermissions[]>(mockUsers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "member",
  });

  useEffect(() => {
    const filtered = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery]);

  const handleCreateUser = async () => {
    const newUser: AdminUserWithPermissions = {
      id: Date.now().toString(),
      uid: Date.now().toString(),
      name: formData.name,
      displayName: formData.name,
      email: formData.email,
      role: formData.role,
      status: "active" as const,
      permissions: ["basic"],
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      profileCompleted: false
    };

    setUsers([...users, newUser]);
    setFilteredUsers([...filteredUsers, newUser]);
    setIsCreateDialogOpen(false);
    setFormData({ name: "", email: "", role: "member" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const getUserStatus = (user: AdminUserWithPermissions): "active" | "pending" | "inactive" => {
    return user.status;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create User</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{getUserStatus(user)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Create New User
              </h3>
              <div className="mt-2 px-7 py-3">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleRoleChange}
                  className="mt-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="member">Member</option>
                  <option value="support">Support</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="items-center px-4 py-3">
                <Button
                  onClick={handleCreateUser}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Create
                </Button>
                <Button
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersManagement;
