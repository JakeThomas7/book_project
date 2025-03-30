//import { useNavigate } from "react-router-dom";
import { book } from "../types/Books";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
//import { fetchBooks } from "../api/BooksAPI";

function BookList({
    selectedCategories,
    sort
}:{
    selectedCategories: string[],
    sort: string
}) {
    // State variables for books, pagination, and totals
    const [books, setBooks] = useState<book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    //const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    //const navigate = useNavigate();
    const {addToCart} = useCart();

    //const [error, setError] = useState<string | null>(null);
    //const [loading, setLoading] = useState<boolean>(false);

    const handleAddToCart = (book: book) => {
        addToCart(book)
    }

    // useEffect(() => {
    //     const loadBooks = async () => {
    //         try {
    //             setLoading(true);
    //             const data = await fetchBooks(pageSize, pageNum, selectedCategories, sort)

    //             setBooks(data.books);
    //             setTotalItems(data.totalNumBooks);
    //             setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    //         } catch (e) {
    //             setError((e as Error).message);
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    // },  [pageSize, pageNum, selectedCategories, sort]);
    
    // Fetch books from API whenever pageSize or pageNum changes
    useEffect(() => {
        const fetchBooks = async () => {

            try {
                const categoryParams = selectedCategories
                .map((cat) => `categories=${encodeURIComponent(cat)}`)
                .join('&')

                const response = await fetch(`https://bookprojectjacobbackend.azurewebsites.net/BooksAllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sort=${sort}${selectedCategories.length ? `&${categoryParams}` : ''}`);
                const data = await response.json();

                console.log(`https://bookprojectjacobbackend.azurewebsites.net/Books/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sort=${sort}`)

                console.log(data)
                setBooks(data.books);
                //setTotalItems(data.totalNumBooks);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        
        fetchBooks();
    }, [pageSize, pageNum, selectedCategories, sort]);

    useEffect(() => {
        setPageNum(1);
    }, [selectedCategories])


    return (
        <div className="container">
            <div className="">
                {books.map((b) => (
                    <div key={b.bookID}>
                        <div className="card shadow-sm p-3 mb-3 rounded">
                            <div className="card-header text-center bg-success text-white">
                                <h4>{b.title}</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {/* Left Column */}
                                    <div className="col-md-6">
                                        <ul className="list-unstyled">
                                            <li><strong>Author:</strong> {b.author}</li>
                                            <li><strong>Publisher:</strong> {b.publisher}</li>
                                            <li><strong>ISBN:</strong> {b.isbn}</li>
                                            <li><strong>Price:</strong> {b.price}</li>
                                        </ul>
                                    </div>

                                    {/* Right Column */}
                                    <div className="col-md-6">
                                        <ul className="list-unstyled">
                                            <li><strong>Classification:</strong> {b.classification}</li>
                                            <li><strong>Category:</strong> {b.category}</li>
                                            <li><strong>Page Count:</strong> {b.pageCount}</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Price & Button */}
                                <div className="mt-3">
                                    <div className="fw-bold fs-4 text-success">
                                        <button className="btn btn-success" onClick={() => handleAddToCart(b)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>

                {/* Pagination Controls */}
                <div className="text-center my-3">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
                                <a 
                                    className="page-link" 
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPageNum(pageNum - 1);
                                    }}
                                    tabIndex={pageNum === 1 ? -1 : 0}
                                    aria-disabled={pageNum === 1 ? 'true' : 'false'}
                                >
                                    Previous
                                </a>
                            </li>

                            {/* Page Number Buttons */}
                            {
                                [...Array(totalPages)].map((_, i) => (
                                    <li 
                                        key={i + 1} 
                                        className={`page-item ${pageNum === (i + 1) ? 'active' : ''}`}
                                    >
                                        <a 
                                            className="page-link" 
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPageNum(i + 1);
                                            }}
                                        >
                                            {i + 1}
                                        </a>
                                    </li>
                                ))
                            }

                            <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
                                <a 
                                    className="page-link" 
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPageNum(pageNum + 1);
                                    }}
                                    tabIndex={pageNum === totalPages ? -1 : 0}
                                    aria-disabled={pageNum === totalPages ? 'true' : 'false'}
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
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
            
        </div>
    );  
}

export default BookList;
