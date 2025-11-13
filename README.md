# 📚 Miss Library - Web Application Development Project

> M1-2025 Web Application Development Project - JUNIA

A full-stack library management system built with **NestJS** and **React** to manage books, authors, clients, and sales.

---

##  **Team Members**

- **Alpatson Cobbina SIAW**
- **Josephine Ama Gyanewah GYASI**
- **Kwabena ANOKYE**

---

##  **Project Overview**

Miss Library is a comprehensive library management system that enables users to:
-  Manage books with authors and cover photos
-  Track authors and their publications
-  Manage clients and their profiles
-  Record and track book sales
-  View purchase history and statistics
-  Calculate average sales per author

**Due Date:** November 14, 2025 @ 23:59  
**Instructor:** Gerald Gallet (gerald.gallet@ext.junia.com)

---

##  **Tech Stack**

### **Backend**
- **Language:** TypeScript
- **Framework:** NestJS 10.x
- **ORM:** TypeORM
- **Database:** SQLite
- **API:** REST
- **Validation:** class-validator

### **Frontend**
- **Language:** TypeScript
- **Framework:** React 18 + Vite
- **UI Library:** Ant Design 5.x
- **Routing:** @tanstack/react-router
- **HTTP Client:** Axios
- **Styling:** CSS + Tailwind utilities



##  **Getting Started**

### **Prerequisites**

- Node.js v18 or higher
- npm or yarn
- Git

### **Installation**

1. **Clone the repository**
```bash
   git clone https://github.com/ALpatson/Miss_Library
   cd MISS_LIBRARY
```

2. **Install Backend Dependencies**
```bash
   cd nest-api
   npm install
```

3. **Install Frontend Dependencies**
```bash
   cd ../react-app
   npm install
```

### **Running the Application**

#### **Start the Backend Server**
```bash
cd nest-api
npm run start:dev
```
 Backend running at: **http://localhost:3000**

#### **Start the Frontend Development Server**
```bash
cd react-app
npm run dev
```
 Frontend running at: **http://localhost:5173**

---

##  **Features**

### **Fully Implemented**

#### ** Home Page**
- Beautiful landing page with hero section
- "Find Books" button navigates to books list
- "Authors" button navigates to authors list
- Elegant library-themed background

#### ** Clients Management**
- **List Page** (`/clients`)
  - View all clients with names
  - See number of books purchased per client
  - Create new clients via modal
  - Delete clients with confirmation
  - Click to view client details

- **Details Page** (`/clients/:id`)
  - View and edit client information (name, email, photo)
  - Display client profile photo
  - View purchase history
  - See book titles, authors, and purchase dates
  - Click books to navigate to book details

#### ** Books Management**
- **List Page** (`/books`)
  - View all books with cover photos
  - Display book title, author, year
  - See sales count per book
  - Create new books with photo URLs
  - Edit book information inline
  - Delete books with confirmation
  - Click to view book details

- **Details Page** (`/books/:id`)
  - View and edit book information
  - Display book cover photo
  - Record new sales via modal
  - View list of buyers
  - Delete individual sales
  - Click clients to see their profiles

#### ** Authors Management**
- **List Page** (`/authors`)
  - View all authors with profile photos
  - Display number of books written
  - Show average sales per author
  - Create new authors via modal
  - Delete authors with confirmation
  - Click to view author details

- **Details Page** (`/authors/:id`)
  - View and edit author information
  - Display author profile photo
  - View all books by the author
  - See average book sales
  - Click books to navigate to details

#### ** Sales System**
- Record book purchases (client + book + date)
- Track purchase history per client
- Track buyers per book
- Delete sales records
- Automatic sales count updates

#### ** Navigation & Layout**
- Top navigation menu (Home, Books, Authors, Clients, About)
- Breadcrumb navigation on all pages
- Clickable breadcrumbs for easy navigation
- Responsive layout




##  **Database Schema**

### **Entities**

#### **Client**
```typescript
{
  id: number
  firstName: string
  lastName: string
  email?: string
  photoUrl?: string
  purchases: Purchase[]
}
```

#### **Book**
```typescript
{
  id: string (UUID)
  title: string
  yearPublished: number
  photoUrl?: string
  author: Author
  authorId: string
  sales: Sale[]
}
```

#### **Author**
```typescript
{
  id: string (UUID)
  firstName: string
  lastName: string
  photoUrl?: string
  books: Book[]
}
```

#### **Sale (Purchase)**
```typescript
{
  id: number
  date: Date
  client: Client
  clientId: number
  book: Book
  bookId: string
}
```


##  **Design Decisions**

### **Architecture**
- **Domain-Driven Design:** Clear separation by domain (authors, books, clients, sales)
- **Layer Separation:** Controller → Service → Repository pattern
- **File-based Routing:** Leveraging TanStack Router conventions
- **Component Composition:** Reusable React components

### **UI/UX**
- **Ant Design Components:** Professional, consistent UI
- **Modals for Actions:** Create, delete confirmations
- **Inline Editing:** Update directly on detail pages
- **Visual Feedback:** Success/error messages
- **Image Support:** URL-based photos for all entities
- **Breadcrumb Navigation:** Clear page hierarchy

### **State Management**
- Custom React hooks (providers)
- useState/useEffect for local state
- Axios for API communication
- Centralized API instance



##  **API Endpoints**

### **Clients**
```
GET    /clients                    # List all clients
POST   /clients                    # Create client
GET    /clients/:id                # Get client details
PUT    /clients/:id                # Update client
DELETE /clients/:id                # Delete client
GET    /clients/:id/purchases      # Get client purchases
```

### **Books**
```
GET    /books                      # List all books
POST   /books                      # Create book
GET    /books/:id                  # Get book details
PATCH  /books/:id                  # Update book
DELETE /books/:id                  # Delete book
GET    /books/:id/buyers           # Get book buyers
```

### **Authors**
```
GET    /authors                    # List all authors
POST   /authors                    # Create author
GET    /authors/:id                # Get author details
PUT    /authors/:id                # Update author
DELETE /authors/:id                # Delete author
GET    /authors/:id/stats          # Get author with stats
```

### **Sales**
```
GET    /sales                      # List all sales
POST   /sales                      # Create sale (record purchase)
GET    /sales/:id                  # Get sale details
DELETE /sales/:id                  # Delete sale
```



##  **Resources**

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Ant Design](https://ant.design/)
- [TanStack Router](https://tanstack.com/router)
- [TypeORM](https://typeorm.io/)




**Built by Team Miss_Library**

**Last Updated:** November 13, 2025