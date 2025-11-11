import { Outlet } from '@tanstack/react-router'
import { BookList } from '../components/BookList'

export function BooksPage() {
  return (
    <div>
      <BookList />
      <Outlet />
    </div>
  )
}
