
import React from "react";
import { Mail, Calendar, Shield, User, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserTableProps {
  loading: boolean;
  users: any[];
  getUserStatus: (user: any) => string;
  formatDate: (date: string | undefined) => string;
  onEditRole: (user: any) => void;
  onDeleteUser: (user: any) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  loading,
  users,
  getUserStatus,
  formatDate,
  onEditRole,
  onDeleteUser
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="hidden md:table-cell">Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-ice-100 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-ice-600" />
                    </div>
                    <div>
                      <div>{user.displayName || user.name || "Unnamed User"}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      user.role === "admin" 
                        ? "bg-blue-50 text-blue-600 border-blue-200" 
                        : user.role === "callcenter" 
                          ? "bg-purple-50 text-purple-600 border-purple-200"
                          : "bg-green-50 text-green-600 border-green-200"
                    }
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role || "member"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={getUserStatus(user) === "active" ? "default" : "secondary"}
                    className={
                      getUserStatus(user) === "active" 
                        ? "bg-green-100 text-green-800 hover:bg-green-100" 
                        : getUserStatus(user) === "pending" 
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {getUserStatus(user)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-muted-foreground" />
                    <span>{formatDate(user.createdAt)}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-muted-foreground" />
                    <span>{formatDate(user.lastLogin)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem 
                        onClick={() => {
                          navigator.clipboard.writeText(user.email);
                          toast.success("Email copied to clipboard");
                        }}
                        className="flex items-center"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Copy email</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onEditRole(user)}
                        className="flex items-center"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Change role</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDeleteUser(user)}
                        className="flex items-center text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete user</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
