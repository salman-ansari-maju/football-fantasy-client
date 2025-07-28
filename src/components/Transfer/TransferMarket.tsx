import { useState, useEffect } from "react";
import { TransferListing, Team } from "../../types";
import { teamAPI } from "../../services/team";
import {
  Search,
  Filter,
  DollarSign,
  Users,
  ShoppingCart,
  X,
} from "lucide-react";
import { transferAPI } from "../../services/transfer";

const TransferMarket = () => {
  const [transfers, setTransfers] = useState<TransferListing[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<TransferListing[]>(
    []
  );
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  useEffect(() => {
    loadTransferMarket();
    loadUserTeam();
  }, []);

  useEffect(() => {
    filterTransfers();
  }, [transfers, searchTerm, positionFilter, priceFilter, teamFilter]);

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

  const loadUserTeam = async () => {
    try {
      const response = await teamAPI.getTeam();
      if (response.success) {
        setUserTeam(response.data);
      }
    } catch (error) {
      console.error("Failed to load user team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTransfers = () => {
    let filtered = [...transfers];

    // Search by player name
    if (searchTerm) {
      filtered = filtered.filter((transfer) =>
        transfer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by team name
    if (teamFilter) {
      filtered = filtered.filter((transfer) =>
        transfer.teamId.name.toLowerCase().includes(teamFilter.toLowerCase())
      );
    }

    // Filter by position
    if (positionFilter) {
      filtered = filtered.filter(
        (transfer) => transfer.position === positionFilter
      );
    }

    // Filter by price range
    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter((transfer) => {
        const price = transfer.askingPrice;
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    setFilteredTransfers(filtered);
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
      if (response.success) {
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
    return userTeam && player.teamId._id === userTeam._id;
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Transfer Market
            </h1>
            <p className="text-gray-600">
              Buy and sell players to build your dream team
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">
                {filteredTransfers.length} players available
              </span>
            </div>
            {userTeam && (
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">
                  ${userTeam.budget.toLocaleString()} budget
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search by player name */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Search by team name */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter by team..."
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Position filter */}
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Positions</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Attacker">Attacker</option>
          </select>

          {/* Price filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Prices</option>
            <option value="0-1000000">Under $1M</option>
            <option value="1000000-3000000">$1M - $3M</option>
            <option value="3000000-5000000">$3M - $5M</option>
            <option value="5000000">Above $5M</option>
          </select>
        </div>
      </div>

      {/* Transfer Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTransfers.map((player) => (
          <div
            key={player._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 transform hover:scale-105"
          >
            {/* Player Info */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {player.name}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPositionColor(
                    player.position
                  )}`}
                >
                  {player.position}
                </span>
              </div>
              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-yellow-200 px-3 py-1 rounded-full shadow-sm">
                <span className="text-sm font-bold text-yellow-700">
                  {player.rating}/10
                </span>
              </div>
            </div>

            {/* Player Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium">{player.age} years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Nationality:</span>
                <span className="font-medium">{player.nationality}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Team:</span>
                <span className="font-medium">{player.teamId.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Market Value:</span>
                <span className="font-medium">
                  ${player.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Asking Price */}
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

            {/* Action Button */}
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
                  {canAffordPlayer(player)
                    ? "Buy Player"
                    : "Insufficient Budget"}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>

      {filteredTransfers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Players Found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search filters or check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransferMarket;
