import React from "react";

const ProductItem = ({ product }) => {
  const title = product.title || product.name || "No Title";
  const image = product.image_link || null;
  const actualPrice = parseFloat(product.price) || 0; // Original price
  const salePrice = parseFloat(product.sale_price) || null; // Discounted price
  const discountPercentage = product.discount_percentage ?? 0;

  const description = product.description || product.desc || product.summary;
  const brand = product.brand || product.manufacturer;
  const category = product.category || product.type;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        background: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: "150px",
            maxHeight: "150px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
      ) : (
        <div
          style={{
            width: "150px",
            height: "150px",
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
          }}
        >
          No Image Available
        </div>
      )}

      <div>
        <h3 style={{ margin: "0 0 10px", fontSize: "18px", color: "#333" }}>
          {title}
        </h3>

        {actualPrice ? (
          <div style={{ margin: "5px 0" }}>
            {salePrice && salePrice < actualPrice ? (
              <>
                <span
                  style={{
                    fontWeight: "normal",
                    color: "#888",
                    textDecoration: "line-through",
                    marginRight: "10px",
                  }}
                >
                  KWD {actualPrice.toFixed(3)}
                </span>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "green", // Sale price in green
                  }}
                >
                  KWD {salePrice.toFixed(3)}
                </span>
              </>
            ) : (
              <span style={{ fontWeight: "bold", color: "#2c3e50" }}>
                KWD {actualPrice.toFixed(3)}
              </span>
            )}
          </div>
        ) : (
          <p style={{ color: "#888", margin: "5px 0" }}>Price not available</p>
        )}

        {discountPercentage > 0 && (
          <p style={{ margin: "5px 0", color: "green" }}>
            Discount: {discountPercentage}%
          </p>
        )}

        {description && (
          <p style={{ margin: "5px 0", color: "#666" }}>{description}</p>
        )}
        {brand && (
          <p style={{ margin: "5px 0", color: "#888" }}>Brand: {brand}</p>
        )}
        {category && (
          <p style={{ margin: "5px 0", color: "#888" }}>Category: {category}</p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
