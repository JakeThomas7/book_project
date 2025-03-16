import { book } from "./types/Books";
import { useState, useEffect } from "react";

function BookList() {
    // State variables for books, pagination, and totals
    const [books, setBooks] = useState<book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    
    // Fetch books from API whenever pageSize or pageNum changes
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`https://localhost:5000/Books/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`);
                const data = await response.json();
                setBooks(data.books);
                setTotalItems(data.totalNumBooks);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        
        fetchBooks();
    }, [pageSize, pageNum]);

    // Function to handle sorting by title
    const sortBooksByTitle = () => {
        const sortedBooks = [...books].sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        setBooks(sortedBooks);
    };

    return (
        <div className="container w-100">
            <h1 className="text-center my-4">Book Collection</h1>

            <div>
                
                {/* Sort Button */}
                <div className="text-center mb-3">
                    <button className="btn btn-secondary" onClick={sortBooksByTitle}>
                        Sort by Title
                    </button>
                </div>

                {/* Pagination Controls */}
                <div className="text-center my-3">
                    <button className="btn btn-outline-primary mx-1" disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
                        Previous
                    </button>
                    {
                        [...Array(totalPages)].map((_, i) => (
                            <button 
                                key={i + 1} 
                                className={`btn mx-1 ${pageNum === (i + 1) ? "btn-primary" : "btn-outline-primary"}`} 
                                onClick={() => setPageNum(i + 1)} 
                                disabled={pageNum === (i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))
                    }
                    <button className="btn btn-outline-primary mx-1" disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>
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
                            setPageSize(Number(e.target.value));
                            setPageNum(1); // Reset to first page
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
            
            <div className="row justify-content-center">
    {books.map((b) => (
        <div key={b.bookID} className={`col-12 ${books.length === 1 ? 'col-md-12' : 'col-md-4'} mb-4 d-flex justify-content-center`}>
            <div className="card shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-header text-center bg-primary text-white">
                    <h4>{b.title}</h4>
                </div>
                <div className="card-body">
                    <ul className="list-unstyled">
                        <li><strong>Author:</strong> {b.author}</li>
                        <li><strong>Publisher:</strong> {b.publisher}</li>
                        <li><strong>ISBN:</strong> {b.isbn}</li>
                        <li><strong>Classification:</strong> {b.classification}</li>
                        <li><strong>Category:</strong> {b.category}</li>
                        <li><strong>Page Count:</strong> {b.pageCount}</li>
                        <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
                    </ul>
                </div>
            </div>
        </div>
    ))}
</div>
        </div>
    );  
}

export default BookList;
