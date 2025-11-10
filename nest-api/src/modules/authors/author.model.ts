import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  booksCount?: number;
  averageSales?: number;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;