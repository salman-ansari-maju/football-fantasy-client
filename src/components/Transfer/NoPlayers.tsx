import { Users } from "lucide-react";

const NoPlayers = () => {
  return (
    <div className="text-center py-12">
      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Players Found
      </h3>
      <p className="text-gray-600">
        Try adjusting your search filters or check back later.
      </p>
    </div>
  );
};

export default NoPlayers;
