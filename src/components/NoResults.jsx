import React from "react";

const NoResults = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img
        src="../public/nothing.webp"
        alt="No Results Found"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <h3>No results found</h3>
      <p>Try adjusting your search or filters.</p>
    </div>
  );
};

export default NoResults;
