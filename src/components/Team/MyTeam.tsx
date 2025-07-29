import { useState } from "react";
import { Player, Team } from "../../types";
import SellPlayerModal from "./SellPlayerModel";
import { transferAPI } from "../../services/transfer";
import NoTeam from "./NoTeam";
import Header from "./Header";
import Stats from "./Stats";
import Players from "./Players";

interface MyTeamProps {
  team: Team | null;
  onTeamUpdate: () => void;
}

const MyTeam = ({ team, onTeamUpdate }: MyTeamProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showSellModal, setShowSellModal] = useState(false);

  if (!team) {
    return <NoTeam />;
  }

  const handleSellConfirm = async (askingPrice: number) => {
    if (!selectedPlayer) return;

    try {
      const response = await transferAPI.listPlayerForTransfer(
        selectedPlayer._id,
        askingPrice
      );
      if (response.success) {
        setShowSellModal(false);
        setSelectedPlayer(null);
        onTeamUpdate(); // Refresh team data
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to list player for transfer.";
      alert(errorMessage);
    }
  };

  return (
    <div className="space-y-8">
      {/* Team Header */}
      <Header team={team} />

      {/* Team Stats */}
      <Stats team={team} />

      {/* Squad by Position */}
      <Players
        team={team}
        setSelectedPlayer={setSelectedPlayer}
        setShowSellModal={setShowSellModal}
      />

      {/* Sell Player Modal */}
      {showSellModal && selectedPlayer && (
        <SellPlayerModal
          player={selectedPlayer}
          onConfirm={handleSellConfirm}
          onCancel={() => {
            setShowSellModal(false);
            setSelectedPlayer(null);
          }}
        />
      )}
    </div>
  );
};

export default MyTeam;
