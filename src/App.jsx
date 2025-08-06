import { Toaster } from "react-hot-toast";
// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProviderRegister from "./pages/ProviderRegister";

// Dashboard Pages
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ProvidersManagement from "./pages/Dashboard/ProvidersManagement";

// Components
import AdminProfilePage from "./pages/Dashboard/AdminProfilePage";

function App() {
  const { user } = useAuth();

  // Helper function to determine the appropriate dashboard based on user role
  const getDashboardForRole = () => {
    if (!user) return <Navigate to="/login" />;

    switch (user.role) {
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.PROVIDER:
        return <ProviderDashboard />;
      case UserRole.USER:
        return <UserDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/provider" element={<ProviderRegister />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
