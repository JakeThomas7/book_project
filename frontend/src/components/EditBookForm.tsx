import { useState } from 'react';
import { book } from '../types/Books';
import { updateBook } from '../api/BooksAPI';

interface EditBookFormProps {
  book: book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<book>(
    {...book}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(book.bookID, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }} className="card">
    <h2>Add New Book</h2>
    <div className="form-grid d-flex flex-column" style={{ gap: '16px' }}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px' }}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px' }}
        />
      </label>
      <label>
        Publisher:
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px' }}
        />
      </label>
      <label>
        ISBN:
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px' }}
        />
      </label>
      <label>
        Classification:
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px' }}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px' }}
        />
      </label>
      <label>
        Page Count:
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px' }}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px' }}
        />
      </label>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
        <button className="btn btn-primary" type="submit" style={{ padding: '10px 20px', borderRadius: '4px' }}>
          Update Book
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={onCancel}
          style={{ padding: '10px 20px', borderRadius: '4px' }}
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
  );
};

export default EditBookForm;
