-- 1. Book Types Table (created first so foreign key references succeed)
CREATE TABLE IF NOT EXISTS book_types (
    type_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Books Table
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
