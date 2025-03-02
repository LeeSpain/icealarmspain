
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/mode-toggle';

// Regular Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Demo from './pages/Demo';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import DevicesPage from './pages/DevicesPage';
import SOSPendantPage from './pages/SOSPendantPage';
import GlucoseMonitorPage from './pages/GlucoseMonitorPage';
import MedicalDispenserPage from './pages/MedicalDispenserPage';

// Member Pages
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HealthMetricsPage from './pages/HealthMetricsPage';
import MedicationsPage from './pages/MedicationsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import SOSPendantMemberPage from './pages/member/SOSPendantPage';
import MedicalDispenserMemberPage from './pages/member/MedicalDispenserPage';
import GlucoseMonitorMemberPage from './pages/member/GlucoseMonitorPage';

// Join Page
import Join from './pages/Join';
import OnboardingQuestionnaire from './pages/OnboardingQuestionnaire';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';

// Call Center Pages
import CallCenterDashboard from './pages/CallCenterDashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ice-theme-preference">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/sos-pendant" element={<SOSPendantPage />} />
        <Route path="/glucose-monitor" element={<GlucoseMonitorPage />} />
        <Route path="/medical-dispenser" element={<MedicalDispenserPage />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/join" element={<Join />} />
        <Route path="/onboarding" element={<OnboardingQuestionnaire />} />
        
        {/* Member Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpSupportPage />} />
        <Route path="/health/metrics" element={<HealthMetricsPage />} />
        <Route path="/health/medications" element={<MedicationsPage />} />
        <Route path="/devices/sos-pendant" element={<SOSPendantMemberPage />} />
        <Route path="/devices/glucose-monitor" element={<GlucoseMonitorMemberPage />} />
        <Route path="/devices/medical-dispenser" element={<MedicalDispenserMemberPage />} />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Call Center Dashboard */}
        <Route path="/call-center" element={<CallCenterDashboard />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
