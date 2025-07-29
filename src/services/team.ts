import { axiosInstance } from "./axiosInstance";

// Team API functions
export const teamAPI = {
  getTeam: async () => {
    try {
      const response = await axiosInstance.get("/team");
      return response.data;
    } catch (error) {
      console.error("Get team API error:", error);
      throw error;
    }
  },

  createTeam: async () => {
    try {
      const response = await axiosInstance.post("/team/create");
      return response.data;
    } catch (error) {
      console.error("Create team API error:", error);
      throw error;
    }
  },
};
