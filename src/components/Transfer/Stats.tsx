import { DollarSign, Users } from "lucide-react";
import { Team, TransferListing } from "../../types";

const Stats = ({
  filteredTransfers,
  userTeam,
}: {
  filteredTransfers: TransferListing[];
  userTeam: Team | null;
}) => {
  return (
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
              ${userTeam?.budget.toLocaleString()} budget
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
