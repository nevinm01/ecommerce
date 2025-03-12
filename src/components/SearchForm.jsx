import React from "react";

const SearchForm = ({
  searchQuery,
  setSearchQuery,
  indexName,
  setIndexName,
  handleSearch,
  loading,
  sortOption,
  setSortOption,
}) => {
  const handleClear = () => setSearchQuery("");

  return (
    <form onSubmit={handleSearch} style={styles.form}>
      {/* Search Input */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search term (e.g., mobiles, iPhone)"
          style={styles.input}
          aria-label="Search"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            style={styles.clearButton}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Index Selector */}
      <select
        value={indexName}
        onChange={(e) => setIndexName(e.target.value)}
        style={styles.select}
      >
        <option value="qa-en">QA-EN</option>
        <option value="qa-ar">QA-AR</option>
      </select>

      {/* Sort Selector */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={styles.select}
      >
        <option value="relevance">Relevance</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="price-asc">Price: Low to High</option>
      </select>

      {/* Search Button */}
      <button
        type="submit"
        disabled={loading || !searchQuery.trim()}
        style={styles.searchButton(loading, searchQuery)}
      >
        {loading ? <span className="spinner" /> : "Search"}
      </button>

      {/* Loading Animation Styles */}
      <style>
        {`
          .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid white;
            border-bottom-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 8px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </form>
  );
};

// Inline Styles for Better Readability
const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    position: "relative",
  },
  inputContainer: {
    position: "relative",
    flex: 1,
  },
  input: {
    width: "100%",
    padding: "10px",
    paddingRight: "30px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  clearButton: {
    position: "absolute",
    right: "5px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#666",
    padding: "0",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  searchButton: (loading, query) => ({
    padding: "10px 20px",
    fontSize: "16px",
    background: loading ? "#ccc" : "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: loading || !query.trim() ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100px",
  }),
};

export default SearchForm;
