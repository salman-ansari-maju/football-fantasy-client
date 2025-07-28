import { axiosInstance } from "./axiosInstance";

// Team API functions
export const transferAPI = {
  // Transfer Market APIs
  getTransferMarket: async () => {
    try {
      const response = await axiosInstance.get("/transfer");
      return response.data;
    } catch (error) {
      console.error("Get transfer market API error:", error);
      throw error;
    }
  },

  listPlayerForTransfer: async (playerId: string, askingPrice: number) => {
    try {
      const response = await axiosInstance.post(
        `/transfer/player/${playerId}`,
        {
          askingPrice,
        }
      );
      return response.data;
    } catch (error) {
      console.error("List player for transfer API error:", error);
      throw error;
    }
  },

  buyPlayer: async (playerId: string) => {
    try {
      const response = await axiosInstance.post(`/transfer/buy/${playerId}`);
      return response.data;
    } catch (error) {
      console.error("Buy player API error:", error);
      throw error;
    }
  },

  removePlayerFromTransfer: async (playerId: string) => {
    try {
      const response = await axiosInstance.patch(
        `transfer/player/${playerId}/remove-transfer`
      );
      return response.data;
    } catch (error) {
      console.error("Remove player from transfer API error:", error);
      throw error;
    }
  },
};
