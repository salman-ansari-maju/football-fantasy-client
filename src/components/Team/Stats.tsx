import { DollarSign, Target, Trophy, Users } from "lucide-react";
import { Team } from "../../types";

const Stats = ({ team }: { team: Team }) => {
  const totalValue = team?.players?.reduce(
    (sum, player) => sum + player.price,
    0
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
        <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <h3 className="text-3xl font-bold text-gray-900">
          {team?.players?.length}
        </h3>
        <p className="text-gray-600">Total Players</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500 hover:shadow-xl transition-shadow">
        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <h3 className="text-3xl font-bold text-gray-900">
          ${team?.budget?.toLocaleString()}
        </h3>
        <p className="text-gray-600">Available Budget</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
        <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
        <h3 className="text-3xl font-bold text-gray-900">
          ${totalValue?.toLocaleString()}
        </h3>
        <p className="text-gray-600">Squad Value</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
        <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
        <h3 className="text-3xl font-bold text-gray-900">
          {Math.round(
            team?.players?.reduce((sum, p) => sum + p.rating, 0) /
              team?.players?.length
          )}
        </h3>
        <p className="text-gray-600">Avg Rating</p>
      </div>
    </div>
  );
};

export default Stats;
