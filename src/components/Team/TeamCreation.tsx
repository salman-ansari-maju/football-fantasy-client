import { useState } from "react";
import { Users, Trophy, DollarSign } from "lucide-react";
import { teamAPI } from "../../services/team";
import { useAuth } from "../../context/AuthContext";
import { ApiResponse, Team } from "../../types";

interface TeamCreationProps {
  onTeamCreated: () => void;
}

const TeamCreation = ({ onTeamCreated }: TeamCreationProps) => {
  const [teamName, setTeamName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError("");

    try {
      const response: ApiResponse<Team> = await teamAPI.createTeam(teamName);

      if (response.success) {
        // Team created successfully
        onTeamCreated();
      } else {
        throw new Error(response.message || "Failed to create team");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to create team"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Team
          </h2>
          <p className="text-gray-600">
            Welcome to Football Manager! Let's create your team and get started.
          </p>
        </div>

        {/* Team Creation Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">$5,000,000</h3>
            <p className="text-sm text-gray-600">Starting Budget</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">20 Players</h3>
            <p className="text-sm text-gray-600">Complete Squad</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Ready to Play</h3>
            <p className="text-sm text-gray-600">Instant Setup</p>
          </div>
        </div>

        {/* Squad Composition */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Squad Will Include:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">
                3
              </div>
              <p className="text-sm font-medium">Goalkeepers</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">
                6
              </div>
              <p className="text-sm font-medium">Defenders</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">
                6
              </div>
              <p className="text-sm font-medium">Midfielders</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 text-red-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">
                5
              </div>
              <p className="text-sm font-medium">Attackers</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="teamName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your team name"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Team..." : "Create Team"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamCreation;
