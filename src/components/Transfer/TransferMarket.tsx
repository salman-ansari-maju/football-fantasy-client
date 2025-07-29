import { useState, useEffect } from "react";
import { TransferListing, Team } from "../../types";
import { teamAPI } from "../../services/team";
import { transferAPI } from "../../services/transfer";
import Header from "./Header";
import NoPlayers from "./NoPlayers";
import PlayersListing from "./PlayersListing";

const TransferMarket = () => {
  const [transfers, setTransfers] = useState<TransferListing[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<TransferListing[]>(
    []
  );
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTransferMarket();
    loadUserTeam();
  }, []);

  const loadTransferMarket = async () => {
    try {
      const response = await transferAPI.getTransferMarket();
      if (response.success) {
        setTransfers(response?.data);
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
      <Header
        filteredTransfers={filteredTransfers}
        userTeam={userTeam}
        transfers={transfers}
        setFilteredTransfers={setFilteredTransfers}
      />

      {/* Transfer Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTransfers.map((player) => (
          <PlayersListing
            key={player._id}
            player={player}
            setTransfers={setTransfers}
            loadUserTeam={loadUserTeam}
            userTeam={userTeam}
          />
        ))}
      </div>

      {filteredTransfers.length === 0 && <NoPlayers />}
    </div>
  );
};

export default TransferMarket;
