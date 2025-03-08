
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, Plus, Package, BarChart, Download, Filter, ChevronDown, HardDrive, 
  Truck, ShoppingBag, ShoppingCart, CheckCircle, Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock inventory data
const MOCK_INVENTORY = [
  {
    id: 1,
    productId: "PRD-001",
    sku: "ICE-PRO-001",
    name: "IceAlarm Pro",
    category: "Device",
    inStock: 45,
    allocated: 5,
    onOrder: 20,
    unitCost: 149.99,
    status: "In Stock"
  },
  {
    id: 2,
    productId: "PRD-002",
    sku: "ICE-STD-001",
    name: "IceAlarm Standard",
    category: "Device",
    inStock: 78,
    allocated: 12,
    onOrder: 0,
    unitCost: 99.99,
    status: "In Stock"
  },
  {
    id: 3,
    productId: "PRD-003",
    sku: "ICE-BAS-001",
    name: "IceAlarm Basic",
    category: "Device",
    inStock: 0,
    allocated: 0,
    onOrder: 50,
    unitCost: 59.99,
    status: "Out of Stock"
  },
  {
    id: 4,
    productId: "PRD-004",
    sku: "ICE-ACC-001",
    name: "SOS Pendant",
    category: "Accessory",
    inStock: 120,
    allocated: 15,
    onOrder: 0,
    unitCost: 29.99,
    status: "In Stock"
  },
  {
    id: 5,
    productId: "PRD-005",
    sku: "ICE-ACC-002",
    name: "Charging Dock",
    category: "Accessory",
    inStock: 65,
    allocated: 8,
    onOrder: 0,
    unitCost: 19.99,
    status: "In Stock"
  },
  {
    id: 6,
    productId: "PRD-006",
    sku: "ICE-ACC-003",
    name: "Wall Mount Kit",
    category: "Accessory",
    inStock: 3,
    allocated: 2,
    onOrder: 30,
    unitCost: 14.99,
    status: "Low Stock"
  },
  {
    id: 7,
    productId: "PRD-007",
    sku: "ICE-SRV-001",
    name: "Premium Monitoring Plan",
    category: "Service",
    inStock: 999,
    allocated: 148,
    onOrder: 0,
    unitCost: 19.99,
    status: "In Stock"
  }
];

const DeviceInventoryManager: React.FC = () => {
  const [inventory] = useState(MOCK_INVENTORY);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const countByCategory = inventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category] += item.inStock;
    return acc;
  }, {} as Record<string, number>);

  const totalItems = inventory.reduce((sum, item) => sum + item.inStock, 0);
  const totalValue = inventory.reduce((sum, item) => sum + (item.inStock * item.unitCost), 0);
  const pendingOrders = inventory.reduce((sum, item) => sum + (item.onOrder > 0 ? 1 : 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Device Inventory</h1>
          <p className="text-muted-foreground">Manage stock levels and inventory for all products</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Items in stock across {Object.keys(countByCategory).length} categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total value of current inventory
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.filter(item => item.status === "Low Stock").length}</div>
            <p className="text-xs text-muted-foreground">
              Items requiring reorder
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Orders awaiting delivery
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Manage and monitor all products in the inventory</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  className="pl-8 w-[250px]" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Category</DropdownMenuItem>
                  <DropdownMenuItem>Stock Status</DropdownMenuItem>
                  <DropdownMenuItem>Price Range</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>In Stock</TableHead>
                <TableHead>Allocated</TableHead>
                <TableHead>On Order</TableHead>
                <TableHead>Unit Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.inStock}</TableCell>
                  <TableCell>{item.allocated}</TableCell>
                  <TableCell>{item.onOrder}</TableCell>
                  <TableCell>€{item.unitCost.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Open menu</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Adjust Stock</DropdownMenuItem>
                        <DropdownMenuItem>Order More</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <Truck className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">New shipment arrived</p>
                  <p className="text-sm text-muted-foreground">20 units of IceAlarm Pro added to inventory</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <ShoppingCart className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Inventory allocation</p>
                  <p className="text-sm text-muted-foreground">5 units allocated to Barcelona Senior Homes</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Inventory audit completed</p>
                  <p className="text-sm text-muted-foreground">All items verified and counted</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(countByCategory).map(([category, count]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{category}</span>
                    <span className="text-sm">{count} items</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted">
                    <div 
                      className="h-2.5 rounded-full bg-primary" 
                      style={{ width: `${(count / totalItems) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceInventoryManager;
