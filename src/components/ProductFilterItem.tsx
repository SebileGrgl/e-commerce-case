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
    <div>
      <p className="font-thin text-sm mb-2">{label}</p>
      <div className="bg-white shadow-md p-5  h-48 overflow-y-auto rounded">
        {searchEnabled && (
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-gray-100 rounded p-1 mb-4"
          />
        )}
        <div className="flex flex-col gap-1">
          {filteredOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 font-light"
            >
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
      </div>
    </div>
  );
};

export default ProductFilterItem;
