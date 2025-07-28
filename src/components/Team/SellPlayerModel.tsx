import React, { useState } from "react";
import { Player } from "../../types";
import { X, DollarSign, TrendingUp } from "lucide-react";

interface SellPlayerModalProps {
  player: Player;
  onConfirm: (askingPrice: number) => void;
  onCancel: () => void;
}

const SellPlayerModal = ({
  player,
  onConfirm,
  onCancel,
}: SellPlayerModalProps) => {
  const [askingPrice, setAskingPrice] = useState(player.price);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (askingPrice < player.price * 0.5) {
      setError("Asking price cannot be less than 50% of market value");
      return;
    }

    if (askingPrice > player.price * 3) {
      setError("Asking price cannot be more than 300% of market value");
      return;
    }

    onConfirm(askingPrice);
  };

  const suggestedPrices = [
    { label: "Market Value", value: player.price },
    { label: "110% Market", value: Math.floor(player.price * 1.1) },
    { label: "125% Market", value: Math.floor(player.price * 1.25) },
    { label: "150% Market", value: Math.floor(player.price * 1.5) },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sell Player</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Player Info */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-green-800 font-bold text-lg">
                {player.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{player.name}</h3>
              <p className="text-sm text-gray-600">
                {player.position} • {player.age} years
              </p>
              <p className="text-sm text-green-700 font-medium">
                Market Value: ${player.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="askingPrice"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Asking Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="askingPrice"
                type="number"
                min={Math.floor(player.price * 0.5)}
                max={Math.floor(player.price * 3)}
                value={askingPrice}
                onChange={(e) => setAskingPrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter asking price"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Range: ${Math.floor(player.price * 0.5).toLocaleString()} - $
              {Math.floor(player.price * 3).toLocaleString()}
            </p>
          </div>

          {/* Quick Price Suggestions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Suggestions
            </label>
            <div className="grid grid-cols-2 gap-2">
              {suggestedPrices.map((suggestion) => (
                <button
                  key={suggestion.label}
                  type="button"
                  onClick={() => setAskingPrice(suggestion.value)}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <span className="text-sm font-medium">
                    {suggestion.label}
                  </span>
                  <span className="text-sm text-green-600">
                    ${suggestion.value.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Profit Indicator */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Potential Profit:
              </span>
              <div className="flex items-center space-x-1">
                <TrendingUp
                  className={`w-4 h-4 ${
                    askingPrice > player.price
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                />
                <span
                  className={`font-bold ${
                    askingPrice > player.price
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ${(askingPrice - player.price).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              List for Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPlayerModal;
