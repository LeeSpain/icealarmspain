
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
import { AuthProvider } from './context/auth/AuthProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageProvider } from './context/LanguageContext';
import SOSPendantPage from './pages/SOSPendantPage';
import MedicalDispenserPage from './pages/MedicalDispenserPage';
import GlucoseMonitorPage from './pages/GlucoseMonitorPage';

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
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['member', 'admin']}>
                <DashboardPage />
              </ProtectedRoute>
            } />
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
            
            {/* Device-specific routes */}
            <Route path="/devices/sos-pendant" element={<SOSPendantPage />} />
            <Route path="/devices/medical-dispenser" element={<MedicalDispenserPage />} />
            <Route path="/devices/glucose-monitor" element={<GlucoseMonitorPage />} />
            
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
