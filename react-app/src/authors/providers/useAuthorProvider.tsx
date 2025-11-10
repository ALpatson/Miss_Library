import { useState } from 'react';
import api from '../../api';
import type { Author, CreateAuthorDto, UpdateAuthorDto } from '../AuthorModel';

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<Author[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadAuthors = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get<Author[]>('/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Failed to load authors:', error);
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  };

  const createAuthor = async (data: CreateAuthorDto): Promise<void> => {
    try {
      await api.post('/authors', data);
      await loadAuthors();
    } catch (error) {
      console.error('Failed to create author:', error);
      throw error;
    }
  };

  const updateAuthor = async (id: string, data: UpdateAuthorDto): Promise<void> => {
    try {
      await api.put(`/authors/${id}`, data);
      await loadAuthors();
    } catch (error) {
      console.error('Failed to update author:', error);
      throw error;
    }
  };

  const deleteAuthor = async (id: string): Promise<void> => {
    try {
      await api.delete(`/authors/${id}`);
      await loadAuthors();
    } catch (error) {
      console.error('Failed to delete author:', error);
      throw error;
    }
  };

  return {
    authors,
    loading,
    loadAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
  };
};