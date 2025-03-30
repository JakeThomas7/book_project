import { useEffect, useState } from 'react'
import { book } from '../types/Books';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/AddBookForm';
import { NavLink } from 'react-router-dom';
import EditBookForm from '../components/EditBookForm';

const AdminProjectsPage = () => {

    const [books, setBooks] = useState<book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [totalPages, setTotalPages] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);

    const [showForm, setShowForm] = useState<boolean>(false);
    const [edtingBook, setEditingBook] = useState<book | null>(null);

    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if (confirmDelete) {
            try {
                await deleteBook(bookId);
            } catch (e) {
                setError((e as Error).message);
            } finally {
                fetchBooks(pageSize, pageNum, [], "asc").then(data => setBooks(data.books));
            }
        }
    }

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, [], "asc")
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
                setBooks(data.books);
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false)
            }
        }

        loadBooks();
    }, [pageSize, pageNum]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Admin - Projects</h1>
            <NavLink className="btn btn-secondary ms-auto mb-2" to="/"
          style={{position: "fixed", top: "20px", right: "20px"}}>Back to Book List</NavLink>

            {!showForm && (
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>Add Book</button>
            )}

            {showForm && (
                <NewBookForm
                onSuccess={() => {
                  setShowForm(false);
                  fetchBooks(pageSize, pageNum, [], "asc").then(data => setBooks(data.books));
                }}
                onCancel={() => setShowForm(false)}
              />
            )}

            {edtingBook && (
                <EditBookForm
                book={edtingBook}
                onSuccess={() => {
                  setEditingBook(null);
                  fetchBooks(pageSize, pageNum, [], "asc").then(data => setBooks(data.books));
                }}
                onCancel={() => setEditingBook(null)}
              />
            )}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titla</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b: book) => (
                        <tr key={b.bookID}>
                            <td>{b.bookID}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td>{b.isbn}</td>
                            <td>{b.classification}</td>
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>{b.price}</td>
                            <td>
                                <button 
                                    onClick={() => setEditingBook(b)} className="btn btn-primary me-2">Edit</button>
                                <button className="btn btn-danger"
                                    onClick={() => handleDelete(b.bookID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                totalPages={totalPages} 
                currentPage={pageNum}
                pageSize={pageSize} 
                onPageChange={(newPage: number) => setPageNum(newPage)}
                onPageSizeChange={(newSize: number) => setPageSize(newSize)}
            />
        </div>
    )
}

export default AdminProjectsPage