import { useState } from "react";
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

  const updateSearchParams = () => {
    const params = new URLSearchParams({
      q: finalQuery,
      index: indexName,
      sort: sortOption,
      page: searchParams.get("page") || "1",
    });
    ["category", "brand", "color", "minPrice", "maxPrice"].forEach((key) => {
      if (searchParams.get(key)) {
        params.set(key, searchParams.get(key));
      }
    });
    setSearchParams(params, { replace: true }); // Replace instead of push
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
