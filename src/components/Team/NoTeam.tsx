import { Users } from "lucide-react";

// This component is displayed when the user has no team

const NoTeam = () => {
  return (
    <div className="text-center py-12">
      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Team Found
      </h3>
      <p className="text-gray-600">Please create a team to get started.</p>
    </div>
  );
};

export default NoTeam;
