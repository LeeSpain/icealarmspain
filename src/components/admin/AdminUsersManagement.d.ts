
export interface AdminUserWithPermissions {
  id: string;
  uid: string;
  name: string;
  email: string;
  displayName: string;
  role: string;
  status: "active" | "pending" | "inactive";
  permissions: string[];
  lastLogin: string;
  createdAt: string;
  profileCompleted: boolean;
}
