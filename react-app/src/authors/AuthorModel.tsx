// TypeScript interfaces for Author feature

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  booksCount?: number;
  averageSales?: number;
}

export interface CreateAuthorDto {
  firstName: string;
  lastName: string;
  photoUrl?: string;
}

export interface UpdateAuthorDto {
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  yearPublished: number;
}

export interface Book {
  id: string;
  title: string;
  yearPublished: number;
  authorId?: string;
  author?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}