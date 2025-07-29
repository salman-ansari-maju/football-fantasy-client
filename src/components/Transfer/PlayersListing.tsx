import { useEffect } from "react";
import { Team, TransferListing } from "../../types";
import { DollarSign, ShoppingCart, Star, X } from "lucide-react";
import { transferAPI } from "../../services/transfer";

const PlayersListing = ({
  player,
  setTransfers,
  loadUserTeam,
  userTeam,
}: {
  player: TransferListing;
  setTransfers: React.Dispatch<React.SetStateAction<TransferListing[]>>;
  loadUserTeam: () => Promise<void>;
  userTeam: Team | null;
}) => {
  useEffect(() => {
    loadTransferMarket();
  }, []);

  const loadTransferMarket = async () => {
    try {
      const response = await transferAPI.getTransferMarket();
      if (response.success) {
        setTransfers(response.data);
      }
    } catch (error) {
      console.error("Failed to load transfer market:", error);
    }
  };

  const handleBuyPlayer = async (player: TransferListing) => {
    if (!userTeam) return;

    if (userTeam.budget < player.askingPrice) {
      alert("Insufficient budget to buy this player!");
      return;
    }

    try {
      const response = await transferAPI.buyPlayer(player._id);
      if (response.success) {
        // alert(`Successfully bought ${player.name}!`);
        // Refresh both transfer market and user team
        await loadTransferMarket();
        await loadUserTeam();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to buy player. Please try again.";
      alert(errorMessage);
    }
  };

  const handleRemoveFromMarket = async (player: TransferListing) => {
    try {
      const response = await transferAPI.removePlayerFromTransfer(player._id);
      if (response?.success) {
        // alert(`${player.name} removed from transfer market!`);
        // Refresh transfer market
        await loadTransferMarket();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to remove player from market.";
      alert(errorMessage);
    }
  };

  const isUserPlayer = (player: TransferListing) => {
    return userTeam && player?.teamId?._id === userTeam?._id;
  };

  const canAffordPlayer = (player: TransferListing) => {
    return userTeam && userTeam.budget >= player.askingPrice;
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Goalkeeper":
        return "bg-yellow-100 text-yellow-800";
      case "Defender":
        return "bg-blue-100 text-blue-800";
      case "Midfielder":
        return "bg-green-100 text-green-800";
      case "Attacker":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      key={player?._id}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 transform hover:scale-105"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            {player?.name}
          </h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPositionColor(
              player?.position
            )}`}
          >
            {player?.position}
          </span>
        </div>

        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-yellow-200 px-3 py-1 rounded-full shadow-sm">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-bold text-yellow-700">
            {player.rating}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Age:</span>
          <span className="font-medium">{player?.age} years</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Nationality:</span>
          <span className="font-medium">{player?.nationality}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Team:</span>
          <span className="font-medium">
            {typeof player?.teamId === "object" && player?.teamId?.name
              ? player.teamId.name
              : "Unknown Team"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Market Value:</span>
          <span className="font-medium">${player.price.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-green-700">
            Asking Price:
          </span>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-green-800">
              {player.askingPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {isUserPlayer(player) ? (
        <button
          onClick={() => handleRemoveFromMarket(player)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <X className="w-4 h-4" />
          <span>Remove from Market</span>
        </button>
      ) : (
        <button
          onClick={() => handleBuyPlayer(player)}
          disabled={!canAffordPlayer(player)}
          className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 ${
            canAffordPlayer(player)
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>
            {canAffordPlayer(player) ? "Buy Player" : "Insufficient Budget"}
          </span>
        </button>
      )}
    </div>
  );
};

export default PlayersListing;
