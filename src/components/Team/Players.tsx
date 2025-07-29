import { Player, Team } from "../../types";
import PlayerCard from "./PlayerCard";

const Players = ({
  team,
  setSelectedPlayer,
  setShowSellModal,
}: {
  team: Team;
  setSelectedPlayer: (player: Player) => void;
  setShowSellModal: (show: boolean) => void;
}) => {
  const playersByPosition = {
    Goalkeeper: team.players.filter((p) => p.position === "Goalkeeper"),
    Defender: team.players.filter((p) => p.position === "Defender"),
    Midfielder: team.players.filter((p) => p.position === "Midfielder"),
    Attacker: team.players.filter((p) => p.position === "Attacker"),
  };

  const handleSellPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setShowSellModal(true);
  };
  return (
    <div>
      {" "}
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
                key={player?._id}
                player={player}
                showPrice={true}
                onAction={() => handleSellPlayer(player)}
                actionLabel={
                  player?.isTransferListed ? "Listed for Sale" : "Sell Player"
                }
                actionColor={player?.isTransferListed ? "blue" : "green"}
                actionDisabled={player?.isTransferListed}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Players;
