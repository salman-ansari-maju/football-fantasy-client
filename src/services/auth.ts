import { axiosInstance } from "./axiosInstance";

// Authentication API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.error("Logout API error:", error);
      throw error;
    }
  },
};
