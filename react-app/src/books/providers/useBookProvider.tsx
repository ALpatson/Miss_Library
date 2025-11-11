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
      setBooks(response.data.data || response.data);
    } catch (err) {
      console.error('Failed to load books:', err);
    } finally {
      setLoading(false)
    }
  }

  const loadBookDetails = async (id: string) => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:3000/books/${id}`);
      setBookDetails(response.data.data || response.data);
    } catch (err) {
      console.error('Failed to load book details:', err);
    } finally {
      setLoading(false)
    }
  }

  const createBook = async (book: CreateBookModel) => {
    try {
      await axios.post('http://localhost:3000/books', book);
      await loadBooks();
    } catch (err) {
      console.error('Failed to create book:', err);
      throw err;
    }
  }

  const updateBook = async (id: string, input: UpdateBookModel) => {
    try {
      await axios.patch(`http://localhost:3000/books/${id}`, input);
      await loadBooks();
      // Reload details if we're viewing this book
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
      // Reload book details to show new sale
      if (bookDetails) {
        await loadBookDetails(bookDetails.id);
      }
      await loadBooks(); // Refresh list to update counts
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