package com.library.management.repository;

import com.library.management.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    // Filter books by status ("Available" or "Borrowed")
    List<Book> findByStatus(String status);

    // Filter books by language ("Sinhala", "Tamil", or "English")
    List<Book> findByLanguage(String language);

    // Search books by title or author
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);
}

