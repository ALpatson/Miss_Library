# m1-s1-2025 project

# 📚 Babel's Library - Web Application Development Project

> M1-2025 Web Application Development Project - JUNIA

A full-stack library management system built with **NestJS** and **React** to manage books, authors, clients, and sales.

---

## 👥 **Team Members**

- Alpatson Cobbina SIAW
- Josephine Ama Gyanewah GYASI
- Kwabena ANOKYE

---

## 🎯 **Project Overview**

Babel's Library is a comprehensive library management system that allows users to:
- Manage books and authors
- Track clients and their purchases
- Record sales transactions
- View statistics and insights

**Due Date:** November 14, 2025 @ 23:59  
**Instructor:** Gerald Gallet (gerald.gallet@ext.junia.com)

---

## 🛠️ **Tech Stack**

### **Backend**
- **Language:** TypeScript
- **Framework:** NestJS
- **ORM:** TypeORM
- **Database:** SQLite
- **API:** REST

### **Frontend**
- **Language:** TypeScript
- **Framework:** React + Vite
- **UI Library:** Ant Design
- **Routing:** @tanstack/react-router
- **HTTP Client:** Axios

---

## 📁 **Project Structure**

```
MISS_LIBRARY/
├── nest-api/              # Backend (NestJS)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── authors/   # Authors domain
│   │   │   ├── books/     # Books domain
│   │   │   ├── clients/   # Clients domain
│   │   │   └── database/  # Database configuration
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
└── react-app/             # Frontend (React)
    ├── src/
    │   ├── authors/       # Authors feature
    │   ├── books/         # Books feature
    │   ├── clients/       # Clients feature
    │   ├── routes/        # Route definitions
    │   ├── api.ts         # API client
    │   └── Layout.tsx     # App layout
    ├── package.json
    └── vite.config.ts
```

---

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js (v18 or higher)
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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

#### **Start the Backend**
```bash
cd nest-api
npm run start:dev
```
Backend will run on: `http://localhost:3000`

#### **Start the Frontend**
```bash
cd react-app
npm run dev
```
Frontend will run on: `http://localhost:5173`

---

## 📋 **Features**

### ✅ **Implemented**

#### **Clients Management**
- View list of clients (`/clients`)
- Create new clients
- View client details (`/clients/:id`)
- Delete clients with confirmation
- Track number of books purchased per client

#### **Books Management** (Partial)
- View list of books (`/books`)
- View book details (`/books/:id`)
- Create and edit books
- Delete books

#### **Authors Management** (Partial)
- View list of authors (`/authors`)
- View author details (`/authors/:id`)
- Manage author information

### 🚧 **In Progress**

- **Sales System:** Record client purchases
- **Picture Support:** Add images for books, authors, and clients
- **Statistics:** Show sales metrics and averages
- **Enhanced Details Pages:** Full CRUD on detail pages
- **Breadcrumb Navigation:** Improved page hierarchy display

---

## 🗄️ **Database Schema**

### **Entities**

```typescript
Client {
  id: number
  firstName: string
  lastName: string
  email?: string
  photoUrl?: string
}

Book {
  id: number
  title: string
  publicationYear: number
  author: Author
  // photoUrl: string (to be added)
}

Author {
  id: number
  name: string
  biography?: string
  // photoUrl: string (to be added)
}

Sale {
  // To be implemented
  id: number
  client: Client
  book: Book
  date: Date
}
```

---

## 🎨 **Design Decisions**

- **UI Framework:** Ant Design for consistent, professional UI components
- **Routing:** File-based routing with TanStack Router
- **State Management:** React hooks (useState, useEffect) with custom providers
- **API Communication:** Centralized Axios instance
- **Validation:** class-validator decorators on DTOs
- **Architecture:** Domain-driven design with clear layer separation

---

## 📝 **API Endpoints**

### **Clients**
- `GET    /clients` - List all clients
- `POST   /clients` - Create a client
- `GET    /clients/:id` - Get client details
- `PUT    /clients/:id` - Update client
- `DELETE /clients/:id` - Delete client
- `GET    /clients/:id/purchases` - Get client's purchases

### **Books**
- `GET    /books` - List all books
- `POST   /books` - Create a book
- `GET    /books/:id` - Get book details
- `PUT    /books/:id` - Update book
- `DELETE /books/:id` - Delete book

### **Authors**
- `GET    /authors` - List all authors
- `POST   /authors` - Create an author
- `GET    /authors/:id` - Get author details
- `PUT    /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author

---

## 🧪 **Development Guidelines**

### **Code Quality**
- **No ESLint errors** - Code must compile without warnings
- **No `any` types** - All types must be explicit
- **Explicit typing required for:**
  - Function parameters
  - Function return types
  - Generic types (e.g., `useState<string>()`)

### **Git Workflow**
- Clear, descriptive commit messages
- Feature branches for new functionality
- Clean commit history (squash when appropriate)

### **File Organization**
Each domain follows this structure:
```
domain/
├── entities/          # Database entities
├── components/        # React components (frontend)
├── pages/            # Page components (frontend)
├── providers/        # Custom hooks (frontend)
├── domain.dto.ts     # Data transfer objects (backend)
├── domain.service.ts # Business logic (backend)
├── domain.controller.ts # API endpoints (backend)
├── domain.repository.ts # Database queries (backend)
├── domain.module.ts  # NestJS module (backend)
└── DomainModel.tsx   # TypeScript types (frontend)
```

---

## 🐛 **Known Issues**

- Breadcrumb deprecation warning (using old API)
- Sales system not yet implemented
- Picture fields missing on books/authors
- Update functionality incomplete on detail pages

---

## 🔜 **Roadmap**

### **Priority 1 (Critical)**
- [ ] Implement Sales entity and system
- [ ] Add update functionality on client details page
- [ ] Fix breadcrumb deprecation warnings

### **Priority 2 (Important)**
- [ ] Add picture fields to Books and Authors
- [ ] Implement "Record Sale" modal on book details
- [ ] Show purchase history on client details
- [ ] Show buyers on book details

### **Priority 3 (Enhancement)**
- [ ] Create author from modal
- [ ] Calculate and display average sales per author
- [ ] Build dashboard/home page with statistics
- [ ] Improve breadcrumb navigation across all pages

---

## 📚 **Resources**

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Ant Design Components](https://ant.design/components/overview/)
- [TanStack Router](https://tanstack.com/router)
- [TypeORM Documentation](https://typeorm.io/)

---

## 📄 **License**

This project is part of an academic course at JUNIA.

---

## 📞 **Contact**

For questions or issues, please contact:
- **Instructor:** Gerald Gallet - gerald.gallet@ext.junia.com

---

**Built with ❤️ by the M1-2025 Team**

## Getting started
### Nest API
```bash
> cd nest-api
> npm install
> npm run start:dev
```

### React application
```bash
> cd react-app
> npm install
> npm run dev
```
