import { useState } from "react";

export const usePagination = (initialPage = 0, totalPages = 1) => {
  const [page, setPage] = useState(initialPage);

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const resetPage = () => setPage(0);

  return {
    page,
    setPage,
    handlePreviousPage,
    handleNextPage,
    resetPage,
  };
};
