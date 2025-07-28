import { useState } from "react";
import { Player, Team } from "../../types";
import PlayerCard from "./PlayerCard";
import { Users, Trophy, DollarSign, Target } from "lucide-react";
import SellPlayerModal from "./SellPlayerModel";
import { transferAPI } from "../../services/transfer";

interface MyTeamProps {
  team: Team | null;
  onTeamUpdate: () => void;
}

const MyTeam = ({ team, onTeamUpdate }: MyTeamProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showSellModal, setShowSellModal] = useState(false);

  if (!team) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Team Found
        </h3>
        <p className="text-gray-600">Please create a team to get started.</p>
      </div>
    );
  }

  const playersByPosition = {
    Goalkeeper: team.players.filter((p) => p.position === "Goalkeeper"),
    Defender: team.players.filter((p) => p.position === "Defender"),
    Midfielder: team.players.filter((p) => p.position === "Midfielder"),
    Attacker: team.players.filter((p) => p.position === "Attacker"),
  };

  const totalValue = team.players.reduce(
    (sum, player) => sum + player.price,
    0
  );

  const handleSellPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setShowSellModal(true);
  };

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
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-2xl p-8 shadow-2xl border-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-shadow">{team.name}</h1>
            <p className="text-green-100 text-lg">Your Championship Squad</p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-1">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-200 text-sm">Active Squad</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-green-500 p-4 rounded-full shadow-lg">
              <Trophy className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-3xl font-bold text-gray-900">
            {team.players.length}
          </h3>
          <p className="text-gray-600">Total Players</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500 hover:shadow-xl transition-shadow">
          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-3xl font-bold text-gray-900">
            ${team.budget.toLocaleString()}
          </h3>
          <p className="text-gray-600">Available Budget</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
          <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h3 className="text-3xl font-bold text-gray-900">
            ${totalValue.toLocaleString()}
          </h3>
          <p className="text-gray-600">Squad Value</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
          <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="text-3xl font-bold text-gray-900">
            {Math.round(
              team.players.reduce((sum, p) => sum + p.rating, 0) /
                team.players.length
            )}
          </h3>
          <p className="text-gray-600">Avg Rating</p>
        </div>
      </div>

      {/* Squad by Position */}
      {Object.entries(playersByPosition).map(([position, players]) => (
        <div
          key={position}
          className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              {position}s
            </h2>
            <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              {players.length} players
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {players.map((player: Player) => (
              <PlayerCard
                key={player._id}
                player={player}
                showPrice={true}
                onAction={() => handleSellPlayer(player)}
                actionLabel={
                  player.isTransferListed ? "Listed for Sale" : "Sell Player"
                }
                actionColor={player.isTransferListed ? "blue" : "green"}
                actionDisabled={player.isTransferListed}
              />
            ))}
          </div>
        </div>
      ))}

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
