import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Join from './pages/Join';
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import CallCenterDashboard from './pages/CallCenterDashboard';
import ProfilePage from './pages/ProfilePage';
import OnboardingQuestionnaire from './pages/OnboardingQuestionnaire';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Checkout from './pages/Checkout';
import Commercial from './pages/Commercial';
import { AuthProvider } from './context/auth/AuthProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageProvider } from './context/LanguageContext';
import SOSPendantPage from './pages/SOSPendantPage';
import MedicalDispenserPage from './pages/MedicalDispenserPage';
import GlucoseMonitorPage from './pages/GlucoseMonitorPage';
import DashboardSOSPendantPage from './pages/dashboard/DashboardSOSPendantPage';
import DashboardGlucoseMonitorPage from './pages/dashboard/DashboardGlucoseMonitorPage';
import DashboardMedicalDispenserPage from './pages/dashboard/DashboardMedicalDispenserPage';
import DashboardHealthMetricsPage from './pages/dashboard/DashboardHealthMetricsPage';
import DashboardMedicationsPage from './pages/dashboard/DashboardMedicationsPage';
import DashboardEmergencyContactsPage from './pages/dashboard/DashboardEmergencyContactsPage';
import DashboardSettingsPage from './pages/dashboard/DashboardSettingsPage';
import DashboardHelpPage from './pages/dashboard/DashboardHelpPage';
import DashboardProfilePage from './pages/dashboard/DashboardProfilePage';
import DashboardChatPage from './pages/dashboard/DashboardChatPage';
import DashboardPersonalDetailsPage from './pages/dashboard/DashboardPersonalDetailsPage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={5000} />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/commercial" element={<Commercial />} />
            
            {/* Public device info pages */}
            <Route path="/devices/sos-pendant" element={<SOSPendantPage />} />
            <Route path="/devices/medical-dispenser" element={<MedicalDispenserPage />} />
            <Route path="/devices/glucose-monitor" element={<GlucoseMonitorPage />} />
            
            {/* Dashboard route with nested routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            {/* Nested dashboard routes */}
            <Route path="/dashboard/devices/sos-pendant" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardSOSPendantPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/devices/glucose-monitor" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardGlucoseMonitorPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/devices/medical-dispenser" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardMedicalDispenserPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/health/metrics" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardHealthMetricsPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/health/medications" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardMedicationsPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/emergency-contacts" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardEmergencyContactsPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/profile" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/settings" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardSettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/help" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardHelpPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/chat" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardChatPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/personal-details" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardPersonalDetailsPage />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/call-center" element={
              <ProtectedRoute allowedRoles={['callcenter']}>
                <CallCenterDashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingQuestionnaire />
              </ProtectedRoute>
            } />
            
            {/* Add additional routes for product details, etc. */}
            <Route path="/product/:id" element={<Products />} />
            <Route path="/devices" element={<Products />} />
            <Route path="/pricing" element={<Join />} />
            <Route path="/help" element={<Contact />} />
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
