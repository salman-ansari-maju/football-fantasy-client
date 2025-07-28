import { Home, ShoppingCart } from "lucide-react";

interface NavigationProps {
  activeTab: "home" | "transfers";
  onTabChange: (tab: "home" | "transfers") => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "home" as const, label: "My Team", icon: Home },
    { id: "transfers" as const, label: "Transfer Market", icon: ShoppingCart },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 mb-8 border border-green-100">
      <nav className="flex space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
