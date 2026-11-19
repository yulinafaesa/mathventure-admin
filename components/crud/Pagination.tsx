"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Sebelumnya
      </button>

      <div className="pagination__pages">
        {pages.map((number) => (
          <button
            key={number}
            type="button"
            className={`pagination__number ${
              page === number ? "active" : ""
            }`}
            aria-current={page === number ? "page" : undefined}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="pagination__button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Berikutnya
      </button>
    </div>
  );
}