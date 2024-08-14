import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 border rounded ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
