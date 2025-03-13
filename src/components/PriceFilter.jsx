import React from "react";
import { useSearchParams } from "react-router-dom";

const PriceFilter = ({ onPriceChange }) => {
  const min = 5.0;
  const max = 1490.0;
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive price range directly from searchParams
  const priceRange = [
    parseFloat(searchParams.get("minPrice")) || min,
    parseFloat(searchParams.get("maxPrice")) || max,
  ];

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    const newRange = [value, max];

    // Update URL parameters
    const newParams = new URLSearchParams(searchParams);
    newParams.set("minPrice", value.toString());
    newParams.set("maxPrice", max.toString());
    setSearchParams(newParams);

    // Call parent callback
    onPriceChange(newRange);
  };

  const percentage = ((priceRange[0] - min) / (max - min)) * 100;

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ margin: "0 0 15px" }}>Price Range (KWD)</h3>
      <div style={{ padding: "0 10px" }}>
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <input
            type="range"
            min={min}
            max={max}
            step={0.5}
            value={priceRange[0]}
            onChange={handlePriceChange}
            style={{
              width: "100%",
              appearance: "none",
              height: "8px",
              background: `linear-gradient(to right, #007bff ${percentage}%, #ddd ${percentage}%)`,
              borderRadius: "4px",
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <span>KWD {priceRange[0].toFixed(3)}</span>
          <span>KWD {max.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
