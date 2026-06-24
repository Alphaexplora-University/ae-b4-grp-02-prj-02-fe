interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button type="button" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{ border: '1px solid #2b2b2b', background: '#111', color: '#fff', borderRadius: 8, padding: '8px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          style={{ border: page === currentPage ? '1px solid #8FEA67' : '1px solid #2b2b2b', background: page === currentPage ? '#162413' : '#111', color: '#fff', borderRadius: 8, padding: '8px 10px', cursor: 'pointer' }}
        >
          {page}
        </button>
      ))}

      <button type="button" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={{ border: '1px solid #2b2b2b', background: '#111', color: '#fff', borderRadius: 8, padding: '8px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>
        Next
      </button>
    </div>
  );
}
