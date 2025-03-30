interface PaginationProps {
    totalPages: number
    currentPage: number
    pageSize: number
    onPageChange: (newPage: number) => void
    onPageSizeChange: (newSize: number) => void
}

const Pagination = ({
    totalPages,
    currentPage,
    pageSize,
    onPageChange,
    onPageSizeChange
}: PaginationProps) => {

    return (
        <div>
            <div className="text-center my-3">
                <button className="btn btn-outline-primary mx-1" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                    Previous
                </button>
                {
                    [...Array(totalPages)].map((_, i) => (
                        <button 
                            key={i + 1} 
                            className={`btn mx-1 ${currentPage === (i + 1) ? "btn-primary" : "btn-outline-primary"}`} 
                            onClick={() => onPageChange(i + 1)} 
                            disabled={currentPage === (i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))
                }
                <button className="btn btn-outline-primary mx-1" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                    Next
                </button>
            </div>

            {/* Page Size Selection */}
            <div className="text-center my-3">
                <label className="fw-bold me-2">Results Per Page:</label>
                <select 
                    className="form-select d-inline-block w-auto" 
                    value={pageSize} 
                    onChange={(e) => {
                        onPageSizeChange(Number(e.target.value));
                        onPageChange(1); // Reset to first page
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );
}

export default Pagination