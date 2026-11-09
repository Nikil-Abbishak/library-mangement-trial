package com.library.management.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.library.management.dto.PagedResponse;
import com.library.management.model.Book;
import com.library.management.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // GET /api/books - Get a page of books with optional search/filtering
    @GetMapping
    public PagedResponse<Book> getBooks(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String language,
            @RequestParam(name = "type_id", required = false) Integer typeId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        if (page < 1 || limit < 1) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "page and limit must both be greater than zero");
        }
        return bookService.getBooks(search, status, language, typeId, page, limit);
    }

    // GET /api/books/stats - Dashboard metrics
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total_books", bookService.getTotalCount());
        stats.put("available_books", bookService.getAvailableCount());
        stats.put("borrowed_books", bookService.getBorrowedCount());
        return stats;
    }

    // POST /api/books - Add a new book
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book savedBook = bookService.saveBook(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    // PUT /api/books/{id} - Update an existing book or change status
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Integer id, @RequestBody Book book) {
        Book updated = bookService.updateBook(id, book);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }
}
