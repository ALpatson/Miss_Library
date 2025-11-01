
// react-app/src/clients/ClientModel.tsx

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email?: string | null;
  photoUrl?: string | null;
  booksCount?: number;
}

export interface Purchase {
  id: number;
  date: string;
  book: {
    id: number;
    title: string;
    author: {
      id: number;
      name: string;
    };
  };
}