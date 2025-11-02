

export interface ClientModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  photoUrl: string | null;
}

export interface ClientWithRelations extends ClientModel {
  booksCount?: number;
  purchases?: Array<{
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
  }>;
}