import React from "react";
import ProductItem from "./ProductItem";
import NoResults from "./NoResults";
const ProductList = ({ products }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // 3 items per row
        gap: "20px",
        padding: "20px",
      }}
    >
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductItem key={index} product={product} index={index} />
        ))
      ) : (
        <NoResults /> // Show NoResultsFound when no products are available
      )}
    </div>
  );
};

export default ProductList;
