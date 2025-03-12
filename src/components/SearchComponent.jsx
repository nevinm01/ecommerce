import React from "react";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useFilters } from "../hooks/useFilters";
import { usePagination } from "../hooks/usePagination";
import { useSearchFetch } from "../hooks/useSearchFetch";
import SearchForm from "./SearchForm";
import ProductList from "./ProductList";
import FilterComponent from "./FilterComponent";
import PriceFilter from "./PriceFilter";
const SearchComponent = () => {
  const {
    searchQuery,
    setSearchQuery,
    finalQuery,
    indexName,
    setIndexName,
    sortOption,
    setSortOption,
    triggerSearch,
    handleSearch,
  } = useSearchQuery();

  const {
    activeFilters,
    setActiveFilters,
    priceRange,
    setPriceRange,
    filterAndSortProducts,
  } = useFilters();

  const {
    currentPage,
    pageLoading,
    handlePageChange,
    paginateItems,
    ITEMS_PER_PAGE,
  } = usePagination();

  const {
    data: allItems,
    error,
    isLoading,
  } = useSearchFetch(triggerSearch, finalQuery, indexName);

  const filteredAndSortedItems = filterAndSortProducts(allItems, sortOption);
  const { paginatedItems, totalItems, totalPages } = paginateItems(
    filteredAndSortedItems
  );

  // Handlers
  const handleQueryChange = (query) => setSearchQuery(query);

  const handleIndexChange = (newIndex) => {
    setIndexName(newIndex);
    if (finalQuery && triggerSearch) {
      handlePageChange(1);
    }
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters); // This now updates URL params too
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
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ width: "25%", minWidth: "200px" }}>
        <FilterComponent
          onFilterChange={handleFilterChange}
          products={allItems}
        />
        <PriceFilter onPriceChange={handlePriceChange} products={allItems} />
      </div>
      <div style={{ width: "75%" }}>
        <h2>Search Products</h2>
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
          <>
            <div>
              <h3>
                Results for
                <span style={{ backgroundColor: "yellow" }}>
                  {" "}
                  "{finalQuery}"{" "}
                </span>
                ({indexName})
              </h3>
              <p>
                Showing {paginatedItems.length} of {totalItems} results
              </p>
              <ProductList products={paginatedItems} />
            </div>

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
                          currentPage === page && !isLoading ? "#fff" : "black",
                        border: "1px solid rgb(0, 0, 0)",
                        borderRadius: "4px",
                        cursor:
                          isLoading && page === currentPage
                            ? "not-allowed"
                            : "pointer",
                        minWidth: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      {pageLoading && page === currentPage ? (
                        <span
                          style={{
                            display: "inline-block",
                            width: "12px",
                            height: "12px",
                            border: "2px solid #fff",
                            borderBottomColor: "transparent",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                          }}
                        />
                      ) : null}
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}

        {!triggerSearch && (
          <p style={{ textAlign: "center", color: "#666" }}>
            Please enter a search query and click Search to see results
          </p>
        )}
      </div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SearchComponent;
