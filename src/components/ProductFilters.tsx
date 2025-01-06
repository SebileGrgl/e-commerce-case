import React, { useState } from "react";
import ProductFilterDrawer from "./ProductFilterDrawer";
import { ProductFiltersProps } from "../utils/types";

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onApplyFilters,
  parameters,
}) => {
  const [filters, setFilters] = useState({
    sortBy: "",
    model: [],
    brand: [],
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="flex-1">
      <ProductFilterDrawer
        filters={filters}
        onFilterChange={handleFilterChange}
        parameters={parameters}
      />
      <button
        className="w-full bg-blue text-white rounded p-2 mt-7"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilters;
