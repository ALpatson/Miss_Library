//useBookProvider
import { useState } from 'react'
import type { BookModel, CreateBookModel, UpdateBookModel, BookDetailsModel, CreateSaleModel } from '../BookModel'
import axios from 'axios'

export const useBookProvider = () => {
  const [books, setBooks] = useState<BookModel[]>([])
  const [bookDetails, setBookDetails] = useState<BookDetailsModel | null>(null)
  const [loading, setLoading] = useState(false)

  const loadBooks = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/books');
      const booksData = response.data.data || response.data;
      
      // For each book, get sales count
      const booksWithSales = await Promise.all(
        booksData.map(async (book: BookModel) => {
          try {
            const salesResponse = await axios.get(`http://localhost:3000/books/${book.id}/buyers`);
            const buyers = salesResponse.data || [];
            return { ...book, salesCount: buyers.length };
          } catch (err) {
            try {
              const salesResponse2 = await axios.get(`http://localhost:3000/sales/book/${book.id}`);
              const sales = salesResponse2.data.data || salesResponse2.data || [];
              return { ...book, salesCount: sales.length };
            } catch (err2) {
              return { ...book, salesCount: 0 };
            }
          }
        })
      );
      
      setBooks(booksWithSales);
    } catch (err) {
      console.error('Failed to load books:', err);
      setBooks([]);
    } finally {
      setLoading(false)
    }
  }

  const loadBookDetails = async (id: string) => {
    setLoading(true)
    try {
      const bookResponse = await axios.get(`http://localhost:3000/books/${id}`);
      const book = bookResponse.data.data || bookResponse.data;
      
      try {
        const salesResponse = await axios.get(`http://localhost:3000/books/${id}/buyers`);
        const buyers = salesResponse.data || [];
        setBookDetails({ ...book, sales: buyers });
      } catch (err) {
        try {
          const salesResponse = await axios.get(`http://localhost:3000/sales/book/${id}`);
          const sales = salesResponse.data.data || salesResponse.data || [];
          setBookDetails({ ...book, sales });
        } catch (err2) {
          setBookDetails({ ...book, sales: [] });
        }
      }
    } catch (err) {
      console.error('Failed to load book details:', err);
      setBookDetails(null);
    } finally {
      setLoading(false)
    }
  }

  const createBook = async (book: CreateBookModel) => {
    try {
      console.log('Creating book:', book);
      await axios.post('http://localhost:3000/books', book);
      await loadBooks();
    } catch (err) {
      console.error('Failed to create book:', err);
      throw err;
    }
  }

  const updateBook = async (id: string, input: UpdateBookModel) => {
    try {
      console.log('Updating book:', id, 'with:', input);
      await axios.patch(`http://localhost:3000/books/${id}`, input);
      await loadBooks();
      if (bookDetails?.id === id) {
        await loadBookDetails(id);
      }
    } catch (err) {
      console.error('Failed to update book:', err);
      throw err;
    }
  }

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      await loadBooks();
    } catch (err) {
      console.error('Failed to delete book:', err);
      throw err;
    }
  }

  const createSale = async (sale: CreateSaleModel) => {
    try {
      await axios.post('http://localhost:3000/sales', sale);
      if (bookDetails) {
        await loadBookDetails(bookDetails.id);
      }
      await loadBooks();
    } catch (err) {
      console.error('Failed to create sale:', err);
      throw err;
    }
  }

  return { 
    books, 
    bookDetails,
    loading,
    loadBooks, 
    loadBookDetails,
    createBook, 
    updateBook, 
    deleteBook,
    createSale,
  }
}