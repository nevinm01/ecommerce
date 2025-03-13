import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [finalQuery, setFinalQuery] = useState(initialQuery);
  const [indexName, setIndexName] = useState(
    searchParams.get("index") || "qa-en"
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "relevance"
  );
  const [triggerSearch, setTriggerSearch] = useState(!!initialQuery);

  useEffect(() => {
    const queryFromUrl = searchParams.get("q") || "";
    setSearchQuery(queryFromUrl);
    setFinalQuery(queryFromUrl);
    setIndexName(searchParams.get("index") || "qa-en");
    setSortOption(searchParams.get("sort") || "relevance");
    setTriggerSearch(!!queryFromUrl);
  }, [searchParams, setSearchParams]);

  const updateSearchParams = () => {
    const params = new URLSearchParams({
      q: searchQuery, // Use searchQuery to ensure latest input
      index: indexName,
      sort: sortOption,
      page: searchParams.get("page") || "1",
    });
    ["category", "brand", "color", "minPrice", "maxPrice"].forEach((key) => {
      if (searchParams.get(key)) {
        params.set(key, searchParams.get(key));
      }
    });
    setSearchParams(params, { replace: true });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setFinalQuery(searchQuery);
    setTriggerSearch(true);
    updateSearchParams();
  };

  return {
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
  };
}
