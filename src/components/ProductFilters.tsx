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
    <div>
      <ProductFilterDrawer
        filters={filters}
        onFilterChange={handleFilterChange}
        parameters={parameters}
      />
      <button onClick={handleApplyFilters}>Filtreleri Uygula</button>
    </div>
  );
};

export default ProductFilters;
