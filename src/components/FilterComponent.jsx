import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterComponent = ({ onFilterChange, products }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilters = {
    category: searchParams.get("category")?.split(",") || [],
    brand: searchParams.get("brand")?.split(",") || [],
    color: searchParams.get("color")?.split(",") || [],
  };

  const [filters, setFilters] = useState(initialFilters);

  const getUniqueValues = (key) => {
    const values = new Set();
    products.forEach((product) => {
      const value =
        product[key] || product[key.toLowerCase()] || product[`${key}_name`];
      if (value) values.add(value);
    });
    return Array.from(values);
  };

  const categories = getUniqueValues("category");
  const brands = getUniqueValues("brand");
  const colors = getUniqueValues("color");

  const handleCheckboxChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: filters[filterType].includes(value)
        ? filters[filterType].filter((v) => v !== value)
        : [...filters[filterType], value],
    };
    setFilters(newFilters);

    const newParams = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        newParams.set(key, values.join(","));
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams, { replace: true }); // Replace instead of push

    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: [],
      brand: [],
      color: [],
    };
    setFilters(clearedFilters);

    const newParams = new URLSearchParams(searchParams);
    ["category", "brand", "color"].forEach((key) => newParams.delete(key));
    setSearchParams(newParams, { replace: true }); // Replace instead of push

    onFilterChange(clearedFilters);
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: "0 0 15px" }}>Filters</h3>
        <button
          onClick={handleClearFilters}
          style={{
            padding: "5px 10px",
            background: "#ff4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear Filters
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ margin: "0 0 10px" }}>Category</h4>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <label key={cat} style={{ display: "block", margin: "5px 0" }}>
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => handleCheckboxChange("category", cat)}
                style={{ marginRight: "8px" }}
              />
              {cat}
            </label>
          ))
        ) : (
          <p style={{ color: "#666" }}>No categories available</p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ margin: "0 0 10px" }}>Brand</h4>
        {brands.length > 0 ? (
          brands.map((brand) => (
            <label key={brand} style={{ display: "block", margin: "5px 0" }}>
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleCheckboxChange("brand", brand)}
                style={{ marginRight: "8px" }}
              />
              {brand}
            </label>
          ))
        ) : (
          <p style={{ color: "#666" }}>No brands available</p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ margin: "0 0 10px" }}>Color</h4>
        {colors.length > 0 ? (
          colors.map((color) => (
            <label key={color} style={{ display: "block", margin: "5px 0" }}>
              <input
                type="checkbox"
                checked={filters.color.includes(color)}
                onChange={() => handleCheckboxChange("color", color)}
                style={{ marginRight: "8px" }}
              />
              {color}
            </label>
          ))
        ) : (
          <p style={{ color: "#666" }}>No color options available</p>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
