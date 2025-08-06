import { Toaster } from "react-hot-toast";
// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProviderRegister from "./pages/ProviderRegister";

function App() {
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
