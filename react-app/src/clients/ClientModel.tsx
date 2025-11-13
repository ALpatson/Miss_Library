
export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email?: string | null;
  photoUrl?: string | null;
  booksCount?: number;
}

export interface UpdateClientDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  photoUrl?: string;
}

export interface Sale {
  id: number;
  date: string;
  book: {
    id: string;
    title: string;
    author: {
      id: string;
      name: string;
    };
  };
}

export interface Purchase {
  id: number;
  date: string;
  book: {
    id: string;
    title: string;
    yearPublished: number;
    author: {
      id: string;
      firstName: string;
      lastName: string;
      name?: string;
    };
  };
}