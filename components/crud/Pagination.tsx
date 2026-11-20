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

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, i) => i + 1
      );
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      className="mv-pagination"
      aria-label="Navigasi halaman"
    >
      <button
        type="button"
        className="mv-pagination__nav"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span>Sebelumnya</span>
      </button>

      <div className="mv-pagination__pages">
        {getPages().map((item, index) =>
          typeof item === "number" ? (
            <button
              key={item}
              type="button"
              className={`mv-pagination__number ${
                page === item ? "active" : ""
              }`}
              onClick={() => onPageChange(item)}
              aria-current={page === item ? "page" : undefined}
              aria-label={`Halaman ${item}`}
            >
              {item}
            </button>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className="mv-pagination__ellipsis"
            >
              ...
            </span>
          )
        )}
      </div>

      <button
        type="button"
        className="mv-pagination__nav"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <span>Berikutnya</span>
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}