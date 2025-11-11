export type BookModel = {
  id: string
  title: string
  yearPublished: number
  author: {
    id: string
    firstName: string
    lastName: string
  }
  salesCount?: number // Number of times sold
}

export type BookDetailsModel = {
  id: string
  title: string
  yearPublished: number
  author: {
    id: string
    firstName: string
    lastName: string
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
}

export type UpdateBookModel = Partial<CreateBookModel>

export type CreateSaleModel = {
  bookId: string
  clientId: number
  saleDate: string
}