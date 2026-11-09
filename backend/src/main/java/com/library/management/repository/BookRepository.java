package com.library.management.repository;

import com.library.management.model.Book;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BookRepository {

    private final JdbcTemplate jdbcTemplate;

    public BookRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper: maps each database row to a Book Java object
    private final RowMapper<Book> bookRowMapper = (rs, rowNum) -> {
        Book book = new Book();
        book.setBookId(rs.getInt("book_id"));
        book.setIsbn(rs.getString("isbn"));
        book.setTitle(rs.getString("title"));
        book.setAuthor(rs.getString("author"));
        book.setTypeId(rs.getInt("type_id"));
        book.setStatus(rs.getString("status"));
        book.setLanguage(rs.getString("language"));
        book.setCoverImageUrl(rs.getString("cover_image_url"));
        return book;
    };

    // Get one ordered page of books matching the active filters.
    public List<Book> findPage(String search, String status, String language, Integer typeId,
            int limit, long offset) {
        QueryParts queryParts = buildFilterQuery(search, status, language, typeId);
        String sql = "SELECT * FROM books" + queryParts.whereClause
                + " ORDER BY book_id ASC LIMIT ? OFFSET ?";
        List<Object> parameters = new ArrayList<>(queryParts.parameters);
        parameters.add(limit);
        parameters.add(offset);
        return jdbcTemplate.query(sql, bookRowMapper, parameters.toArray());
    }

    // Count books matching the active filters.
    public long count(String search, String status, String language, Integer typeId) {
        QueryParts queryParts = buildFilterQuery(search, status, language, typeId);
        String sql = "SELECT COUNT(*) FROM books" + queryParts.whereClause;
        Long result = jdbcTemplate.queryForObject(sql, Long.class, queryParts.parameters.toArray());
        return result != null ? result : 0;
    }

    // Get a single book by ID
    public Book findById(Integer id) {
        String sql = "SELECT * FROM books WHERE book_id = ?";
        List<Book> results = jdbcTemplate.query(sql, bookRowMapper, id);
        return results.isEmpty() ? null : results.get(0);
    }

    // Check if a book exists by ID
    public boolean existsById(Integer id) {
        return findById(id) != null;
    }

    // Insert a new book and return the saved book with its generated ID
    public Book save(Book book) {
        String insertSql = "INSERT INTO books (isbn, title, author, type_id, status, language, cover_image_url) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING book_id";

        Integer newId = jdbcTemplate.queryForObject(insertSql, Integer.class,
                book.getIsbn(),
                book.getTitle(),
                book.getAuthor(),
                book.getTypeId(),
                book.getStatus(),
                book.getLanguage(),
                book.getCoverImageUrl());

        book.setBookId(newId);
        return book;
    }

    // Update an existing book
    public Book update(Integer id, Book book) {
        String updateSql = "UPDATE books SET isbn = ?, title = ?, author = ?, type_id = ?, status = ?, language = ?, cover_image_url = ? WHERE book_id = ?";

        jdbcTemplate.update(updateSql,
                book.getIsbn(),
                book.getTitle(),
                book.getAuthor(),
                book.getTypeId(),
                book.getStatus(),
                book.getLanguage(),
                book.getCoverImageUrl(),
                id);

        book.setBookId(id);
        return book;
    }

    // Count all books
    public long count() {
        String sql = "SELECT COUNT(*) FROM books";
        Long result = jdbcTemplate.queryForObject(sql, Long.class);
        return result != null ? result : 0;
    }

    // Count books by status for dashboard metrics
    public long countByStatus(String status) {
        String sql = "SELECT COUNT(*) FROM books WHERE status = ?";
        Long result = jdbcTemplate.queryForObject(sql, Long.class, status);
        return result != null ? result : 0;
    }

    private QueryParts buildFilterQuery(String search, String status, String language, Integer typeId) {
        List<String> conditions = new ArrayList<>();
        List<Object> parameters = new ArrayList<>();

        if (search != null && !search.trim().isEmpty()) {
            String searchPattern = "%" + search.trim().toLowerCase() + "%";
            conditions.add("(LOWER(title) LIKE ? OR LOWER(author) LIKE ? OR LOWER(isbn) LIKE ?)");
            parameters.add(searchPattern);
            parameters.add(searchPattern);
            parameters.add(searchPattern);
        }
        if (status != null && !status.trim().isEmpty()) {
            conditions.add("LOWER(status) = ?");
            parameters.add(status.trim().toLowerCase());
        }
        if (language != null && !language.trim().isEmpty()) {
            conditions.add("LOWER(language) = ?");
            parameters.add(language.trim().toLowerCase());
        }
        if (typeId != null) {
            conditions.add("type_id = ?");
            parameters.add(typeId);
        }

        String whereClause = conditions.isEmpty() ? "" : " WHERE " + String.join(" AND ", conditions);
        return new QueryParts(whereClause, parameters);
    }

    private record QueryParts(String whereClause, List<Object> parameters) {
    }
}
