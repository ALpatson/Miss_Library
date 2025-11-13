export type BookModel = {
  id: string
  title: string
  yearPublished: number
  authorId: string
  photoUrl?: string | null  // ADD THIS LINE
  author: {
    id: string
    firstName: string
    lastName: string
    photoUrl: string | null
  }
  salesCount?: number
}

export type BookDetailsModel = {
  id: string
  title: string
  yearPublished: number
  authorId: string
  photoUrl?: string | null  // ADD THIS LINE
  author: {
    id: string
    firstName: string
    lastName: string
    photoUrl: string | null
  }
  sales?: Array<{
    id: string
    client: {
      id: number
      firstName: string
      lastName: string
      email: string
    }
    saleDate: string
  }>
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  photoUrl?: string  // ADD THIS LINE
}

export type UpdateBookModel = Partial<CreateBookModel>

export type CreateSaleModel = {
  bookId: string
  clientId: number
  saleDate: string
}