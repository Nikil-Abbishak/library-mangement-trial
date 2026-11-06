package com.library.management.service;

import com.library.management.model.Book;
import com.library.management.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Get all books with simultaneous search and filtering (pure Java logic)
    public List<Book> getAllBooks(String search, String status, String language) {
        List<Book> allBooks = bookRepository.findAll();
        List<Book> filteredBooks = new ArrayList<>();

        for (Book book : allBooks) {
            // 1. Search keyword in title, author, or ISBN
            boolean matchesSearch = (search == null || search.trim().isEmpty())
                || (book.getTitle() != null && book.getTitle().toLowerCase().contains(search.toLowerCase().trim()))
                || (book.getAuthor() != null && book.getAuthor().toLowerCase().contains(search.toLowerCase().trim()))
                || (book.getIsbn() != null && book.getIsbn().toLowerCase().contains(search.toLowerCase().trim()));

            // 2. Language filter
            boolean matchesLanguage = (language == null || language.trim().isEmpty())
                || (book.getLanguage() != null && book.getLanguage().equalsIgnoreCase(language.trim()));

            // 3. Status filter
            boolean matchesStatus = (status == null || status.trim().isEmpty())
                || (book.getStatus() != null && book.getStatus().equalsIgnoreCase(status.trim()));

            // Must match all active filters simultaneously
            if (matchesSearch && matchesLanguage && matchesStatus) {
                filteredBooks.add(book);
            }
        }

        return filteredBooks;
    }

    // Save a new book to the database
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    // Update existing book details
    public Book updateBook(Integer id, Book updatedBook) {
        if (!bookRepository.existsById(id)) {
            return null;
        }
        return bookRepository.update(id, updatedBook);
    }

    // Metrics for dashboard cards
    public long getTotalCount() {
        return bookRepository.count();
    }

    public long getAvailableCount() {
        return bookRepository.countByStatus("Available");
    }

    public long getBorrowedCount() {
        return bookRepository.countByStatus("Borrowed");
    }
}
