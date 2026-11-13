# Interactive Library Management System (LMS)

A modern full-stack web application designed to simplify library administration and book browsing. The system combines a responsive React frontend with a high-performance Spring Boot backend powered by PostgreSQL.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [REST API Reference](#rest-api-reference)
- [Project Directory Structure](#project-directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Future Improvements](#future-improvements)

---

## Overview

The Interactive Library Management System provides a clean, user-friendly platform for both library visitors and staff. Visitors can explore available book titles, perform live searches, filter books by language, and browse through collections with infinite scrolling. Library administrators can view inventory metrics, register new books with full catalog details, and manage circulation statuses directly through an intuitive dashboard.

---

## Key Features

### User & Catalog Experience (Homepage)
- **Dynamic Book Catalog:** Displays book covers, titles, and authors in a clean, responsive grid.
- **Live Search:** Quickly find books by title, author name, or ISBN.
- **Language Filtering:** Filter the library catalog by language (e.g., English, Sinhala, Tamil).
- **Infinite Scrolling:** Automatically loads subsequent pages of books as users scroll down the page.
- **Adaptive Screen Limits:** Automatically adjusts the number of items fetched per request according to the user's screen width.

### Library Administration (Inventory Dashboard)
- **Live Metric Cards:** Highlights essential numbers including total catalog count and currently available books.
- **Add New Book Modal / Form:** Allows staff to register new titles with ISBN, title, author, category, language, initial status, and cover image URL.
- **Inventory Data Table:** Presents organized book data with cover thumbnails, language tags, and status badges (`Available` or `Borrowed`).
- **Table Pagination:** Includes clean next/previous navigation and direct page indicators to handle large volumes of records effortlessly.
- **Responsive Navigation:** Features a collapsible sidebar navigation menu with smooth transitions and mobile overlay support.

---

## Technology Stack

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Custom Modular CSS with CSS Variables and responsive breakpoints

### Backend
- **Framework:** [Spring Boot 3.3.5](https://spring.io/projects/spring-boot)
- **Language:** Java 21
- **Persistence:** Spring JDBC (`JdbcTemplate`) for lightweight, high-performance SQL execution
- **Connection Pool:** HikariCP
- **Validation:** Jakarta Bean Validation

### Database
- **Engine:** PostgreSQL (compatible with cloud instances such as [Supabase](https://supabase.com/))
- **Security:** SSL-enabled remote connections

---

## System Architecture

The application adopts a decoupled client-server architecture:

```
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│         React Frontend          │           │       Spring Boot Backend       │
│      (Vite Dev Server :5173)    │ ◄───────► │       (REST API Port :8080)     │
└─────────────────────────────────┘  HTTP/    └────────────────┬────────────────┘
                                     JSON                      │
                                                               │ JDBC / SQL
                                                               ▼
                                              ┌─────────────────────────────────┐
                                              │       PostgreSQL Database       │
                                              │      (Local or Supabase Cloud)  │
                                              └─────────────────────────────────┘
```

1. **Frontend Layer:** Built with functional React components and custom hooks, managing client state and handling asynchronous network calls via the Fetch API.
2. **Service Layer:** `bookService.js` constructs query parameters and acts as an interface between the user interface and backend endpoints.
3. **Backend REST Layer:** Spring Boot controllers validate input parameters, handle pagination logic, and deliver structured JSON responses.
4. **Data Access Layer:** Direct SQL queries executed via Spring `JdbcTemplate` provide fine-grained query optimization and eliminate object-relational mapping (ORM) overhead.

---

## Database Schema

The database model consists of two relational tables defined in `backend/schema.sql`:

### 1. `book_types`
Stores classifications and categories for books.
- `type_id` (`SERIAL PRIMARY KEY`): Unique category identifier.
- `name` (`VARCHAR(50) NOT NULL UNIQUE`): Category name (e.g., Fiction, Science, History, Technology, Education).
- `description` (`TEXT NULL`): Detailed description of the category.
- `created_at` (`TIMESTAMPTZ`): Record creation timestamp.

### 2. `books`
Main inventory table containing book metadata.
- `book_id` (`SERIAL PRIMARY KEY`): Unique identifier for each book record.
- `isbn` (`VARCHAR(17) NOT NULL UNIQUE`): International Standard Book Number.
- `title` (`VARCHAR(255) NOT NULL`): Title of the book.
- `author` (`VARCHAR(255) NOT NULL`): Name of the author.
- `type_id` (`INT NOT NULL`): Foreign key referencing `book_types(type_id)`.
- `status` (`VARCHAR(20) NOT NULL DEFAULT 'Available'`): Current status (`Available` or `Borrowed`).
- `language` (`VARCHAR(20) NOT NULL DEFAULT 'English'`): Language (`English`, `Sinhala`, or `Tamil`).
- `cover_image_url` (`VARCHAR(500) NULL`): URL linking to book cover artwork.
- `created_at` / `updated_at` (`TIMESTAMPTZ`): Audit timestamps.

---

## REST API Reference

Base URL: `http://localhost:8080/api/books`

| Method | Endpoint | Query Parameters | Description | Status Codes |
|---|---|---|---|---|
| `GET` | `/api/books` | `search`, `status`, `language`, `type_id`, `page` (default: 1), `limit` (default: 10) | Retrieves a paginated list of books matching the specified search terms or filters. | `200 OK`, `400 Bad Request` |
| `GET` | `/api/books/stats` | *None* | Returns dashboard metrics: total count, available books count, and borrowed books count. | `200 OK` |
| `POST` | `/api/books` | *None* (Accepts JSON body) | Adds a new book to the database catalog. | `201 Created`, `409 Conflict`, `500 Internal Error` |
| `PUT` | `/api/books/{id}` | Path variable: `id` (Accepts JSON body) | Updates an existing book's details or availability status. | `200 OK`, `404 Not Found` |

### Sample Response: `GET /api/books?page=1&limit=2`

```json
{
  "page": 1,
  "limit": 2,
  "total": 24,
  "totalPages": 12,
  "data": [
    {
      "isbn": "9780132350884",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "status": "Available",
      "language": "English",
      "cover_image_url": "https://example.com/covers/cleancode.jpg",
      "book_id": 1,
      "type_id": 4
    }
  ]
}
```

### Sample Response: `GET /api/books/stats`

```json
{
  "total_books": 24,
  "available_books": 18,
  "borrowed_books": 6
}
```

---

## Project Directory Structure

```text
library-mangement-trial/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/library/management/
│   │       │   ├── controller/
│   │       │   │   └── BookController.java        # REST controllers and routing
│   │       │   ├── dto/
│   │       │   │   └── PagedResponse.java         # Generic pagination wrapper
│   │       │   ├── model/
│   │       │   │   └── Book.java                  # Book entity definition
│   │       │   ├── repository/
│   │       │   │   └── BookRepository.java        # JdbcTemplate queries & RowMapper
│   │       │   ├── service/
│   │       │   │   └── BookService.java           # Business logic layer
│   │       │   └── LibraryManagementApplication.java # Spring Boot entry point
│   │       └── resources/
│   │           └── application.yml                # Spring configuration
│   ├── schema.sql                                 # PostgreSQL table definitions
│   └── pom.xml                                    # Maven dependencies and build setup
│
├── frontend/
│   ├── public/                                    # Static SVG icons and favicon assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── homepage/                          # Book cards and search inputs
│   │   │   ├── inventory/                         # Add book form, table, stat cards, toolbar
│   │   │   ├── loading/                           # Spinner loading indicator
│   │   │   └── Navbar.jsx                         # Collapsible navigation sidebar
│   │   ├── config/
│   │   │   └── api.js                             # Base API URL configuration
│   │   ├── pages/
│   │   │   ├── Homepage.jsx                       # Public catalog page with infinite scroll
│   │   │   └── Inventory.jsx                      # Administrative management page
│   │   ├── services/
│   │   │   └── bookService.js                     # HTTP request service functions
│   │   ├── App.jsx                                # App routes and root shell
│   │   └── main.jsx                               # React DOM root entry point
│   ├── package.json                               # Frontend dependencies and scripts
│   └── vite.config.js                             # Vite configuration
│
└── README.md                                      # Documentation
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your local environment:
- **Java Development Kit (JDK):** Version 21 or higher
- **Apache Maven:** Version 3.8+ (or use the included `mvnw` wrapper)
- **Node.js:** Version 18.x or 20.x
- **npm:** Version 9+
- **PostgreSQL Database:** A local instance or a managed cloud database (such as Supabase)

---

### Database Setup

1. Open your PostgreSQL administration client (e.g., psql, pgAdmin, or Supabase SQL Editor).
2. Execute the statements in [backend/schema.sql](file:///backend/schema.sql) to create the `book_types` and `books` tables:

```sql
-- Create table for book categories
CREATE TABLE IF NOT EXISTS book_types (
    type_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial sample categories
INSERT INTO book_types (type_id, name, description) 
VALUES 
    (1, 'Fiction', 'Fictional stories and literature'),
    (2, 'Science', 'Scientific studies and discoveries'),
    (3, 'History', 'Historical events and biographies'),
    (4, 'Technology', 'Computing and engineering topics'),
    (5, 'Education', 'Academic texts and manuals')
ON CONFLICT (type_id) DO NOTHING;

-- Create table for books
CREATE TABLE IF NOT EXISTS books (
    book_id SERIAL PRIMARY KEY,
    isbn VARCHAR(17) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    type_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Available' 
        CHECK (status IN ('Available', 'Borrowed')),
    language VARCHAR(20) NOT NULL DEFAULT 'English' 
        CHECK (language IN ('Sinhala', 'Tamil', 'English')),
    cover_image_url VARCHAR(500) NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_books_type FOREIGN KEY (type_id) 
        REFERENCES book_types(type_id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
);
```

---

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create or verify your environment configuration in a `.env` file inside the `backend` folder:
   ```env
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_NAME=postgres
   DB_USERNAME=your-database-user
   DB_PASSWORD=your-database-password
   SERVER_PORT=8080
   ```

3. Build and launch the Spring Boot application:
   ```bash
   # On Windows using Command Prompt or PowerShell:
   ./mvnw.cmd spring-boot:run

   # Alternatively, with an installed Maven binary:
   mvn spring-boot:run
   ```

4. The backend service will start on `http://localhost:8080`.

---

### Frontend Setup

1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create an `.env` file in the `frontend` root to customize the backend URL if running on a custom port:
   ```env
   VITE_API_URL=http://localhost:8080
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Environment Variables

### Backend Configuration (`backend/.env`)

| Variable | Description | Default Value |
|---|---|---|
| `SERVER_PORT` | HTTP port for the Spring Boot application | `8080` |
| `DB_HOST` | Hostname or IP of the PostgreSQL server | `localhost` |
| `DB_PORT` | Port number of the PostgreSQL database | `5432` |
| `DB_NAME` | Name of the database | `postgres` |
| `DB_USERNAME` | Database connection username | `postgres` |
| `DB_PASSWORD` | Database connection password | *(empty string)* |

### Frontend Configuration (`frontend/.env`)

| Variable | Description | Default Value |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend REST API | `http://localhost:8080` |

---

## Future Improvements

- [ ] **Book Editing & Deletion:** Connect the edit and delete action buttons in the inventory table to backend endpoints.
- [ ] **User Authentication & Role Management:** Implement JWT authentication to separate student and librarian privileges.
- [ ] **Borrower Transaction Tracking:** Introduce a loan management table to record borrowing dates, return deadlines, and overdue fines.
- [ ] **Enhanced Filter Combinations:** Enable combined multi-criteria filtering (status + language + category) across both views.
