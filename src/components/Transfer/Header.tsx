import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import InputWithIcon from "./InputField";
import Dropdown from "./Dropdown";
import Stats from "./Stats";
import { Team, TransferListing } from "../../types";

const priceOptions = [
  { value: "0-1000000", label: "Under $1M" },
  { value: "1000000-3000000", label: "$1M - $3M" },
  { value: "3000000-5000000", label: "$3M - $5M" },
  { value: "5000000", label: "Above $5M" },
];

const positionOptions = [
  { value: "Goalkeeper", label: "Goalkeeper" },
  { value: "Defender", label: "Defender" },
  { value: "Midfielder", label: "Midfielder" },
  { value: "Attacker", label: "Attacker" },
];

const Header = ({
  filteredTransfers,
  userTeam,
  transfers,
  setFilteredTransfers,
}: {
  filteredTransfers: TransferListing[];
  userTeam: Team | null;
  transfers: TransferListing[];
  setFilteredTransfers: React.Dispatch<React.SetStateAction<TransferListing[]>>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  useEffect(() => {
    filterTransfers();
  }, [transfers, searchTerm, positionFilter, priceFilter, teamFilter]);

  const filterTransfers = () => {
    let filtered = [...transfers];

    // Search by player name
    if (searchTerm) {
      filtered = filtered.filter((transfer) =>
        transfer?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    }

    // Filter by team name
    if (teamFilter) {
      filtered = filtered.filter((transfer) =>
        transfer?.teamId?.name
          ?.toLowerCase()
          .includes(teamFilter?.toLowerCase())
      );
    }

    // Filter by position
    if (positionFilter) {
      filtered = filtered.filter(
        (transfer) => transfer?.position === positionFilter
      );
    }

    // Filter by price range
    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered?.filter((transfer) => {
        const price = transfer?.askingPrice;
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    setFilteredTransfers(filtered);
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <Stats filteredTransfers={filteredTransfers} userTeam={userTeam} />
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search by player name */}
        <InputWithIcon
          icon={Search}
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search players..."
        />

        {/* Search by team name */}
        <InputWithIcon
          icon={Filter}
          value={teamFilter}
          onChange={setTeamFilter}
          placeholder="Filter by team..."
        />

        {/* Position filter */}
        <Dropdown
          value={positionFilter}
          onChange={setPositionFilter}
          options={positionOptions}
          placeholder="All Positions"
        />

        {/* Price filter */}
        <Dropdown
          value={priceFilter}
          onChange={setPriceFilter}
          options={priceOptions}
          placeholder="All Prices"
        />
      </div>
    </div>
  );
};

export default Header;
