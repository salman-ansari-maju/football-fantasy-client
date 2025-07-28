import { Player } from "../../types";
import { Star, MapPin, Calendar } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  showPrice?: boolean;
  onAction?: (player: Player) => void;
  actionLabel?: string;
  actionColor?: "green" | "red" | "blue";
  actionDisabled?: boolean;
}

const PlayerCard = ({
  player,
  showPrice = false,
  onAction,
  actionLabel,
  actionColor = "green",
  actionDisabled = false,
}: PlayerCardProps) => {
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

  const getActionColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-600 hover:bg-red-700";
      case "blue":
        return "bg-blue-600 hover:bg-blue-700";
      default:
        return "bg-green-600 hover:bg-green-700";
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 transform hover:scale-105 ${
        player.isTransferListed ? "ring-2 ring-blue-200 bg-blue-50" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            {player.name}
          </h3>
          {player.isTransferListed && (
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-2">
              Listed for ${player.askingPrice?.toLocaleString()}
            </span>
          )}
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPositionColor(
              player.position
            )}`}
          >
            {player.position}
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
        <div className="flex items-center text-sm text-gray-700">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="font-medium">{player.age} years old</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="font-medium">{player.nationality}</span>
        </div>
        {showPrice && (
          <div className="text-xl font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
            ${player.price.toLocaleString()}
          </div>
        )}
      </div>

      {onAction && actionLabel && (
        <button
          onClick={() => onAction(player)}
          disabled={actionDisabled}
          className={`w-full text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
            actionDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : getActionColorClasses(actionColor)
          }`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default PlayerCard;
