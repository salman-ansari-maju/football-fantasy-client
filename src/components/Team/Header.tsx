import { Trophy } from "lucide-react";
import { Team } from "../../types";

const Header = ({ team }: { team: Team }) => {
  return (
    <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-2xl p-8 shadow-2xl border-4 border-green-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-3 text-shadow">{team?.name}</h1>
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
  );
};

export default Header;
