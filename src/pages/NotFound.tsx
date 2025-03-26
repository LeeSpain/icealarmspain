
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/auth";

const NotFound = () => {
  const location = useLocation();
  
  // Use try/catch to prevent errors if auth context is not available
  let isAuthenticated = false;
  let user = null;
  let effectiveRole = '';
  
  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    user = auth.user;
    const storedRole = localStorage.getItem('userRole');
    effectiveRole = user?.role || storedRole || '';
  } catch (error) {
    console.error("Auth context not available:", error);
  }

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const getDashboardLink = () => {
    if (!isAuthenticated) return "/";
    
    switch (effectiveRole) {
      case 'admin':
        return "/admin";
      case 'callcenter':
        return "/call-center";
      default:
        return "/dashboard";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 pt-20">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
          <p className="text-xl text-gray-600 mb-4">Page Not Found</p>
          <p className="text-gray-500 mb-6">
            The page you are looking for ({location.pathname}) doesn't exist or has been moved.
          </p>
          {isAuthenticated ? (
            <div className="space-y-4">
              <Link to={getDashboardLink()} className="inline-block bg-ice-600 text-white px-6 py-3 rounded-md hover:bg-ice-700 transition-colors">
                Return to {effectiveRole === 'admin' ? 'Admin Dashboard' : effectiveRole === 'callcenter' ? 'Call Center' : 'Dashboard'}
              </Link>
              {user && (
                <p className="text-sm text-gray-500 mt-2">
                  Logged in as: {user.email} ({effectiveRole})
                </p>
              )}
            </div>
          ) : (
            <Link to="/" className="inline-block bg-ice-600 text-white px-6 py-3 rounded-md hover:bg-ice-700 transition-colors">
              Return to Home
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
