import React from "react";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useFilters } from "../hooks/useFilters";
import { usePagination } from "../hooks/usePagination";
import { useSearchFetch } from "../hooks/useSearchFetch";
import ProductList from "./ProductList";
import FilterComponent from "./FilterComponent";
import PriceFilter from "./PriceFilter";
import SearchForm from "./SearchForm";

const Results = () => {
  const {
    searchQuery,
    setSearchQuery,
    finalQuery,
    indexName,
    setIndexName,
    sortOption,
    setSortOption,
    triggerSearch,
    setTriggerSearch,
    handleSearch,
  } = useSearchQuery();

  const {
    data: allItems,
    error,
    isLoading,
  } = useSearchFetch(triggerSearch, finalQuery, indexName);

  const {
    activeFilters,
    setActiveFilters,
    priceRange,
    setPriceRange,
    filterAndSortProducts,
  } = useFilters();

  const { currentPage, handlePageChange, paginateItems } = usePagination();

  const filteredAndSortedItems = filterAndSortProducts(allItems, sortOption);
  const { paginatedItems, totalItems, totalPages } = paginateItems(
    filteredAndSortedItems
  );

  const handleQueryChange = (query) => setSearchQuery(query);

  const handleIndexChange = (newIndex) => {
    setIndexName(newIndex);
    if (finalQuery && triggerSearch) handlePageChange(1);
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    handlePageChange(1);
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    handlePageChange(1);
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
    handlePageChange(1);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          backgroundColor: "black",
          color: "#fff",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>Search Results</h1>
      </header>

      <main
        style={{
          maxWidth: "1200px",
          margin: "20px auto",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={handleQueryChange}
          indexName={indexName}
          setIndexName={handleIndexChange}
          handleSearch={(e) => {
            handleSearch(e);
            handlePageChange(1);
          }}
          loading={isLoading && triggerSearch}
          sortOption={sortOption}
          setSortOption={handleSortChange}
        />

        {isLoading && triggerSearch && (
          <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
        )}

        {error && triggerSearch && (
          <p style={{ color: "red", textAlign: "center" }}>
            Error: {error.message}
          </p>
        )}

        {allItems.length > 0 && triggerSearch && (
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ width: "25%", minWidth: "200px" }}>
              <FilterComponent
                onFilterChange={handleFilterChange}
                products={allItems}
              />
              <PriceFilter
                onPriceChange={handlePriceChange}
                products={allItems}
              />
            </div>
            <div style={{ width: "75%" }}>
              <h3>
                Results for{" "}
                <span style={{ backgroundColor: "yellow" }}>
                  "{finalQuery}"
                </span>{" "}
                ({indexName})
              </h3>
              <p>
                Showing {paginatedItems.length} of {totalItems} results
              </p>
              <ProductList products={paginatedItems} />
              {totalPages > 1 && (
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                    flexWrap: "wrap",
                  }}
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={isLoading && page === currentPage}
                        style={{
                          padding: "8px 12px",
                          background:
                            currentPage === page
                              ? isLoading
                                ? "#ccc"
                                : "black"
                              : "#fff",
                          color:
                            currentPage === page && !isLoading
                              ? "#fff"
                              : "black",
                          border: "1px solid rgb(0, 0, 0)",
                          borderRadius: "4px",
                          cursor:
                            isLoading && page === currentPage
                              ? "not-allowed"
                              : "pointer",
                          minWidth: "36px",
                        }}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {!triggerSearch && (
          <p style={{ textAlign: "center", color: "#666" }}>
            Please enter a search query and click Search to see results.
          </p>
        )}
      </main>
    </div>
  );
};

export default Results;
