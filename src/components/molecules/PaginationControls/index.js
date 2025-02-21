import Button from "@/components/atoms/Button";
import React from "react";

const PaginationControls = ({ handleNextPage, handlePreviousPage, page = 0, totalPages = 1 }) => {
  return (
    <>
      <div className="flex justify-between mt-6">
        <Button
          onClick={handlePreviousPage}
          disabled={page === 0}
          text="Previous"
          className="px-4 py-2 disabled:bg-gray-500"
        />

        <span className="text-gray-300">
          Page {page + 1} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={page >= totalPages - 1}
          text="Next"
          className="px-4 py-2 disabled:bg-gray-500"
        />
      </div>
    </>
  );
};

export default PaginationControls;
