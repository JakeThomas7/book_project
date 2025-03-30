import { book } from "../types/Books";

interface FetchBooksResponse {
    books: book[]
    totalNumBooks: number;
}

const API_URL = 'https://localhost:5000/Books';

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[],
    sort: string = "asc"
): Promise<FetchBooksResponse> => {

    try {
        const categoryParams = selectedCategories
            .map((cat) => `categories=${encodeURIComponent(cat)}`)
            .join('&');

        const response = await fetch(`https://localhost:5000/Books/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sort=${sort}${selectedCategories.length ? `&${categoryParams}` : ''}`);
        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error fetching books:", error);
        throw error
    }

}

export const addBook = async (newBook: book): Promise<book> => {
    
    try {
        const response = await fetch(`${API_URL}/Add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error('Failed to add project');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error adding project:", error);
        throw error
    }

}

export const updateBook = async (bookID: number, updatedBook: book): Promise<book> => {
    try {
        const response = await fetch(`${API_URL}/Update/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        if (!response.ok) {
            throw new Error('Failed to update project');
        }        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error updating project:", error);
        throw error
    }
}

export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        await fetch(`${API_URL}/Delete/${bookID}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error
    }
}