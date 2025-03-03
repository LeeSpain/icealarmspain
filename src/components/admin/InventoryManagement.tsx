
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  BarChart4, 
  Box, 
  CheckSquare, 
  Download, 
  Filter, 
  PlusCircle, 
  Search, 
  ShoppingCart, 
  Truck,
  Smartphone,
  Watch,
  Pill,
  Zap
} from "lucide-react";
import { toast } from "react-toastify";

interface InventoryManagementProps {
  section?: string;
}

// Mock inventory data
const inventoryProducts = [
  {
    id: "PROD-001",
    name: "IceAlarm SOS Pendant",
    category: "pendant",
    inStock: 154,
    reserved: 23,
    incoming: 50,
    alertLevel: "normal",
    lastUpdated: "2023-08-10T12:30:45",
    location: "Madrid Warehouse",
    icon: Watch,
    price: 129.99
  },
  {
    id: "PROD-002",
    name: "IceAlarm Health Monitor",
    category: "monitor",
    inStock: 87,
    reserved: 15,
    incoming: 25,
    alertLevel: "normal",
    lastUpdated: "2023-08-10T14:22:18",
    location: "Madrid Warehouse",
    icon: Smartphone,
    price: 199.99
  },
  {
    id: "PROD-003",
    name: "IceAlarm Medical Dispenser",
    category: "dispenser",
    inStock: 32,
    reserved: 12,
    incoming: 0,
    alertLevel: "low",
    lastUpdated: "2023-08-11T09:45:32",
    location: "Barcelona Warehouse",
    icon: Pill,
    price: 179.99
  },
  {
    id: "PROD-004",
    name: "IceAlarm Fall Detector",
    category: "accessory",
    inStock: 210,
    reserved: 8,
    incoming: 100,
    alertLevel: "normal",
    lastUpdated: "2023-08-09T16:12:05",
    location: "Madrid Warehouse",
    icon: Zap,
    price: 89.99
  },
  {
    id: "PROD-005",
    name: "IceAlarm Base Station",
    category: "station",
    inStock: 12,
    reserved: 7,
    incoming: 30,
    alertLevel: "critical",
    lastUpdated: "2023-08-11T08:30:19",
    location: "Valencia Warehouse",
    icon: Box,
    price: 249.99
  },
  {
    id: "PROD-006",
    name: "IceAlarm Wristband",
    category: "accessory",
    inStock: 298,
    reserved: 35,
    incoming: 0,
    alertLevel: "normal",
    lastUpdated: "2023-08-10T11:05:44",
    location: "Madrid Warehouse",
    icon: Watch,
    price: 49.99
  },
  {
    id: "PROD-007",
    name: "IceAlarm GPS Tracker",
    category: "accessory",
    inStock: 65,
    reserved: 18,
    incoming: 50,
    alertLevel: "normal",
    lastUpdated: "2023-08-09T14:47:29",
    location: "Barcelona Warehouse",
    icon: Smartphone,
    price: 79.99
  },
];

// Mock orders data
const ordersData = [
  {
    id: "ORD-5723",
    client: "Hotel Catalonia",
    status: "pending",
    total: 12499.55,
    items: 45,
    orderDate: "2023-08-11T14:22:36",
    deliveryDate: "2023-08-20",
    paymentStatus: "awaiting",
    type: "business"
  },
  {
    id: "ORD-5722",
    client: "Carlos Martínez",
    status: "processing",
    total: 299.98,
    items: 2,
    orderDate: "2023-08-11T12:05:19",
    deliveryDate: "2023-08-18",
    paymentStatus: "paid",
    type: "individual"
  },
  {
    id: "ORD-5721",
    client: "Residencia Valencia",
    status: "shipped",
    total: 4599.75,
    items: 25,
    orderDate: "2023-08-10T09:41:05",
    deliveryDate: "2023-08-17",
    paymentStatus: "paid",
    type: "business"
  },
  {
    id: "ORD-5720",
    client: "Ana González",
    status: "delivered",
    total: 179.99,
    items: 1,
    orderDate: "2023-08-09T16:33:42",
    deliveryDate: "2023-08-15",
    paymentStatus: "paid",
    type: "individual"
  },
  {
    id: "ORD-5719",
    client: "Madrid Health Center",
    status: "pending",
    total: 8999.60,
    items: 40,
    orderDate: "2023-08-09T10:15:31",
    deliveryDate: "2023-08-25",
    paymentStatus: "awaiting",
    type: "business"
  },
  {
    id: "ORD-5718",
    client: "Juan López",
    status: "cancelled",
    total: 129.99,
    items: 1,
    orderDate: "2023-08-08T18:22:18",
    deliveryDate: null,
    paymentStatus: "refunded",
    type: "individual"
  },
  {
    id: "ORD-5717",
    client: "Sevilla Care Home",
    status: "delivered",
    total: 6299.65,
    items: 35,
    orderDate: "2023-08-07T11:45:54",
    deliveryDate: "2023-08-14",
    paymentStatus: "paid",
    type: "business"
  },
];

const InventoryManagement: React.FC<InventoryManagementProps> = ({ section = "inventory" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [stockAlertFilter, setStockAlertFilter] = useState("all");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState("all");
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isInventoryFormOpen, setIsInventoryFormOpen] = useState(false);
  
  // Filter for inventory products
  const filteredProducts = inventoryProducts.filter(product => {
    return (
      (searchTerm === "" || 
       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "all" || product.category === categoryFilter) &&
      (locationFilter === "all" || product.location === locationFilter) &&
      (stockAlertFilter === "all" || product.alertLevel === stockAlertFilter)
    );
  });
  
  // Filter for orders
  const filteredOrders = ordersData.filter(order => {
    return (
      (searchTerm === "" || 
       order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       order.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (orderStatusFilter === "all" || order.status === orderStatusFilter) &&
      (orderTypeFilter === "all" || order.type === orderTypeFilter)
    );
  });
  
  const getAlertBadgeColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-500";
      case "low":
        return "bg-amber-500";
      case "normal":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-500";
      case "processing":
        return "bg-amber-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const handleCreateOrder = () => {
    toast.success("Order created successfully! Order ID: ORD-5724");
    setIsOrderFormOpen(false);
  };
  
  const handleUpdateInventory = () => {
    toast.success("Inventory updated successfully!");
    setIsInventoryFormOpen(false);
  };
  
  // Determine which tab to show based on the section prop
  const defaultTab = section === "orders-list" ? "orders" : "inventory";
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">
            {defaultTab === "orders" ? "Orders Management" : "Inventory Management"}
          </h1>
          <p className="text-muted-foreground">
            {defaultTab === "orders" 
              ? "Track and manage customer orders and shipments" 
              : "Monitor stock levels and manage product inventory"}
          </p>
        </div>
        <div className="flex space-x-2">
          {defaultTab === "orders" ? (
            <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Create Order</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Order</DialogTitle>
                  <DialogDescription>
                    Create a new order for a customer. Fill in all required fields.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Client Name</label>
                    <Input className="col-span-3" placeholder="Enter client name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Client Type</label>
                    <Select defaultValue="individual">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select client type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Products</label>
                    <div className="col-span-3 border rounded-md p-2">
                      {inventoryProducts.slice(0, 3).map(product => (
                        <div key={product.id} className="flex items-center justify-between py-1 border-b last:border-0">
                          <span>{product.name}</span>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="1" className="w-16 h-8" />
                            <span>€{product.price}</span>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="mt-2 w-full">Add Product</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Delivery Date</label>
                    <Input type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Notes</label>
                    <Input className="col-span-3" placeholder="Optional notes" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOrderFormOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateOrder}>Create Order</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={isInventoryFormOpen} onOpenChange={setIsInventoryFormOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Update Inventory</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Update Inventory</DialogTitle>
                  <DialogDescription>
                    Add or remove stock for a product. Specify quantities and reason.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Product</label>
                    <Select defaultValue="PROD-001">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {inventoryProducts.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Action</label>
                    <Select defaultValue="add">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="add">Add Stock</SelectItem>
                        <SelectItem value="remove">Remove Stock</SelectItem>
                        <SelectItem value="transfer">Transfer Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Quantity</label>
                    <Input type="number" defaultValue="1" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Location</label>
                    <Select defaultValue="madrid">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="madrid">Madrid Warehouse</SelectItem>
                        <SelectItem value="barcelona">Barcelona Warehouse</SelectItem>
                        <SelectItem value="valencia">Valencia Warehouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Reason</label>
                    <Select defaultValue="restock">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restock">Restock</SelectItem>
                        <SelectItem value="adjustment">Inventory Adjustment</SelectItem>
                        <SelectItem value="damage">Damaged Goods</SelectItem>
                        <SelectItem value="transfer">Warehouse Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Notes</label>
                    <Input className="col-span-3" placeholder="Optional notes" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInventoryFormOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpdateInventory}>Update Inventory</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue={defaultTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="reports">Inventory Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Inventory Stock</CardTitle>
              <CardDescription>
                Current stock levels across all warehouses. 
                {filteredProducts.filter(p => p.alertLevel === "critical").length > 0 && 
                  ` ${filteredProducts.filter(p => p.alertLevel === "critical").length} items critically low.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search inventory..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="pendant">Pendants</SelectItem>
                      <SelectItem value="monitor">Monitors</SelectItem>
                      <SelectItem value="dispenser">Dispensers</SelectItem>
                      <SelectItem value="station">Base Stations</SelectItem>
                      <SelectItem value="accessory">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[170px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Madrid Warehouse">Madrid</SelectItem>
                      <SelectItem value="Barcelona Warehouse">Barcelona</SelectItem>
                      <SelectItem value="Valencia Warehouse">Valencia</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={stockAlertFilter} onValueChange={setStockAlertFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Stock Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-center">In Stock</TableHead>
                      <TableHead className="text-center">Reserved</TableHead>
                      <TableHead className="text-center">Incoming</TableHead>
                      <TableHead>Stock Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                          No products match your search criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map(product => {
                        const ProductIcon = product.icon;
                        return (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-1.5 rounded-full">
                                  <ProductIcon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-xs text-muted-foreground">{product.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">{product.category}</TableCell>
                            <TableCell className="text-center">{product.inStock}</TableCell>
                            <TableCell className="text-center">{product.reserved}</TableCell>
                            <TableCell className="text-center">{product.incoming}</TableCell>
                            <TableCell>
                              <Badge className={`${getAlertBadgeColor(product.alertLevel)} text-white`}>
                                {product.alertLevel}
                              </Badge>
                            </TableCell>
                            <TableCell>{product.location}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                                  View
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                                  Transfer
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {inventoryProducts.length} products
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                All customer orders and their current status.
                {filteredOrders.filter(o => o.status === "pending").length > 0 && 
                  ` ${filteredOrders.filter(o => o.status === "pending").length} orders pending.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={orderTypeFilter} onValueChange={setOrderTypeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Client Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                          No orders match your search criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{order.client}</div>
                              <div className="text-xs text-muted-foreground capitalize">{order.type}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusBadgeColor(order.status)} text-white`}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>€{order.total.toFixed(2)}</TableCell>
                          <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                          <TableCell>{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "-"}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                                View
                              </Button>
                              {order.status === "pending" && (
                                <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                                  Process
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {ordersData.length} orders
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>Shipments Tracking</CardTitle>
              <CardDescription>
                Track shipments and deliveries to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-500" />
                      Pending Shipments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      Orders ready to be shipped today
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-green-500" />
                      Delivered Today
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      Orders successfully delivered today
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <BarChart4 className="h-4 w-4 text-purple-500" />
                      On-Time Delivery Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">94.3%</div>
                    <p className="text-xs text-muted-foreground">
                      Last 30 days (↑ 2.1% vs previous period)
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="p-4 border rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Today's Shipment Schedule</h3>
                <div className="space-y-2">
                  {ordersData
                    .filter(order => order.status === "processing")
                    .slice(0, 3)
                    .map(order => (
                      <div key={order.id} className="flex justify-between items-center p-2 bg-background rounded-md border">
                        <div>
                          <div className="font-medium">{order.id} - {order.client}</div>
                          <div className="text-xs text-muted-foreground">
                            {order.items} items | €{order.total.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <Button size="sm" variant="outline">
                            <Truck className="h-3 w-3 mr-1" />
                            Ship
                          </Button>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <Button variant="ghost" size="sm" className="mt-2 w-full">View All Pending Shipments</Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Shipping Partners</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-background rounded-md border">
                    <div>
                      <div className="font-medium">Express Delivery Spain</div>
                      <div className="text-xs text-muted-foreground">
                        4 active shipments
                      </div>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded-md border">
                    <div>
                      <div className="font-medium">National Post Service</div>
                      <div className="text-xs text-muted-foreground">
                        8 active shipments
                      </div>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded-md border">
                    <div>
                      <div className="font-medium">Global Logistics</div>
                      <div className="text-xs text-muted-foreground">
                        2 active shipments
                      </div>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="mt-2 w-full">Manage Shipping Partners</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Reports</CardTitle>
              <CardDescription>
                Analytical reports and insights about your inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Stock Level by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px] flex items-center justify-center">
                    <div className="text-muted-foreground italic">Stock Level Chart Placeholder</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Inventory Value by Location</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px] flex items-center justify-center">
                    <div className="text-muted-foreground italic">Inventory Value Chart Placeholder</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Inventory Turnover Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px] flex items-center justify-center">
                    <div className="text-muted-foreground italic">Turnover Rate Chart Placeholder</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Stock Alert Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px] flex items-center justify-center">
                    <div className="text-muted-foreground italic">Stock Alert Chart Placeholder</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Inventory Insights</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-background rounded-md border">
                    <ShoppingCart className="h-5 w-5 text-amber-500" />
                    <div>
                      <div className="font-medium">Low Stock Alert</div>
                      <div className="text-sm text-muted-foreground">
                        3 products are below minimum stock level. Consider restocking soon.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-background rounded-md border">
                    <BarChart4 className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Fast Moving Products</div>
                      <div className="text-sm text-muted-foreground">
                        IceAlarm SOS Pendant and Health Monitor are the fastest moving products this month.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-background rounded-md border">
                    <Truck className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Upcoming Deliveries</div>
                      <div className="text-sm text-muted-foreground">
                        5 stock deliveries expected within the next week.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Inventory Summary
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Stock Movement
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Valuation Report
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Full Inventory
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagement;
