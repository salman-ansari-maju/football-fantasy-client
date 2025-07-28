import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Team, ApiResponse } from "../types";
import { teamAPI } from "../services/team";
import Layout from "../components/Layout";
import TeamCreation from "../components/Team/TeamCreation";
import MyTeam from "../components/Team/MyTeam";
import TransferMarket from "../components/Transfer/TransferMarket";
import Navigation from "../components/Navigation";
import { AxiosError } from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"home" | "transfers">("home");

  useEffect(() => {
    if (user && activeTab === "home") {
      loadTeam();
    }
  }, [user, activeTab]);

  const loadTeam = async () => {
    if (!user) return;

    setIsLoading(true);
    setError("");

    try {
      const response: ApiResponse<Team> = await teamAPI.getTeam();

      if (response.success) {
        setTeam(response.data);
      } else {
        // No team found, user needs to create one
        setTeam(null);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        // No team found, user needs to create one
        setTeam(null);
      } else {
        setError("Failed to load team data");
        console.error("Failed to load team:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeamCreated = () => {
    loadTeam();
  };

  const handleTeamUpdate = () => {
    loadTeam();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4 max-w-md mx-auto">
            {error}
          </div>
          <button
            onClick={loadTeam}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  // Show team creation if user doesn't have a team
  if (!team) {
    return (
      <Layout>
        <TeamCreation onTeamCreated={handleTeamCreated} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "home" && (
        <MyTeam team={team} onTeamUpdate={handleTeamUpdate} />
      )}

      {activeTab === "transfers" && <TransferMarket />}
    </Layout>
  );
};

export default Dashboard;
