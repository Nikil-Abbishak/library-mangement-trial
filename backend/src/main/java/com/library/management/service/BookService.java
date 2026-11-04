package com.library.management.service;

import com.library.management.model.Book;
import com.library.management.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Get all books, or filter if query parameters are provided
    public List<Book> getAllBooks(String search, String status, String language) {
        if (search != null && !search.trim().isEmpty()) {
            return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(search, search);
        }
        if (status != null && !status.trim().isEmpty()) {
            return bookRepository.findByStatus(status);
        }
        if (language != null && !language.trim().isEmpty()) {
            return bookRepository.findByLanguage(language);
        }
        return bookRepository.findAll();
    }

    // Save a new book to the database
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    // Update existing book details
    public Book updateBook(Integer id, Book updatedBook) {
        return bookRepository.findById(id).map(existingBook -> {
            existingBook.setIsbn(updatedBook.getIsbn());
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setTypeId(updatedBook.getTypeId());
            existingBook.setStatus(updatedBook.getStatus());
            existingBook.setLanguage(updatedBook.getLanguage());
            existingBook.setCoverImageUrl(updatedBook.getCoverImageUrl());
            return bookRepository.save(existingBook);
        }).orElse(null);
    }

    // Metrics for dashboard cards
    public long getTotalCount() {
        return bookRepository.count();
    }

    public long getAvailableCount() {
        return bookRepository.findByStatus("Available").size();
    }

    public long getBorrowedCount() {
        return bookRepository.findByStatus("Borrowed").size();
    }
}

