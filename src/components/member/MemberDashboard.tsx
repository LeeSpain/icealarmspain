
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Activity, 
  ShoppingCart, 
  Package, 
  Bell, 
  Settings, 
  Plus,
  Check,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";

// Mock data for devices/products the user owns
const mockUserDevices = [
  { id: "dev-1", name: "IceAlarm Pro", status: "active", lastChecked: "Today, 9:30 AM", batteryLevel: "92%" },
  { id: "dev-2", name: "Medical Dispenser", status: "active", lastChecked: "Today, 8:15 AM", batteryLevel: "87%" }
];

// Mock data for available products to purchase
const availableProducts = [
  { id: "prod-1", name: "IceAlarm Basic", price: "€249", description: "Essential emergency monitoring device" },
  { id: "prod-2", name: "IceAlarm Pro", price: "€399", description: "Advanced monitoring with additional sensors" },
  { id: "prod-3", name: "Medical Dispenser", price: "€199", description: "Smart medication management system" },
  { id: "prod-4", name: "Health Wristband", price: "€129", description: "24/7 health tracking wristband" }
];

const MetricCard = ({ title, value, icon, status = "normal" }) => {
  const statusColors = {
    normal: "bg-green-50 text-green-600",
    warning: "bg-amber-50 text-amber-600",
    alert: "bg-red-50 text-red-600"
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {status !== "normal" && (
          <div className={`mt-2 text-xs px-2 py-1 rounded-full self-start inline-block ${statusColors[status]}`}>
            {status === "warning" ? "Needs attention" : "Critical"}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const MemberDashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const isInCart = cart.some(item => item.id === product.id);
    if (!isInCart) {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.info(`${product.name} is already in your cart`);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.info("Item removed from cart");
  };

  const checkout = () => {
    if (cart.length > 0) {
      toast.success("Order submitted successfully!");
      setCart([]);
    } else {
      toast.error("Your cart is empty");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">{language === 'en' ? 'Member Dashboard' : 'Panel de Miembro'}</h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? `Welcome back, ${user?.name || 'Member'}` 
              : `Bienvenido de nuevo, ${user?.name || 'Miembro'}`}
          </p>
        </div>
        <Button onClick={() => setShowAddProducts(!showAddProducts)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {showAddProducts 
            ? (language === 'en' ? 'Hide Store' : 'Ocultar Tienda') 
            : (language === 'en' ? 'Add Products' : 'Añadir Productos')}
        </Button>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard 
          title={language === 'en' ? "Active Devices" : "Dispositivos Activos"} 
          value={mockUserDevices.length.toString()} 
          icon={<Activity size={18} />} 
        />
        <MetricCard 
          title={language === 'en' ? "Alert Status" : "Estado de Alerta"} 
          value={language === 'en' ? "All Clear" : "Todo Bien"} 
          icon={<Bell size={18} />} 
        />
        <MetricCard 
          title={language === 'en' ? "Next Check-up" : "Próxima Revisión"} 
          value="17/03/2025" 
          icon={<AlertTriangle size={18} />} 
          status="warning"
        />
      </div>

      {/* My Devices Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{language === 'en' ? 'My Devices' : 'Mis Dispositivos'}</CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Manage Devices' : 'Gestionar Dispositivos'}
            </Button>
          </div>
          <CardDescription>
            {language === 'en' 
              ? 'Manage your connected ICE Alarm devices' 
              : 'Gestiona tus dispositivos ICE Alarm conectados'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockUserDevices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Device' : 'Dispositivo'}</TableHead>
                  <TableHead>{language === 'en' ? 'Status' : 'Estado'}</TableHead>
                  <TableHead>{language === 'en' ? 'Last Checked' : 'Última Revisión'}</TableHead>
                  <TableHead>{language === 'en' ? 'Battery' : 'Batería'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUserDevices.map(device => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">{device.name}</TableCell>
                    <TableCell>
                      <span className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        {device.status === 'active' 
                          ? (language === 'en' ? 'Active' : 'Activo') 
                          : (language === 'en' ? 'Inactive' : 'Inactivo')}
                      </span>
                    </TableCell>
                    <TableCell>{device.lastChecked}</TableCell>
                    <TableCell>{device.batteryLevel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'No devices yet' : 'Aún no hay dispositivos'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'en' 
                  ? 'You don\'t have any devices connected to your account yet.' 
                  : 'Aún no tienes dispositivos conectados a tu cuenta.'}
              </p>
              <Button onClick={() => setShowAddProducts(true)}>
                <Plus className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Add Your First Device' : 'Añade Tu Primer Dispositivo'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shopping Section (conditionally rendered) */}
      {showAddProducts && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Add New Products' : 'Añadir Nuevos Productos'}</CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Expand your ICE Alarm ecosystem with our products' 
                  : 'Amplía tu ecosistema ICE Alarm con nuestros productos'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {availableProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-ice-100 to-ice-300 flex items-center justify-center">
                      <Package className="h-12 w-12 text-ice-600" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="text-sm">{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <div className="font-bold">{product.price}</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => addToCart(product)}
                        className="text-ice-600 border-ice-300 hover:bg-ice-50"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'Add to Cart' : 'Añadir'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shopping Cart */}
          {cart.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {language === 'en' ? 'Your Cart' : 'Tu Carrito'}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'en' ? 'Product' : 'Producto'}</TableHead>
                      <TableHead>{language === 'en' ? 'Price' : 'Precio'}</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Remove</span>
                            <span className="text-red-500">×</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <span className="text-muted-foreground">
                    {language === 'en' ? 'Total: ' : 'Total: '}
                  </span>
                  <span className="font-bold">
                    €{cart.reduce((sum, item) => sum + parseInt(item.price.replace('€', '')), 0)}
                  </span>
                </div>
                <Button onClick={checkout}>
                  <Check className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Checkout' : 'Finalizar Compra'}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Test Alarm' : 'Probar Alarma'}
          </Button>
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            {language === 'en' ? 'View Reports' : 'Ver Informes'}
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Account Settings' : 'Configuración de Cuenta'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDashboard;
