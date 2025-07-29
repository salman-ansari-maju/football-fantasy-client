interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
}

const Dropdown = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: DropdownProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
    >
      <option value="">{placeholder}</option>
      {options?.map((option) => (
        <option key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
