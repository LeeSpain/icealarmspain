
import React, { useState, useEffect } from "react";
import { 
  Users, 
  Bell, 
  Activity, 
  CalendarIcon, 
  BarChart3, 
  Settings, 
  Search,
  Check,
  X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Progress as ProgressDemo } from "@/components/ui/progress"
import { ModeToggle } from "@/components/mode-toggle"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useLanguage } from "@/context/LanguageContext";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUserName, setEditedUserName] = useState('');
  const [editedUserEmail, setEditedUserEmail] = useState('');
  const [editedUserRole, setEditedUserRole] = useState('user');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isBulkEditDrawerOpen, setIsBulkEditDrawerOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [bulkEditRole, setBulkEditRole] = useState('user');
  const [bulkEditStatus, setBulkEditStatus] = useState('active');
  const [isBulkUpdateConfirmationOpen, setIsBulkUpdateConfirmationOpen] = useState(false);
  const [isBulkDeleteConfirmationOpen, setIsBulkDeleteConfirmationOpen] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Transform the data to match the User interface
        const transformedUsers: User[] = data.map((user: any) => ({
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: ['admin', 'editor', 'user'][Math.floor(Math.random() * 3)] || 'user', // Randomly assign a role
          status: ['active', 'inactive'][Math.floor(Math.random() * 2)] || 'inactive', // Randomly assign a status
        }));
        setUsers(transformedUsers);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let results = [...users];

    // Filter by search query
    if (searchQuery) {
      results = results.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      results = results.filter(user => user.status === selectedStatus);
    }

    // Sort the results
    results.sort((a, b) => {
      const isAsc = sortDirection === 'asc' ? 1 : -1;
      if (a[sortColumn] < b[sortColumn]) {
        return -1 * isAsc;
      }
      if (a[sortColumn] > b[sortColumn]) {
        return 1 * isAsc;
      }
      return 0;
    });

    setFilteredUsers(results);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [users, searchQuery, selectedStatus, sortColumn, sortDirection]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const openCreateUserDialog = () => {
    setIsDialogOpen(true);
  };

  const closeCreateUserDialog = () => {
    setIsDialogOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('user');
  };

  const handleCreateUser = () => {
    if (!newUserName || !newUserEmail) {
      alert('Please fill in all fields.');
      return;
    }

    const newUser: User = {
      id: String(Date.now()),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'active',
    };

    setUsers([...users, newUser]);
    closeCreateUserDialog();
    toast.success('User created successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleEditUser = (user: User) => {
    setIsEditing(true);
    setEditingUserId(user.id);
    setEditedUserName(user.name);
    setEditedUserEmail(user.email);
    setEditedUserRole(user.role);
  };

  const handleUpdateUser = () => {
    if (!editedUserName || !editedUserEmail) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.id === editingUserId) {
        return {
          ...user,
          name: editedUserName,
          email: editedUserEmail,
          role: editedUserRole,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setIsEditing(false);
    setEditingUserId(null);
    toast.success('User updated successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingUserId(null);
  };

  const openDeleteUserDialog = (userId: string) => {
    setIsDeleteDialogOpen(true);
    setDeletingUserId(userId);
  };

  const closeDeleteUserDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeletingUserId(null);
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.id !== deletingUserId);
    setUsers(updatedUsers);
    closeDeleteUserDialog();
    toast.success('User deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSort = (column: keyof User) => {
    if (column === sortColumn) {
      // If the column is already being sorted, reverse the direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If the column is different, start sorting in ascending order
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleCheckboxChange = (userId: string) => {
    setSelectedUserIds(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUserIds([]);
    } else {
      const visibleUserIds = getCurrentPageUsers().map(user => user.id);
      setSelectedUserIds(visibleUserIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  useEffect(() => {
    const visibleUserIds = getCurrentPageUsers().map(user => user.id);
    const allSelected = visibleUserIds.every(id => selectedUserIds.includes(id));
    setIsAllSelected(allSelected);
  }, [selectedUserIds, currentPage, filteredUsers]);

  const openBulkEditDrawer = () => {
    setIsBulkEditDrawerOpen(true);
  };

  const closeBulkEditDrawer = () => {
    setIsBulkEditDrawerOpen(false);
  };

  const handleBulkUpdate = () => {
    setIsBulkUpdateConfirmationOpen(true);
  };

  const confirmBulkUpdate = () => {
    const updatedUsers = users.map(user => {
      if (selectedUserIds.includes(user.id)) {
        return {
          ...user,
          role: bulkEditRole,
          status: bulkEditStatus,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setIsBulkUpdateConfirmationOpen(false);
    closeBulkEditDrawer();
    setSelectedUserIds([]);
    toast.success('Users updated successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const cancelBulkUpdate = () => {
    setIsBulkUpdateConfirmationOpen(false);
  };

  const handleBulkDelete = () => {
    setIsBulkDeleteConfirmationOpen(true);
  };

  const confirmBulkDelete = () => {
    const updatedUsers = users.filter(user => !selectedUserIds.includes(user.id));
    setUsers(updatedUsers);
    setIsBulkDeleteConfirmationOpen(false);
    closeBulkEditDrawer();
    setSelectedUserIds([]);
    toast.success('Users deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const cancelBulkDelete = () => {
    setIsBulkDeleteConfirmationOpen(false);
  };

  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto py-10">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">{t("adminDashboard.title")}</h1>
        <Button onClick={handleLogout}>{t("adminDashboard.logout")}</Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder={t("adminDashboard.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3"
        />
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("adminDashboard.selectStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("adminDashboard.allStatuses")}</SelectItem>
            <SelectItem value="active">{t("adminDashboard.active")}</SelectItem>
            <SelectItem value="inactive">{t("adminDashboard.inactive")}</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={openCreateUserDialog}>{t("adminDashboard.createUser")}</Button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle><Skeleton className="h-5 w-40" /></CardTitle>
                <CardDescription><Skeleton className="h-4 w-60" /></CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                    {t("adminDashboard.name")}
                    {sortColumn === 'name' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
                    {t("adminDashboard.email")}
                    {sortColumn === 'email' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('role')} className="cursor-pointer">
                    {t("adminDashboard.role")}
                    {sortColumn === 'role' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                    {t("adminDashboard.status")}
                    {sortColumn === 'status' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                  </TableHead>
                  <TableHead className="text-right">{t("adminDashboard.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPageUsers().map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        {t("adminDashboard.edit")}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteUserDialog(user.id)}
                        className="ml-2"
                      >
                        {t("adminDashboard.delete")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={openBulkEditDrawer}
              disabled={selectedUserIds.length === 0}
            >
              {t("adminDashboard.bulkEdit")}
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                size="sm"
              >
                {t("adminDashboard.previous")}
              </Button>
              <span>{t("adminDashboard.page")} {currentPage} {t("adminDashboard.of")} {totalPages}</span>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                size="sm"
              >
                {t("adminDashboard.next")}
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Create User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("adminDashboard.createUser")}</DialogTitle>
            <DialogDescription>
              {t("adminDashboard.createUserDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t("adminDashboard.name")}
              </Label>
              <Input
                id="name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                {t("adminDashboard.email")}
              </Label>
              <Input
                type="email"
                id="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                {t("adminDashboard.role")}
              </Label>
              <Select value={newUserRole} onValueChange={setNewUserRole}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t("adminDashboard.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">{t("adminDashboard.admin")}</SelectItem>
                  <SelectItem value="editor">{t("adminDashboard.editor")}</SelectItem>
                  <SelectItem value="user">{t("adminDashboard.user")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={closeCreateUserDialog}>
              {t("adminDashboard.cancel")}
            </Button>
            <Button type="submit" onClick={handleCreateUser}>
              {t("adminDashboard.createUser")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("adminDashboard.editUser")}</DialogTitle>
            <DialogDescription>
              {t("adminDashboard.editUserDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t("adminDashboard.name")}
              </Label>
              <Input
                id="edit-name"
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                {t("adminDashboard.email")}
              </Label>
              <Input
                type="email"
                id="edit-email"
                value={editedUserEmail}
                onChange={(e) => setEditedUserEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                {t("adminDashboard.role")}
              </Label>
              <Select value={editedUserRole} onValueChange={setEditedUserRole}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t("adminDashboard.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">{t("adminDashboard.admin")}</SelectItem>
                  <SelectItem value="editor">{t("adminDashboard.editor")}</SelectItem>
                  <SelectItem value="user">{t("adminDashboard.user")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleCancelEdit}>
              {t("adminDashboard.cancel")}
            </Button>
            <Button type="submit" onClick={handleUpdateUser}>
              {t("adminDashboard.updateUser")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("adminDashboard.deleteConfirmation")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("adminDashboard.deleteConfirmationDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeleteUserDialog}>{t("adminDashboard.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>{t("adminDashboard.delete")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Edit Drawer */}
      <Drawer open={isBulkEditDrawerOpen} onOpenChange={setIsBulkEditDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("adminDashboard.bulkEdit")}</DrawerTitle>
            <DrawerDescription>{t("adminDashboard.bulkEditDescription")}</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 py-4 px-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                {t("adminDashboard.role")}
              </Label>
              <Select value={bulkEditRole} onValueChange={setBulkEditRole}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t("adminDashboard.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">{t("adminDashboard.admin")}</SelectItem>
                  <SelectItem value="editor">{t("adminDashboard.editor")}</SelectItem>
                  <SelectItem value="user">{t("adminDashboard.user")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {t("adminDashboard.status")}
              </Label>
              <Select value={bulkEditStatus} onValueChange={setBulkEditStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t("adminDashboard.selectStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t("adminDashboard.active")}</SelectItem>
                  <SelectItem value="inactive">{t("adminDashboard.inactive")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DrawerFooter>
            <Button variant="outline" onClick={closeBulkEditDrawer}>
              {t("adminDashboard.cancel")}
            </Button>
            <Button onClick={handleBulkUpdate}>{t("adminDashboard.update")}</Button>
            <Button variant="destructive" onClick={handleBulkDelete}>{t("adminDashboard.delete")}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Bulk Update Confirmation Dialog */}
      <AlertDialog open={isBulkUpdateConfirmationOpen} onOpenChange={setIsBulkUpdateConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("adminDashboard.bulkUpdateConfirmation")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("adminDashboard.bulkUpdateConfirmationDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelBulkUpdate}>{t("adminDashboard.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkUpdate}>{t("adminDashboard.update")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={isBulkDeleteConfirmationOpen} onOpenChange={setIsBulkDeleteConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("adminDashboard.bulkDeleteConfirmation")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("adminDashboard.bulkDeleteConfirmationDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelBulkDelete}>{t("adminDashboard.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkDelete}>{t("adminDashboard.delete")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
