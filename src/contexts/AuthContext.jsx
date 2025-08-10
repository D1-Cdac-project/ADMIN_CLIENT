import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { UserRole, ProviderStatus } from "../types";
import {
  adminLogin as apiAdminLogin,
  adminLogout as apiAdminLogout,
  addUser as apiAddUser,
  addProvider as apiAddProvider,
  approveOrRejectRequest,
} from "../services/api";
import { adminSocketService } from "../services/socket";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on initial render
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiAdminLogin({ email, password });
      if (response && response.status === 200) {
        if (
          !response.data.admin ||
          !response.data.admin.email ||
          !response.data.admin._id
        ) {
          throw new Error("Invalid response data: Missing admin email or _id");
        }
        const userData = {
          email: response.data.admin.email,
          role: UserRole.ADMIN,
          createdAt: new Date().toISOString(),
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
        adminSocketService.connect(response.data.admin._id);
        toast.success("Login successful!");
        return true;
      } else if (response.status === 404 || response.status === 400) {
        throw new Error("Invalid email or password");
      } else {
        throw new Error(
          `Login failed: Server responded with status ${response?.status}`
        );
      }
    } catch (error) {
      console.error("Login error:", error.response || error);
      throw new Error(
        error.response?.data?.message || error.message || "Failed to login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    try {
      if (userData.role === UserRole.USER) {
        await apiAddUser({
          fullName: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber || "1234567890",
          password: userData.password,
        });
        toast.success("User created successfully!");
      } else {
        throw new Error("Invalid registration type");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register provider function
  const registerProvider = async (providerData) => {
    setIsLoading(true);
    try {
      await apiAddProvider({
        name: providerData.name,
        email: providerData.email,
        password: providerData.password,
        phoneNumber: providerData.phone,
      });
      toast.success("Provider created successfully!");
    } catch (error) {
      console.error("Provider registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Approve provider function
  const approveProvider = async (providerId) => {
    setIsLoading(true);
    try {
      await approveOrRejectRequest({
        providerId,
        status: "approved",
      });
      toast.success("Provider approved successfully!");
    } catch (error) {
      console.error("Approve provider error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Deny provider function
  const denyProvider = async (providerId) => {
    setIsLoading(true);
    try {
      await approveOrRejectRequest({
        providerId,
        status: "rejected",
      });
      toast.success("Provider rejected successfully!");
    } catch (error) {
      console.error("Deny provider error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiAdminLogout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      adminSocketService.disconnect();
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      adminSocketService.disconnect();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        registerProvider,
        approveProvider,
        denyProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
