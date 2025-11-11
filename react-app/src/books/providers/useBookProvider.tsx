import { useState } from 'react'
import type { BookModel, CreateBookModel, UpdateBookModel } from '../BookModel'
import axios from 'axios'

export const useBookProvider = () => {
  const [books, setBooks] = useState<BookModel[]>([])

  const loadBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data.data);
    } catch (err) {
      console.error('Failed to load books:', err);
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
    } catch (err) {
      console.error('Failed to update book:', err);
      throw err;
    }
  }

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      await loadBooks(); // Reload the list after successful delete
    } catch (err) {
      console.error('Failed to delete book:', err);
      throw err; // Re-throw so the UI can catch and show error message
    }
  }

  return { books, loadBooks, createBook, updateBook, deleteBook }
}