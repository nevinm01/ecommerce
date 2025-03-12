import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function usePagination(initialPage = 1, itemsPerPage = 6) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => {
    const pageFromUrl = parseInt(searchParams.get("page"));
    return pageFromUrl > 0 ? pageFromUrl : initialPage;
  });

  const ITEMS_PER_PAGE = itemsPerPage;

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", newPage.toString());
      setSearchParams(newParams, { replace: true }); // Replace instead of push
    }
  };

  const paginateItems = (items) => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const paginatedItems = items.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return { paginatedItems, totalItems, totalPages };
  };

  return {
    currentPage,
    handlePageChange,
    paginateItems,
    ITEMS_PER_PAGE,
  };
}
