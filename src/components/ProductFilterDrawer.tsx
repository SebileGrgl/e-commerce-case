import React from "react";
import ProductFilterItem from "./ProductFilterItem";
import { ProductFilterDrawerProps } from "../utils/types";

const ProductFilterDrawer: React.FC<ProductFilterDrawerProps> = ({
  filters,
  onFilterChange,
  parameters,
}) => {
  return (
    <div className="filter-drawer">
      <h2>Filtreler</h2>
      <ProductFilterItem
        type="radio"
        searchEnabled={false}
        label="Sort By"
        value={filters.sortBy}
        options={parameters.sortBy}
        onChange={(value) => onFilterChange("sortBy", value)}
      />
      <ProductFilterItem
        type="checkbox"
        searchEnabled={true}
        value={filters.model}
        label="Model"
        options={parameters.models}
        onChange={(value) => onFilterChange("model", value)}
      />
      <ProductFilterItem
        type="checkbox"
        searchEnabled={true}
        value={filters.brand}
        label="Brands"
        options={parameters.brands}
        onChange={(value) => onFilterChange("brand", value)}
      />
    </div>
  );
};

export default ProductFilterDrawer;
