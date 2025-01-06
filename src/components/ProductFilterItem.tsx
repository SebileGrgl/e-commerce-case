import { useState } from "react";
import { ProductFilterItemProps } from "../utils/types";

const ProductFilterItem: React.FC<ProductFilterItemProps> = ({
  type,
  searchEnabled = false,
  label,
  value,
  options,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValues, setSelectedValues] = useState<string | string[]>(
    value
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleChange = (value: string) => {
    if (type === "radio") {
      setSelectedValues(value);
      onChange(value);
    } else {
      const updatedValues = selectedValues.includes(value)
        ? (selectedValues as string[]).filter((val) => val !== value)
        : [...(selectedValues as string[]), value];
      setSelectedValues(updatedValues);
      onChange(updatedValues);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="filter">
      {label}
      {searchEnabled && (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      )}
      {filteredOptions.map((option) => (
        <label key={option.value}>
          <input
            type={type}
            value={option.value}
            checked={
              type === "radio"
                ? selectedValues === option.value
                : (selectedValues as string[]).includes(option.value)
            }
            onChange={() => handleChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default ProductFilterItem;
