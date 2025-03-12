import React from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import { useSearchQuery } from "../hooks/useSearchQuery";

const Home = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    finalQuery,
    setFinalQuery,
    indexName,
    setIndexName,
    sortOption,
    setSortOption,
    triggerSearch,
    setTriggerSearch,
    handleSearch,
    updateSearchParams,
  } = useSearchQuery();

  const handleSearchWithNavigation = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setFinalQuery(searchQuery);
    setTriggerSearch(true);
    updateSearchParams();
    navigate(
      `/results?q=${encodeURIComponent(
        searchQuery
      )}&index=${indexName}&sort=${sortOption}`,
      { replace: true } // Replace instead of push
    );
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
        <h1 style={{ margin: 0 }}>Product Search</h1>
        <p style={{ margin: 0 }}>
          Search for products from various categories.
        </p>
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
          setSearchQuery={setSearchQuery}
          indexName={indexName}
          setIndexName={setIndexName}
          handleSearch={handleSearchWithNavigation}
          loading={false}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </main>
    </div>
  );
};

export default Home;
