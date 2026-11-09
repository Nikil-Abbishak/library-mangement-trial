package com.library.management.service;

import com.library.management.dto.PagedResponse;
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

    // Get one page after applying all filters in the database.
    public PagedResponse<Book> getBooks(String search, String status, String language, Integer typeId,
            int page, int limit) {
        if (page < 1 || limit < 1) {
            throw new IllegalArgumentException("page and limit must both be greater than zero");
        }

        long offset = (long) (page - 1) * limit;
        long total = bookRepository.count(search, status, language, typeId);
        List<Book> books = bookRepository.findPage(search, status, language, typeId, limit, offset);
        long totalPages = total == 0 ? 0 : (total + limit - 1) / limit;

        return new PagedResponse<>(books, page, limit, total, totalPages);
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
